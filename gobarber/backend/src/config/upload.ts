import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const suffixFilename = crypto.randomBytes(10).toString('HEX');
      const fileName = `${suffixFilename}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
