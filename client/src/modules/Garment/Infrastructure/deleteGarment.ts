export const deleteGarmentByBarCode = async (jwt: string, barCode: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://192.168.1.29:3002/api/garments/${barCode}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    
    if (response.ok) return true;
    return false;

  } catch (error) {
    console.error('Error deleting garment:', error);
    return false;
  }
};
