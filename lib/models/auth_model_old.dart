class AuthModel {
  final String? email;
  final String? password;
  final String? name;
  final bool isAuthenticated;
  final String? error;

  AuthModel({
    this.email,
    this.password,
    this.name,
    this.isAuthenticated = false,
    this.error,
  });

  AuthModel copyWith({
    String? email,
    String? password,
    String? name,
    bool? isAuthenticated,
    String? error,
  }) {
    return AuthModel(
      email: email ?? this.email,
      password: password ?? this.password,
      name: name ?? this.name,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      error: error,
    );
  }
}
