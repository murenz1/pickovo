import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

/**
 * A web-friendly map placeholder component that doesn't import any native modules
 * This file will be automatically used on web platform based on the .web.js extension
 */
const MapView = ({ repairShops, onMarkerPress }) => {
  return (
    <View style={styles.mapPlaceholder}>
      <Image 
        source={require('../assets/images/launch-screen.jpg')} 
        style={styles.mapBackgroundImage}
        resizeMode="cover"
      />
      
      {/* Map Title */}
      <View style={styles.mapTitleContainer}>
        <Text style={styles.mapTitle}>Web Map View</Text>
        <Text style={styles.mapSubtitle}>Showing repair shops in your area</Text>
      </View>
      
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
          <View style={styles.markerTooltip}>
            <Text style={styles.markerName}>{shop.name}</Text>
            <Text style={styles.markerRating}>★ {shop.rating}</Text>
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
  mapTitleContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 5,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  mapSubtitle: {
    fontSize: 14,
    color: COLORS.text,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  markerIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerTooltip: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerName: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  markerRating: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.primary,
  },
});

export default MapView;
