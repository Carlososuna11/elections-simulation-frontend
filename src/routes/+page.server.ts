import { superValidate } from 'sveltekit-superforms/server';
import { importProjectSchema } from '$lib/schemas/project';

export const load = async () => {
  const importForm = await superValidate(importProjectSchema, {
    id: 'importForm',
  });

  return { importForm };
};
