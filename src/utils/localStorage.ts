/**
 * Saves data to localStorage
 * @param key - Storage key
 * @param data - Data to store
 */
export const saveToLocalStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

/**
 * Retrieves data from localStorage
 * @param key - Storage key
 * @returns Parsed data or null if not found
 */
export const getFromLocalStorage = (key: string): any => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

/**
 * Removes data from localStorage
 * @param key - Storage key to remove
 */
export const removeFromLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

/**
 * Clears all localStorage data
 */
export const clearLocalStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};