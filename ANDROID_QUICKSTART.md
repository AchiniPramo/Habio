# Smart Habit Tracker - Android Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Install Capacitor & SQLite

```bash
npm install @capacitor/core @capacitor/cli @capacitor-community/sqlite
```

### 2. Build the Web App

```bash
npm run build
```

### 3. Initialize Capacitor (if not done)

```bash
npx cap init
# App Name: Smart Habit Tracker
# App Package ID: com.smarthabittracker.app
# Web Dir: dist
```

### 4. Add Android Platform

```bash
npx cap add android
```

### 5. Open in Android Studio

```bash
npx cap open android
```

### 6. Run on Emulator/Device

In Android Studio:
- Select Emulator or Device
- Click **Run** (green play button)
- Wait for build and deployment

## ✅ Verification Checklist

- [ ] App starts without crashing
- [ ] Can create a habit
- [ ] Can complete a habit
- [ ] XP and level increase
- [ ] Data persists after restart
- [ ] Settings page shows all options
- [ ] Privacy Policy page opens
- [ ] Delete My Data dialog works

## 📱 Testing on Device

Connect Android phone via USB:

```bash
npx cap run android
```

Or manually:
1. Enable Developer Mode on phone
2. Enable USB Debugging
3. Connect via USB
4. Android Studio will detect device
5. Click Run

## 🔄 Development Workflow

For faster development:

**Terminal 1 (Dev Server):**
```bash
npm run dev
```

**Terminal 2 (Capacitor Sync):**
```bash
npx cap sync android && npx cap run android
```

Changes will reload automatically!

## 🛠️ Common Tasks

### Rebuild Android

```bash
npx cap build android
```

### Clear Build Cache

```bash
cd android
./gradlew clean
cd ..
```

### View Logs

```bash
# In Android Studio: View → Tool Windows → Logcat
# Or command line:
adb logcat | grep -i "smart\|capacitor\|sqlite"
```

### Debug Database

In your code:

```typescript
import { databaseService } from '@/services/database.service';

// Check database status
const habits = await databaseService.getAllHabits();
console.log('Habits:', habits);
```

## 📦 Build Release APK

```bash
npm run build
cd android
./gradlew build --build-type=release
```

Release APK: `android/app/release/app-release.apk`

For signed APK (required for Play Store):
1. Open Android Studio
2. **Build → Generate Signed Bundle/APK**
3. Follow wizard

## 🐛 Troubleshooting

### "Database not initialized"

```typescript
import { useDatabaseInit } from '@/hooks/useDatabase';

// In component:
const { isReady } = useDatabaseInit();
if (!isReady) return <Loading />;
```

### App crashes on startup

Check logcat:
```bash
adb logcat | grep "FATAL\|ERROR"
```

Make sure `AndroidManifest.xml` has required permissions:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### SQLite Plugin Not Found

Ensure in `android/app/src/main/java/MainActivity.java`:

```java
import com.capacitor-community.sqlite.CapacitorSQLite;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.registerPlugin(CapacitorSQLite.class);
  }
}
```

## 📚 Architecture Overview

```
React Component
      ↓
useDatabase Hook
      ↓
DatabaseService (SQLite)
      ↓
Capacitor SQLite Plugin
      ↓
Android SQLite Database
```

## 🔐 Data Persistence

All data automatically saves to SQLite on Android:
- ✅ Habits
- ✅ Streaks
- ✅ XP & Level
- ✅ Badges
- ✅ Completions
- ✅ Sentiment history

Data is encrypted and stored locally.

## 🚢 Deployment

### To Google Play Store

1. Build signed release APK
2. Create Google Play Developer account ($25)
3. Create app listing
4. Upload APK
5. Fill app details
6. Submit for review (24-48 hours)

See: https://developer.android.com/studio/publish

### TestFlight (iOS)

Once iOS is set up:

```bash
npx cap add ios
npx cap open ios
```

Then use Xcode to submit to TestFlight.

## 📊 File Structure

```
smart-habit-tracker/
├── client/
│   ├── services/
│   │   └── database.service.ts
│   ├── hooks/
│   │   └── useDatabase.ts
│   ├── lib/
│   │   └── platformInit.ts
│   └── components/
│       └── AppInitializer.tsx
├── android/                    ← Native Android code
├── capacitor.config.ts
├── package.json
├── ANDROID_SETUP.md          ← Full setup guide
└── ANDROID_QUICKSTART.md     ← This file
```

## 🎯 Next Steps

1. ✅ Complete quick setup
2. 🧪 Test app on device
3. 📱 Add more features
4. 🔒 Set up signing
5. 🚀 Submit to Play Store

## 💬 Need Help?

- Check logcat for errors
- Review ANDROID_SETUP.md for detailed info
- Visit: https://capacitorjs.com/docs
- Ask on Capacitor Discord

---

**Happy Building! 🎉**
