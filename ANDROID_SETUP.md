# Smart Habit Tracker - Android App Setup Guide

## System Architecture

```
Frontend: React + Vite
├── Build: dist/ folder
├── Capacitor: Android wrapper
└── Local Storage: SQLite (on-device)
```

## Prerequisites

Before you start, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **pnpm** (v7 or higher)
- **Java Development Kit (JDK)** (v11 or higher)
- **Android SDK** (API 31+)
- **Android Studio** (latest version)
- **Capacitor CLI** (v4+)

## Step 1: Install Capacitor Dependencies

Add Capacitor and SQLite plugin to your project:

```bash
npm install @capacitor/core @capacitor/cli @capacitor-community/sqlite
# or
pnpm add @capacitor/core @capacitor/cli @capacitor-community/sqlite
```

## Step 2: Initialize Capacitor

Initialize Capacitor in your project (if not already done):

```bash
npx cap init
```

When prompted:
- **App name**: Smart Habit Tracker
- **App Package**: com.smarthabittracker.app
- **App folder**: dist

## Step 3: Build Web App

Build your React app for production:

```bash
npm run build
# or
pnpm build
```

This creates the `dist/` folder that Capacitor will use.

## Step 4: Add Android Platform

Add Android as a target platform:

```bash
npx cap add android
```

This creates the `android/` folder with native code.

## Step 5: Install Android Dependencies

Navigate to the Android folder and build:

```bash
cd android
./gradlew build
cd ..
```

## Step 6: Update Android Gradle Configuration

Edit `android/build.gradle`:

```gradle
allprojects {
  repositories {
    google()
    mavenCentral()
  }
}
```

Edit `android/app/build.gradle`:

```gradle
android {
  compileSdk 33

  defaultConfig {
    targetSdk 33
    minSdk 24
    versionCode 1
    versionName "1.0.0"
  }

  compileOptions {
    sourceCompatibility JavaVersion.VERSION_11
    targetCompatibility JavaVersion.VERSION_11
  }
}

dependencies {
  implementation 'com.capacitorjs:core:4.x.x'
  implementation 'com.capacitor-community:sqlite:5.x.x'
}
```

## Step 7: Configure Capacitor Android Settings

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:usesCleartextTraffic="true"
        ...>
        <activity
            android:name="io.ionic.starter.MainActivity"
            android:exported="true"
            ...>
        </activity>
    </application>
</manifest>
```

## Step 8: Configure Capacitor in Main Activity

Edit `android/app/src/main/java/com/smarthabittracker/app/MainActivity.java`:

```java
package com.smarthabittracker.app;

import android.os.Bundle;
import com.capacitorjs.plugins.sqlite.CapacitorSQLite;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.registerPlugin(CapacitorSQLite.class);
  }
}
```

## Step 9: Open Project in Android Studio

Open the Android project in Android Studio:

```bash
npx cap open android
```

## Step 10: Build and Run on Emulator

### Option A: Using Android Studio

1. Open Android Studio
2. Select an emulator or connect a physical device
3. Click **Run** (green play button)
4. Select your device/emulator
5. Wait for the app to build and deploy

### Option B: Using Command Line

```bash
npx cap build android
```

Or run on a specific emulator:

```bash
npx cap run android
```

## Step 11: Develop with Live Reload (Optional)

For faster development, use live reload:

1. Start the dev server in one terminal:
```bash
npm run dev
```

2. In another terminal, sync and run:
```bash
npx cap sync android
npx cap run android
```

The app will reload when you make changes.

## Step 12: Build Release APK

When ready to release, build a release APK:

```bash
cd android
./gradlew build
```

Or build a signed APK:

1. In Android Studio: **Build → Generate Signed Bundle/APK**
2. Select **APK**
3. Choose or create a keystore
4. Fill in keystore details
5. Select **release** build type
6. Click **Finish**

The release APK will be in `android/app/release/`

## Database Schema Overview

The SQLite database includes these tables:

### user
- Stores user level, XP, and sentiment
- One record per user

### habits
- Stores all habit information
- Linked to completions

### badges
- Stores badge data and unlock status
- Pre-populated on first init

### completions
- Records each habit completion
- Tracks sentiment and reflection text

## File Structure

```
project/
├── client/
│   ├── services/
│   │   └── database.service.ts      # SQLite operations
│   ├── hooks/
│   │   └── useDatabase.ts           # React hooks
│   └── store/
│       └── gameStore.tsx            # Game state
├── android/                          # Native Android code
│   ├── app/
│   ├── build.gradle
│   └── ...
├── capacitor.config.ts              # Capacitor config
├── package.json
└── ANDROID_SETUP.md                 # This file
```

## Troubleshooting

### Database Not Found Error
- Ensure `capacitor.config.ts` exists in project root
- Verify Capacitor is initialized: `npx cap status`
- Clear build cache: `rm -rf android/.gradle`

### Build Fails
- Update Android SDK: Open Android Studio → SDK Manager
- Clear gradle cache: `./gradlew clean`
- Sync gradle files: In Android Studio → File → Sync Now

### App Crashes on Startup
- Check Android logcat for errors
- Ensure database hooks are called after `useDatabaseInit()`
- Verify all permissions in AndroidManifest.xml

### Live Reload Not Working
- Ensure your development machine IP is reachable
- Check firewall settings
- Restart emulator/device

## Environment Variables

Create a `.env` file for Android-specific config:

```
VITE_ANDROID_BUILD=true
VITE_DB_NAME=smarthabit.db
VITE_DB_VERSION=1
```

Use in your code:

```typescript
const dbName = import.meta.env.VITE_DB_NAME;
const isAndroid = import.meta.env.VITE_ANDROID_BUILD === 'true';
```

## Platform-Specific Code

Detect if running on Android/Capacitor:

```typescript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // Running in Capacitor app
  await databaseService.initialize();
} else {
  // Running in browser
  // Use localStorage or other fallback
}
```

## Update Capacitor

Keep Capacitor up to date:

```bash
npm update @capacitor/core @capacitor/cli
npx cap sync android
```

## Useful Commands

```bash
# Check Capacitor status
npx cap status

# Sync web files to Android
npx cap sync android

# Copy native files
npx cap copy android

# Open Android Studio
npx cap open android

# Run on device/emulator
npx cap run android

# Build for production
npm run build && npx cap sync android
```

## Publishing to Google Play Store

1. Create a Google Play Developer account
2. Generate a signed release APK (see Step 12)
3. Go to Google Play Console
4. Create a new app
5. Upload the signed APK
6. Fill in app details (screenshots, description, etc.)
7. Submit for review

For detailed instructions, see: https://developer.android.com/studio/publish

## Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **SQLite Plugin**: https://github.com/capacitor-community/sqlite
- **Android Docs**: https://developer.android.com/docs
- **React Hooks**: https://react.dev/reference/react/hooks

## Support

For issues or questions:
- Check Capacitor docs
- Review GitHub issues
- Ask in Capacitor Discord community

---

**Last Updated**: Today
**Version**: 1.0.0
