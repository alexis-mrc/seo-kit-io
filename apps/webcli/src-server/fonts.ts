import fs from 'fs';
import { join } from 'node:path';
import { Express } from 'express';
import {execSync} from "child_process";
import {getAllFiles} from "./files";
import multer from "multer";
import path from "path";

export const fontsEndpoints = (server: Express, nxSrcFolder: string) => {
  const publicFolder = join(nxSrcFolder, 'apps/client-app/public');
  const fontsFolder = join(publicFolder, 'fonts');
  const uploadFonts = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = fontsFolder;
        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  });

  server.get('/api/get-fonts', (req, res) => {
    try {
      execSync(`npm run ast:get-fonts`);
      const fontsCss = JSON.parse(fs.readFileSync(join(nxSrcFolder, './tmp/get-fonts.json')).toString());

      let fontsAviable = fs.existsSync(fontsFolder) ? getAllFiles(fontsFolder) : [];
      fontsAviable = fontsAviable.map(path => '/fonts/' + path);

      return res.status(200).send({fontsCss, fontsAviable});
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.post('/api/upload-fonts', uploadFonts.any(), (req, res) => {
    try {
      return res.status(200).send();
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.post('/api/delete-font', (req, res) => {
    const fontName = req.body.font;
    const filePath = path.join(publicFolder, fontName);

    try {
      return fs.unlink(filePath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return res.status(404).send(JSON.stringify({path: filePath}));
          }
          console.log('error', err);
          return res.status(500).send();
        }
        return res.status(200).send();
      });
    } catch (e) {
      return res.status(500).send();
    }
  });

  server.post('/api/set-fonts', (req, res) => {
    const jsonString = JSON.stringify(req.body, null, 2);

    try {
      fs.writeFileSync(join(nxSrcFolder, './tmp/set-fonts.json'), jsonString);
      execSync(`npm run ast:set-fonts`);

      return res.status(204).send();
    } catch (e) {
      return res.status(500).send();
    }

  });
}
