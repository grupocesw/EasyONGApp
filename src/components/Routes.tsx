import React from 'react';
import {DetailsScreen} from '../Pages/Details';
import {ExploreScreen} from '../Pages/Explore';
import {FavoriteScreen} from '../Pages/Favorite';
import {NotificationScreen} from '../Pages/Notification';
import {ProfileScreen} from '../Pages/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigationTabs} from './BottomNavigation';

export const NavigatorHandle = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <>
      <Navigator tabBar={(props) => <BottomNavigationTabs {...props} />}>
        <Screen name="Explore" component={ExploreScreen} />
        <Screen name="Favorite" component={FavoriteScreen} />
        <Screen name="Notification" component={NotificationScreen} />
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="Details" component={DetailsScreen} />
      </Navigator>
    </>
  );
};
