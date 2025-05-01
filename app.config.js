// app.config.js
module.exports = {
  name: "CyberCare",
  slug: "cybercare",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#286964"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#286964"
    }
  },
  web: {
    favicon: "./assets/images/favicon.png"
  },
  extra: {
    eas: {
      projectId: "your-project-id"
    }
  },
  plugins: [
    "expo-router"
  ]
}; 