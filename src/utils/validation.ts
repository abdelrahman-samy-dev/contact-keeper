/**
 * Validates email address format
 * @param email - Email string to validate
 * @returns boolean - true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns boolean - true if valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
    if (!password || typeof password !== 'string') return false;
    // Password must be at least 6 characters and contain both letters and numbers
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= 6 && hasLetters && hasNumbers;
};

/**
 * Validates phone number format
 * @param phoneNumber - Phone number string to validate
 * @returns boolean - true if valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber || typeof phoneNumber !== 'string') return false;
    // Remove spaces, dashes, and parentheses
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    // Check if it's a valid phone number (7-15 digits, optionally starting with +)
    const phoneRegex = /^[\+]?[1-9][\d]{6,14}$/;
    return phoneRegex.test(cleanNumber);
};

/**
 * Validates name format
 * @param name - Name string to validate
 * @returns boolean - true if valid, false otherwise
 */
export const validateName = (name: string): boolean => {
    if (!name || typeof name !== 'string') return false;
    // Name must be at least 2 characters and contain only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
};