const STORAGE_PREFIX = "corpconnect_";

// Helper to keep key scoping logic DRY
const getScopedKey = (key) =>
  key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;

export const storage = {
  /**
   * Retrieve data from storage with type safety
   * @param {string} key - Storage key
   * @param {*} defaultValue - Fallback value if key doesn't exist
   * @returns {*} Parsed JSON data or defaultValue
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(getScopedKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`[Storage] Failed to read "${key}":`, error.message);
      return defaultValue;
    }
  },

  /**
   * Store data in localStorage with JSON serialization
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} True if successful, false if storage failed (e.g., quota exceeded)
   */
  set: (key, value) => {
    try {
      localStorage.setItem(getScopedKey(key), JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[Storage] Failed to write "${key}":`, error.message);
      return false;
    }
  },

  /**
   * Remove specific item from storage
   * @param {string} key - Storage key to remove
   */
  remove: (key) => {
    localStorage.removeItem(getScopedKey(key));
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
        `${STORAGE_PREFIX}theme_preference`,
      ];

      Object.keys(localStorage).forEach((storageKey) => {
        if (
          storageKey.startsWith(STORAGE_PREFIX) &&
          !protectedKeys.includes(storageKey)
        ) {
          localStorage.removeItem(storageKey);
        }
      });
    } catch (error) {
      console.error("[Storage] Workspace clear failed:", error.message);
    }
  },

  /**
   * Full storage reset - Scoped only to this application
   */
  clearAll: () => {
    try {
      Object.keys(localStorage).forEach((storageKey) => {
        if (storageKey.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(storageKey);
        }
      });
    } catch (error) {
      console.error("[Storage] Full clear failed:", error.message);
    }
  },
};

export default storage;
