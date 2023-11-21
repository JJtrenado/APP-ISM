import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, StyleSheet, View } from "react-native";
import { Book } from "../../modules/Book/Domain/book";
import { deleteBook } from "../../modules/Book/Infrastructure/deleteBook";
import { getBookByBarcode } from "../../modules/Book/Infrastructure/getBooks";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from "../atoms/StyledButton";
import StyledText from "../atoms/StyledText";
import MyBarCodeScanner from "../molecules/BarCodeScanner";
import Header from "../molecules/Header";


const ScannScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [barCode, setBarCode] = useState(null);
  const [book, setBook] = useState<Book>(null);
  const [isModalVisible, setIsModalVisible] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleScanSuccess = async (data) => {
    try{
      setBarCode(data);
      const book = await getBookByBarcode(user.jwt.jwt, data)
      if (book) setBook(book);
      else navigation.navigate('Home' as never); 
    }catch(error){
      console.error(book);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header picture={user.picture}/>

    {barCode == null ? (
      <>
        <StyledText align='center' fontWeight='bold' style={{marginTop: 20}}>Escanea el código del libro</StyledText>
      <MyBarCodeScanner onScanSuccess={handleScanSuccess} />
      </>
    ) : (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
        {book && (
            <View>
              <Image
              source={{ uri: `http://192.168.1.29:3000/${book.image}` }}
              style={styles.detailImage}
              />
              <StyledText>Código: {book.barCode}</StyledText>
              <StyledText>Autor: {book.author}</StyledText>
              <StyledText>Stock: {book.stock}</StyledText>
              <StyledText>Género: {book.genre}</StyledText>
              <View style={styles.buttonsContainer}>
              <StyledButton color='red' onPress={async () => {
                await deleteBook(user.jwt.jwt, book.id);
                setIsModalVisible(false);
                navigation.navigate('Home' as never);
              }}>
                Eliminar Todos
              </StyledButton>
              <StyledButton color='blue' onPress={async () => {
                setIsModalVisible(false);
                navigation.navigate('Home' as never);
              }}>
                Eliminar Uno
              </StyledButton>
              <StyledButton onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('Home' as never);
              }} >Cerrar</StyledButton>
              </View>
           </View>
        )}
        </View>
      </Modal>

    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10, 
  },
  itemImage: {
    margin: 2,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 5,
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
});

export default ScannScreen;
