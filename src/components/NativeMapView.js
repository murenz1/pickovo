import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

// Dynamically import MapView to avoid require cycles
let MapView;
let Marker;

try {
  const ReactNativeMaps = require('react-native-maps');
  MapView = ReactNativeMaps.default;
  Marker = ReactNativeMaps.Marker;
} catch (error) {
  console.log('Error loading react-native-maps:', error);
}

/**
 * A native map component that uses react-native-maps
 * This component is only used on iOS and Android platforms
 */
const NativeMapView = ({ repairShops, onMarkerPress }) => {
  // If MapView isn't available, render a fallback
  if (!MapView) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Map is not available</Text>
      </View>
    );
  }

  // If MapView is available, render the map
  try {
    return (
      <MapView
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
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerIconContainer}>
                <Ionicons name="build-outline" size={16} color="#fff" />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    );
  } catch (error) {
    console.log('Error rendering MapView:', error);
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Error loading map</Text>
      </View>
    );
  }
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
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
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
});

export default NativeMapView;
