import {Paddle} from "@paddle/paddle-node-sdk";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import * as https from "https";

const paddleAPIKey = defineSecret("PADDLE_API_KEY_SANDBOX");
const WEBHOOK_SECRET = defineSecret("WEBHOOK_SECRET_SANDBOX");
const githubKey = defineSecret("GITHUB_KEY");


export const paddleWebhookInivitToGithub = onRequest(
  {region: "europe-west1", secrets: [WEBHOOK_SECRET, paddleAPIKey, githubKey]},
  async (request, response) => {
    const paddle = new Paddle(paddleAPIKey.value());

    logger.info("request.body", request.body);
    logger.info("request.params", request.params);
    logger.info("request.headers", request.headers);
    response.send("CALL BY PADDLE WEBHOOK!");


    const signature = (request.headers["paddle-signature"] as string) || "";
    const rawRequestBody = request.rawBody.toString();

    try {
      if (!signature) {
        logger.error("Signature missing in header");
        response.status(400).send();
        return;
      }

      if (!rawRequestBody) {
        logger.error("Raw Body missing");
        response.status(400).send();
        return;
      }

      const eventData = paddle.webhooks.unmarshal(rawRequestBody, WEBHOOK_SECRET.value(), signature);

      if (!eventData) {
        logger.error("Wrong Signature in header");
        response.status(403).send();
        return;
      }

      logger.info("Signature is valid");
      logger.info("Event", eventData);

      if (eventData.eventType !== "transaction.completed") {
        logger.error("Wrong EventType");
        response.status(403).send();
        return;
      }

      const customData = eventData.data.customData as {ghUsername?: string};


      const ghUsername = customData?.["ghUsername"] ?? undefined;
      if (!ghUsername) {
        logger.error("No Github username");
        response.status(500).send();
        return;
      }

      // Replace these with your own details
      const GITHUB_TOKEN = githubKey.value();
      const REPO_OWNER = "alexis-mrc";
      const REPO_NAME = "seo-kit-boilerplate";
      const INVITEE_USERNAME = ghUsername;

      const options = {
        hostname: "api.github.com",
        path: `/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${INVITEE_USERNAME}`,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "SEO-KIT-IO",
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      };

      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 201) {
            logger.info("Invitation sent successfully!");
            response.status(200).send("Invitation sent successfully!");
            return;
          } else {
            logger.error(`Failed to send invitation. Status code: ${res.statusCode}`, data);
            response.status(500).send("Failed to send invitation. Status code: ${res.statusCode}");
            return;
          }
        });
      });

      req.on("error", (e) => {
        logger.error(`Problem with request: ${e.message}`);
        response.status(500).send("Failed to send invitation. Status code: ${res.statusCode}");
        return;
      });

      req.end();
    } catch (e) {
      logger.error("Error during webhook execution", e);
      response.status(500).send();
      return;
    }
  });
