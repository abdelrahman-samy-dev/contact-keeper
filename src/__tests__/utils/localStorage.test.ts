import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, clearLocalStorage } from '../../utils/localStorage';

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

describe('localStorage utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('saveToLocalStorage', () => {
        it('should save data to localStorage', () => {
            const key = 'test-key';
            const data = { name: 'John', age: 30 };

            saveToLocalStorage(key, data);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(data));
        });

        it('should handle null data', () => {
            const key = 'test-key';

            saveToLocalStorage(key, null);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(key, 'null');
        });
    });

    describe('getFromLocalStorage', () => {
        it('should retrieve data from localStorage', () => {
            const key = 'test-key';
            const data = { name: 'John', age: 30 };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(data));

            const result = getFromLocalStorage(key);

            expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
            expect(result).toEqual(data);
        });

        it('should return null for non-existent key', () => {
            const key = 'non-existent-key';
            localStorageMock.getItem.mockReturnValue(null);

            const result = getFromLocalStorage(key);

            expect(result).toBeNull();
        });

        it('should handle invalid JSON', () => {
            const key = 'test-key';
            localStorageMock.getItem.mockReturnValue('invalid-json');

            const result = getFromLocalStorage(key);

            expect(result).toBeNull();
        });
    });

    describe('removeFromLocalStorage', () => {
        it('should remove data from localStorage', () => {
            const key = 'test-key';

            removeFromLocalStorage(key);

            expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
        });
    });

    describe('clearLocalStorage', () => {
        it('should clear all localStorage data', () => {
            clearLocalStorage();

            expect(localStorageMock.clear).toHaveBeenCalled();
        });
    });
});
