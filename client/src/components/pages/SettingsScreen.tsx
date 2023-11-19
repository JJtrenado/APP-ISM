import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import Header from "../molecules/Header";
import Profile from "../molecules/ProfileMenu";

const SettingsScreen = () => {
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
    
  return (
    <View>
      <Header picture={user.picture}/>
      <Profile user={user}/>
    </View>
  );
}

export default SettingsScreen;