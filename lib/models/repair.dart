// Import the repair shop model which also contains the sample data function
import 'repair_shop.dart';

enum RepairStatus {
  scheduled,
  inProgress,
  completed,
  cancelled
}

class Mechanic {
  final String id;
  final String name;
  final String specialization;
  final double rating;
  final String imageUrl;
  final bool isOnline;

  Mechanic({
    required this.id,
    required this.name,
    required this.specialization,
    required this.rating,
    this.imageUrl = '',
    this.isOnline = false,
  });
}

class RepairUpdate {
  final DateTime timestamp;
  final String description;

  RepairUpdate({
    required this.timestamp,
    required this.description,
  });
}

class CostBreakdown {
  final double parts;
  final double labor;
  final double total;

  CostBreakdown({
    required this.parts,
    required this.labor,
  }) : total = parts + labor;
}

class Repair {
  final String id;
  final String title;
  final String vehicleName;
  final String licensePlate;
  final RepairStatus status;
  final DateTime startDate;
  final DateTime? estimatedCompletion;
  final String location;
  final Mechanic assignedMechanic;
  final String description;
  final CostBreakdown costBreakdown;
  final List<RepairUpdate> updates;
  final int progressPercentage;
  final String? statusMessage;
  final DateTime? nextServiceDue;
  final RepairShop shop; // Added shop property

  Repair({
    required this.id,
    required this.title,
    required this.vehicleName,
    required this.licensePlate,
    required this.status,
    required this.startDate,
    this.estimatedCompletion,
    required this.location,
    required this.assignedMechanic,
    required this.description,
    required this.costBreakdown,
    required this.updates,
    required this.progressPercentage,
    this.statusMessage,
    this.nextServiceDue,
    required this.shop, // Added shop parameter
  });
}

// Sample data for repairs
List<Repair> getCurrentRepairs() {
  final jeanClaude = Mechanic(
    id: 'm1',
    name: 'Jean Claude',
    specialization: 'Engine Specialist',
    rating: 4.9,
    imageUrl: 'assets/images/mechanic1.jpg',
    isOnline: true,
  );
  
  final marieClaire = Mechanic(
    id: 'm2',
    name: 'Marie Claire',
    specialization: 'Brake Specialist',
    rating: 4.9,
    imageUrl: 'assets/images/mechanic2.jpg',
    isOnline: false,
  );
  
  // Get sample repair shops
  final repairShops = getSampleRepairShops();
  final autoFinit = repairShops.firstWhere((shop) => shop.name == 'Auto Finit');

  return [
    Repair(
      id: 'r1',
      title: 'Engine Diagnostics',
      vehicleName: 'Toyota Camry',
      licensePlate: 'BA01234',
      status: RepairStatus.inProgress,
      startDate: DateTime(2025, 5, 15),
      estimatedCompletion: DateTime(2025, 5, 15).add(const Duration(hours: 4)),
      location: 'Auto Finit, Kigali',
      assignedMechanic: jeanClaude,
      description: 'Complete engine diagnostic to identify the cause of engine misfiring and check for any potential issues.',
      costBreakdown: CostBreakdown(
        parts: 10000,
        labor: 15000,
      ),
      updates: [
        RepairUpdate(
          timestamp: DateTime(2025, 5, 15, 10, 0),
          description: 'Repair started',
        ),
        RepairUpdate(
          timestamp: DateTime(2025, 5, 15, 11, 30),
          description: 'Old brake pads removed, inspecting brake rotors',
        ),
      ],
      progressPercentage: 25,
      statusMessage: 'Mechanic on the way',
      shop: autoFinit,
    ),
    Repair(
      id: 'r2',
      title: 'Brake Pad Replacement',
      vehicleName: 'Toyota Camry',
      licensePlate: 'BA01234',
      status: RepairStatus.inProgress,
      startDate: DateTime(2025, 5, 15),
      estimatedCompletion: DateTime(2025, 5, 15).add(const Duration(hours: 2)),
      location: 'Auto Finit, Kigali',
      assignedMechanic: marieClaire,
      description: 'Replacement of front and rear brake pads, inspection of brake rotors and calipers.',
      costBreakdown: CostBreakdown(
        parts: 20000,
        labor: 15000,
      ),
      updates: [
        RepairUpdate(
          timestamp: DateTime(2025, 5, 15, 10, 0),
          description: 'Repair started',
        ),
        RepairUpdate(
          timestamp: DateTime(2025, 5, 15, 11, 30),
          description: 'Initial diagnostics complete, identified potential issue with spark plugs',
        ),
      ],
      progressPercentage: 75,
      statusMessage: null,
      shop: autoFinit,
    ),
  ];
}

List<Repair> getHistoryRepairs() {
  final jeanClaude = Mechanic(
    id: 'm1',
    name: 'Jean Claude',
    specialization: 'Engine Specialist',
    rating: 4.9,
    imageUrl: 'assets/images/mechanic1.jpg',
    isOnline: false,
  );
  
  final marieClaire = Mechanic(
    id: 'm2',
    name: 'Marie Claire',
    specialization: 'Brake Specialist',
    rating: 4.9,
    imageUrl: 'assets/images/mechanic2.jpg',
    isOnline: false,
  );
  
  // Get sample repair shops
  final repairShops = getSampleRepairShops();
  final autoFinit = repairShops.firstWhere((shop) => shop.name == 'Auto Finit');
  final kigaliMotors = repairShops.firstWhere((shop) => shop.name == 'Kigali Motors');

  return [
    Repair(
      id: 'h1',
      title: 'Oil Change',
      vehicleName: 'Toyota Camry',
      licensePlate: 'BA01234',
      status: RepairStatus.completed,
      startDate: DateTime(2025, 5, 5),
      location: 'Auto Finit',
      assignedMechanic: jeanClaude,
      description: 'Regular oil change with filter replacement',
      costBreakdown: CostBreakdown(
        parts: 15000,
        labor: 15000,
      ),
      updates: [
        RepairUpdate(
          timestamp: DateTime(2025, 5, 5, 10, 0),
          description: 'Service completed',
        ),
      ],
      progressPercentage: 100,
      nextServiceDue: DateTime(2025, 8, 5),
      shop: autoFinit,
    ),
    Repair(
      id: 'h2',
      title: 'Tire Rotation',
      vehicleName: 'Toyota Camry',
      licensePlate: 'BA01234',
      status: RepairStatus.completed,
      startDate: DateTime(2025, 4, 20),
      location: 'Kigali Motors',
      assignedMechanic: marieClaire,
      description: 'Tire rotation and pressure check',
      costBreakdown: CostBreakdown(
        parts: 0,
        labor: 15000,
      ),
      updates: [
        RepairUpdate(
          timestamp: DateTime(2025, 4, 20, 14, 0),
          description: 'Service completed',
        ),
      ],
      progressPercentage: 100,
      nextServiceDue: DateTime(2025, 10, 20),
      shop: kigaliMotors,
    ),
  ];
}
