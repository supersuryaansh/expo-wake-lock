import { requireNativeModule } from "expo-modules-core";
type ExpoWakeLockModuleType = {
  acquire(): void;
  release(): void;
  isHeld(): boolean;
};

const ExpoWakeLockModule = requireNativeModule<ExpoWakeLockModuleType>(
  "ExpoWakeLock"
);

export function acquireWakeLock() {
  return ExpoWakeLockModule.acquire();
}

export function releaseWakeLock() {
  return ExpoWakeLockModule.release();
}

export function isWakeLockHeld() {
  return ExpoWakeLockModule.isHeld();
}
