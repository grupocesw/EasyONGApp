import React from 'react';
import {Icon} from '@ui-kitten/components';

const HomeIcon = (props: any) => (
  <Icon {...props} name="home" />
);
const FavoriteIcon = (props: any) => (
  <Icon {...props} name="heart" />
);
const AddIcon = (props: any) => (
  <Icon {...props} name="plus-circle" />
);
const BellIcon = (props: any) => (
  <Icon {...props} name="bell" />
);
const ProfileIcon = (props: any) => (
  <Icon {...props} name="person" />
);

export {
  HomeIcon,
  FavoriteIcon,
  AddIcon,
  BellIcon,
  ProfileIcon,
};
