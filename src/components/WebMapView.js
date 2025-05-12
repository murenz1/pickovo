import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

/**
 * A web-friendly map placeholder component that doesn't import any native modules
 * This component is used as a fallback when running on web platform
 */
const WebMapView = ({ repairShops, onMarkerPress }) => {
  return (
    <View style={styles.mapPlaceholder}>
      <Image 
        source={require('../assets/images/launch-screen.jpg')} 
        style={styles.mapBackgroundImage}
        resizeMode="cover"
      />
      
      {/* Map Markers */}
      {repairShops.map((shop) => (
        <TouchableOpacity
          key={shop.id}
          style={[styles.markerContainer, {
            position: 'absolute',
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
          }]}
          onPress={() => onMarkerPress(shop)}
        >
          <View style={styles.markerIconContainer}>
            <Ionicons name="build-outline" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPlaceholder: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
    overflow: 'hidden',
  },
  mapBackgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  markerIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default WebMapView;
