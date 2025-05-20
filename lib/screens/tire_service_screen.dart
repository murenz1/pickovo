import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/vehicle.dart';
import 'request_repair_screen.dart';

class TireServiceScreen extends StatefulWidget {
  const TireServiceScreen({super.key});

  @override
  State<TireServiceScreen> createState() => _TireServiceScreenState();
}

class _TireServiceScreenState extends State<TireServiceScreen> {
  final TextEditingController _locationController = TextEditingController();
  String? _selectedServiceType;
  String? _selectedGarage;
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  Vehicle? _selectedVehicle;
  
  final List<String> _garages = [
    'Auto Finit',
    'Kigali Motors',
    'Rwanda Garage',
    'City Mechanics',
  ];
  
  final List<Map<String, dynamic>> _tireServices = [
    {
      'name': 'Tire Replacement',
      'price': 'RWF 20,000',
      'icon': Icons.change_circle_outlined,
    },
    {
      'name': 'Tire Rotation',
      'price': 'RWF 15,000',
      'icon': Icons.rotate_90_degrees_ccw,
    },
    {
      'name': 'Wheel Alignment',
      'price': 'RWF 25,000',
      'icon': Icons.settings,
    },
    {
      'name': 'Tire Pressure',
      'price': 'RWF 5,000',
      'icon': Icons.speed,
    },
  ];

  @override
  void dispose() {
    _locationController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 30)),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppTheme.primaryColor,
            ),
          ),
          child: child!,
        );
      },
    );
    
    if (picked != null) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: const TimeOfDay(hour: 10, minute: 0),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppTheme.primaryColor,
            ),
          ),
          child: child!,
        );
      },
    );
    
    if (picked != null) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tire Service'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Service info section
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: Colors.blue[50],
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.tire_repair,
                      color: Colors.blue[700],
                      size: 30,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Tire Services',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          'Professional tire care for your vehicle',
                          style: TextStyle(
                            color: Colors.grey[600],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            const Divider(height: 1),
            
            // Service types grid
            Padding(
              padding: const EdgeInsets.all(16),
              child: GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                childAspectRatio: 2.5,
                children: _tireServices.map((service) {
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedServiceType = service['name'];
                      });
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: _selectedServiceType == service['name']
                              ? AppTheme.primaryColor
                              : Colors.grey[300]!,
                          width: _selectedServiceType == service['name'] ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(8),
                        color: _selectedServiceType == service['name']
                            ? AppTheme.primaryColor.withAlpha(26)
                            : Colors.white,
                      ),
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            service['name'],
                            style: TextStyle(
                              fontWeight: _selectedServiceType == service['name']
                                  ? FontWeight.bold
                                  : FontWeight.normal,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'From ${service['price']}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            
            const Divider(height: 1),
            
            // Booking form
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Book Battery Service',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Service Type
                  const Text(
                    'Service Type',
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[300]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedServiceType,
                        isExpanded: true,
                        hint: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16),
                          child: Text('Select service type'),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        items: _tireServices.map((service) {
                          return DropdownMenuItem<String>(
                            value: service['name'],
                            child: Text(service['name']),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedServiceType = value;
                          });
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Garage
                  const Text(
                    'Garage',
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[300]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedGarage,
                        isExpanded: true,
                        hint: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16),
                          child: Text('Select a garage'),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        items: _garages.map((garage) {
                          return DropdownMenuItem<String>(
                            value: garage,
                            child: Text(garage),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedGarage = value;
                          });
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Date and Time
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Date',
                              style: TextStyle(
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            GestureDetector(
                              onTap: () => _selectDate(context),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 12,
                                ),
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey[300]!),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      Icons.calendar_today,
                                      size: 18,
                                      color: Colors.grey[600],
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      _selectedDate == null
                                          ? 'mm/dd/yyyy'
                                          : '${_selectedDate!.month}/${_selectedDate!.day}/${_selectedDate!.year}',
                                      style: TextStyle(
                                        color: _selectedDate == null
                                            ? Colors.grey[600]
                                            : Colors.black,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Time',
                              style: TextStyle(
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            GestureDetector(
                              onTap: () => _selectTime(context),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 12,
                                ),
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey[300]!),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      Icons.access_time,
                                      size: 18,
                                      color: Colors.grey[600],
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      _selectedTime == null
                                          ? '--:-- --'
                                          : _selectedTime!.format(context),
                                      style: TextStyle(
                                        color: _selectedTime == null
                                            ? Colors.grey[600]
                                            : Colors.black,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  
                  // Location
                  const Text(
                    'Location',
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[300]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: TextField(
                      controller: _locationController,
                      decoration: InputDecoration(
                        hintText: 'Where should the service be done?',
                        border: InputBorder.none,
                        prefixIcon: Icon(
                          Icons.location_on_outlined,
                          color: Colors.grey[600],
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 12,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Vehicle
                  const Text(
                    'Vehicle',
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[300]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<Vehicle>(
                        value: _selectedVehicle,
                        isExpanded: true,
                        hint: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Row(
                            children: [
                              Icon(
                                Icons.directions_car_outlined,
                                color: Colors.grey[600],
                                size: 18,
                              ),
                              const SizedBox(width: 8),
                              const Text('Select your vehicle'),
                            ],
                          ),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        items: getSampleVehicles().map((vehicle) {
                          return DropdownMenuItem<Vehicle>(
                            value: vehicle,
                            child: Text('${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})'),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedVehicle = value;
                          });
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  
                  // Book Service Button
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () {
                        // Navigate to request repair screen with pre-filled information
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RequestRepairScreen(),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primaryColor,
                        foregroundColor: Colors.white,
                      ),
                      child: const Text('Book Service'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
