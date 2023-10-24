import { BACKEND_URL } from '@env';

export const deleteUserById = async (jwt: string, id: string): Promise<boolean> => {
  let headersList = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json"
  };
  
  try {
    const response = await fetch(`${BACKEND_URL}/user/${id}`, {
      method: "DELETE",
      headers: headersList
    });
  
    if (response.status === 401) {
      console.error('Error 401: No autorizado');
    } else if (response.ok) {
      return true;
    } else {
      console.error('Error en la solicitud: ' + response.status);
    }

  } catch (error) {
    console.error('Error deleting garment:', error);
    return false;
  }
};