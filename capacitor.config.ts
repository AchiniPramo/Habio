import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smarthabittracker.app',
  appName: 'Smart Habit Tracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/Databases',
      iosIsEncryption: false,
      iosKeychainPrefix: 'smarthabit',
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth: false,
        biometricAuthMode: 'BiometricPromptApi',
      },
      resetExistingDatabase: false,
      sqliteRecovery: 'restore',
    },
  },
};

export default config;
