import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Modal, Platform, ScrollView, StyleSheet, View } from "react-native";
import { addOneStock, existBook, uploadImageBook } from "../../modules/Book/Infrastructure/newBook";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from "../atoms/StyledButton";
import StyledText from "../atoms/StyledText";
import MyBarCodeScanner from "../molecules/BarCodeScanner";
import CameraComponent from "../molecules/CameraComponent";
import Header from "../molecules/Header";
import NewBookForm from "../molecules/NewBookForm";


const NewBookScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [barCode, setBarCode] = useState(null);
  const [formDataPhotoUri, setFormDataPhotoUri] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };
    
    fetchUser();
  }, []);

  const handleAddStock = () =>{
    addOneStock(user.jwt.jwt, barCode);
  }

  const handleScanSuccess = async (data) => {
    setBarCode(data);
    const existpreviousBook = await existBook(user.jwt.jwt, data);
    if(existpreviousBook) setIsModalVisible(true);
  };

  const handlePhotoTaken = async (formDataPhotoUri) => {
    setFormDataPhotoUri(formDataPhotoUri);
    await uploadImageBook(user.jwt.jwt, formDataPhotoUri);
    await uploadImageBook(user.jwt.jwt, formDataPhotoUri);
  };

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

  return (
    <>
      <Header picture={user.picture} />
      {barCode == null ? (
        <>
          <StyledText align='center' fontSize="title" fontWeight='bold' style={{marginTop: 20, paddingBottom:30}}>Escanea el código del libro</StyledText>
          <MyBarCodeScanner onScanSuccess={handleScanSuccess} />
        </>
      ) : isModalVisible ? (
        <>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
              <StyledText>¿Quiere añadir un stock de este libro?</StyledText>
              <View style={styles.buttonsContainer}>
                <StyledButton color='red' onPress={async () => {
                  navigation.navigate('Home' as never);
                  setIsModalVisible(false);
                }}> Cancelar </StyledButton>
                <StyledButton onPress={() => {
                  handleAddStock();
                  navigation.navigate('Home' as never);
                  setIsModalVisible(false);
                }} >Añadir un stock</StyledButton>
              </View>
            </View>
          </Modal>
        </>
      ) : formDataPhotoUri == null ? (
        <>
          <StyledText align='center' fontSize="title" fontWeight='bold' style={{marginTop: 20, paddingBottom:30}}>Haz una foto al libro</StyledText>
          <CameraComponent onImgSuccess={handlePhotoTaken} barCode={barCode} />
          {/* <ImagePickerExample onPickerSuccess={handlePhotoTaken}/> */}
        </>
      ) : (
        <ScrollView>
          <StyledText align="center" fontSize="title" fontWeight="bold" style={{marginTop: 20, paddingBottom:30}}>Nuevo Libro</StyledText>
          <NewBookForm barCode={barCode}/>
        </ScrollView>
      )}
    </>
  );
}

export default NewBookScreen;

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
});

