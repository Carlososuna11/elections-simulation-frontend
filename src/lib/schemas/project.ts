import { z } from 'zod';

// 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const importProjectSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      return file !== null;
    }, 'Archivo .tsbr es requerido')
    .refine((file) => {
      return file.size <= MAX_FILE_SIZE;
    }, 'El archivo no puede pesar más de 5MB'),
});
