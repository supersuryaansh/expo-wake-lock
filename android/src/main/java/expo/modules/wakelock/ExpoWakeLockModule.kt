package expo.modules.wakelock

import android.content.Context
import android.os.PowerManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoWakeLockModule : Module() {
  private var wakeLock: PowerManager.WakeLock? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoWakeLock")

    Function("acquire") {
      val context: Context = appContext.reactContext ?: return@Function null
      val pm = context.getSystemService(Context.POWER_SERVICE) as PowerManager

      if (wakeLock == null || !(wakeLock?.isHeld ?: false)) {
        wakeLock = pm.newWakeLock(
          PowerManager.PARTIAL_WAKE_LOCK,
          "ExpoWakeLock::WakeLockTag"
        )
        wakeLock?.acquire()
      }
      null // Explicitly return Any? so Kotlin doesn’t infer Unit
    }

    Function("release") {
      if (wakeLock?.isHeld == true) {
        wakeLock?.release()
      }
      wakeLock = null
      null // Explicit return
    }

    Function("isHeld") {
      wakeLock?.isHeld == true // This evaluates to Boolean, fine for Any?
    }
  }
}
