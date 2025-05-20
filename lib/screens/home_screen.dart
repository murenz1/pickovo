import 'dart:async';
// ignore_for_file: avoid_print
import 'dart:developer' as developer;
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'garage_details_screen.dart';
import '../theme/app_theme.dart';
import '../models/repair_shop.dart';
import '../services/map_service.dart';
import 'emergency_repair_screen.dart';
import 'request_repair_screen.dart';
import 'insurance_loans_screen.dart';
import 'tire_service_screen.dart';
import 'battery_service_screen.dart';
import 'oil_change_screen.dart';
import 'repairs_screen.dart';
import 'wallet_screen.dart';
import 'profile_screen.dart';
import 'more_screen.dart';
import 'add_vehicle_screen.dart';
import 'all_garages_screen.dart';
import 'all_maintenance_screen.dart';
import 'notifications_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  
  final List<Widget> _screens = [
    const HomeTab(),
    const RepairsTab(),
    const WalletTab(),
    const ProfileTab(),
    const MoreTab(),
  ];
  
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _selectedIndex,
        selectedItemColor: AppTheme.primaryColor,
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.build),
            label: 'Repairs',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_balance_wallet),
            label: 'Wallet',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.more_horiz),
            label: 'More',
          ),
        ],
      ),
    );
  }
}

class HomeTab extends StatefulWidget {
  const HomeTab({super.key});

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  final MapController _mapController = MapController();
  List<Marker> _markers = [];
  List<RepairShop> _repairShops = [];
  LatLng _currentLocation = const LatLng(-1.9441, 30.0619); // Default to Kigali, Rwanda
  bool _isLoading = true;
  
  @override
  void initState() {
    super.initState();
    _loadMapData();
  }
  
  Future<void> _loadMapData() async {
    setState(() {
      _isLoading = true;
    });
    
    try {
      // Load sample repair shops
      _repairShops = getSampleRepairShops();
      
      // Get current location
      try {
        final position = await MapService.getCurrentLocation();
        _currentLocation = LatLng(position.latitude, position.longitude);
      } catch (e) {
        // If we can't get location, just use the default location
        developer.log('Error getting location: $e', name: 'MapService');
      }
      
      // Create markers
      _updateMarkers();
      
      // Center map on current location
      _mapController.move(_currentLocation, 14);
    } catch (e) {
      developer.log('Error loading map data: $e', name: 'MapService');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }
  
  void _updateMarkers() {
    // Create markers list
    List<Marker> markers = [];
    
    // Add user location marker with directional information
    markers.add(
      Marker(
        width: 60.0,
        height: 60.0,
        point: _currentLocation,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Outer pulsing circle
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: const Duration(seconds: 2),
              curve: Curves.fastOutSlowIn,
              builder: (context, value, child) {
                return Container(
                  width: 40 + (value * 20),
                  height: 40 + (value * 20),
                  decoration: BoxDecoration(
                    color: Colors.green.withAlpha(((0.3 * (1 - value)) * 255).toInt()),
                    shape: BoxShape.circle,
                  ),
                );
              },
              onEnd: () {
                if (mounted) {
                  setState(() {
                    // Restart animation
                  });
                }
              },
            ),
            // Inner circle
            Container(
              width: 20,
              height: 20,
              decoration: const BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
                border: Border.fromBorderSide(
                  BorderSide(color: Colors.white, width: 2),
                ),
              ),
            ),
          ],
        ),
      ),
    );
    
    // Add repair shop markers
    for (final shop in _repairShops) {
      markers.add(
        Marker(
          width: 40.0,
          height: 40.0,
          point: shop.location,
          child: GestureDetector(
            onTap: () => _onShopTapped(shop),
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.orange,
                shape: BoxShape.circle,
                border: Border.fromBorderSide(
                  BorderSide(color: Colors.white, width: 2),
                ),
              ),
              child: const Icon(
                Icons.car_repair,
                color: Colors.white,
                size: 20,
              ),
            ),
          ),
        ),
      );
    }
    
    setState(() {
      _markers = markers;
    });
  }
  
  void _onShopTapped(RepairShop shop) {
    // Navigate to the garage details screen when a shop marker is tapped
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => GarageDetailsScreen(garage: shop),
      ),
    );
  }

  // Fullscreen map feature has been removed as per user request

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(4),
              ),
              child: const Text(
                'P',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'Pickovo',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          // Notification bell
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const NotificationsScreen()),
                  );
                },
              ),
              Positioned(
                right: 12,
                top: 12,
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              // Search bar
              GestureDetector(
                onTap: () {
                  showSearch(
                    context: context,
                    delegate: RepairShopSearchDelegate(_repairShops),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.search, color: Colors.grey[600]),
                      const SizedBox(width: 8),
                      Text(
                        'Find nearby repair shops',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                ),
              ),

              // Map section
              const SizedBox(height: 16),
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Stack(
                  children: [
                    // Leaflet Map
                    SizedBox(
                      height: 200,
                      width: double.infinity,
                      child: _isLoading
                          ? const Center(child: CircularProgressIndicator())
                          : ClipRRect(
                              borderRadius: BorderRadius.circular(12),
                              child: FlutterMap(
                                mapController: _mapController,
                                options: MapOptions(
                                  initialCenter: _currentLocation,
                                  initialZoom: 14.0,
                                  interactionOptions: const InteractionOptions(
                                    flags: InteractiveFlag.all,
                                  ),
                                ),
                                children: [
                                  TileLayer(
                                    urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                                    userAgentPackageName: 'com.example.pickovo',
                                    tileProvider: NetworkTileProvider(),
                                  ),
                                  MarkerLayer(markers: _markers),
                                ],
                              ),
                            ),
                    ),
                    // Fullscreen button removed as per user request
                    // Reload and zoom controls
                    Positioned(
                      right: 16,
                      bottom: 16,
                      child: Column(
                        children: [
                          FloatingActionButton.small(
                            heroTag: 'refresh_map',
                            onPressed: _loadMapData,
                            backgroundColor: Colors.white,
                            child: const Icon(Icons.refresh, color: Colors.black),
                          ),
                          const SizedBox(height: 8),
                          FloatingActionButton.small(
                            heroTag: 'locate_me',
                            onPressed: () {
                              _mapController.move(_currentLocation, 15);
                            },
                            backgroundColor: Colors.green,
                            child: const Icon(Icons.my_location),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Quick action buttons
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: _buildActionButton(
                      color: Colors.red,
                      icon: Icons.warning,
                      label: 'Emergency\nRepair',
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const EmergencyRepairScreen()),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildActionButton(
                      color: Colors.blue,
                      icon: Icons.build,
                      label: 'Request\nRepair',
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const RequestRepairScreen()),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildActionButton(
                      color: Colors.green,
                      icon: Icons.shield,
                      label: 'Insurance &\nLoans',
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const InsuranceLoansScreen()),
                        );
                      },
                    ),
                  ),
                ],
              ),

              // Quick Services
              const SizedBox(height: 24),
              const Text(
                'Quick Services',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildQuickService(
                    icon: Icons.oil_barrel,
                    label: 'Oil Change',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const OilChangeScreen()),
                      );
                    },
                  ),
                  _buildQuickService(
                    icon: Icons.tire_repair,
                    label: 'Tire Service',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const TireServiceScreen()),
                      );
                    },
                  ),
                  _buildQuickService(
                    icon: Icons.battery_charging_full,
                    label: 'Battery',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const BatteryServiceScreen()),
                      );
                    },
                  ),
                  _buildQuickService(
                    icon: Icons.directions_car,
                    label: 'Add Vehicle',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const AddVehicleScreen()),
                      );
                    },
                  ),
                ],
              ),

              // Nearby Garages
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Nearby Garages',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const AllGaragesScreen()),
                      );
                    },
                    child: const Text('View All'),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              _buildGarageItem(
                name: 'Auto Finit',
                distance: '0.6Km',
                estimatedTime: '~0.5Km',
                rating: 5.0,
                isFavorite: true,
              ),
              const SizedBox(height: 12),
              _buildGarageItem(
                name: 'Kigali Motors',
                distance: '1.2Km',
                estimatedTime: '~1.0Km',
                rating: 4.5,
                isFavorite: false,
              ),

              // Upcoming Maintenance
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Upcoming Maintenance',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const AllMaintenanceScreen()),
                      );
                    },
                    child: const Text('View All'),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue[50],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.calendar_today, color: Colors.blue[300]),
                        const SizedBox(width: 12),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Oil Change Due',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            Text('Toyota Camry • RAC 881C'),
                            Text('Due in 2 days or 300km'),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const RequestRepairScreen()),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue[100],
                          foregroundColor: Colors.blue,
                        ),
                        child: const Text('Schedule Now'),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required Color color,
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              color: Colors.white,
              size: 32,
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickService({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.blue[50],
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: Colors.blue),
          ),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }

  // Keep track of favorite garages
  final Map<String, bool> _favoriteGarages = {};

  Widget _buildGarageItem({
    required String name,
    required String distance,
    required String estimatedTime,
    required double rating,
    required bool isFavorite,
  }) {
    // Initialize favorite status if not already set
    if (!_favoriteGarages.containsKey(name)) {
      _favoriteGarages[name] = isFavorite;
    }

    // Find the corresponding RepairShop object
    final shop = _repairShops.firstWhere(
      (shop) => shop.name == name,
      orElse: () => _repairShops.first,
    );
    
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          // Garage image with improved styling
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              width: 70,
              height: 70,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                image: shop.imageUrl != null && shop.imageUrl!.isNotEmpty
                    ? DecorationImage(
                        image: NetworkImage(shop.imageUrl!),
                        fit: BoxFit.cover,
                      )
                    : null,
              ),
              child: shop.imageUrl == null || shop.imageUrl!.isEmpty
                  ? const Icon(Icons.car_repair, size: 30, color: Colors.grey)
                  : null,
            ),
          ),
          const SizedBox(width: 12),
          // Garage details
          Expanded(
            child: GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => GarageDetailsScreen(garage: shop),
                  ),
                );
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text('$distance • $estimatedTime'),
                  Row(
                    children: List.generate(
                      5,
                      (index) => Icon(
                        index < rating.floor() ? Icons.star : 
                        (index < rating) ? Icons.star_half : Icons.star_border,
                        color: Colors.amber,
                        size: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Favorite button and details
          Column(
            children: [
              IconButton(
                icon: Icon(
                  _favoriteGarages[name]! ? Icons.favorite : Icons.favorite_border,
                  color: _favoriteGarages[name]! ? Colors.red : Colors.grey,
                ),
                onPressed: () {
                  setState(() {
                    _favoriteGarages[name] = !_favoriteGarages[name]!;
                  });
                },
              ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => GarageDetailsScreen(garage: shop),
                    ),
                  );
                },
                style: TextButton.styleFrom(
                  foregroundColor: Colors.blue,
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                ),
                child: const Text('Details'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class RepairsTab extends StatelessWidget {
  const RepairsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const RepairsScreen();
  }
}

class WalletTab extends StatelessWidget {
  const WalletTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const WalletScreen();
  }
}

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const ProfileScreen();
  }
}

// Search delegate for repair shops
class RepairShopSearchDelegate extends SearchDelegate<RepairShop?> {
  final List<RepairShop> repairShops;

  RepairShopSearchDelegate(this.repairShops);

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
        },
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed: () {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return buildSuggestions(context);
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final suggestions = query.isEmpty
        ? repairShops
        : repairShops.where((shop) =>
            shop.name.toLowerCase().contains(query.toLowerCase()) ||
            shop.address.toLowerCase().contains(query.toLowerCase()) ||
            shop.specialties.any((specialty) =>
                specialty.toLowerCase().contains(query.toLowerCase())))
        .toList();

    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        final shop = suggestions[index];
        return ListTile(
          leading: shop.imageUrl != null && shop.imageUrl!.isNotEmpty
              ? CircleAvatar(
                  backgroundImage: NetworkImage(shop.imageUrl!),
                  backgroundColor: Colors.grey[200],
                )
              : CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: const Icon(Icons.car_repair, color: Colors.grey),
                ),
          title: Text(shop.name),
          subtitle: Text('${shop.distance.toStringAsFixed(1)}km • ${shop.address}'),
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.star,
                color: Colors.amber,
                size: 16,
              ),
              const SizedBox(width: 4),
              Text(shop.rating.toString()),
            ],
          ),
          onTap: () {
            close(context, shop);
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => GarageDetailsScreen(garage: shop),
              ),
            );
          },
        );
      },
    );
  }
}

class MoreTab extends StatelessWidget {
  const MoreTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const MoreScreen();
  }
}
