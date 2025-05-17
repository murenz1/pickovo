import 'package:flutter/material.dart';
import '../models/payment_method.dart';

class PayForRepairScreen extends StatefulWidget {
  const PayForRepairScreen({super.key});

  @override
  State<PayForRepairScreen> createState() => _PayForRepairScreenState();
}

class _PayForRepairScreenState extends State<PayForRepairScreen> {
  final List<PaymentMethod> _paymentMethods = getSamplePaymentMethods();
  PaymentMethod? _selectedPaymentMethod;

  // Sample repair details
  final Map<String, String> _repairDetails = {
    'Repair ID': '#REP-2023-0042',
    'Service': 'Engine Diagnostics',
    'Garage': 'AutoFix Garage',
    'Vehicle': 'Toyota Corolla KBZ 123A',
    'Date': 'May 15, 2025',
    'Total Amount': 'FRw 4,500',
  };

  @override
  void initState() {
    super.initState();
    // Set default payment method if available
    for (var method in _paymentMethods) {
      if (method.isDefault) {
        _selectedPaymentMethod = method;
        break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pay for Repair'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Repair Details Section
            Card(
              margin: const EdgeInsets.only(bottom: 24),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Repair Details',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ..._repairDetails.entries.map((entry) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(
                              width: 100,
                              child: Text(
                                entry.key,
                                style: const TextStyle(
                                  color: Colors.grey,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                entry.value,
                                style: TextStyle(
                                  fontWeight: entry.key == 'Total Amount'
                                      ? FontWeight.bold
                                      : FontWeight.normal,
                                  color: entry.key == 'Total Amount'
                                      ? Colors.blue
                                      : Colors.black,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                  ],
                ),
              ),
            ),

            // Payment Method Section
            const Text(
              'Payment Method',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            // Payment Method Options
            ...List.generate(_paymentMethods.length, (index) {
              final method = _paymentMethods[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: RadioListTile<PaymentMethod>(
                  value: method,
                  groupValue: _selectedPaymentMethod,
                  onChanged: (value) {
                    setState(() {
                      _selectedPaymentMethod = value;
                    });
                  },
                  title: Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: method.type == PaymentMethodType.card
                            ? Colors.white
                            : method.backgroundColor,
                        child: method.type == PaymentMethodType.card
                            ? const Icon(Icons.credit_card, color: Colors.blue)
                            : Text(
                                method.name.substring(0, 3).toUpperCase(),
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                      ),
                      const SizedBox(width: 12),
                      Text(method.displayName),
                    ],
                  ),
                  subtitle: Text(method.displaySubtitle),
                ),
              );
            }),

            // Add Payment Method Button
            TextButton.icon(
              onPressed: () {
                // Navigate to add payment method screen
              },
              icon: const Icon(Icons.add),
              label: const Text('Add Payment Method'),
            ),

            const SizedBox(height: 32),

            // Pay Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  if (_selectedPaymentMethod == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please select a payment method')),
                    );
                    return;
                  }

                  // Show success dialog
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Payment Successful'),
                      content: const Text('Your payment has been processed successfully.'),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context); // Close dialog
                            Navigator.pop(context); // Go back to wallet screen
                          },
                          child: const Text('OK'),
                        ),
                      ],
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text('Pay FRw 4,500'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
