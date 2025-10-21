import { validateEmail, validatePassword, validatePhoneNumber, validateName } from '../../utils/validation';

describe('Validation Utils', () => {
    describe('validateEmail', () => {
        it('should return true for valid email addresses', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
            expect(validateEmail('test+tag@example.org')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should return true for valid passwords', () => {
            expect(validatePassword('password123')).toBe(true);
            expect(validatePassword('MyPass123')).toBe(true);
            expect(validatePassword('Test123!')).toBe(true);
        });

        it('should return false for invalid passwords', () => {
            expect(validatePassword('123')).toBe(false);
            expect(validatePassword('password')).toBe(false);
            expect(validatePassword('123456')).toBe(false);
            expect(validatePassword('')).toBe(false);
        });
    });

    describe('validatePhoneNumber', () => {
        it('should return true for valid phone numbers', () => {
            expect(validatePhoneNumber('+1234567890')).toBe(true);
            expect(validatePhoneNumber('1234567890')).toBe(true);
            expect(validatePhoneNumber('+201234567890')).toBe(true);
        });

        it('should return false for invalid phone numbers', () => {
            expect(validatePhoneNumber('123')).toBe(false);
            expect(validatePhoneNumber('abc123')).toBe(false);
            expect(validatePhoneNumber('')).toBe(false);
        });
    });

    describe('validateName', () => {
        it('should return true for valid names', () => {
            expect(validateName('John Doe')).toBe(true);
            expect(validateName('Jane Smith')).toBe(true);
            expect(validateName('Ahmed Ali')).toBe(true);
        });

        it('should return false for invalid names', () => {
            expect(validateName('J')).toBe(false);
            expect(validateName('John123')).toBe(false);
            expect(validateName('')).toBe(false);
        });
    });
});
