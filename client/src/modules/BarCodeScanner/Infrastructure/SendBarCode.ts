// @ts-ignore
import { BACKEND_URL }from '@env';
import axios from "axios";

export async function SendBarCode(jwt: string, barCode: string): Promise<string> {
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(`${BACKEND_URL}/users/profile`, barCode, { headers });
    return response.data;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}