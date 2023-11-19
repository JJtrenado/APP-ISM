import { Garment } from '../Domain/garment';

export const getGarmentByUser = async ( jwt: string, userId: string ) :Promise<Garment[]> => {
  try {
    const response = await fetch(
      `http://192.168.1.29:3002/api/garments/byUser/${userId}`,
      {
      headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching garments:', error);
  }
};

export const getGarmentsByType = ( garments: Garment[], type:string ) :Garment[] => {
  return garments.filter(garments => garments.type === type);
};
