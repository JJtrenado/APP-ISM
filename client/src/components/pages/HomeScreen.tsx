import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import Header from "../molecules/Header";
import OptionsButtons from "../molecules/OptionsButtons";
import UsersView from "../molecules/UsersView";
import GarmentView from "../molecules/GarmentView";


const HomeScreen = () => {
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
      <OptionsButtons />
      <UsersView jwt={user.jwt}/>
      <GarmentView jwt={user.jwt}/>
    </>
  );
}

export default HomeScreen;