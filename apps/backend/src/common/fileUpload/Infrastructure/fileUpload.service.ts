import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipeBuilder } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  handleFileUpload(fileIsRequired: boolean, fileType: string) {
    return FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!fileIsRequired && !file) {
          return callback(null, true);
        }

        if (!file) {
          return callback(new Error('File is required'), false);
        }

        if (
          fileType &&
          !file.originalname.toLowerCase().endsWith(`.${fileType}`)
        ) {
          return callback(
            new Error(`Invalid file type. Only ${fileType} files are allowed`),
            false,
          );
        }

        return callback(null, true);
      },
    });
  }
}
