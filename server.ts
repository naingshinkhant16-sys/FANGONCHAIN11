import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Local file database paths
const WALLETS_FILE = path.join(process.cwd(), "wallets.json");
const SETTINGS_FILE = path.join(process.cwd(), "settings.json");

// Utility to read JSON database safely
function readJSONFile(filePath: string, defaultData: any) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf8");
      return defaultData;
    }
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return defaultData;
  }
}

// Utility to write JSON database safely
function writeJSONFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// Ensure files exist on startup
readJSONFile(WALLETS_FILE, []);
readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });

// API: List of all wallets
app.get("/api/wallets", (req, res) => {
  const wallets = readJSONFile(WALLETS_FILE, []);
  res.json({ success: true, wallets });
});

// API: Connect and store wallet
app.post("/api/wallet", async (req, res) => {
  const { address, xHandle, walletType } = req.body;
  
  if (!address || typeof address !== "string") {
    return res.status(400).json({ success: false, error: "Invalid wallet address" });
  }

  const wallets = readJSONFile(WALLETS_FILE, []);
  
  // Check if already exists
  const existingIndex = wallets.findIndex((w: any) => w.address.toLowerCase() === address.toLowerCase());
  const timestamp = new Date().toISOString();
  
  let newlyAdded = false;
  let statusMessage = "Wallet already registered";

  const walletData = {
    address,
    xHandle: xHandle ? String(xHandle).trim() : "",
    walletType: walletType || "Unknown",
    timestamp,
    sheetSynced: false,
    sheetError: null as string | null
  };

  if (existingIndex === -1) {
    wallets.push(walletData);
    writeJSONFile(WALLETS_FILE, wallets);
    newlyAdded = true;
    statusMessage = "Wallet address registered successfully";
  } else {
    // Update timestamp, xHandle and type
    wallets[existingIndex].timestamp = timestamp;
    if (xHandle) {
      wallets[existingIndex].xHandle = String(xHandle).trim();
    }
    wallets[existingIndex].walletType = walletType || wallets[existingIndex].walletType;
    writeJSONFile(WALLETS_FILE, wallets);
  }

  // Attempt Google Sheet Webhook Sync if Webhook URL is set
  const settings = readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });
  // CHANGED: prefer environment variable (works on Vercel), fall back to local settings.json (works locally)
  const webhookUrl = process.env.WEBHOOK_URL || settings.webhookUrl;
  let webhookTriggered = false;
  let webhookSuccess = false;
  let webhookErrorMessage = "";

  if (webhookUrl) {
    webhookTriggered = true;
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "append_wallet",
          address: address,
          xHandle: xHandle ? String(xHandle).trim() : (wallets[existingIndex]?.xHandle || ""),
          walletType: walletType || "Unknown",
          timestamp: timestamp,
          explorerUrl: `https://etherscan.io/address/${address}`
        }),
      });

      if (response.ok) {
        webhookSuccess = true;
        // Update local sheetSynced status
        const updatedWallets = readJSONFile(WALLETS_FILE, []);
        const itemIdx = updatedWallets.findIndex((w: any) => w.address.toLowerCase() === address.toLowerCase());
        if (itemIdx !== -1) {
          updatedWallets[itemIdx].sheetSynced = true;
          updatedWallets[itemIdx].sheetError = null;
          writeJSONFile(WALLETS_FILE, updatedWallets);
        }
      } else {
        const errorText = await response.text();
        webhookErrorMessage = `Server returned status ${response.status}: ${errorText}`;
        console.error("Webhook sync failed:", webhookErrorMessage);
        
        const updatedWallets = readJSONFile(WALLETS_FILE, []);
        const itemIdx = updatedWallets.findIndex((w: any) => w.address.toLowerCase() === address.toLowerCase());
        if (itemIdx !== -1) {
          updatedWallets[itemIdx].sheetSynced = false;
          updatedWallets[itemIdx].sheetError = webhookErrorMessage;
          writeJSONFile(WALLETS_FILE, updatedWallets);
        }
      }
    } catch (error: any) {
      webhookErrorMessage = error?.message || String(error);
      console.error("Error calling webhook:", error);
      
      const updatedWallets = readJSONFile(WALLETS_FILE, []);
      const itemIdx = updatedWallets.findIndex((w: any) => w.address.toLowerCase() === address.toLowerCase());
      if (itemIdx !== -1) {
        updatedWallets[itemIdx].sheetSynced = false;
        updatedWallets[itemIdx].sheetError = webhookErrorMessage;
        writeJSONFile(WALLETS_FILE, updatedWallets);
      }
    }
  }

  res.json({
    success: true,
    message: statusMessage,
    newlyAdded,
    webhookTriggered,
    webhookSuccess,
    webhookError: webhookErrorMessage || null,
    wallet: walletData
  });
});

// API: Save configuration / settings (including Webhook URL)
app.post("/api/settings", (req, res) => {
  const { webhookUrl, password, currentPassword } = req.body;
  const settings = readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });

  // Simple authentication checkpoint
  if (currentPassword !== settings.password) {
    return res.status(401).json({ success: false, error: "Incorrect password" });
  }

  if (typeof webhookUrl === "string") {
    settings.webhookUrl = webhookUrl.trim();
  }
  if (password && typeof password === "string" && password.trim().length >= 4) {
    settings.password = password.trim();
  }

  writeJSONFile(SETTINGS_FILE, settings);
  res.json({ success: true, message: "Settings updated successfully" });
});

// API: Get webhook active status (doesn't expose the full URL or password to regular clients)
app.get("/api/settings/status", (req, res) => {
  const settings = readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });
  const webhookUrl = process.env.WEBHOOK_URL || settings.webhookUrl;
  res.json({
    success: true,
    hasWebhook: !!webhookUrl,
    webhookUrlLength: webhookUrl ? webhookUrl.length : 0,
    webhookMasked: webhookUrl ? `${webhookUrl.substring(0, 15)}...${webhookUrl.slice(-5)}` : "None configured"
  });
});

// API: Reset / Clear wallet database (Requires password)
app.post("/api/wallets/clear", (req, res) => {
  const { password } = req.body;
  const settings = readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });

  if (password !== settings.password) {
    return res.status(401).json({ success: false, error: "Incorrect password" });
  }

  writeJSONFile(WALLETS_FILE, []);
  res.json({ success: true, message: "Wallet database cleared successfully" });
});

// API: Check admin password
app.post("/api/admin/verify", (req, res) => {
  const { password } = req.body;
  const settings = readJSONFile(SETTINGS_FILE, { webhookUrl: "", password: "admin" });
  
  if (password === settings.password) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: "Incorrect password" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve HTML
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();