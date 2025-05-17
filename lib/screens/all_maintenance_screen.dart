import 'package:flutter/material.dart';
import '../models/vehicle.dart' as model;
import 'package:intl/intl.dart';
import 'schedule_service_screen.dart';
import 'my_vehicles_screen.dart' as screen;

class AllMaintenanceScreen extends StatelessWidget {
  const AllMaintenanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Upcoming Maintenance'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Filter options
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _buildFilterChip(label: 'All', isSelected: true),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Oil Change'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Tire Rotation'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Brake Service'),
                const SizedBox(width: 8),
                _buildFilterChip(label: 'Battery'),
              ],
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Maintenance items
          ...model.getSampleVehicles().expand((vehicle) {
            return vehicle.maintenanceItems.map((item) {
              return _buildMaintenanceItem(context, vehicle, item);
            });
          }),
        ],
      ),
    );
  }

  Widget _buildFilterChip({required String label, bool isSelected = false}) {
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

  Widget _buildMaintenanceItem(BuildContext context, model.Vehicle vehicle, model.MaintenanceItem item) {
    final daysUntil = item.dueDate.difference(DateTime.now()).inDays;
    final isOverdue = daysUntil < 0;
    
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Colors.blue[50],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    _getMaintenanceIcon(item.type),
                    color: Colors.blue,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.type,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        '${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isOverdue ? Colors.red[50] : Colors.green[50],
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    isOverdue ? 'Overdue' : 'Due soon',
                    style: TextStyle(
                      color: isOverdue ? Colors.red : Colors.green,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Due Date',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 12,
                        ),
                      ),
                      Text(
                        DateFormat('MMM dd, yyyy').format(item.dueDate),
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Last Service',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 12,
                        ),
                      ),
                      Text(
                        item.lastService != null
                            ? DateFormat('MMM dd, yyyy').format(item.lastService!)
                            : 'N/A',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Mileage',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 12,
                        ),
                      ),
                      Text(
                        '${NumberFormat('#,###').format(item.mileage)} km',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                OutlinedButton(
                  onPressed: () {
                    // View details
                  },
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.blue,
                  ),
                  child: const Text('View Details'),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {
                    // Convert model.Vehicle to screen.Vehicle for ScheduleServiceScreen
                    final screenVehicle = screen.Vehicle(
                      make: vehicle.make,
                      model: vehicle.model,
                      year: vehicle.year.toString(),
                      licensePlate: vehicle.licensePlate,
                      color: vehicle.color,
                      imageUrl: vehicle.imageUrl,
                      nextServiceDate: item.dueDate,
                      isServiceDueSoon: item.dueDate.difference(DateTime.now()).inDays < 7,
                    );
                    
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ScheduleServiceScreen(vehicle: screenVehicle),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                  ),
                  child: const Text('Schedule'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  IconData _getMaintenanceIcon(String type) {
    switch (type.toLowerCase()) {
      case 'oil change':
        return Icons.oil_barrel;
      case 'tire rotation':
        return Icons.tire_repair;
      case 'brake service':
        return Icons.warning;
      case 'battery':
        return Icons.battery_full;
      default:
        return Icons.build;
    }
  }
}
