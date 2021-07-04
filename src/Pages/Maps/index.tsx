import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {
  TopNavigation,
  Divider,
  Text,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

export const MapsScreen = ({navigation}: any) => {
  const initialRegion = {
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const backAction = () => (
    <Icon
      style={styles.submitButtonIcon}
      name="arrow-left"
      size={16}
      color="white"
      onPress={navigateBack}
    />
  );

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Mapa
            </Text>
          )}
          accessoryLeft={backAction}
        />
        <Divider />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  titleTopNavigation: {
    fontSize: 18,
    fontWeight: '700',
  },
  submitButtonIcon: {
    marginLeft: 16,
    color: '#000',
  },
  //
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    textDecorationLine: 'underline',
    fontSize: 14,
  },

  calloutSmallText: {
    color: '#005555',
    fontSize: 10,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    width: 200,
    color: '#8fa7b3',
  },

  searchUserButton: {
    width: 56,
    height: 56,
    backgroundColor: '#0089a5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
