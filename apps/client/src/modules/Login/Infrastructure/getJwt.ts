// @ts-ignore
import { BACKEND_URL }from '@env';
import axios from 'axios';
import { User } from '../../common/Domain/User';

export const getJwt = async (formData: FormData): Promise<User> =>{
  // try {
  //   const response = await axios.post(`${BACKEND_URL}/login`, {
  //     formData
  //   });

  //   return response.data;
  // } catch (error) {
  //   console.error('Error al autenticar:', error.message);
  // }
  return {
    email: 'juanjo@ucolib.com',
    name: 'Juanjo Trenado',
    jwt: 'dsgs'
  };
}