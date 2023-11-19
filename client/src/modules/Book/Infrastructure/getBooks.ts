import { Book } from '../Domain/book';

export const getAllBooks = async ( jwt: string ) :Promise<Book[]> => {
  try {
    const response = await fetch(
      `http://192.168.1.29:3000/api/book`,
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

// export const getGarmentsByType = ( garments: Book[], type:string ) :Book[] => {
//   return garments.filter(garments => garments.type === type);
// };
