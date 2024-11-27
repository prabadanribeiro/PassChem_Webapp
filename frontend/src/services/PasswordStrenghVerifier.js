class PasswordStrengthVerifier {
  static checkPassword(password) {
    return (
      password.length >= 8 &&
      /\d/.test(password) && // Checks for number
      /[A-Z]/.test(password) && // Checks for uppercase
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // Checks for special character
    );
  }
}

export default PasswordStrengthVerifier;