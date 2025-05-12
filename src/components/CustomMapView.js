import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

/**
 * A simple map component that works in all environments (web, iOS, Android)
 * This avoids using react-native-maps altogether to prevent web bundling issues
 */
const CustomMapView = ({ repairShops, onMarkerPress }) => {
  return (
    <View style={styles.container}>
      {/* Map background image */}
      <Image 
        source={require('../assets/images/launch-screen.jpg')} 
        style={styles.mapImage}
        resizeMode="cover"
      />
      
      {/* Map markers */}
      {repairShops.map((shop) => (
        <TouchableOpacity
          key={shop.id}
          style={[
            styles.marker,
            {
              // Position markers at random locations for demo purposes
              left: `${Math.floor(Math.random() * 70) + 15}%`,
              top: `${Math.floor(Math.random() * 70) + 15}%`,
            }
          ]}
          onPress={() => onMarkerPress(shop)}
        >
          <View style={styles.markerIcon}>
            <Ionicons name="build-outline" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.85,
  },
  marker: {
    position: 'absolute',
    zIndex: 10,
  },
  markerIcon: {
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
});

export default CustomMapView;
