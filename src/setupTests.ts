import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock window.confirm
Object.defineProperty(window, 'confirm', {
    value: jest.fn(() => true),
});

// Mock window.alert
Object.defineProperty(window, 'alert', {
    value: jest.fn(),
});
