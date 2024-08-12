import { execSync } from 'child_process';
import {Express} from "express";
import {getAllFiles} from "./files";
import fs from 'fs';
import {join} from "node:path";
import {SeokPage} from "@seo-kit-boilerplate/seok-core/pages";
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

export const pagesEndpoints = (server: Express, nxSrcFolder: string) => {
  const mdFolder = join(nxSrcFolder, './tmp/')
  const uploadMd = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = mdFolder;
        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, 'md-to-html.md');
      }
    })
  });

  const getAllPagesAsString = () => {
    const allFilePathInPages = getAllFiles('./apps/client-app/src/app/pages');
    const allPagesData = allFilePathInPages.filter(file => file.endsWith('.page.ts'));

    const jsonString = JSON.stringify(allPagesData, null, 2);
    fs.writeFileSync(join(nxSrcFolder, './tmp/pages-to-get.json'), jsonString);

    execSync(`npm run ast:get-pages`);

    return fs.readFileSync(join(nxSrcFolder, './tmp/get-pages.json')).toString();
  }

  server.get('/api/get-pages', (req, res) => {
    try {
      return res.status(200).send(getAllPagesAsString());
    } catch (e) {
      return res.status(500).send();
    }
  });


  server.post('/api/add-page', (req, res) => {
    const pageId = req.query['id'];

    try {
      execSync(`npm run seok-sdk:add-page "${pageId}"`);

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send();
    }
  });

  server.post('/api/delete-page', (req, res) => {
    const pageId = req.query['id'];

    try {
      execSync(`npm run seok-sdk:delete-page "${pageId}"`);

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send();
    }
  });


  server.post('/api/update-page', (req, res) => {
    const pageUpdatedData: SeokPage = req.body;

    try {
      const pagesJson: (SeokPage & {filePath: string})[] = JSON.parse(getAllPagesAsString());
      const pageData = pagesJson.filter(p => p.id === pageUpdatedData.id)

      if (pageData.length === 0) {
        return res.status(500).send({error: 'Unknown page id'});
      } else if (pageData.length > 1) {
        return res.status(500).send({error: 'Page id match more than one page'});
      }

      fs.writeFileSync(join(nxSrcFolder, './tmp/page-to-update.json'), JSON.stringify({...pageUpdatedData, filePath: pageData[0].filePath}, null, 2));

      execSync(`npm run ast:update-page`);

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send();
    }
  });

  server.post('/api/upload-md', uploadMd.any(), (req, res) => {
    try {
      return res.status(200).send();
    } catch (e) {
      console.log('error', e);
      return res.status(500).send();
    }
  });

  server.post('/api/md-to-html', (req, res) => {
    const pageUpdatedFilePath: string = req.body?.filePath;

    try {
      if (!pageUpdatedFilePath) {
        return res.status(500).send({error: 'Invalid file path'});
      } else if (!fs.existsSync(join(nxSrcFolder, pageUpdatedFilePath))) {
        return res.status(500).send({error: 'Page id match more than one page'});
      }

      fs.writeFileSync(join(nxSrcFolder, './tmp/md-to-html.json'), JSON.stringify({htmlPage: pageUpdatedFilePath}, null, 2));

      execSync(`npm run ast:md-to-html`);

      return res.status(200).send();
    } catch (e) {
      return res.status(500).send();
    }
  });

}
