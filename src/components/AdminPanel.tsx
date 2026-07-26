import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, Shield, Settings, Server, RefreshCw, FileSpreadsheet, Download, Check, AlertCircle, Copy, HelpCircle } from "lucide-react";
import { WalletRecord } from "../types";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [wallets, setWallets] = useState<WalletRecord[]>();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // Masked URL from status
  const [webhookStatus, setWebhookStatus] = useState({
    hasWebhook: false,
    webhookMasked: "None configured",
    webhookUrlLength: 0
  });

  const fetchWallets = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/wallets");
      const data = await res.json();
      if (data.success) {
        setWallets(data.wallets);
      }
    } catch (err) {
      console.error("Failed to fetch wallets:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchWebhookStatus = async () => {
    try {
      const res = await fetch("/api/settings/status");
      const data = await res.json();
      if (data.success) {
        setWebhookStatus({
          hasWebhook: data.hasWebhook,
          webhookMasked: data.webhookMasked,
          webhookUrlLength: data.webhookUrlLength
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        fetchWallets();
        fetchWebhookStatus();
      } else {
        setAuthError("Incorrect admin password. Default is 'admin'.");
      }
    } catch (err) {
      setAuthError("Failed to verify credentials on server.");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    setSaveError("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: password,
          webhookUrl: webhookUrl,
          password: newPassword || undefined
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveMessage("Settings updated successfully!");
        if (newPassword) {
          setPassword(newPassword); // Update current session password
          setNewPassword("");
        }
        fetchWebhookStatus();
        setWebhookUrl("");
      } else {
        setSaveError(data.error || "Failed to save settings");
      }
    } catch (err) {
      setSaveError("Failed to communicate with server");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearDb = async () => {
    if (!window.confirm("Are you sure you want to clear the local connected wallets database? This action cannot be undone.")) return;
    try {
      const res = await fetch("/api/wallets/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Database cleared successfully");
        fetchWallets();
      }
    } catch (err) {
      alert("Failed to clear database");
    }
  };

  // Convert wallets to CSV and trigger download
  const handleExportCSV = () => {
    if (!wallets || wallets.length === 0) return;
    const headers = "Wallet Address,X Username,Wallet Type,Connection Timestamp,Google Sheet Synced\n";
    const rows = wallets.map(w => `"${w.address}","${w.xHandle || ""}","${w.walletType}","${w.timestamp}",${w.sheetSynced}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `connected_wallets_${new Date().toISOString().slice(0,10)}.csv`);
    a.click();
  };

  const googleAppsScriptCode = `// Google Apps Script code to write connected wallets and X handles directly to Google Sheets
// 1. Open a Google Sheet.
// 2. Click Extensions > Apps Script.
// 3. Delete any default code and paste this script.
// 4. Click 'Deploy' (top right) > 'New Deployment'.
// 5. Select type: 'Web App'.
// 6. Set Description: 'Lupine Wallet & X Handle Webhook'.
// 7. Execute as: 'Me' (your email).
// 8. Who has access: 'Anyone'.
// 9. Click 'Deploy', authorize permissions, and copy the 'Web App URL'.
// 10. Paste that Web App URL in the Admin Panel settings below!

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add header if the sheet is empty
    if (sheet.getLastRow() == 0) {
      sheet.appendRow(["Wallet Address", "X Username", "Wallet Type", "Connection Timestamp", "Explorer URL"]);
    }
    
    // Append the wallet address and X handle logs
    sheet.appendRow([
      data.address,
      data.xHandle || "",
      data.walletType,
      data.timestamp,
      data.explorerUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div id="admin-panel-section" className="relative p-6 md:p-12 bg-[#0f2418] border border-[rgba(143,227,138,0.2)] font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-[#8fe38a]" />
          <h3 className="font-black text-xl text-[#ece6d6] uppercase tracking-wider">Google Sheets Sync Console</h3>
        </div>

        <p className="text-xs text-[#a39d8c] leading-relaxed mb-8 max-w-2xl">
          Track and synchronize registered addresses directly into your Google Sheets ledger in real-time.
        </p>

        <AnimatePresence mode="wait">
          {!isAdmin ? (
            /* Login Form */
            <motion.div 
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md p-6 bg-[#081410] border border-[rgba(143,227,138,0.3)] shadow-[4px_4px_0px_#8fe38a]"
            >
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex items-center gap-2 mb-2 text-[#8fe38a] text-xs uppercase font-bold tracking-wider">
                  <Key className="w-4 h-4" />
                  <span>Admin Authentication Required</span>
                </div>
                
                <div>
                  <label className="block text-[10px] text-[#a39d8c] uppercase tracking-wider mb-2">Admin Security Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (default: admin)"
                    className="w-full bg-[#0f2418] border border-[rgba(143,227,138,0.3)] focus:border-[#8fe38a] px-4 py-3 text-xs text-[#ece6d6] outline-none transition-all"
                  />
                </div>

                {authError && (
                  <div className="text-xs text-[#e05a3a] flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-fang-primary text-xs uppercase font-bold cursor-pointer"
                >
                  Unlock Ledger Console
                </button>
              </form>
            </motion.div>
          ) : (
            /* Dashboard Console */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-4 bg-[#081410] border border-[rgba(143,227,138,0.2)]">
                  <div className="text-[10px] text-[#a39d8c] uppercase tracking-widest mb-1">TOTAL_COLLECTED</div>
                  <div className="text-3xl font-black text-[#ece6d6]">{wallets ? wallets.length : 0}</div>
                </div>
                <div className="p-4 bg-[#081410] border border-[rgba(143,227,138,0.2)]">
                  <div className="text-[10px] text-[#a39d8c] uppercase tracking-widest mb-1">SHEETS_SYNCED</div>
                  <div className="text-3xl font-black text-[#8fe38a]">
                    {wallets ? wallets.filter(w => w.sheetSynced).length : 0}
                  </div>
                </div>
                <div className="p-4 bg-[#081410] border border-[rgba(143,227,138,0.2)]">
                  <div className="text-[10px] text-[#a39d8c] uppercase tracking-widest mb-1">GOOGLE_INTEGRATION</div>
                  <div className={`text-xs font-bold uppercase mt-2.5 inline-block px-2.5 py-0.5 border ${
                    webhookStatus.hasWebhook 
                      ? "bg-[#0f2418] border-[#8fe38a] text-[#8fe38a]" 
                      : "bg-[#081410] border-[#e05a3a] text-[#e05a3a]"
                  }`}>
                    {webhookStatus.hasWebhook ? "● Sync Active" : "○ Disconnected"}
                  </div>
                </div>
              </div>

              {/* Connected Wallets List */}
              <div className="p-6 bg-[#081410] border border-[rgba(143,227,138,0.2)]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#8fe38a]" />
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[#ece6d6]">Address Ledger</h4>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={fetchWallets}
                      disabled={isRefreshing}
                      className="p-2 bg-[#0f2418] border border-[rgba(143,227,138,0.2)] text-[#a39d8c] hover:text-[#ece6d6] transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </button>
                    <button
                      onClick={handleExportCSV}
                      disabled={!wallets || wallets.length === 0}
                      className="btn-fang-primary text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-[rgba(143,227,138,0.2)]">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-[#0f2418] text-[#a39d8c] border-b border-[rgba(143,227,138,0.2)]">
                        <th className="p-3">Wallet Address</th>
                        <th className="p-3">X Username</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Google Sheet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(143,227,138,0.1)]">
                      {!wallets || wallets.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-[#a39d8c] italic">No ledger addresses recorded yet.</td>
                        </tr>
                      ) : (
                        wallets.slice().reverse().map((record) => (
                          <tr key={record.address} className="hover:bg-[#0f2418]/50 text-[#ece6d6]">
                            <td className="p-3 truncate max-w-[160px] font-bold">{record.address}</td>
                            <td className="p-3 text-[#8fe38a] font-bold">{record.xHandle || "—"}</td>
                            <td className="p-3 uppercase text-[10px] text-[#a39d8c]">{record.walletType}</td>
                            <td className="p-3 text-[#a39d8c]">{new Date(record.timestamp).toLocaleString()}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 text-[9px] uppercase font-bold border ${
                                record.sheetSynced 
                                  ? "bg-[#0f2418] border-[#8fe38a] text-[#8fe38a]" 
                                  : "bg-[#081410] border-[#a39d8c] text-[#a39d8c]"
                              }`}>
                                {record.sheetSynced ? "✓ Synced" : "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sheet Integration Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Integration Help and Script */}
                <div className="p-6 bg-[#081410] border border-[rgba(143,227,138,0.2)] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-xs text-[#ece6d6] flex items-center gap-1.5 uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-[#8fe38a]" />
                        Google Apps Script Guide
                      </h4>
                      <button 
                        onClick={() => setShowHelp(!showHelp)}
                        className="text-xs text-[#8fe38a] hover:underline cursor-pointer"
                      >
                        {showHelp ? "[Hide Script]" : "[Show Script]"}
                      </button>
                    </div>
                    <p className="text-xs text-[#a39d8c] leading-relaxed mb-4">
                      Deploy this script in Google Apps Script to auto-sync wallet logins into your Google Sheet.
                    </p>
                  </div>

                  {showHelp && (
                    <div className="relative mt-2">
                      <pre className="text-[10px] bg-[#0f2418] p-3 text-[#ece6d6] border border-[rgba(143,227,138,0.2)] overflow-y-auto max-h-48 font-mono select-all">
                        {googleAppsScriptCode}
                      </pre>
                      <button
                        onClick={copyScriptToClipboard}
                        className="absolute top-2 right-2 p-1.5 bg-[#081410] border border-[rgba(143,227,138,0.3)] text-[#ece6d6] hover:border-[#8fe38a] transition-colors cursor-pointer"
                        title="Copy code to clipboard"
                      >
                        {copiedScript ? <Check className="w-3.5 h-3.5 text-[#8fe38a]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-[rgba(143,227,138,0.1)] flex items-center justify-between text-[10px] text-[#a39d8c]">
                    <span>MIME: application/json</span>
                    <span>METHOD: POST</span>
                  </div>
                </div>

                {/* Configuration Panel Form */}
                <div className="p-6 bg-[#081410] border border-[rgba(143,227,138,0.2)]">
                  <h4 className="font-bold text-xs text-[#ece6d6] mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#8fe38a]" />
                    Configure Google Sheet Sync
                  </h4>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div>
                      <label className="block text-[9px] text-[#a39d8c] uppercase tracking-widest mb-1.5">Google Web App Webhook URL</label>
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder={webhookStatus.hasWebhook ? `Masked: ${webhookStatus.webhookMasked}` : "Paste Web App URL here"}
                        className="w-full bg-[#0f2418] border border-[rgba(143,227,138,0.3)] focus:border-[#8fe38a] px-3 py-2.5 text-xs text-[#ece6d6] outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] text-[#a39d8c] uppercase tracking-widest mb-1.5">Update Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password"
                          className="w-full bg-[#0f2418] border border-[rgba(143,227,138,0.3)] focus:border-[#8fe38a] px-3 py-2.5 text-xs text-[#ece6d6] outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="w-full btn-fang-primary text-xs uppercase font-bold cursor-pointer disabled:opacity-50"
                        >
                          {isSaving ? "Saving..." : "Save Config"}
                        </button>
                      </div>
                    </div>

                    {saveMessage && (
                      <div className="text-[11px] text-[#8fe38a] flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>{saveMessage}</span>
                      </div>
                    )}
                    {saveError && (
                      <div className="text-[11px] text-[#e05a3a] flex items-center gap-1 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{saveError}</span>
                      </div>
                    )}
                  </form>

                  <div className="mt-5 pt-4 border-t border-[rgba(143,227,138,0.1)] flex justify-between">
                    <button
                      onClick={handleClearDb}
                      className="text-[10px] text-[#e05a3a] hover:underline cursor-pointer"
                    >
                      [Format Local Database]
                    </button>
                    <button
                      onClick={() => setIsAdmin(false)}
                      className="text-[10px] text-[#a39d8c] hover:text-[#ece6d6] cursor-pointer"
                    >
                      [Lock Panel]
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
