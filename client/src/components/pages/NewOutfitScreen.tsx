import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledText from "../atoms/StyledText";
import Header from "../molecules/Header";
import NewOutfitForm from "../molecules/NewOutfitForm";


const NewOutfitScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

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
      <ScrollView>
        <StyledText align="center" fontWeight="bold" style={{ marginTop: 20 }}>Nuevo Outfit</StyledText>
        <NewOutfitForm jwt={user.jwt.jwt} userId={user.email} />
      </ScrollView>
    </>
  );
}

export default NewOutfitScreen;