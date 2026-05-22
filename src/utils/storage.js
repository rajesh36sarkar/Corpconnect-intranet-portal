/**
 * Corporate Intranet Storage Manager
 * Secure, scoped localStorage wrapper with elegant error handling
 */

const STORAGE_PREFIX = 'corpconnect_';

export const storage = {
  /**
   * Retrieve data from storage with type safety
   * @param {string} key - Storage key
   * @param {*} defaultValue - Fallback value if key doesn't exist
   * @returns {*} Parsed JSON data or defaultValue
   */
  get: (key, defaultValue = null) => {
    try {
      const scopedKey = key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
      const item = localStorage.getItem(scopedKey);
      
      if (!item) return defaultValue;
      
      // Safe JSON parsing with graceful fallback
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[Storage] Failed to read "${key}":`, error.message);
      return defaultValue;
    }
  },
  
  /**
   * Store data in localStorage with JSON serialization
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  set: (key, value) => {
    try {
      const scopedKey = key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
      localStorage.setItem(scopedKey, JSON.stringify(value));
    } catch (error) {
      console.error(`[Storage] Failed to write "${key}":`, error.message);
    }
  },
  
  /**
   * Remove specific item from storage
   * @param {string} key - Storage key to remove
   */
  remove: (key) => {
    const scopedKey = key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(scopedKey);
  },
  
  /**
   * Clear workspace data while preserving user session
   * Protected keys remain untouched
   */
  clearWorkspace: () => {
    try {
      const protectedKeys = [
        `${STORAGE_PREFIX}user`,
        `${STORAGE_PREFIX}user_session`,
        `${STORAGE_PREFIX}theme_preference`
      ];

      Object.keys(localStorage).forEach((storageKey) => {
        if (storageKey.startsWith(STORAGE_PREFIX) && !protectedKeys.includes(storageKey)) {
          localStorage.removeItem(storageKey);
        }
      });
    } catch (error) {
      console.error('[Storage] Workspace clear failed:', error.message);
    }
  },

  /**
   * Full storage reset - use with caution
   */
  clearAll: () => {
    if (window.confirm('This will clear all application data. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  }
};

export default storage;