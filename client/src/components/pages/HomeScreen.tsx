import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledText from "../atoms/StyledText";
import Header from "../molecules/Header";
import OptionsButtons from "../molecules/OptionsButtons";

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availability, setAvailability] = useState(true);

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);

      const loadImages = () => {
        const imageArray = [
          require('../../../assets/dashboard1.png'),
          require('../../../assets/dashboard2.png'),
        ];
        setPhotos(imageArray);
      };
  
      loadImages();
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Cambiar la imagen automáticamente cada 5 segundos
    const interval = setInterval(() => {
      if (availability && currentIndex < photos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000); // Cambiar cada 5 segundos (ajusta según tus necesidades)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [currentIndex, availability, photos]);

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
      <OptionsButtons />
      <View style={styles.titleContainer}>
      <StyledText align="center" fontWeight="bold" fontSize='title'>Estadísticas</StyledText>
      <Image style={styles.grafanaLogo} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Grafana_icon.svg/985px-Grafana_icon.svg.png',}} />
      </View>
      <View style={styles.container}>
        <Image style={styles.image} source={photos[currentIndex]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, alignItems: 'center' },
  titleContainer: { paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  image: { width: '85%', height: '95%', borderRadius: 5 },
  grafanaLogo: { marginLeft: 5, width: 20, height: 20}
});

export default HomeScreen;
