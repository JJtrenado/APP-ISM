import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
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