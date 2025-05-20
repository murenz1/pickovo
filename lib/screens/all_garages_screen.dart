import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/repair_shop.dart';
import '../theme/app_theme.dart';
import 'garage_details_screen.dart';

class AllGaragesScreen extends StatelessWidget {
  const AllGaragesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final repairShops = getSampleRepairShops();

    return Scaffold(
      body: Column(
        children: [
          // Status bar space
          Container(
            height: MediaQuery.of(context).padding.top,
            color: Colors.blue,
          ),
          // App Bar
          Container(
            color: Colors.blue,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
                const Text(
                  'All Garages',
                  style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search garages...',
                prefixIcon: const Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[200],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(vertical: 0),
              ),
            ),
          ),
          
          // Filters
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              children: [
                _buildFilterChip(label: 'All'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Nearest'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Top Rated'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Open Now'),
              ],
            ),
          ),
          
          // Garages List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: repairShops.length,
              itemBuilder: (context, index) {
                final shop = repairShops[index];
                return _buildGarageItem(
                  context: context,
                  shop: shop,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip({required String label}) {
    final isSelected = label == 'All';
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: isSelected ? Colors.blue : Colors.grey[200],
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: isSelected ? Colors.white : Colors.black,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    );
  }

  Widget _buildGarageItem({
    required BuildContext context,
    required RepairShop shop,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            children: [
              // Garage image with improved styling
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: 80,
                  height: 80,
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
                      ? const Icon(Icons.car_repair, size: 40, color: Colors.grey)
                      : null,
                ),
              ),
              const SizedBox(width: 12),
              // Garage details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      shop.name,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    const SizedBox(height: 4),
                    Text('${shop.distance.toStringAsFixed(1)}km • ${shop.estimatedTime}'),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        ...List.generate(
                          5,
                          (index) => Icon(
                            index < shop.rating.floor()
                                ? Icons.star
                                : (index < shop.rating)
                                    ? Icons.star_half
                                    : Icons.star_border,
                            color: Colors.amber,
                            size: 16,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          shop.rating.toString(),
                          style: const TextStyle(fontSize: 12),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '(${shop.reviewCount})',
                          style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      shop.specialties.join(' • '),
                      style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              // Favorite button
              Column(
                children: [
                  Icon(
                    shop.isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: shop.isFavorite ? Colors.red : Colors.grey,
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: shop.isOpen ? Colors.green.shade100 : Colors.red.shade100,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      shop.isOpen ? 'Open' : 'Closed',
                      style: TextStyle(
                        fontSize: 12,
                        color: shop.isOpen ? Colors.green.shade800 : Colors.red.shade800,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          // Action buttons
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildActionButton(
                icon: Icons.directions,
                label: 'Directions',
                onPressed: () async {
                  final lat = shop.location.latitude;
                  final lng = shop.location.longitude;
                  final url = Uri.parse('https://www.google.com/maps/dir/?api=1&destination=$lat,$lng');
                  
                  try {
                    if (await canLaunchUrl(url)) {
                      await launchUrl(url, mode: LaunchMode.platformDefault);
                    } else {
                      if (!context.mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Could not open maps'),
                          backgroundColor: Colors.red,
                        ),
                      );
                    }
                  } catch (e) {
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Error: $e'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  }
                },
              ),
              _buildActionButton(
                icon: Icons.call,
                label: 'Call',
                onPressed: () async {
                  // Use a default phone number if not available in the model
                  final phoneNumber = '+250789123456';
                  final phoneUri = Uri.parse('tel:$phoneNumber');
                  
                  try {
                    if (await canLaunchUrl(phoneUri)) {
                      await launchUrl(phoneUri);
                    } else {
                      if (!context.mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Could not launch phone: $phoneNumber'),
                          backgroundColor: Colors.red,
                        ),
                      );
                    }
                  } catch (e) {
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Error: $e'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  }
                },
              ),
              _buildActionButton(
                icon: Icons.info_outline,
                label: 'Details',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => GarageDetailsScreen(garage: shop),
                    ),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
  
  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onPressed,
  }) {
    return InkWell(
      onTap: onPressed,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppTheme.primaryColor.withAlpha((0.1 * 255).round()),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppTheme.primaryColor, size: 20),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(fontSize: 12),
          ),
        ],
      ),
    );
  }
}
