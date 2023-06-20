import { env } from '$env/dynamic/public';
import type { ErrorResponse } from '../types';
import axios, { AxiosError } from 'axios';
import { alertStore } from '../stores';

const BACKEND_URL = env.PUBLIC_BACKEND_BASE_URL;

const baseService = async (
  path: string,
  method: string,
  header: object = {},
  params: object = {},
  body?: object
) => {
  const url = `${BACKEND_URL}${path}`;
  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
      params,
      data: body,
    });
    return response;
  } catch (error) {
    let message = 'Ups! Hubo un error. Revisa la consola para más detalles.';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        message = errorResponse.message;
      }
    } else {
      message = String(error);
    }
    alertStore.set({
      message: message,
      color: 'red',
      visible: true,
    });
    console.error(`Error Calling the API`, message);
    console.error(error);
    throw error;
  }
};

export const api = {
  baseService,
};
