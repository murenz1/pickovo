import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../styles/theme';
import Button from '../components/Button';

// Sample data for repair shops (these will be shown as markers on the map)
const repairShops = [
  {
    id: 1,
    name: 'Yvoon Car Repair',
    rating: 5.0,
    type: 'Repair Shop',
    distance: '2.8 km',
    image: require('../assets/images/launch-screen.jpg'),
    address: 'Norrsken Kigali House, 1 KN 78 St',
    openTime: 'Open',
    closeTime: 'Closes 22:00',
    reviews: 206
  },
  {
    id: 2,
    name: 'Kigali Auto Garage',
    rating: 4.8,
    type: 'Garage',
    distance: '3.2 km',
    image: require('../assets/images/launch-screen.jpg'),
    address: 'KK 15 Ave, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 20:00',
    reviews: 184
  },
  {
    id: 3,
    name: 'Rwanda Motors',
    rating: 4.5,
    type: 'Service Center',
    distance: '4.0 km',
    image: require('../assets/images/launch-screen.jpg'),
    address: 'KG 7 Ave, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 21:00',
    reviews: 156
  },
  {
    id: 4,
    name: 'AutoFix Rwanda',
    rating: 4.7,
    type: 'Repair Shop',
    distance: '1.5 km',
    image: require('../assets/images/launch-screen.jpg'),
    address: 'KN 5 Rd, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 19:00',
    reviews: 132
  },
  {
    id: 5,
    name: 'Kigali Mechanics',
    rating: 4.2,
    type: 'Garage',
    distance: '5.1 km',
    image: require('../assets/images/launch-screen.jpg'),
    address: 'KK 3 Ave, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 18:00',
    reviews: 98
  }
];

// Sample data for recently visited
const recentlyVisited = [
  {
    id: 1,
    name: 'Yvoon Car Repair',
    rating: 5.0,
    type: 'Repair Shop',
    distance: '2.8 km',
    image: require('../assets/images/launch-screen.jpg'),
    daysAgo: 2,
    address: 'Norrsken Kigali House, 1 KN 78 St',
    openTime: 'Open',
    closeTime: 'Closes 22:00',
    reviews: 206
  },
  {
    id: 2,
    name: 'Kigali Auto Garage',
    rating: 4.8,
    type: 'Garage',
    distance: '3.2 km',
    image: require('../assets/images/launch-screen.jpg'),
    daysAgo: 5,
    address: 'KK 15 Ave, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 20:00',
    reviews: 184
  },
  {
    id: 3,
    name: 'Rwanda Motors',
    rating: 4.5,
    type: 'Service Center',
    distance: '4.0 km',
    image: require('../assets/images/launch-screen.jpg'),
    daysAgo: 7,
    address: 'KG 7 Ave, Kigali',
    openTime: 'Open',
    closeTime: 'Closes 21:00',
    reviews: 156
  }
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  
  // Bottom sheet animation
  const bottomSheetMinHeight = 180;
  const bottomSheetMaxHeight = screenHeight * 0.6;
  
  // Use translateY for all animations since height cannot be animated with native driver
  const bottomSheetTranslateY = useRef(new Animated.Value(0)).current;
  
  // Calculate the current height based on translateY
  const getBottomSheetHeight = () => {
    // This is a derived value, not an animated value
    return isBottomSheetExpanded ? bottomSheetMaxHeight : bottomSheetMinHeight;
  };
  
  // Pan responder for bottom sheet
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (isBottomSheetExpanded) {
          // If expanded, allow dragging down
          if (gestureState.dy > 0) {
            // Convert height change to translateY (positive translateY means moving down)
            const newTranslateY = gestureState.dy / (bottomSheetMaxHeight - bottomSheetMinHeight) * 20;
            if (newTranslateY <= 20) { // 20 is our max translateY value
              bottomSheetTranslateY.setValue(newTranslateY);
            }
          }
        } else {
          // If collapsed, allow dragging up
          if (gestureState.dy < 0) {
            // Convert height change to translateY (negative translateY means moving up)
            const newTranslateY = gestureState.dy / (bottomSheetMinHeight - bottomSheetMaxHeight) * 20;
            if (newTranslateY >= -20) { // -20 is our min translateY value
              bottomSheetTranslateY.setValue(newTranslateY);
            }
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isBottomSheetExpanded) {
          // If dragging down and past threshold, collapse
          if (gestureState.dy > 50) {
            toggleBottomSheet();
          } else {
            // Spring back to expanded state
            Animated.spring(bottomSheetTranslateY, {
              toValue: -20, // Fully expanded position
              useNativeDriver: true,
              friction: 8,
              tension: 40
            }).start();
          }
        } else {
          // If dragging up and past threshold, expand
          if (gestureState.dy < -50) {
            toggleBottomSheet();
          } else {
            // Spring back to collapsed state
            Animated.spring(bottomSheetTranslateY, {
              toValue: 0, // Default collapsed position
              useNativeDriver: true,
              friction: 8,
              tension: 40
            }).start();
          }
        }
      },
    })
  ).current;
  
  // Function to toggle bottom sheet state
  const toggleBottomSheet = () => {
    // Only animate translateY with native driver
    Animated.spring(bottomSheetTranslateY, {
      toValue: isBottomSheetExpanded ? 0 : -20,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
    
    // Update state after animation starts
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
  };
  
  // Navigate to shop details
  const navigateToShopDetails = (shop) => {
    navigation.navigate('ShopDetails', { shop });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Map Section */}
      <View style={[styles.mapContainer, { height: '85%' }]}>
        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <Text style={[styles.searchInput, { color: COLORS.textSecondary }]}>
            Search here
          </Text>
          <TouchableOpacity style={styles.profilePic}>
            <Image 
              source={require('../assets/images/profile-pic.jpg')} 
              style={styles.profileImage}
              defaultSource={require('../assets/images/profile-pic.jpg')}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        
        {/* Google Maps Embed */}
        {Platform.OS === 'web' ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15950.311167906126!2d30.1742849!3d-1.9822917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text>Map will load on mobile devices</Text>
          </View>
        )}
      </View>
      
      {/* Bottom Sheet */}
      <Animated.View 
        style={[
          styles.bottomSheet, 
          { height: getBottomSheetHeight() },
          { transform: [{ translateY: bottomSheetTranslateY }] }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>Bottom sheet</Text>
        </View>
        
        <View style={styles.tabContainer}>
          <Text style={styles.tabTitle}>Recently Visit</Text>
          <View style={styles.tabIndicator} />
        </View>
        
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Image 
              source={require('../assets/images/profile-pic.jpg')} 
              style={styles.userAvatar}
              defaultSource={require('../assets/images/profile-pic.jpg')}
            />
            <View>
              <Text style={styles.userName}>Yvoon Benjamin</Text>
              <View style={styles.userReviews}>
                <View style={styles.reviewBadge}>
                  <Ionicons name="star" size={12} color="#FFFFFF" />
                </View>
                <Text style={styles.reviewText}>24 reviews in NY</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Recently Visited Shop */}
        <View style={styles.recentVisitContainer}>
          {/* Shop Image */}
          <TouchableOpacity 
            style={styles.shopImageLargeContainer}
            onPress={() => navigateToShopDetails(recentlyVisited[0])}
            activeOpacity={0.9}
          >
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.shopImageLarge}
              resizeMode="cover"
            />
          </TouchableOpacity>
          
          <View style={styles.visitInfoRow}>
            <Text style={styles.daysAgoText}>{recentlyVisited[0].daysAgo} days ago</Text>
            
            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.likeButton}>
                <Ionicons name="thumbs-up-outline" size={24} color="#000" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Shop Info Card */}
          <TouchableOpacity 
            style={styles.shopInfoCardLarge}
            onPress={() => navigateToShopDetails(recentlyVisited[0])}
            activeOpacity={0.7}
          >
            <View style={styles.shopInfoContent}>
              <Text style={styles.shopNameLarge}>{recentlyVisited[0].name}</Text>
              <View style={styles.shopDetailsRow}>
                <Text style={styles.ratingTextLarge}>{recentlyVisited[0].rating.toFixed(1)}</Text>
                <Ionicons name="star" size={14} color="#FFB800" style={styles.starIcon} />
                <Text style={styles.shopTypeLarge}> • {recentlyVisited[0].type}</Text>
                <Text style={styles.shopDistanceLarge}> • {recentlyVisited[0].distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    width: '100%',
    position: 'relative',
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: COLORS.background,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 15,
    overflow: 'hidden',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  bottomSheetTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  tabContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  tabTitle: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  tabIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#FF5722',
    borderRadius: 2,
  },

  recentVisitContainer: {
    padding: 15,
  },
  visitInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  daysAgoText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  userInfoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
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
    color: COLORS.text,
    marginBottom: 2,
  },
  userReviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  reviewText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  recentItem: {
    marginBottom: 20,
  },
  shopImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  shopImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  shopImageLargeContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shopImageLarge: {
    width: '100%',
    height: '100%',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    padding: 5,
    marginRight: 10,
  },
  moreButton: {
    padding: 5,
  },
  shopInfoCardLarge: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shopInfoContent: {
    width: '100%',
  },
  shopNameLarge: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 5,
  },
  shopDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTextLarge: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  shopTypeLarge: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  shopDistanceLarge: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  visitedText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 5,
  },
});

export default HomeScreen;
