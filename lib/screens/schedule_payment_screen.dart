import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/payment_method.dart';
import 'package:intl/intl.dart';

class SchedulePaymentScreen extends StatefulWidget {
  const SchedulePaymentScreen({super.key});

  @override
  State<SchedulePaymentScreen> createState() => _SchedulePaymentScreenState();
}

class _SchedulePaymentScreenState extends State<SchedulePaymentScreen> {
  final List<PaymentMethod> _paymentMethods = getSamplePaymentMethods();
  PaymentMethod? _selectedPaymentMethod;
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();
  String _selectedPaymentType = 'Insurance Premium';
  String _selectedInsurancePolicy = 'Toyota Camry-Basic Plan';
  String _selectedFrequency = 'One time';

  final List<String> _paymentTypes = [
    'Insurance Premium',
    'Loan Payment',
    'Service Payment',
    'Other'
  ];

  final List<String> _insurancePolicies = [
    'Toyota Camry-Basic Plan',
    'Toyota Corolla-Full Coverage',
    'Nissan X-Trail-Comprehensive'
  ];

  final List<String> _frequencies = [
    'One time',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Annually'
  ];

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
  void dispose() {
    _amountController.dispose();
    _dateController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() {
        _dateController.text = DateFormat('MM/dd/yyyy').format(picked);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Schedule Payment'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Payment Details Section
            Card(
              margin: const EdgeInsets.only(bottom: 24),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Payment Details',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // Payment Type Dropdown
                    const Text('Payment Type'),
                    const SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      value: _selectedPaymentType,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                      items: _paymentTypes.map((String type) {
                        return DropdownMenuItem<String>(
                          value: type,
                          child: Text(type),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedPaymentType = newValue!;
                        });
                      },
                    ),
                    const SizedBox(height: 16),
                    
                    // Insurance Policy Dropdown
                    const Text('Insurance Policy'),
                    const SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      value: _selectedInsurancePolicy,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                      items: _insurancePolicies.map((String policy) {
                        return DropdownMenuItem<String>(
                          value: policy,
                          child: Text(policy),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedInsurancePolicy = newValue!;
                        });
                      },
                    ),
                    const SizedBox(height: 16),
                    
                    // Amount Field
                    const Text('Amount (FRw)'),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _amountController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        hintText: '15000',
                      ),
                      keyboardType: TextInputType.number,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    ),
                    const SizedBox(height: 16),
                    
                    // Payment Date Field
                    Row(
                      children: [
                        Checkbox(
                          value: _dateController.text.isNotEmpty,
                          onChanged: (value) {
                            if (value == true) {
                              _selectDate(context);
                            } else {
                              setState(() {
                                _dateController.text = '';
                              });
                            }
                          },
                        ),
                        const Text('Payment Date'),
                      ],
                    ),
                    if (_dateController.text.isNotEmpty)
                      TextField(
                        controller: _dateController,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'MM/DD/YYYY',
                          suffixIcon: Icon(Icons.calendar_today),
                        ),
                        readOnly: true,
                        onTap: () => _selectDate(context),
                      ),
                    const SizedBox(height: 16),
                    
                    // Frequency Dropdown
                    const Text('Frequency'),
                    const SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      value: _selectedFrequency,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                      items: _frequencies.map((String frequency) {
                        return DropdownMenuItem<String>(
                          value: frequency,
                          child: Text(frequency),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedFrequency = newValue!;
                        });
                      },
                    ),
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

            // Schedule Payment Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Validate inputs
                  if (_amountController.text.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please enter an amount')),
                    );
                    return;
                  }
                  
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
                      title: const Text('Payment Scheduled'),
                      content: const Text('Your payment has been scheduled successfully.'),
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
                child: const Text('Schedule Payment'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
