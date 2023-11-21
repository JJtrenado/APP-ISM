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
    console.error('Error fetching books:', error);
  }
};

export const getBookByBarcode = async ( jwt: string,  barCode: string,): Promise<Book> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const uploadResponse = await fetch(`http://192.168.1.29:3000/api/book/${barCode}`, {
      method: "GET",
      headers: headers,
    });

    console.log(uploadResponse);

    if (uploadResponse.ok) return uploadResponse.json();
    console.error("Error:", uploadResponse.statusText);
    return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
