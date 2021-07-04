import React from 'react';
import {DetailsScreen} from '../Pages/Details';
import {ExploreScreen} from '../Pages/Explore';
import {LoginScreen} from '../Pages/Login';
import {RegisterScreen} from '../Pages/Register';
import {RecoverPasswordScreen} from '../Pages/RecoverPassword';
import {MapsScreen} from '../Pages/Maps';
import {FavoriteScreen} from '../Pages/Favorite';
import {AddScreen} from '../Pages/Add';
import {NotificationScreen} from '../Pages/Notification';
import {ProfileScreen} from '../Pages/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigationTabs} from './BottomNavigation';
import {useUsers} from '../Contexts';
import {Text} from 'react-native-elements';

export const NavigatorHandle = () => {
  const {Token}: any = useUsers();

  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <>
      <Navigator
        tabBar={(props) =>
          Token ? (
            <BottomNavigationTabs {...props} />
          ) : (
            <Text />
          )
        }>
        <Screen name="Login" component={LoginScreen} />
        <Screen
          name="Register"
          component={RegisterScreen}
        />
        <Screen
          name="RecoverPassword"
          component={RecoverPasswordScreen}
        />
        <Screen name="Explore" component={ExploreScreen} />
        <Screen
          name="Favorite"
          component={FavoriteScreen}
        />
        <Screen name="Add" component={AddScreen} />
        <Screen
          name="Notification"
          component={NotificationScreen}
        />
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="Details" component={DetailsScreen} />
        <Screen name="Maps" component={MapsScreen} />
      </Navigator>
    </>
  );
};
