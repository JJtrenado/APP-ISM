export const registerUser = async (jwt: string, formData: FormData): Promise<boolean> =>{
  
  console.log(jwt);
   
  let response = await fetch("https://www.uuidtools.com/api/generate/v4", { 
    method: "GET",
  });
  
  const uuid = (await response.text()).slice(2, -2);
   
  const headers = {
    Authorization: jwt,
    "Content-Type": "application/json"
  };
  
  let bodyContent = JSON.stringify({
    "email": formData.getAll('email')[0],
    "name": formData.getAll('name')[0], 
    "password": formData.getAll('password')[0],
    "id": uuid
  });
  
  try {

    const response = await fetch(`http://192.168.1.29:3002/api/user/register`, {
      method: "POST",
      body: bodyContent,
      headers: headers
    });

    if (response.status === 401) {
      console.error('Error 401: No autorizado');
      return false;
    } else if (response.ok) {
      return true;
    } else {
      console.error('Error en la solicitud: ' + response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};