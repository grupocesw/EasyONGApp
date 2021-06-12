import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import {
  HomeIcon,
  FavoriteIcon,
  AddIcon,
  BellIcon,
  ProfileIcon,
} from './Icons';
export const BottomNavigationTabs = ({navigation}: any) => {
  const [indice, setIndice] = useState(1);
  const [routeNames] = useState([
    {name: 'Home'},
    {name: 'Explore'},
    {name: 'Favorite'},
    {name: 'Notification'},
    {name: 'Add'},
    {name: 'Profile'},
  ]);
  return (
    <BottomNavigation
      appearance="noIndicator"
      style={styles.bottomNavigation}
      selectedIndex={indice - 1}
      onSelect={(i) => {
        setIndice(i + 1);
        navigation.navigate(routeNames[i + 1].name, {
          itemId: indice,
        });
      }}>
      <BottomNavigationTab
        title="Explore"
        icon={HomeIcon}
      />
      <BottomNavigationTab
        title="Favoritos"
        icon={FavoriteIcon}
      />
      <BottomNavigationTab title="" icon={AddIcon} />
      <BottomNavigationTab
        title="Notificações"
        icon={BellIcon}
      />
      <BottomNavigationTab
        title="Perfil"
        icon={ProfileIcon}
      />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#fff',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowColor: '#000',
    elevation: 4,
  },
});
