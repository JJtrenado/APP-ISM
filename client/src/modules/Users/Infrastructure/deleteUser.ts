export const deleteUserById = async (jwt: string, id: string): Promise<boolean> => {
  let headersList = {
    Authorization: jwt,
    "Content-Type": "application/json"
  };
  
  try {
    const response = await fetch(`http://192.168.1.29:3002/api/user/${id}`, {
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
    console.error('Error deleting user:', error);
    return false;
  }
};