class MaintenanceItem {
  final String type;
  final DateTime dueDate;
  final DateTime? lastService;
  final int mileage;
  final String description;
  final bool isCompleted;

  MaintenanceItem({
    required this.type,
    required this.dueDate,
    this.lastService,
    required this.mileage,
    this.description = '',
    this.isCompleted = false,
  });
}

class Vehicle {
  final String id;
  final String make;
  final String model;
  final String licensePlate;
  final int year;
  final String imageUrl;
  final String color;
  final List<MaintenanceItem> maintenanceItems;

  Vehicle({
    required this.id,
    required this.make,
    required this.model,
    required this.licensePlate,
    required this.year,
    this.imageUrl = '',
    this.color = '',
    this.maintenanceItems = const [],
  });
}

// Sample data for vehicles
List<Vehicle> getSampleVehicles() {
  return [
    Vehicle(
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      licensePlate: 'BA01234',
      year: 2020,
      color: 'Silver',
      maintenanceItems: [
        MaintenanceItem(
          type: 'Oil Change',
          dueDate: DateTime.now().add(const Duration(days: 2)),
          lastService: DateTime.now().subtract(const Duration(days: 90)),
          mileage: 5000,
          description: 'Regular oil change with filter replacement',
        ),
        MaintenanceItem(
          type: 'Tire Rotation',
          dueDate: DateTime.now().add(const Duration(days: 15)),
          lastService: DateTime.now().subtract(const Duration(days: 180)),
          mileage: 10000,
          description: 'Rotate tires to ensure even wear',
        ),
      ],
    ),
    Vehicle(
      id: '2',
      make: 'Honda',
      model: 'Civic',
      licensePlate: 'RAC 881C',
      year: 2019,
      color: 'Blue',
      maintenanceItems: [
        MaintenanceItem(
          type: 'Brake Service',
          dueDate: DateTime.now().add(const Duration(days: 5)),
          lastService: DateTime.now().subtract(const Duration(days: 120)),
          mileage: 15000,
          description: 'Brake pad replacement and fluid check',
        ),
      ],
    ),
    Vehicle(
      id: '3',
      make: 'Ford',
      model: 'Escape',
      licensePlate: 'KGL 456P',
      year: 2021,
      color: 'Red',
      maintenanceItems: [
        MaintenanceItem(
          type: 'Battery',
          dueDate: DateTime.now().subtract(const Duration(days: 5)),
          lastService: DateTime.now().subtract(const Duration(days: 365)),
          mileage: 20000,
          description: 'Battery replacement due to age',
          isCompleted: false,
        ),
      ],
    ),
  ];
}
