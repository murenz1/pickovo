import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions,
  Linking,
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../styles/theme';
import Button from '../components/Button';

// Sample services data
const services = [
  { id: 1, name: 'Mechanical Repair' },
  { id: 2, name: 'Vehicle Service' },
  { id: 3, name: 'On-site Inspection and Repair' },
  { id: 4, name: 'Vehicle Dent and Paint' },
  { id: 5, name: 'Accident Repair' },
];

// Sample reviews data
const reviews = [
  { 
    id: 1, 
    user: 'Benjamin Joel', 
    rating: 5, 
    time: '2 mins ago', 
    comment: 'Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua',
    avatar: require('../assets/images/profile-pic.jpg')
  },
];

// Sample rating distribution
const ratingDistribution = [
  { stars: 5, percentage: 75 },
  { stars: 4, percentage: 45 },
  { stars: 3, percentage: 25 },
  { stars: 2, percentage: 15 },
  { stars: 1, percentage: 5 },
];

const ShopDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { shop } = route.params || { 
    name: 'Repair Shop', 
    rating: 4.3, 
    reviews: 206, 
    distance: '1.2km', 
    openTime: 'Open', 
    closeTime: 'Closes 22:00' 
  };
  
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const tabs = ['OVERVIEW', 'SERVICES', 'REVIEWS', 'PHOTOS'];
  
  // Function to call the shop
  const handleCall = () => {
    Linking.openURL('tel:+250788123456');
  };
  
  // Function to get directions
  const handleGetDirections = () => {
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=-1.9822917,30.1742849');
  };
  
  // Function to share shop
  const handleShare = () => {
    // Share functionality would be implemented here
  };
  
  // Function to book a service
  const handleBookService = () => {
    // Book service functionality would be implemented here
  };
  
  // Render the Overview tab content
  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.overviewText}>
        Information about this place may be outdated. Always pay attention to real-world conditions, which may be rapidly changing. Information about this place may be outdated. Always pay attention to real-world conditions, which may be rapidly changing. Information about this place may be outdated. Always pay attention to real-world conditions, which may be rapidly changing.
      </Text>
      
      <View style={styles.infoItem}>
        <MaterialIcons name="location-on" size={24} color={COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>Norrsken Kigali House, 1 KN 78 St, Kigali, Rwanda.</Text>
      </View>
      
      <TouchableOpacity style={styles.infoItem}>
        <MaterialIcons name="access-time" size={24} color={COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>Open•Closes 23:00</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={COLORS.text} style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>
      
      <View style={styles.infoItem}>
        <MaterialIcons name="link" size={24} color={COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>https://...</Text>
      </View>
    </View>
  );
  
  // Render the Services tab content
  const renderServicesTab = () => (
    <View style={styles.tabContent}>
      {services.map(service => (
        <View key={service.id} style={styles.serviceItem}>
          <Text style={styles.serviceText}>{service.name}</Text>
        </View>
      ))}
    </View>
  );
  
  // Render the Reviews tab content
  const renderReviewsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.ratingOverview}>
        <View style={styles.ratingScoreContainer}>
          <Text style={styles.ratingScore}>4.0</Text>
          <View style={styles.starsRow}>
            {[...Array(5)].map((_, i) => (
              <Ionicons 
                key={i} 
                name={i < 4 ? "star" : "star-outline"} 
                size={16} 
                color="#FFB800" 
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.totalReviews}>52 Reviews</Text>
        </View>
        
        <View style={styles.ratingBarsContainer}>
          {ratingDistribution.map(item => (
            <View key={item.stars} style={styles.ratingBarItem}>
              <Text style={styles.ratingBarStars}>{item.stars}</Text>
              <Ionicons name="star" size={14} color="#FFB800" style={{ marginLeft: 4, marginRight: 8 }} />
              <View style={styles.ratingBarBackground}>
                <View style={[styles.ratingBarFill, { width: `${item.percentage}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
      
      {reviews.map(review => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image source={review.avatar} style={styles.reviewerAvatar} />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.user}</Text>
              <View style={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i} 
                    name={i < review.rating ? "star" : "star-outline"} 
                    size={14} 
                    color="#FFB800" 
                    style={{ marginRight: 2 }}
                  />
                ))}
                <Text style={styles.reviewTime}>{review.time}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.reviewMoreButton}>
              <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.reviewText}>{review.comment}</Text>
        </View>
      ))}
      
      {/* Empty state for reviews if needed */}
      {reviews.length === 0 && (
        <View style={styles.emptyReviewsContainer}>
          <Image 
            source={require('../assets/images/launch-screen.jpg')} 
            style={styles.emptyReviewsImage}
          />
          <Text style={styles.emptyReviewsTitle}>No reviews yet</Text>
          <Text style={styles.emptyReviewsText}>
            Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex.
          </Text>
        </View>
      )}
    </View>
  );
  
  // Render the Photos tab content
  const renderPhotosTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.photosGrid}>
        <Image source={require('../assets/images/launch-screen.jpg')} style={styles.photoItem} />
        <Image source={require('../assets/images/launch-screen.jpg')} style={styles.photoItem} />
        <Image source={require('../assets/images/launch-screen.jpg')} style={styles.photoItem} />
        <Image source={require('../assets/images/launch-screen.jpg')} style={styles.photoItem} />
      </View>
    </View>
  );
  
  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'OVERVIEW':
        return renderOverviewTab();
      case 'SERVICES':
        return renderServicesTab();
      case 'REVIEWS':
        return renderReviewsTab();
      case 'PHOTOS':
        return renderPhotosTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="search-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Shop Info */}
        <View style={styles.shopInfoContainer}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <View style={styles.shopRatingContainer}>
            <Text style={styles.shopRating}>{shop.rating}</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <Ionicons 
                  key={i} 
                  name={i < Math.floor(shop.rating) ? "star" : "star-outline"} 
                  size={14} 
                  color="#FFB800" 
                  style={{ marginRight: 2 }}
                />
              ))}
            </View>
            <Text style={styles.shopReviews}>({shop.reviews})</Text>
            <Text style={styles.shopDistance}>•{shop.distance}</Text>
          </View>
          <Text style={styles.shopHours}>{shop.openTime}•{shop.closeTime}</Text>
          
          {/* Book Service Button */}
          <TouchableOpacity 
            style={styles.bookServiceButton}
            onPress={handleBookService}
          >
            <Text style={styles.bookServiceButtonText}>Book Service</Text>
          </TouchableOpacity>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleGetDirections}
            >
              <View style={[styles.actionButtonIcon, { backgroundColor: COLORS.primary }]}>
                <MaterialIcons name="directions" size={20} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="build" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Services</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleCall}
            >
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="call" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="share" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Shop Images */}
        <View style={styles.shopImagesContainer}>
          <View style={styles.shopImagesGrid}>
            <Image 
              source={require('../assets/images/launch-screen.jpg')} 
              style={styles.shopMainImage}
            />
            <View style={styles.shopSmallImagesContainer}>
              <Image 
                source={require('../assets/images/launch-screen.jpg')} 
                style={styles.shopSmallImage}
              />
              <Image 
                source={require('../assets/images/launch-screen.jpg')} 
                style={styles.shopSmallImage}
              />
            </View>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text 
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.activeTabButtonText
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Tab Content */}
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollContent: {
    flex: 1,
  },
  shopInfoContainer: {
    padding: 16,
  },
  shopName: {
    fontSize: SIZES.large,
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
    marginRight: 4,
  },
  shopDistance: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  shopHours: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  bookServiceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  bookServiceButtonText: {
    color: '#fff',
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  shopImagesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  shopImagesGrid: {
    flexDirection: 'row',
    height: 200,
  },
  shopMainImage: {
    flex: 2,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 2,
  },
  shopSmallImagesContainer: {
    flex: 1,
    height: '100%',
  },
  shopSmallImage: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 2,
  },
  tabsContainer: {
    flex: 1,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabButtonText: {
    color: COLORS.primary,
  },
  tabContent: {
    padding: 16,
  },
  overviewText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    flex: 1,
  },
  serviceItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  ratingOverview: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  ratingScoreContainer: {
    alignItems: 'center',
    marginRight: 24,
  },
  ratingScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  ratingBarsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBarStars: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    width: 10,
    textAlign: 'center',
  },
  ratingBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFB800',
    borderRadius: 2,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTime: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  reviewMoreButton: {
    padding: 4,
  },
  reviewText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
  },
  emptyReviewsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyReviewsImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  emptyReviewsTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyReviewsText: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoItem: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
  },
});

export default ShopDetailsScreen;
