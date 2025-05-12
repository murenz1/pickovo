import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNMaps from 'react-native-maps';
const { Marker, Callout } = RNMaps;
import { COLORS } from '../styles/theme';

/**
 * A native map component that uses react-native-maps
 * This file will be automatically used on native platforms based on the .native.js extension
 */
const MapViewComponent = ({ repairShops, onMarkerPress }) => {
  return (
    <RNMaps
      style={styles.map}
      initialRegion={{
        latitude: 40.7128,
        longitude: -74.0060,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {repairShops.map((shop) => (
        <Marker
          key={shop.id}
          coordinate={shop.coordinate}
          onPress={() => onMarkerPress(shop)}
          tracksViewChanges={false}
        >
          <View style={styles.markerContainer}>
            <View style={styles.markerIconContainer}>
              <Ionicons name="build-outline" size={14} color="#fff" />
            </View>
          </View>
          <Callout tooltip onPress={() => onMarkerPress(shop)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>{shop.name}</Text>
              <View style={styles.calloutDetails}>
                <Text style={styles.calloutRating}>★ {shop.rating}</Text>
                <Text style={styles.calloutType}>{shop.type}</Text>
              </View>
              <Text style={styles.calloutDistance}>{shop.distance}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </RNMaps>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIconContainer: {
    backgroundColor: '#FF6B3F',
    borderRadius: 25,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  fallbackContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    padding: 20,
  },
  calloutContainer: {
    width: 160,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.primary,
  },
  calloutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  calloutRating: {
    marginRight: 10,
    fontSize: 12,
    color: '#FFB800',
    fontWeight: 'bold',
  },
  calloutType: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  calloutDistance: {
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default MapViewComponent;
