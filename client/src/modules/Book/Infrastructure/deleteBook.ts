export const deleteBook = async (jwt: string, id: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://192.168.1.29:3000/api/book/${id}`,
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
