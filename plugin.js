// plugin.js
module.exports = function withWakeLock(config) {
  return require("expo/config-plugins").withAndroidManifest(config, async (config) => {
    const usesPermission = {
      name: "android.permission.WAKE_LOCK",
    };

    if (
      !config.modResults.manifest["uses-permission"]?.some(
        (perm) => perm.$?.["android:name"] === "android.permission.WAKE_LOCK"
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
