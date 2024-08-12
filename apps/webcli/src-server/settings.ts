import fs from 'fs';
import { join } from 'node:path';
import { Express } from 'express';
import {execSync} from "child_process";

export const settingsEndpoints = (server: Express, nxSrcFolder: string) => {
  server.get('/api/get-settings', (req, res) => {
    try {
      execSync(`npm run ast:get-settings`);
      return res.status(200).send(fs.readFileSync(join(nxSrcFolder, './tmp/get-settings.json')).toString());
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.post('/api/set-settings', (req, res) => {
    const jsonString = JSON.stringify(req.body, null, 2);

    try {
      fs.writeFileSync(join(nxSrcFolder, './tmp/set-settings.json'), jsonString);
      execSync(`npm run seok-sdk:set-settings`);
      return res.status(204).send();
    } catch (e) {
      return res.status(500).send();
    }
  });
}
