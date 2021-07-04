import React from 'react';
import {Icon} from '@ui-kitten/components';

const HomeIcon = (props: any) => (
  <Icon {...props} name="home" fill="#4ECCA3" />
);
const FavoriteIcon = (props: any) => (
  <Icon {...props} name="heart" fill="#4ECCA3" />
);
const AddIcon = (props: any) => (
  <Icon {...props} name="plus-circle" fill="#4ECCA3" />
);
const BellIcon = (props: any) => (
  <Icon {...props} name="bell" fill="#4ECCA3" />
);
const ProfileIcon = (props: any) => (
  <Icon {...props} name="person" fill="#4ECCA3" /> //fill="#4ECCA3"
);

export {
  HomeIcon,
  FavoriteIcon,
  AddIcon,
  BellIcon,
  ProfileIcon,
};
