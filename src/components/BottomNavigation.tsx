import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
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
    {name: 'Add'},
    {name: 'Notification'},
    {name: 'Profile'},
  ]);

  return (
    <BottomNavigation
      indicatorStyle={styles.indicatorStyle}
      style={styles.bottomNavigation}
      selectedIndex={indice - 1}
      onSelect={(i) => {
        setIndice(i + 1);
        navigation.navigate(routeNames[i + 1].name, {
          itemId: indice,
        });
      }}>
      <BottomNavigationTab
        // title="Explorar"
        title={(evaProps) => (
          <Text {...evaProps} style={styles.tab}>
            Explorar
          </Text>
        )}
        icon={HomeIcon}
      />
      <BottomNavigationTab
        // title="Favoritos"
        title={(evaProps) => (
          <Text {...evaProps} style={styles.tab}>
            Favoritos
          </Text>
        )}
        icon={FavoriteIcon}
      />
      <BottomNavigationTab
        // title="Indicar"
        title={(evaProps) => (
          <Text {...evaProps} style={styles.tab}>
            Indicar
          </Text>
        )}
        icon={AddIcon}
      />
      <BottomNavigationTab
        // title="Notificações"
        title={(evaProps) => (
          <Text {...evaProps} style={styles.tab}>
            Notificações
          </Text>
        )}
        icon={BellIcon}
      />
      <BottomNavigationTab
        // title="Perfil"
        title={(evaProps) => (
          <Text {...evaProps} style={styles.tab}>
            Perfil
          </Text>
        )}
        icon={ProfileIcon}
      />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  tab: {
    color: '#4ECCA3',
    fontSize: 12,
    fontWeight: '700',
  },
  indicatorStyle: {
    backgroundColor: '#4ECCA3',
  },
  bottomNavigation: {
    backgroundColor: '#fafafa',
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
