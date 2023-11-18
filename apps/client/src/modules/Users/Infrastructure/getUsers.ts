// @ts-ignore
import { BACKEND_URL }from '@env';
import { User } from '../../common/Domain/User';
import { json } from 'express';

export const getUsers = async (jwt: string): Promise<User[]> =>{
  let headersList = {
    Authorization: jwt,
    "Content-Type": "application/json"
  };
  
  try {
    const response = await fetch(`${BACKEND_URL}/user`, {
      method: "GET",
      headers: headersList
    });

    if (response.status === 401) {
      console.error('Error 401: No autorizado');
    } else if (response.ok) {
      let data = await response.json();
      return data.users;
    } else {
      console.error('Error en la solicitud: ' + response.status);
    }

  } catch (error) {
    console.error('Error al autenticar:', error.message);
  }
}

