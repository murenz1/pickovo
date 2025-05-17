import 'package:flutter/material.dart';

enum PaymentMethodType {
  card,
  mobileMoney,
  bankTransfer
}

class PaymentMethod {
  final String id;
  final String name;
  final String? lastFourDigits;
  final String? expiryDate;
  final PaymentMethodType type;
  final String? phoneNumber;
  final IconData icon;
  final Color backgroundColor;
  final bool isDefault;

  PaymentMethod({
    required this.id,
    required this.name,
    this.lastFourDigits,
    this.expiryDate,
    required this.type,
    this.phoneNumber,
    required this.icon,
    required this.backgroundColor,
    this.isDefault = false,
  });

  String get displayName {
    if (type == PaymentMethodType.card) {
      return '$name •••• ${lastFourDigits ?? ''}';
    } else if (type == PaymentMethodType.mobileMoney) {
      return '$name ${phoneNumber ?? ''}';
    } else {
      return name;
    }
  }

  String get displaySubtitle {
    if (type == PaymentMethodType.card && expiryDate != null) {
      return 'Expires $expiryDate';
    } else if (type == PaymentMethodType.mobileMoney && phoneNumber != null) {
      return phoneNumber!;
    } else {
      return '';
    }
  }
}

// Sample payment methods for testing
List<PaymentMethod> getSamplePaymentMethods() {
  return [
    PaymentMethod(
      id: '1',
      name: 'Visa',
      lastFourDigits: '4242',
      expiryDate: '12/25',
      type: PaymentMethodType.card,
      icon: Icons.credit_card,
      backgroundColor: Colors.white,
      isDefault: true,
    ),
    PaymentMethod(
      id: '2',
      name: 'MTN Mobile Money',
      phoneNumber: '+250 78 XXX XXX',
      type: PaymentMethodType.mobileMoney,
      icon: Icons.phone_android,
      backgroundColor: Colors.yellow.shade100,
    ),
    PaymentMethod(
      id: '3',
      name: 'Airtel Money',
      phoneNumber: '+250 73 XXX XXX',
      type: PaymentMethodType.mobileMoney,
      icon: Icons.phone_android,
      backgroundColor: Colors.red.shade100,
    ),
  ];
}
