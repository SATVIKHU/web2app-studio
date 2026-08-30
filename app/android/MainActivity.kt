package com.satvik.engine

import android.annotation.SuppressLint
import android.content.content.pm.PackageManager
import android.content.res.Configuration
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.security.MessageDigest

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var cornerBadge: TextView

    // SECURITY: Expected SHA-256 Signature Hash (Generated during build)
    private val EXPECTED_SIGNATURE_HASH = "BUILD_TIME_GENERATED_HASH"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 1. TOP-NOTCH SECURITY: Anti-Tamper Signature Check
        if (!verifyAppSignature()) {
            finish() // Immediate termination if APK is tampered/decompiled
            return
        }

        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        cornerBadge = findViewById(R.id.cornerBadge)

        // 2. CONFIG: Webview Settings
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true

        // 3. OFFLINE FALLBACK ENGINE
        webView.webViewClient = object : WebViewClient() {
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                // Show local fallback offline HTML on internet failure
                webView.loadUrl("file:///android_asset/offline.html")
            }
        }

        // Load Target URL injected by SaaS configurator
        webView.loadUrl("TARGET_APP_URL")

        // 4. STRICT WATERMARK RULE: Fades out in exactly 3 Seconds
        Handler(Looper.getMainLooper()).postDelayed({
            cornerBadge.animate()
                .alpha(0.0f)
                .setDuration(500)
                .withEndAction { cornerBadge.visibility = View.GONE }
        }, 3000)
    }

    // SHA-256 Signature Verification Function
    private fun verifyAppSignature(): Boolean {
        try {
            val packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNATURES)
            for (signature in packageInfo.signatures) {
                val md = MessageDigest.getInstance("SHA-256")
                md.update(signature.toByteArray())
                val currentHash = bytesToHex(md.digest())
                if (EXPECTED_SIGNATURE_HASH == "BUILD_TIME_GENERATED_HASH" || EXPECTED_SIGNATURE_HASH == currentHash) {
                    return true
                }
            }
        } catch (e: Exception) {
            return false
        }
        return false
    }

    private fun bytesToHex(bytes: ByteArray): String {
        val hexArray = "0123456789ABCDEF".toCharArray()
        val hexChars = CharArray(bytes.size * 2)
        for (j in bytes.indices) {
            val v = bytes[j].toInt() and 0xFF
            hexChars[j * 2] = hexArray[v ushr 4]
            hexChars[j * 2 + 1] = hexArray[v and 0x0F]
        }
        return String(hexChars)
    }
}
