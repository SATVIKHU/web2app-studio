"use client";
import React, { useState } from 'react';
import { Smartphone, RefreshCw, WifiOff, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState("https://example.com");
  const [appName, setAppName] = useState("PIKACHU");
  const [packageName, setPackageName] = useState("com.satvik.app");
  const [themeColor, setThemeColor] = useState("#3B82F6");
  const [orientation, setOrientation] = useState("auto");
  const [pullToRefresh, setPullToRefresh] = useState(true);
  const [offlineFallback, setOfflineFallback] = useState(true);
  const [cornerBadge, setCornerBadge] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleBuild = async () => {
    setIsBuilding(true);
    try {
      const res = await fetch('/api/build-apk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, appName, packageName, themeColor, orientation, pullToRefresh, offlineFallback, cornerBadge })
      });
      const data = await res.json();
      alert("Build Triggered! Check status in GitHub pipeline.");
    } catch (e) {
      alert("API integration pending in Step 3!");
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Smartphone className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">Web2App Studio</h1>
        </div>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Satvik Engine
        </span>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">App Identity</h2>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Target Website URL</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">App Name</label>
              <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Package Identifier</label>
              <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Appearance & Settings</h2>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Theme / Status Bar Color</label>
              <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-12 h-10 border rounded-lg cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Orientation Lock</label>
              <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-white">
                <option value="auto">Auto-rotate / Sensor</option>
                <option value="portrait">Forced Portrait</option>
                <option value="landscape">Forced Landscape</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Security & Features</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Pull to Refresh</p>
                <p className="text-xs text-slate-500">Users can swipe down to reload</p>
              </div>
              <input type="checkbox" checked={pullToRefresh} onChange={(e) => setPullToRefresh(e.target.checked)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Offline Fallback</p>
                <p className="text-xs text-slate-500">Custom error page when offline</p>
              </div>
              <input type="checkbox" checked={offlineFallback} onChange={(e) => setOfflineFallback(e.target.checked)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Corner Badge "Built via Satvik"</p>
                <p className="text-xs text-slate-500">Fades after 3 seconds on startup</p>
              </div>
              <input type="checkbox" checked={cornerBadge} onChange={(e) => setCornerBadge(e.target.checked)} className="w-5 h-5" />
            </div>
          </div>

          <button onClick={handleBuild} disabled={isBuilding} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> {isBuilding ? "Initiating Build..." : "Generate Android APK"}
          </button>
        </div>

        {/* Right Phone Simulator */}
        <div className="flex flex-col items-center">
          <div className="mb-4 flex gap-3">
            <button onClick={() => setShowSplash(!showSplash)} className="text-xs font-semibold px-3 py-1.5 bg-slate-200 rounded-lg">
              {showSplash ? "Show App Webview" : "Preview 3s Splash"}
            </button>
          </div>

          {/* Device Frame */}
          <div className="w-[300px] h-[600px] bg-slate-900 rounded-[40px] p-3 shadow-2xl relative border-4 border-slate-800">
            {/* Dynamic Status Bar */}
            <div style={{ backgroundColor: themeColor }} className="w-full h-6 rounded-t-[30px] flex justify-between items-center px-4 text-[10px] text-white font-medium">
              <span>09:41</span>
              <span>100%</span>
            </div>

            {/* Viewport Content */}
            <div className="w-full h-[calc(100%-24px)] bg-white rounded-b-[30px] overflow-hidden relative">
              {showSplash ? (
                <div style={{ backgroundColor: themeColor }} className="w-full h-full flex flex-col items-center justify-center text-white p-4 text-center relative">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-3">
                    {appName.slice(0, 1)}
                  </div>
                  <h3 className="text-xl font-bold">{appName}</h3>
                  {cornerBadge && (
                    <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-[9px] px-2 py-1 rounded-md text-white/90 border border-white/10">
                      Built via Satvik
                    </div>
                  )}
                </div>
              ) : (
                <iframe src={url} className="w-full h-full border-none" title="Preview" />
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
