import type { CapacitorInstance } from '@capacitor/core';

export enum Platform {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

let Capacitor: CapacitorInstance | null = null;

// Lazy load Capacitor only if it's installed
try {
  Capacitor = require('@capacitor/core').Capacitor;
} catch (e) {
  console.log('[Platform] Capacitor not installed - running in web mode');
  Capacitor = null;
}

export const getPlatform = (): Platform => {
  if (Capacitor && Capacitor.isNativePlatform()) {
    if (Capacitor.getPlatform() === 'android') {
      return Platform.ANDROID;
    }
    if (Capacitor.getPlatform() === 'ios') {
      return Platform.IOS;
    }
  }
  return Platform.WEB;
};

export const isAndroid = (): boolean => getPlatform() === Platform.ANDROID;
export const isIOS = (): boolean => getPlatform() === Platform.IOS;
export const isWeb = (): boolean => getPlatform() === Platform.WEB;
export const isNative = (): boolean => Capacitor ? Capacitor.isNativePlatform() : false;

/**
 * Initialize platform-specific features
 */
export async function initializePlatform(): Promise<void> {
  const platform = getPlatform();

  console.log(`[Platform] Initializing for ${platform}`);

  if (isNative()) {
    // Initialize database for native platforms
    try {
      await databaseService.initialize();
      console.log('[Platform] Database initialized successfully');
    } catch (error) {
      console.error('[Platform] Database initialization error:', error);
      // Continue even if database fails - can use fallback
    }

    // Set up native event listeners
    setupNativeEventListeners();
  } else {
    // Setup web-specific features
    setupWebEventListeners();
  }
}

/**
 * Setup native event listeners (Android/iOS)
 */
function setupNativeEventListeners(): void {
  // Handle app pause/resume
  document.addEventListener('pause', () => {
    console.log('[Platform] App paused');
  });

  document.addEventListener('resume', () => {
    console.log('[Platform] App resumed');
    // Sync data when app resumes
  });

  // Handle app back button on Android
  document.addEventListener('backbutton', (event) => {
    console.log('[Platform] Back button pressed');
  });
}

/**
 * Setup web event listeners
 */
function setupWebEventListeners(): void {
  // Handle browser visibility
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('[Platform] Browser tab hidden');
    } else {
      console.log('[Platform] Browser tab visible');
    }
  });

  // Handle online/offline
  window.addEventListener('online', () => {
    console.log('[Platform] App is online');
  });

  window.addEventListener('offline', () => {
    console.log('[Platform] App is offline');
  });
}

/**
 * Get device information
 */
export async function getDeviceInfo(): Promise<{
  platform: Platform;
  isNative: boolean;
  os: string;
  appVersion: string;
}> {
  const platform = getPlatform();

  let os = '';
  if (isAndroid()) {
    os = 'Android';
  } else if (isIOS()) {
    os = 'iOS';
  } else {
    os = navigator.userAgent;
  }

  return {
    platform,
    isNative: isNative(),
    os,
    appVersion: '1.0.0',
  };
}

/**
 * Handle app-level errors
 */
export function setupErrorHandling(): void {
  window.addEventListener('error', (event) => {
    console.error('[Platform] Unhandled error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Platform] Unhandled promise rejection:', event.reason);
  });
}

/**
 * Database status checker
 */
export async function checkDatabaseStatus(): Promise<{
  initialized: boolean;
  accessible: boolean;
  error?: string;
}> {
  if (!isNative()) {
    return {
      initialized: false,
      accessible: false,
      error: 'Not running on native platform',
    };
  }

  try {
    const userData = await databaseService.getUserData('user-1');
    return {
      initialized: !!userData,
      accessible: true,
    };
  } catch (error) {
    return {
      initialized: false,
      accessible: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get storage path info (Android/iOS specific)
 */
export async function getStorageInfo(): Promise<{
  type: 'database' | 'filesystem';
  location: string;
  platform: Platform;
}> {
  const platform = getPlatform();

  if (isAndroid()) {
    return {
      type: 'database',
      location: 'app-specific directory',
      platform: Platform.ANDROID,
    };
  }

  if (isIOS()) {
    return {
      type: 'database',
      location: 'app-specific documents',
      platform: Platform.IOS,
    };
  }

  return {
    type: 'filesystem',
    location: 'localStorage / IndexedDB',
    platform: Platform.WEB,
  };
}

// Export platform detection for use in components
export const platformUtils = {
  getPlatform,
  isAndroid,
  isIOS,
  isWeb,
  isNative,
  getDeviceInfo,
  checkDatabaseStatus,
  getStorageInfo,
  initializePlatform,
  setupErrorHandling,
};
