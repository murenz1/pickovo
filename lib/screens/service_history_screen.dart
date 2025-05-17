import 'package:flutter/material.dart';
import 'my_vehicles_screen.dart';

class ServiceRecord {
  final String serviceType;
  final DateTime date;
  final double cost;
  final int mileage;
  final String garage;

  ServiceRecord({
    required this.serviceType,
    required this.date,
    required this.cost,
    required this.mileage,
    required this.garage,
  });
}

class ServiceHistoryScreen extends StatelessWidget {
  final Vehicle vehicle;
  final List<ServiceRecord> serviceRecords = [
    ServiceRecord(
      serviceType: 'Oil Change',
      date: DateTime(2025, 3, 15),
      cost: 45.00,
      mileage: 25000,
      garage: 'AutoFix Garage',
    ),
    ServiceRecord(
      serviceType: 'Tire Rotation',
      date: DateTime(2024, 12, 10),
      cost: 30.00,
      mileage: 20000,
      garage: 'QuickFix Motors',
    ),
    ServiceRecord(
      serviceType: 'Brake Service',
      date: DateTime(2024, 8, 5),
      cost: 120.00,
      mileage: 15000,
      garage: 'AutoFix Garage',
    ),
  ];

  ServiceHistoryScreen({super.key, required this.vehicle});

  @override
  Widget build(BuildContext context) {
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
                  'Service History',
                  style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          
          // Vehicle Name
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              '${vehicle.make} ${vehicle.model}',
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          
          // Service History List
          Expanded(
            child: serviceRecords.isEmpty
                ? const Center(
                    child: Text('No service history'),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: serviceRecords.length,
                    separatorBuilder: (context, index) => const Divider(),
                    itemBuilder: (context, index) {
                      final record = serviceRecords[index];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Service Info
                            Expanded(
                              flex: 3,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    record.serviceType,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    _formatDate(record.date),
                                    style: TextStyle(
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    record.garage,
                                    style: TextStyle(
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            
                            // Cost and Mileage
                            Expanded(
                              flex: 2,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    '\$${record.cost.toStringAsFixed(2)}',
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${record.mileage.toString()} km',
                                    style: TextStyle(
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }
}
