// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ImageSourcePropType } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import PickerInput from '../atoms/listPickerInput';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getGarmentByUser, getGarmentsByType } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { newOutfit } from '../../modules/Outfit/Infrastructure/newOutfit';

const { width } = Dimensions.get('window');



const NewOutfitForm = ({ jwt, userId }) => {
  const [user, setUser] = useState(null);
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      const garments = await getGarmentByUser(jwt, userId);
      setGarmentsData(garments);
    };

    fetchUser();
  }, []);

  // Función para crear el estado y las fotos para un tipo de prenda
  function createGarmentStateAndPhotos(type) {
    const garments = getGarmentsByType(garmentsData, type);
    const photos = garments.map((item) => `${BACKEND_URL}/garments/${item.imagePath}`);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAnterior = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    const handlePosterior = () => {
      if (currentIndex < photos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    return { garments, photos, currentIndex, handleAnterior, handlePosterior };
  }

  // Crear estados y fotos para cada tipo de prenda
  const { garments: cabeza, photos: photosCabeza, currentIndex: currentIndexCabeza, handleAnterior: handleAnteriorCabeza, handlePosterior: handlePosteriorCabeza } = createGarmentStateAndPhotos('Cabeza');
  const { garments: torso, photos: photosTorso, currentIndex: currentIndexTorso, handleAnterior: handleAnteriorTorso, handlePosterior: handlePosteriorTorso } = createGarmentStateAndPhotos('Torso');
  const { garments: piernas, photos: photosPiernas, currentIndex: currentIndexPiernas, handleAnterior: handleAnteriorPiernas, handlePosterior: handlePosteriorPiernas } = createGarmentStateAndPhotos('Piernas');
  const { garments: pies, photos: photosPies, currentIndex: currentIndexPies, handleAnterior: handleAnteriorPies, handlePosterior: handlePosteriorPies } = createGarmentStateAndPhotos('Pies');

  // Función para manejar el envío de datos
  const handleSubmit = (cabezaIndex, torsoIndex, piernasIndex, piesIndex) => {
    let bodyContent = JSON.stringify({
    "cabezaBarCode": cabeza[cabezaIndex].barCode,
    "torsoBarCode": torso[torsoIndex].barCode,
    "piernasBarCode": piernas[piernasIndex].barCode,
    "piesBarCode": pies[piesIndex].barCode,
    "user": user.email,
    "avaliable": "true",
    });
    newOutfit(user.jwt.jwt, bodyContent);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Cabeza</Text>
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorCabeza}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosCabeza[currentIndexCabeza]}` }} />
        <StyledButton onPress={handlePosteriorCabeza}>Posterior</StyledButton>
      </View>

      <Text>Torso</Text>
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorTorso}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosTorso[currentIndexTorso]}` }} />
        <StyledButton onPress={handlePosteriorTorso}>Posterior</StyledButton>
      </View>

      <Text>Piernas</Text>
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorPiernas}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosPiernas[currentIndexPiernas]}` }} />
        <StyledButton onPress={handlePosteriorPiernas}>Posterior</StyledButton>
      </View>

      <Text>Pies</Text>
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorPies}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosPies[currentIndexPies]}` }} />
        <StyledButton onPress={handlePosteriorPies}>Posterior</StyledButton>
      </View>

      <StyledButton onPress={() => handleSubmit(currentIndexCabeza, currentIndexTorso, currentIndexPiernas, currentIndexPies)}>Crear Outfit</StyledButton>
    </View>
  );
};

export default NewOutfitForm;



