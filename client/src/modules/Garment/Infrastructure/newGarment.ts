// @ts-ignore
import { BACKEND_URL }from '@env';

export const uploadData = async (jwt: string, formData: FormData): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent= formData;
    const uploadResponse = await fetch(`${BACKEND_URL}/book`, {
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
