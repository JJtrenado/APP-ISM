import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../../modules/Book/Domain/book';
import { deleteBook, deleteOneBook } from '../../modules/Book/Infrastructure/deleteBook';
import { getAllBooks } from '../../modules/Book/Infrastructure/getBooks';
import StyledButton from '../atoms/StyledButton';
import StyledText from '../atoms/StyledText';


const BookGrid = ({ jwt }) => {
  const [booksData, setbooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setselectedBook] = useState<Book>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const loadbooks = async () => {
    try {
      const books = await getAllBooks(jwt);
      setbooksData(books);
      setTimeout(() => setLoading(false));
      
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadbooks();
    }, [])
  );
  
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth / 3;

  return (
    <View>
      <FlatList
        data={booksData}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setselectedBook(item);
            setIsModalVisible(true);
          }}>
            <Image
              source={{ uri: `http://192.168.1.29:3000/${item.image}` }}
              style={[styles.itemImage, { width: imageWidth }]}

            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.barCode}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
          {selectedBook && (
            <View>
              <Image
              source={{ uri: `http://192.168.1.29:3000/${selectedBook.image}` }}
              style={styles.detailImage}
              />
              <StyledText>Código: {selectedBook.barCode}</StyledText>
              <StyledText>Autor: {selectedBook.author}</StyledText>
              <StyledText>Stock: {selectedBook.stock}</StyledText>
              <StyledText>Género: {selectedBook.genre}</StyledText>
              <View style={styles.buttonsContainer}>
              <StyledButton color='red' onPress={async () => {
                await deleteBook(jwt, selectedBook.id);
                setIsModalVisible(false);
                loadbooks();
              }}>
                Eliminar Todos
              </StyledButton>
              <StyledButton color='blue' onPress={async () => {
                setIsModalVisible(false);
                deleteOneBook(jwt, selectedBook.barCode);
                console.log(selectedBook.barCode);
                loadbooks();
              }}>
                Eliminar Uno
              </StyledButton>
              <StyledButton onPress={() => {
                setIsModalVisible(false)
              }} >Cerrar</StyledButton>
              </View>
           </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: 5,
  },
  modalContainer: {
    marginTop: '30%',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  androidShadow: {
    elevation: 5,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  detailImage: { 
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 5,
  },
  title: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

export default BookGrid;

