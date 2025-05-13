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
  Linking
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../styles/theme';

// Sample data for repair shops
const repairShops = [
  { 
    id: 1, 
    name: 'Repair Shop', 
    rating: 4.3, 
    reviews: 206, 
    distance: '1.2km', 
    image: require('../assets/images/launch-screen.jpg'), 
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
  
  // Filter options
  const filterOptions = ['Relevance', 'Open now', 'Top rated'];
  
  // Effect to filter shops based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredShops(repairShops);
    } else {
      const filtered = repairShops.filter(shop => 
        shop.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredShops(filtered);
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
  
  // Clear recent searches
  const clearRecentSearches = () => {
    // In a real app, this would clear the recent searches from storage
    console.log('Clearing recent searches');
  };
  
  // Handle external links
  const openWebsite = (url) => {
    Linking.openURL(`https://${url}`);
  };
  
  // Book service
  const bookService = (shop) => {
    console.log('Booking service at', shop.name);
    // Navigate to booking screen
  };
  
  // Render a shop item
  const renderShopItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.shopItem}
      onPress={() => handleShopSelect(item)}
    >
      <Image source={item.image} style={styles.shopImage} />
      <View style={styles.shopInfoOverlay}>
        <Text style={styles.shopName}>{item.name}</Text>
        <View style={styles.shopRatingContainer}>
          <Text style={styles.shopRating}>{item.rating}</Text>
          <View style={styles.starsContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
          </View>
          <Text style={styles.shopReviews}>({item.reviews})</Text>
          <Text style={styles.shopDistance}>{item.distance}</Text>
        </View>
        <View style={styles.shopStatusContainer}>
          <Text style={styles.shopOpenStatus}>{item.openTime}</Text>
          <Text style={styles.shopCloseTime}> · {item.closeTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render a popular destination item
  const renderPopularDestination = ({ item, index }) => (
    <TouchableOpacity 
      key={index}
      style={styles.popularDestinationItem}
      onPress={() => handleShopSelect(item)}
    >
      <Image source={item.image} style={styles.popularDestinationImage} />
      <View style={styles.popularDestinationInfo}>
        <Text style={styles.popularDestinationName}>{item.name}</Text>
        <View style={styles.popularDestinationRating}>
          <Text style={styles.popularDestinationRatingText}>{item.rating}</Text>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.shopReviews}>({item.reviews})</Text>
        </View>
        <View style={styles.popularDestinationStatus}>
          <Text style={styles.popularDestinationOpenStatus}>{item.openTime}</Text>
          <Text style={styles.popularDestinationCloseTime}> · {item.closeTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render a recent search item
  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity 
      style={styles.recentSearchItem}
      onPress={() => setSearchText(item.text)}
    >
      <Ionicons 
        name="time-outline" 
        size={24} 
        color={COLORS.textSecondary}
        style={styles.recentSearchIcon}
      />
      <View>
        <Text style={styles.recentSearchText}>{item.text}</Text>
        <Text style={styles.shopReviews}>{item.date}</Text>
      </View>
      <TouchableOpacity 
        style={styles.recentSearchCloseButton}
        onPress={() => console.log('Remove recent search')}
      >
        <Ionicons name="close" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
            placeholder="Search here"
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchText ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterOption,
                selectedFilter === option && styles.filterOptionSelected
              ]}
              onPress={() => handleFilterSelect(option)}
            >
              <Text 
                style={[
                  styles.filterOptionText,
                  selectedFilter === option && styles.filterOptionTextSelected
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.moreFiltersButton}>
            <Text style={styles.moreFiltersText}>More filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {selectedShop ? (
        // Selected Shop Detail View
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Map Preview */}
          <View style={styles.mapPreview}>
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.mapImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.layersButton}>
              <Ionicons name="layers-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Shop Name */}
          <View style={styles.selectedShopHeader}>
            <Text style={styles.selectedShopName}>{selectedShop.name}</Text>
          </View>
          
          {/* Shop Image */}
          <View style={styles.selectedShopImageContainer}>
            <Image 
              source={selectedShop.image} 
              style={styles.selectedShopImage}
              resizeMode="cover"
            />
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
              <TouchableOpacity>
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
        </ScrollView>
      ) : (
        // Search Results View
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Map Preview */}
          <View style={styles.mapPreview}>
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.mapImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.layersButton}>
              <Ionicons name="layers-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Repair Shops List */}
          <View style={styles.sectionContainer}>
            <FlatList
              data={filteredShops}
              renderItem={renderShopItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
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
              <TouchableOpacity>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    backgroundColor: '#F0F0F0',
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
  moreFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  moreFiltersText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  mapPreview: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  layersButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  popularDestinationImage: {
    width: '100%',
    height: 100,
  },
  popularDestinationInfo: {
    padding: 8,
  },
  popularDestinationName: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  popularDestinationRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  popularDestinationRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
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
    color: COLORS.textSecondary,
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
});

export default SearchScreen;
