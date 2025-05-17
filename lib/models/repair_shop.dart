import 'package:latlong2/latlong.dart';

class RepairShop {
  final String id;
  final String name;
  final LatLng location;
  final String address;
  final double distance; // in kilometers
  final double rating;
  final String? imageUrl;
  final bool isFavorite;
  final List<String> services;
  final String estimatedTime;
  final int reviewCount;
  final List<String> specialties;
  final bool isOpen;

  RepairShop({
    required this.id,
    required this.name,
    required this.location,
    required this.address,
    required this.distance,
    required this.rating,
    this.imageUrl,
    this.isFavorite = false,
    this.services = const [],
    this.estimatedTime = '10 min',
    this.reviewCount = 0,
    this.specialties = const [],
    this.isOpen = true,
  });

  // Create a copy of this RepairShop with modified properties
  RepairShop copyWith({
    String? id,
    String? name,
    LatLng? location,
    String? address,
    double? distance,
    double? rating,
    String? imageUrl,
    bool? isFavorite,
    List<String>? services,
    String? estimatedTime,
    int? reviewCount,
    List<String>? specialties,
    bool? isOpen,
  }) {
    return RepairShop(
      id: id ?? this.id,
      name: name ?? this.name,
      location: location ?? this.location,
      address: address ?? this.address,
      distance: distance ?? this.distance,
      rating: rating ?? this.rating,
      imageUrl: imageUrl ?? this.imageUrl,
      isFavorite: isFavorite ?? this.isFavorite,
      services: services ?? this.services,
      estimatedTime: estimatedTime ?? this.estimatedTime,
      reviewCount: reviewCount ?? this.reviewCount,
      specialties: specialties ?? this.specialties,
      isOpen: isOpen ?? this.isOpen,
    );
  }
}

// Sample data for repair shops
List<RepairShop> getSampleRepairShops() {
  return [
    RepairShop(
      id: '1',
      name: 'Auto Finit',
      location: const LatLng(-1.9441, 30.0619), // Kigali coordinates
      address: '123 Main St, Kigali',
      distance: 0.6,
      rating: 5.0,
      imageUrl: 'https://images.unsplash.com/photo-1597766650016-9f622e64affa',
      isFavorite: true,
      services: ['Oil Change', 'Tire Service', 'Battery Replacement'],
      estimatedTime: '5 min',
      reviewCount: 124,
      specialties: ['German Cars', 'Japanese Cars', 'Electric Vehicles'],
      isOpen: true,
    ),
    RepairShop(
      id: '2',
      name: 'Kigali Motors',
      location: const LatLng(-1.9500, 30.0588),
      address: '456 Central Ave, Kigali',
      distance: 1.2,
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1599256871679-6a3e7e036daa',
      services: ['Engine Repair', 'Brake Service', 'AC Repair'],
      estimatedTime: '10 min',
      reviewCount: 87,
      specialties: ['Luxury Cars', 'SUVs', 'Performance Tuning'],
      isOpen: true,
    ),
    RepairShop(
      id: '3',
      name: 'Rwanda Auto Care',
      location: const LatLng(-1.9380, 30.0650),
      address: '789 Park Rd, Kigali',
      distance: 1.8,
      rating: 4.0,
      imageUrl: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f',
      services: ['Transmission Repair', 'Electrical Systems', 'Diagnostics'],
      estimatedTime: '15 min',
      reviewCount: 56,
      specialties: ['Diagnostics', 'Electrical Systems', 'Engine Tuning'],
      isOpen: false,
    ),
    RepairShop(
      id: '4',
      name: 'Quick Fix Garage',
      location: const LatLng(-1.9420, 30.0700),
      address: '321 East St, Kigali',
      distance: 2.1,
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      services: ['Oil Change', 'Wheel Alignment', 'Suspension Repair'],
      estimatedTime: '20 min',
      reviewCount: 42,
      specialties: ['Quick Service', 'Affordable Repairs', 'Suspension'],
      isOpen: true,
    ),
    RepairShop(
      id: '5',
      name: 'Premium Auto Service',
      location: const LatLng(-1.9350, 30.0550),
      address: '654 West Blvd, Kigali',
      distance: 2.5,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
      services: ['Full Service', 'Body Work', 'Paint Job'],
      estimatedTime: '25 min',
      reviewCount: 98,
      specialties: ['Premium Service', 'Body Work', 'Detailing'],
      isOpen: true,
    ),
  ];
}
