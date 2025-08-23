const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withWakeLock(config) {
  return withAndroidManifest(config, (config) => {
    // Add WAKE_LOCK permission to AndroidManifest.xml
    if (
      !config.modResults.manifest["uses-permission"]?.some(
        (p) => p.$["android:name"] === "android.permission.WAKE_LOCK"
      )
    ) {
      config.modResults.manifest["uses-permission"] = [
        ...(config.modResults.manifest["uses-permission"] || []),
        { $: { "android:name": "android.permission.WAKE_LOCK" } },
      ];
    }
    return config;
  });
};
