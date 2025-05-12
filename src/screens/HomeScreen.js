import React, { useContext, useState } from 'react';
import { AuthContext } from '../../App';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Dimensions, StatusBar, Platform, Image } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/theme';
import Button from '../components/Button';

// Import our custom MapView component that works everywhere including web
import CustomMapView from '../components/CustomMapView';

// Sample data for repair shops
const repairShops = [
  { id: 1, coordinate: { latitude: 40.7128, longitude: -74.0060 }, name: 'Yvoon Car Repair', rating: 5.0, type: 'Repair Shop', distance: '2.8 km' },
  { id: 2, coordinate: { latitude: 40.7328, longitude: -73.9860 }, name: 'Quick Fix Auto', rating: 4.7, type: 'Repair Shop', distance: '3.2 km' },
  { id: 3, coordinate: { latitude: 40.7028, longitude: -73.9860 }, name: 'Pro Mechanics', rating: 4.5, type: 'Repair Shop', distance: '1.5 km' },
  { id: 4, coordinate: { latitude: 40.7228, longitude: -74.0160 }, name: 'City Garage', rating: 4.8, type: 'Repair Shop', distance: '4.1 km' },
  { id: 5, coordinate: { latitude: 40.7328, longitude: -74.0260 }, name: 'AutoFix Center', rating: 4.6, type: 'Repair Shop', distance: '3.7 km' },
  { id: 6, coordinate: { latitude: 40.6928, longitude: -73.9960 }, name: 'Express Repairs', rating: 4.9, type: 'Repair Shop', distance: '2.3 km' },
  { id: 7, coordinate: { latitude: 40.7428, longitude: -73.9760 }, name: 'Master Mechanics', rating: 4.4, type: 'Repair Shop', distance: '5.2 km' },
];

// Sample data for recently visited shops
const recentlyVisited = [
  { id: 1, name: 'Yvoon Car Repair', image: require('../assets/images/launch-screen.jpg'), rating: 5.0, type: 'Repair Shop', distance: '2.8 km', daysAgo: 2 },
];

const HomeScreen = () => {
  // Get the signOut function from AuthContext
  const { signOut } = useContext(AuthContext);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopDetails, setShowShopDetails] = useState(false);
  
  // Handler for when a shop is selected from the map
  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setShowShopDetails(true);
  };
  
  // Render map using our custom MapView component
  const renderMap = () => {
    return (
      <CustomMapView
        repairShops={repairShops}
        onMarkerPress={handleShopSelect}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Map View */}
      {renderMap()}
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor={COLORS.textSecondary}
          />
          <View style={styles.profilePic}>
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.profileImage} 
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      
      {/* User location indicator (orange arrow) */}
      <View style={styles.userLocationContainer}>
        <View style={styles.userLocationArrow} />
      </View>
      
      {/* Shop Details Panel - shows when a shop is selected */}
      {showShopDetails && selectedShop && (
        <View style={styles.shopDetailsPanel}>
          <View style={styles.shopDetailsPanelHeader}>
            <Text style={styles.shopDetailsPanelTitle}>{selectedShop.name}</Text>
            <TouchableOpacity onPress={() => setShowShopDetails(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.shopDetailsContent}>
            <View style={styles.shopDetailsRow}>
              <View style={styles.shopRatingContainer}>
                <Text style={styles.shopRatingText}>{selectedShop.rating}</Text>
                <Ionicons name="star" size={16} color="#FFB800" />
              </View>
              <Text style={styles.shopTypeText}>{selectedShop.type}</Text>
              <Text style={styles.shopDistanceText}>{selectedShop.distance}</Text>
            </View>
            
            <View style={styles.shopDetailsButtonContainer}>
              <TouchableOpacity style={styles.shopDetailsButton}>
                <Ionicons name="call" size={18} color={COLORS.background} />
                <Text style={styles.shopDetailsButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shopDetailsButton}>
                <Ionicons name="navigate" size={18} color={COLORS.background} />
                <Text style={styles.shopDetailsButtonText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shopDetailsButton}>
                <Ionicons name="calendar" size={18} color={COLORS.background} />
                <Text style={styles.shopDetailsButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      {/* Bottom Sheet */}
      <View style={[styles.bottomSheet, showShopDetails && {display: 'none'}]}>
        <View style={styles.bottomSheetHeader}>
          {/* Orange indicator line */}
          <View style={styles.orangeIndicator} />
        </View>
        
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Recently Visit</Text>
          
          {/* Shop info card */}
          <View style={styles.recentItem}>
            {/* User info section */}
            <View style={styles.userInfoContainer}>
              <View style={styles.userInfo}>
                <Image 
                  source={require('../assets/images/launch-screen.jpg')} 
                  style={styles.userAvatar} 
                />
                <View>
                  <Text style={styles.userName}>Yvona Benjamin</Text>
                  <View style={styles.userReviews}>
                    <MaterialIcons name="location-city" size={12} color="#4A89F3" />
                    <Text style={styles.reviewText}>24 reviews in NY</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.daysAgo}>2 days ago</Text>
            </View>
            
            {/* Shop image */}
            <View style={styles.shopImageContainer}>
              <Image 
                source={require('../assets/images/launch-screen.jpg')} 
                style={styles.shopImage} 
                resizeMode="cover"
              />
            </View>
            
            {/* Shop info */}
            <View style={styles.shopInfoCard}>
              <Text style={styles.shopName}>Yvoon Car Repair</Text>
              <View style={styles.shopDetails}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>5.0</Text>
                  <Ionicons name="star" size={12} color="#FFD700" />
                </View>
                <Text style={styles.shopType}> • Repair Shop</Text>
                <Text style={styles.shopDistance}> • 2.8 km</Text>
              </View>
            </View>
            
            {/* Action buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="thumbs-up-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Logout button - hidden but keeping the functionality */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => signOut()}
      >
        <Ionicons name="log-out-outline" size={24} color={COLORS.background} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userLocationContainer: {
    position: 'absolute',
    bottom: '30%',
    right: '45%',
    zIndex: 2,
  },
  userLocationArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6B3F',
    transform: [{ rotate: '180deg' }],
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  orangeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#FF6B3F',
    borderRadius: 2,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  userReviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  daysAgo: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  recentItem: {
    marginBottom: 20,
  },
  shopImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  shopInfoCard: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shopName: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    marginBottom: 5,
  },
  shopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    marginRight: 2,
  },
  shopType: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  shopDistance: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  actionButton: {
    padding: 5,
  },
  shopDetailsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  shopDetailsPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  shopDetailsPanelTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shopDetailsContent: {
    marginBottom: 15,
  },
  shopDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  shopRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 10,
  },
  shopRatingText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFB800',
    marginRight: 3,
  },
  shopTypeText: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  shopDistanceText: {
    fontSize: SIZES.medium,
    color: '#FF6B3F',
  },
  shopDetailsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shopDetailsButton: {
    flex: 1,
    backgroundColor: '#FF6B3F',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopDetailsButtonText: {
    color: COLORS.background,
    marginLeft: 5,
    fontWeight: '600',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6B3F',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.2,
  },
});

export default HomeScreen;
