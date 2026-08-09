const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

// Replace lucide-react imports with window.LucideIcons
code = code.replace(/import\s+\{([^}]+)\}\s+from\s+["']lucide-react["'];?/g, (match, p1) => {
  const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
  return `const { ${icons.join(', ')} } = window.LucideIcons;`;
});

// Replace import { api } from "./api"; with inlined api helper
code = code.replace(/import\s+\{\s*api\s*\}\s+from\s+["']\.\/api["'];?/g, '');

const apiHelperCode = `
const BASE_URL = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('kamai_token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

async function apiRequest(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };
  const response = await fetch(BASE_URL + endpoint, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Kuch galat ho gaya.');
  return data;
}

const api = {
  signup: (data) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => apiRequest('/auth/me'),
  getTasks: () => apiRequest('/tasks'),
  getWallet: () => apiRequest('/wallet'),
  getLedger: () => apiRequest('/wallet/ledger'),
  requestWithdraw: (data) => apiRequest('/wallet/withdraw', { method: 'POST', body: JSON.stringify(data) }),
  adminGetStats: () => apiRequest('/admin/stats'),
  adminGetWithdrawals: () => apiRequest('/admin/withdrawals'),
  adminUpdateWithdrawal: (id, data) => apiRequest('/admin/withdrawals/' + id + '/update', { method: 'POST', body: JSON.stringify(data) }),
  adminSimulatePostback: (data) => apiRequest('/admin/simulate-postback', { method: 'POST', body: JSON.stringify(data) }),
};
`;

// Remove export default function App
code = code.replace(/export\s+default\s+function\s+App/g, 'function App');

// Remove import { useState, useEffect } from "react";

code = code.replace(/import\s+\{([^}]+)\}\s+from\s+["']react["'];?/g, (match, p1) => {
  const hooks = p1.split(',').map(s => s.trim()).filter(Boolean);
  return `const { ${hooks.join(', ')} } = React;`;
});

// Append render statement
const fullSource = `
const React = window.React;
${apiHelperCode}

${code}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
`;

const result = esbuild.transformSync(fullSource, {
  loader: 'jsx',
  target: 'es2020',
});

const outPath = path.join(__dirname, 'kamai-backend', 'public', 'app.js');
fs.writeFileSync(outPath, result.code);
console.log('Successfully built kamai-backend/public/app.js (Size:', result.code.length, 'bytes)');
