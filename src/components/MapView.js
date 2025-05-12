// This file serves as a cross-platform entry point
// It will automatically resolve to either:
// - MapView.web.js on web
// - MapView.native.js on iOS/Android
// based on the platform extensions in metro.config.js

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../styles/theme';

// This component should never be used directly as the platform-specific
// versions will be automatically selected. This is just a fallback.
const MapView = ({ repairShops, onMarkerPress }) => {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        Map could not be loaded.
        Please check that you're using the correct platform-specific version.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
    padding: 20,
  },
});

export default MapView;
