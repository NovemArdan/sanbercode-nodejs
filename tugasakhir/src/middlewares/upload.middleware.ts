import multer from 'multer';

// atur multer untuk menyimpan file di memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 } // batas 5MB
});

export const single = upload.single('file');
export const multiple = upload.array('files', 10);

export default { single, multiple };
