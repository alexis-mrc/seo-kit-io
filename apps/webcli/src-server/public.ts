import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import {join} from "node:path";
import {getAllFiles} from "./files";

export const publicEndpoints = (server: Express, nxSrcFolder: string) => {
  const publicFolder = join(nxSrcFolder, 'apps/client-app/public');
  const uploadAssets = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = publicFolder;
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

  server.post('/api/upload-assets', uploadAssets.any(), async (req, res) => {
    try {
      let filesArray: Express.Multer.File[] = [];

      // Check if req.files is an array
      if (Array.isArray(req.files)) {
        filesArray = req.files;
      } else {
        // Flatten the record of arrays into a single array
        for (const key in req.files) {
          if (Array.isArray(req.files[key])) {
            filesArray = filesArray.concat(req.files[key]);
          }
        }
      }

      // Process uploaded files with Sharp (only images)
      const processedFiles = await Promise.all(filesArray.map(async (file) => {
        const { name } = path.parse(file.filename);
        const outputWebPPath = path.join(publicFolder, `${name}.webp`);

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          await sharp(file.path)
            .toFormat('webp')
            .webp({
              quality: 90
            })
            .toFile(outputWebPPath);

          // Optionally remove the original file
          fs.unlinkSync(file.path);
        } else {
          // If not an image, just return the original file path
          return file.path;
        }

        return outputWebPPath;
      }));

      return res.status(200).send(processedFiles);
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.get('/api/get-assets', (req, res) => {

    try {
      const allFileWithCompletePath = getAllFiles(publicFolder);

      return res.status(200).send(JSON.stringify(allFileWithCompletePath));
    } catch (e) {
      return res.status(500).send();
    }
  });

  server.get('/api/get-asset', (req, res) => {

    const imageName = req.query['name'];
    if (!imageName) {
      return res.status(400).send();
    }

    const filePath = path.join(publicFolder, imageName.toString());

    try {
      const content = fs.readFileSync(filePath);
      if (filePath.endsWith('.svg')) {
        const contentStr = content.toString();
        res.header('Content-Type', 'image/svg+xml');
        return res.status(200).send(contentStr);
      } else {
        return res.status(200).send(content);
      }
    } catch (e) {
      return res.status(500).send();
    }
  });

  server.delete('/api/delete-assets', (req, res) => {
    const imageName = req.query['name'];
    if (!imageName) {
      return res.status(400).send();
    }
    const filePath = path.join(publicFolder, imageName.toString());

    try {
      return fs.unlink(filePath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return res.status(404).send();
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
}
