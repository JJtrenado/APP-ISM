export const updateGarmentAvailabilityByBarCode = async (
  jwt: string,
  barCode: string,
  available: boolean
): Promise<boolean> => {
  available = !available;
  try {
    const response = await fetch(
      `http://192.168.1.29:3002/api/garments/byBarcode/${barCode}/available`,
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
