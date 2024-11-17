export const DEFAULT_SETTINGS = {
  theme: 'light',
  maxMessageLength: 2000,
  messageLimit: 50,
  typingDelay: 300
};

export function getSetting(key) {
  return DEFAULT_SETTINGS[key] || null;
}

export function updateSetting(key, value) {
  if (key in DEFAULT_SETTINGS) {
      DEFAULT_SETTINGS[key] = value;
  }
}
