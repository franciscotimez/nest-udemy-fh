import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void,
) => {
  console.log({ file });

  if (!file) return callback(new Error('File is empty'), null);

  const fileExtension = file.mimetype.split('/')[1];

  const filename = `${uuid()}.${fileExtension}`;

  return callback(null, filename);
};
