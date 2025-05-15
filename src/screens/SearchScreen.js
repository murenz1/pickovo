import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  Linking,
  StatusBar,
  Share
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data for repair shops
const repairShops = [
  { 
    id: 1, 
    name: 'Repair Shop', 
    rating: 4.3, 
    reviews: 206, 
    distance: '1.2km', 
    image: require('../assets/images/top.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 22:00',
    description: 'Short description of about the website',
    website: 'business.google.com/',
    location: '123 Main St, Kigali',
    openHours: '8:00h-17:00h',
    services: ['Oil Change', 'Brake Repair', 'Engine Diagnostics']
  },
  { 
    id: 2, 
    name: 'Benji Repair Shop', 
    rating: 4.5, 
    reviews: 186, 
    distance: '2.3km', 
    image: require('../assets/images/launch-screen.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 21:00',
    description: 'Professional auto repair services',
    website: 'benjirepair.com/',
    location: '456 Park Ave, Kigali',
    openHours: '9:00h-18:00h',
    services: ['Transmission Repair', 'AC Service', 'Wheel Alignment']
  },
  { 
    id: 3, 
    name: 'Kigali Auto Fix', 
    rating: 4.8, 
    reviews: 312, 
    distance: '0.8km', 
    image: require('../assets/images/launch-screen.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 20:00',
    description: 'Fast and reliable car repair',
    website: 'kigaliautofix.com/',
    location: '789 Central Rd, Kigali',
    openHours: '7:00h-19:00h',
    services: ['Battery Replacement', 'Tire Services', 'Exhaust Repair']
  },
];

// Sample data for popular destinations
const popularDestinations = [
  { 
    id: 1, 
    name: 'Repair Shop', 
    rating: 4.3, 
    reviews: 206, 
    distance: '1.2km', 
    image: require('../assets/images/launch-screen.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 22:00' 
  },
  { 
    id: 2, 
    name: 'Repair Shop', 
    rating: 4.3, 
    reviews: 186, 
    distance: '2.3km', 
    image: require('../assets/images/launch-screen.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 22:00' 
  },
  { 
    id: 3, 
    name: 'Repair Shop', 
    rating: 4.8, 
    reviews: 312, 
    distance: '0.8km', 
    image: require('../assets/images/launch-screen.jpg'), 
    openTime: 'Open', 
    closeTime: 'Closes 22:00' 
  },
];

// Sample data for recent searches
const recentSearches = [
  { id: 1, text: 'Benji Repair Shop', date: '02/02/2022 - 04/02/2022', rating: 4.3 },
  { id: 2, text: 'Benji Repair Shop', date: '02/02/2022 - 04/02/2022', rating: 4.3 },
  { id: 3, text: 'Mechanic shop', date: '01/02/2022 - 03/02/2022', rating: 4.5 },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('Mechanic shop');
  const [selectedFilter, setSelectedFilter] = useState('Relevance');
  const [filteredShops, setFilteredShops] = useState(repairShops);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showClearButton, setShowClearButton] = useState(true);
  
  // Filter options
  const filterOptions = ['Relevance', 'Open now', 'Top rated'];
  
  // Effect to filter shops based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredShops(repairShops);
      setShowClearButton(false);
    } else {
      const filtered = repairShops.filter(shop => 
        shop.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredShops(filtered);
      setShowClearButton(true);
    }
  }, [searchText]);
  
  // Handle filter selection
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    
    // Apply filtering logic
    let filtered = [...repairShops];
    if (filter === 'Top rated') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'Open now') {
      filtered = filtered.filter(shop => shop.openTime === 'Open');
    }
    
    setFilteredShops(filtered);
  };
  
  // Handler for shop selection
  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
  };
  
  // Navigate to shop details
  const navigateToShopDetails = (shop) => {
    navigation.navigate('ShopDetails', { shop });
  };
  
  // Function to call the shop
  const handleCall = (shop) => {
    Linking.openURL('tel:+250788123456');
  };
  
  // Function to get directions
  const handleGetDirections = (shop) => {
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=-1.9822917,30.1742849');
  };
  
  // Handle share
  const handleShare = (shop) => {
    Share.share({
      message: `Check out ${shop.name} on Pickovo!`,
      url: shop.website || 'https://pickovo.com',
      title: shop.name,
    }).catch(err => alert('Could not share'));
  };
  
  // Clear recent searches
  const clearRecentSearches = () => {
    // In a real app, this would clear from storage
    alert('Recent searches cleared');
  };
  
  // Render a shop item
  const renderShopItem = ({ item }) => (
    <View style={styles.shopItem}>
      <Image source={item.image} style={styles.shopImage} />
      <View style={styles.shopInfoOverlay}>
        <Text style={styles.shopName}>{item.name}</Text>
        <View style={styles.shopRatingContainer}>
          <Text style={styles.shopRating}>{item.rating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <FontAwesome 
                key={index} 
                name="star" 
                size={12} 
                color={index < Math.floor(item.rating) ? "#FFD700" : "#e0e0e0"} 
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.shopReviews}>({item.reviews})</Text>
        </View>
        <View style={styles.shopStatusContainer}>
          <Text style={styles.shopOpenStatus}>{item.openTime}</Text>
          <Text style={styles.shopCloseTime}>·{item.closeTime}</Text>
        </View>
        <View style={styles.shopDescriptionContainer}>
          <Text style={styles.shopDescription} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.shopWebsite}>{item.website}</Text>
        </View>
        <View style={styles.shopActionContainer}>
          <TouchableOpacity 
            style={styles.visitSiteButton}
            onPress={() => openWebsite(item.website)}
          >
            <Text style={styles.visitSiteButtonText}>Visit Site</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bookServiceButton}
            onPress={() => bookService(item)}
          >
            <Text style={styles.bookServiceButtonText}>Book Service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.shopActionButtonsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleGetDirections(item)}>
          <Ionicons name="navigate-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigateToShopDetails(item)}>
          <Ionicons name="construct-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleCall(item)}>
          <Ionicons name="call-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(item)}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // Render a popular destination item
  const renderPopularDestination = ({ item, index }) => (
    <TouchableOpacity 
      key={index}
      style={styles.popularDestinationItem}
      onPress={() => navigateToShopDetails(item)}
    >
      <Image source={item.image} style={styles.popularDestinationImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.popularDestinationGradient}
      >
        <Text style={styles.popularDestinationName}>{item.name}</Text>
        <View style={styles.popularDestinationRating}>
          <Text style={styles.popularDestinationRatingText}>{item.rating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <FontAwesome 
                key={idx} 
                name="star" 
                size={10} 
                color="#FFD700"
                style={{ marginRight: 1 }}
              />
            ))}
          </View>
        </View>
        <Text style={styles.popularDestinationCloseTime}>·Closes {item.closeTime.split(' ')[1]}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
  
  // Render a recent search item
  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity 
      style={styles.recentSearchItem}
      onPress={() => setSearchText(item.text)}
    >
      <View style={styles.recentSearchIconContainer}>
        <Ionicons 
          name="time-outline" 
          size={20} 
          color="#FF5722"
        />
      </View>
      <View style={styles.recentSearchContent}>
        <Text style={styles.recentSearchText}>{item.text}</Text>
        <Text style={styles.recentSearchDate}>{item.date}</Text>
        <View style={styles.recentSearchRating}>
          <Text style={styles.recentSearchRatingText}>{item.rating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <FontAwesome 
                key={idx} 
                name="star" 
                size={10} 
                color="#FFD700"
                style={{ marginRight: 1 }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Search header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Mechanic shop"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
        
        {showClearButton && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchText('')}
          >
            <Ionicons name="close" size={20} color={COLORS.text} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <View style={styles.filterIconContainer}>
          <Ionicons name="options-outline" size={20} color={COLORS.text} />
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'Relevance' && styles.filterOptionSelected
            ]}
            onPress={() => handleFilterSelect('Relevance')}
          >
            <Text 
              style={[
                styles.filterOptionText,
                selectedFilter === 'Relevance' && styles.filterOptionTextSelected
              ]}
            >
              Relevance
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'Open now' && styles.filterOptionSelected
            ]}
            onPress={() => handleFilterSelect('Open now')}
          >
            <Text 
              style={[
                styles.filterOptionText,
                selectedFilter === 'Open now' && styles.filterOptionTextSelected
              ]}
            >
              Open now
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'Top rated' && styles.filterOptionSelected
            ]}
            onPress={() => handleFilterSelect('Top rated')}
          >
            <Text 
              style={[
                styles.filterOptionText,
                selectedFilter === 'Top rated' && styles.filterOptionTextSelected
              ]}
            >
              Top rated
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.moreFiltersOption}
          >
            <Text style={styles.moreFiltersText}>More filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <View style={styles.mapPreview}>
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
            <View style={styles.mapContent}>
              <Text>Map will load on mobile devices</Text>
            </View>
          )}
          <TouchableOpacity style={styles.layersButton}>
            <Ionicons name="compass-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        
        {/* Main Repair Shop */}
        <View style={styles.mainShopContainer}>
          <Text style={styles.mainShopTitle}>Repair Shop</Text>
          <TouchableOpacity 
            style={styles.mainShopImageContainer}
            onPress={() => navigateToShopDetails(repairShops[0])}
          >
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.mainShopImage}
              resizeMode="cover"
            />
            <View style={styles.mainShopIndicators}>
              <View style={[styles.indicator, styles.activeIndicator]} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Popular Destinations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular destinations</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularDestinationsContainer}
          >
            {popularDestinations.map((destination, index) => 
              renderPopularDestination({ item: destination, index })
            )}
          </ScrollView>
        </View>
      
        {/* Recent Searches */}
        <View style={[styles.sectionContainer, styles.recentSearchesContainer]}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.sectionTitle}>Recent Search</Text>
            <TouchableOpacity onPress={clearRecentSearches}>
              <Text style={styles.clearAllText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearch}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
        
        {/* Main Shop Details */}
        <View style={styles.mainShopDetailsContainer}>
          <View style={styles.shopDetailsRow}>
            <View style={styles.shopInfoColumn}>
              <Text style={styles.shopName}>Repair Shop</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>4.3</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <FontAwesome 
                      key={idx} 
                      name="star" 
                      size={12} 
                      color="#FFD700"
                      style={{ marginRight: 1 }}
                    />
                  ))}
                </View>
                <Text style={styles.reviewsText}>(200+)</Text>
              </View>
              <Text style={styles.shopHours}>Open·Closes 22:00</Text>
            </View>
            <TouchableOpacity 
              style={styles.bookServiceButton}
              onPress={() => bookService(repairShops[0])}
            >
              <Text style={styles.bookServiceText}>Book Service</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.shopDescription}>Short description of about the website</Text>
          <Text style={styles.shopWebsite}>business.google.com/</Text>
          
          <TouchableOpacity 
            style={styles.visitSiteButton}
            onPress={() => openWebsite(repairShops[0].website)}
          >
            <Text style={styles.visitSiteText}>Visit Site</Text>
          </TouchableOpacity>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleGetDirections(repairShops[0])}>
              <Ionicons name="navigate-outline" size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Direction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigateToShopDetails(repairShops[0])}>
              <Ionicons name="construct-outline" size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleCall(repairShops[0])}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(repairShops[0])}>
              <Ionicons name="share-social-outline" size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  clearButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  filterScrollContent: {
    paddingRight: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#FFE8E0',
  },
  filterOptionText: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  filterOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  moreFiltersOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  moreFiltersText: {
    fontSize: SIZES.small,
    color: '#FF5722',
    fontWeight: '600',
  },
  mapPreview: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  mapContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layersButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.background,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Main shop container styles
  mainShopContainer: {
    padding: 16,
  },
  mainShopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mainShopImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  mainShopImage: {
    width: '100%',
    height: '100%',
  },
  mainShopIndicators: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF5722',
    width: 16,
  },
  scrollContent: {
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text,
  },
  shopItem: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shopImage: {
    width: '100%',
    height: 180,
  },
  shopInfoOverlay: {
    padding: 12,
  },
  shopName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  shopRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopRating: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  shopReviews: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  shopDistance: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  shopStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopOpenStatus: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  shopCloseTime: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  popularDestinationsContainer: {
    paddingRight: 16,
  },
  popularDestinationItem: {
    width: 150,
    height: 180,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  popularDestinationImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  popularDestinationGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    padding: 12,
    justifyContent: 'flex-end',
  },
  popularDestinationName: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  popularDestinationRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  popularDestinationRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 4,
  },
  popularDestinationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularDestinationOpenStatus: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  popularDestinationCloseTime: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  recentSearchesContainer: {
    paddingBottom: 30,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearAllText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentSearchIcon: {
    marginRight: 12,
  },
  recentSearchText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  recentSearchCloseButton: {
    padding: 4,
  },
  selectedShopHeader: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  selectedShopName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  selectedShopImageContainer: {
    width: '100%',
    height: 250,
  },
  selectedShopImage: {
    width: '100%',
    height: '100%',
  },
  shopDetailsCard: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginHorizontal: 16,
    marginTop: -30,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shopDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  shopDetailsName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  shopDetailsHours: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  bookServiceButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookServiceButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.small,
  },
  shopDetailsContent: {
    marginBottom: 16,
  },
  shopDetailsDescription: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  shopDetailsWebsite: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginBottom: 16,
  },
  // Main shop details styles
  mainShopDetailsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shopDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  shopInfoColumn: {
    flex: 1,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  shopHours: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bookServiceButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bookServiceText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  shopDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  shopWebsite: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 16,
  },
  visitSiteButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  visitSiteText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  },
  galleryContainer: {
    marginBottom: 16,
  },
  galleryTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text,
  },
  galleryScrollContent: {
    paddingRight: 16,
  },
  galleryImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default SearchScreen;
