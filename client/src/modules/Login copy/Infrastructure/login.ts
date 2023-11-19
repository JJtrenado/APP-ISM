// @ts-ignore
import { BACKEND_URL }from '@env';
import axios from 'axios';
import { User } from '../../common/Domain/User';
import { json } from 'express';

export const login = async (formData: FormData): Promise<User | undefined> =>{
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  };

  let bodyContent = JSON.stringify({
    "email": formData.getAll('email')[0],
    "password": formData.getAll('password')[0]
  });
  
  try {
    const response = await fetch(`${BACKEND_URL}/user/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    if (response.status === 401) {
      console.error('Error 401: No autorizado');
    } else if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      console.error('Error en la solicitud: ' + response.status);
    }

  } catch (error) {
    console.error('Error al autenticar:', error.message);
  }
}

