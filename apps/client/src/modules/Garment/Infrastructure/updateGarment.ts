// @ts-ignore
import { BACKEND_URL } from '@env';

export const updateGarmentAvailabilityByBarCode = async (
  jwt: string,
  barCode: string,
  available: boolean
): Promise<boolean> => {
  available = !available;
  try {
    const response = await fetch(
      `${BACKEND_URL}/garments/byBarcode/${barCode}/available`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ available }),
      }
    );

    if (response.ok) return true;
    return false;
  } catch (error) {
    console.error('Error updating garment availability:', error);
    return false;
  }
};
