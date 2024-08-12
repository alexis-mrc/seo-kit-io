import fs from 'fs';
import { join } from 'node:path';
import { Express } from 'express';
import {execSync} from "child_process";

export const colorsEndpoints = (server: Express, nxSrcFolder: string) => {
  server.get('/api/get-colors', (req, res) => {
    try {
      execSync(`npm run ast:get-colors`);
      return res.status(200).send(fs.readFileSync(join(nxSrcFolder, './tmp/get-colors.json')).toString());
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.post('/api/set-colors', (req, res) => {
    const jsonString = JSON.stringify(req.body, null, 2);

    try {
      fs.writeFileSync(join(nxSrcFolder, './tmp/set-colors.json'), jsonString);
      execSync(`npm run ast:set-colors`);

      return res.status(204).send();
    } catch (e) {
      return res.status(500).send();
    }

  });
}
