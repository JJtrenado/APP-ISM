export const uploadData = async (jwt: string, formData: FormData): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent= formData;
    const uploadResponse = await fetch(`http://192.168.1.29:3002/api/book`, {
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
