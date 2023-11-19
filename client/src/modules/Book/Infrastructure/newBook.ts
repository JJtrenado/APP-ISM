export const existBook = async ( jwt: string,  barCode: string,): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const uploadResponse = await fetch(`http://192.168.1.29:3000/api/book/${barCode}`, {
      method: "GET",
      headers: headers,
    });

    console.log(uploadResponse);

    if (uploadResponse.ok) return true;
    console.error("Error:", uploadResponse.statusText);
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const addOneStock = async ( jwt: string,  barCode: string,): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const uploadResponse = await fetch(`http://192.168.1.29:3000/api/book/stock/${barCode}`, {
      method: "PATCH",
      headers: headers,
    });

    if (uploadResponse.ok) return true;
    console.error("Error:", uploadResponse.statusText);
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const uploadImageBook = async (jwt: string, image: FormData): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent = image;
    const uploadResponse = await fetch(`http://192.168.1.29:3000/api/book/upload`, {
      method: "POST",
      body: bodyContent,
      headers: headers,
    });

    console.log(uploadResponse)
    if (uploadResponse.ok) return true;
    console.error("Error:", uploadResponse.statusText);
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const createBook = async (jwt: string, formData: FormData): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent= formData;
    const uploadResponse = await fetch(`http://192.168.1.29:3000/api/book`, {
      method: "POST",
      body: bodyContent,
      headers: headers,
    });

    if (uploadResponse.ok) return true;
    console.error("Error:", uploadResponse.statusText);
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
