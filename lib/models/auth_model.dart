class AuthModel {
  final String? email;
  final String? password;
  final bool isAuthenticated;
  final String? error;

  AuthModel({
    this.email,
    this.password,
    this.isAuthenticated = false,
    this.error,
  });

  AuthModel copyWith({
    String? email,
    String? password,
    bool? isAuthenticated,
    String? error,
  }) {
    return AuthModel(
      email: email ?? this.email,
      password: password ?? this.password,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      error: error,
    );
  }
}
