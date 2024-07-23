import express, { Request, Response } from 'express';
import { single, multiple } from './middlewares/upload.middleware';
import { handleUpload } from './utils/cloudinary';

const router = express.Router();

// route single upload
router.post('/upload/single', single, async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer) { 
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  try {
    const result = await handleUpload(req.file.buffer);
    res.json({ message: 'File uploaded successfully!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

// route multiple upload
router.post('/upload/multiple', multiple, async (req: Request, res: Response) => {
  if (!req.files || req.files.length === 0) { 
    return res.status(400).json({ message: 'No files uploaded.' });
  }
  try {
    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => {
        if (file.buffer) { 
          return handleUpload(file.buffer);
        } else {
          throw new Error("Buffer is missing in one of the files");
        }
      })
    );
    res.json({ message: 'Files uploaded successfully!', data: results });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload images', error });
  }
});

export default router;