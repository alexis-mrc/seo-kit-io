import { ChildProcess, exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'node:path';
import {Express} from "express";

let client_app_process: undefined | ChildProcess = undefined;

export const serveEndpoints = (server: Express, nxSrcFolder: string, broadcast: (message: { type: string, data: string }) => void) => {
  if (!broadcast) {
    throw new Error('broadcast not found');
  }

  const distFilesFolder = resolve(nxSrcFolder, '/dist/apps/client-app/browser/');
  const firebaseRcFile = resolve(nxSrcFolder, '.firebaserc');

  server.get('/api/start-server', (req, res) => {
    try {
      if (client_app_process) {
        client_app_process.kill();
      }

      client_app_process = exec('npm run client-app');

      client_app_process.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        broadcast({type: 'serve', data});
      });

      client_app_process.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        broadcast({type: 'serve', data});
      });

      client_app_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        broadcast({type: 'serve', data: `Process exited with code ${code}`});
      });

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.get('/api/build-client-app', (req, res) => {
    try {

      const build_process = exec('npm run build');

      build_process.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        broadcast({type: 'build', data});
      });

      build_process.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        broadcast({type: 'build', data});
      });

      build_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        broadcast({type: 'build', data: `Process exited with code ${code}`});
      });

      return res.status(200).send({filePath: distFilesFolder});
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.get('/api/firebase-projects-list', (req, res) => {
    try {
      const login_process = exec('npx firebase projects:list');

      login_process.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        broadcast({type: 'firebase-projects-list', data});
      });

      login_process.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        broadcast({type: 'firebase-projects-list', data});
      });

      login_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        broadcast({type: 'firebase-projects-list', data: `Process exited with code ${code}`});
      });

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.post('/api/firebase-project-id/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const config = {
      "projects": {
        "default": projectId
      }
    }

    const jsonString = JSON.stringify(config, null, 2);

    try {
      fs.writeFileSync(firebaseRcFile, jsonString);

      return res.status(204).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.get('/api/firebase-project-id', (req, res) => {
    try {
      const config = JSON.parse(fs.readFileSync(firebaseRcFile).toString());

      return res.status(200).send(config);
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.get('/api/firebase-deploy-prod', (req, res) => {
    try {
      const deploy_prod_process = exec('npm run firebase:deploy:prod');

      deploy_prod_process.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        broadcast({type: 'firebase-deploy-prod', data});
      });

      deploy_prod_process.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        broadcast({type: 'firebase-deploy-prod', data});
      });

      deploy_prod_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        broadcast({type: 'firebase-deploy-prod', data: `Process exited with code ${code}`});
      });

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  server.get('/api/firebase-deploy-preview', (req, res) => {
    try {
      const deploy_preview_process = exec('npm run firebase:deploy:preview');

      deploy_preview_process.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        broadcast({type: 'firebase-deploy-preview', data});
      });

      deploy_preview_process.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        broadcast({type: 'firebase-deploy-preview', data});
      });

      deploy_preview_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        broadcast({type: 'firebase-deploy-preview', data: `Process exited with code ${code}`});
      });

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}
