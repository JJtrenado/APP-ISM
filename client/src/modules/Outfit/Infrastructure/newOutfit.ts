// @ts-ignore
import { BACKEND_URL } from '@env';

export const newOutfit = async (jwt: string, bodyContent: string): Promise<boolean> => {

  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json"
    };

    const uploadResponse = await fetch(`${BACKEND_URL}/outfits`, {
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
