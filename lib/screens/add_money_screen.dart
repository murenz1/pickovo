import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/payment_method.dart';
import 'money_added_screen.dart';

class AddMoneyScreen extends StatefulWidget {
  const AddMoneyScreen({super.key});

  @override
  State<AddMoneyScreen> createState() => _AddMoneyScreenState();
}

class _AddMoneyScreenState extends State<AddMoneyScreen> {
  final TextEditingController _amountController = TextEditingController();
  final List<int> _quickAmounts = [5000, 10000, 20000, 50000];
  PaymentMethod? _selectedPaymentMethod;
  final List<PaymentMethod> _paymentMethods = getSamplePaymentMethods();

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
    if (_selectedPaymentMethod == null && _paymentMethods.isNotEmpty) {
      _selectedPaymentMethod = _paymentMethods.first;
    }
  }

  @override
  void dispose() {
    _amountController.dispose();
    super.dispose();
  }

  void _selectAmount(int amount) {
    setState(() {
      _amountController.text = amount.toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Money'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Amount Section
            const Text(
              'Amount',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _amountController,
              keyboardType: TextInputType.number,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: const InputDecoration(
                labelText: 'Enter Amount (FRw)',
                border: OutlineInputBorder(),
                prefixText: 'FRw ',
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Quick Amounts',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _quickAmounts.map((amount) {
                return ElevatedButton(
                  onPressed: () => _selectAmount(amount),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey.shade200,
                    foregroundColor: Colors.black,
                  ),
                  child: Text('FRw ${amount.toString()}'),
                );
              }).toList(),
            ),
            
            const SizedBox(height: 32),
            
            // Payment Method Section
            const Text(
              'Payment Method',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            
            // Payment Method Tabs
            Row(
              children: [
                Expanded(
                  child: _buildPaymentTab(PaymentMethodType.card),
                ),
                Expanded(
                  child: _buildPaymentTab(PaymentMethodType.mobileMoney),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            // Selected Payment Method
            if (_selectedPaymentMethod != null)
              Card(
                margin: const EdgeInsets.only(bottom: 16),
                child: RadioListTile<PaymentMethod>(
                  value: _selectedPaymentMethod!,
                  groupValue: _selectedPaymentMethod,
                  onChanged: (value) {
                    // Already selected
                  },
                  title: Row(
                    children: [
                      if (_selectedPaymentMethod!.type == PaymentMethodType.card)
                        const Icon(Icons.credit_card, size: 20)
                      else
                        const Icon(Icons.phone_android, size: 20),
                      const SizedBox(width: 8),
                      Text(_selectedPaymentMethod!.displayName),
                    ],
                  ),
                  subtitle: Text(_selectedPaymentMethod!.displaySubtitle),
                  secondary: const Icon(Icons.check_circle, color: Colors.green),
                ),
              ),
              
            const SizedBox(height: 16),
            
            // Add Card Button
            TextButton.icon(
              onPressed: () {
                // Navigate to add card screen
              },
              icon: const Icon(Icons.add),
              label: const Text('Add Card'),
            ),
            
            const SizedBox(height: 24),
            
            // Info Text
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Row(
                children: [
                  Icon(Icons.info_outline, color: Colors.blue),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Funds will be available in your wallet immediately after the transaction is complete.',
                      style: TextStyle(color: Colors.blue),
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Add Money Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  if (_amountController.text.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please enter an amount')),
                    );
                    return;
                  }
                  
                  final amount = int.tryParse(_amountController.text) ?? 0;
                  if (amount <= 0) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please enter a valid amount')),
                    );
                    return;
                  }
                  
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MoneyAddedScreen(amount: amount),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text('Add FRw ${_amountController.text.isEmpty ? "0" : _amountController.text} to Wallet'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPaymentTab(PaymentMethodType type) {
    final isSelected = _selectedPaymentMethod?.type == type;
    final label = type == PaymentMethodType.card ? 'Card' : 'Mobile Money';
    
    return InkWell(
      onTap: () {
        setState(() {
          // Find first payment method of this type
          for (var method in _paymentMethods) {
            if (method.type == type) {
              _selectedPaymentMethod = method;
              break;
            }
          }
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isSelected ? Colors.blue : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: isSelected ? Colors.blue : Colors.grey,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }
}
