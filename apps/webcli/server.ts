import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import {colorsEndpoints} from "./src-server/colors";
import {fontsEndpoints} from "./src-server/fonts";
import {publicEndpoints} from "./src-server/public";
import {settingsEndpoints} from "./src-server/settings";
import {pagesEndpoints} from "./src-server/pages";
import http from "node:http";
import {WebSocket, WebSocketServer} from "ws";
import {serveEndpoints} from "./src-server/serve-build-deploy";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): {server: express.Express, serverWs: http.Server} {
  const server = express();
  const serverWs = http.createServer(server);

  /** Websocket **/
  const wss = new WebSocketServer({ server: serverWs });

  // Store WebSocket clients
  const clients = new Set<WebSocket>();

  function broadcast(message: { type: string, data: string }) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
      clients.delete(ws);
    });

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });
  });

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const nxSrcFolder = resolve(serverDistFolder, '../../../../');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  colorsEndpoints(server, nxSrcFolder);
  fontsEndpoints(server, nxSrcFolder);
  publicEndpoints(server, nxSrcFolder);
  settingsEndpoints(server, nxSrcFolder);
  pagesEndpoints(server, nxSrcFolder);
  serveEndpoints(server, nxSrcFolder, broadcast);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return {server, serverWs};
}

function run() {
  const port = process.env['PORT'] || 4000;

  const {server, serverWs} = app();
  // Start up the Node server
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  serverWs.listen(3000, () => {
    console.log(`Websocket server listening on http://localhost:3000`);
  });
}

run();
