// ============================================================
// Marketing Mavericks – Auth & Session Management
// ============================================================

const AUTH_KEY = "mm_user";
const SEARCH_HISTORY_KEY = "mm_search_history";

const AUTH = {
  // ---- Register ----
  register(firstName, lastName, email, password, plan) {
    const users = JSON.parse(localStorage.getItem("mm_users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const user = {
      id: "u_" + Date.now(),
      firstName,
      lastName,
      email,
      password, // plain-text for demo only
      plan: plan || "starter",
      createdAt: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/80?u=${email}`,
    };
    users.push(user);
    localStorage.setItem("mm_users", JSON.stringify(users));
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { ok: true, user };
  },

  // ---- Login ----
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("mm_users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return { ok: false, error: "Invalid email or password." };
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { ok: true, user };
  },

  // ---- Logout ----
  logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "landing.html";
  },

  // ---- Get current user ----
  current() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY));
    } catch {
      return null;
    }
  },

  // ---- Is logged in ----
  isLoggedIn() {
    return !!this.current();
  },

  // ---- Add search to history ----
  addSearchHistory(query) {
    if (!query || query.trim().length < 2) return;
    const history = this.getSearchHistory();
    const entry = {
      query: query.trim(),
      timestamp: new Date().toISOString(),
    };
    // Remove duplicate
    const filtered = history.filter(
      (h) => h.query.toLowerCase() !== query.trim().toLowerCase()
    );
    filtered.unshift(entry);
    // Keep last 50
    localStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(filtered.slice(0, 50))
    );
  },

  // ---- Get search history ----
  getSearchHistory() {
    try {
      return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  },

  // ---- Clear search history ----
  clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  },
};

// ============================================================
// NAV RENDERING
// ============================================================

function buildNavHTML(activePage) {
  const user = AUTH.current();
  const isLoggedIn = !!user;

  // Nav links: public vs protected
  const publicLinks = `
    <a href="landing.html" class="nav-link${activePage === 'home' ? ' active' : ''}">Home</a>
    <a href="pricing.html" class="nav-link${activePage === 'pricing' ? ' active' : ''}">Pricing</a>
  `;

  const protectedLinks = isLoggedIn ? `
    <a href="trends.html" class="nav-link${activePage === 'trends' ? ' active' : ''}">Market Trends</a>
    <a href="index.html" class="nav-link${activePage === 'dashboard' ? ' active' : ''}">Dashboard</a>
  ` : '';

  // Actions
  let actionsHTML;
  if (isLoggedIn) {
    const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
    const planLabel = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' }[user.plan] || 'Starter';
    actionsHTML = `
      <div class="live-badge"><div class="live-dot"></div>Live Data</div>
      <div class="nav-user-menu" id="navUserMenu">
        <button class="nav-user-btn" id="navUserBtn" onclick="toggleUserDropdown(event)">
          <div class="nav-user-avatar">${initials}</div>
          <span class="nav-user-name">${user.firstName}</span>
          <span class="nav-user-plan-badge">${planLabel}</span>
          <span class="nav-user-chevron">▾</span>
        </button>
        <div class="nav-user-dropdown" id="navUserDropdown">
          <div class="nav-dropdown-header">
            <div class="nav-dropdown-avatar">${initials}</div>
            <div>
              <div class="nav-dropdown-name">${user.firstName} ${user.lastName}</div>
              <div class="nav-dropdown-email">${user.email}</div>
            </div>
          </div>
          <div class="nav-dropdown-divider"></div>
          <a href="profile.html" class="nav-dropdown-item">👤 My Profile</a>
          <a href="profile.html#subscription" class="nav-dropdown-item">💳 Subscription</a>
          <a href="profile.html#history" class="nav-dropdown-item">🕐 Search History</a>
          <div class="nav-dropdown-divider"></div>
          <button class="nav-dropdown-item nav-dropdown-logout" onclick="AUTH.logout()">🚪 Sign Out</button>
        </div>
      </div>
    `;
  } else {
    actionsHTML = `
      <div class="live-badge"><div class="live-dot"></div>Live Data</div>
      <a href="signin.html" class="nav-btn-outline">Sign In</a>
      <a href="signup.html" class="nav-btn-primary">Get Started</a>
    `;
  }

  return { publicLinks, protectedLinks, actionsHTML };
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('navUserDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  const dropdown = document.getElementById('navUserDropdown');
  if (dropdown) dropdown.classList.remove('open');
});

// ============================================================
// GUARD: Redirect protected pages if not logged in
// ============================================================
function guardPage() {
  const protectedPages = ['index.html', 'trends.html', 'product.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (protectedPages.includes(currentPage) && !AUTH.isLoggedIn()) {
    window.location.href = 'signin.html?redirect=' + encodeURIComponent(currentPage);
  }
}

// ============================================================
// COOKIE BANNER
// ============================================================
function initCookieBanner() {
  if (localStorage.getItem('mm_cookies_accepted')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <div class="cookie-banner-text">
        <span class="cookie-icon">🍪</span>
        <div>
          <strong>We use cookies</strong> to improve your experience, analyse site traffic, and personalise content.
          By continuing to use Marketing Mavericks, you agree to our use of cookies.
          <button class="cookie-policy-link" onclick="openPrivacyModal()">Review full policy →</button>
        </div>
      </div>
      <div class="cookie-banner-actions">
        <button class="cookie-btn-reject" onclick="rejectCookies()">Reject All</button>
        <button class="cookie-btn-settings" onclick="openPrivacyModal()">Manage Preferences</button>
        <button class="cookie-btn-accept" onclick="acceptCookies()">Accept All</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => banner.classList.add('visible'));
  });
}

function acceptCookies() {
  localStorage.setItem('mm_cookies_accepted', 'all');
  hideCookieBanner();
}

function rejectCookies() {
  localStorage.setItem('mm_cookies_accepted', 'essential');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  }
}

function openPrivacyModal() {
  let modal = document.getElementById('privacyModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'privacyModal';
    modal.className = 'privacy-modal-overlay';
    modal.innerHTML = `
      <div class="privacy-modal">
        <div class="privacy-modal-header">
          <h2>Privacy & Cookie Policy</h2>
          <button class="privacy-modal-close" onclick="closePrivacyModal()">✕</button>
        </div>
        <div class="privacy-modal-body">
          <div class="privacy-tabs">
            <button class="privacy-tab active" onclick="switchPrivacyTab(this,'privacy')">Privacy Policy</button>
            <button class="privacy-tab" onclick="switchPrivacyTab(this,'cookies')">Cookie Policy</button>
            <button class="privacy-tab" onclick="switchPrivacyTab(this,'imprint')">Imprint</button>
            <button class="privacy-tab" onclick="switchPrivacyTab(this,'preferences')">My Preferences</button>
          </div>

          <div class="privacy-tab-content active" id="tab-privacy">
            <h3>Privacy Policy</h3>
            <p class="privacy-date">Last updated: 28 February 2026</p>
            <h4>1. Who We Are</h4>
            <p>Marketing Mavericks ("we", "us", "our") is an AI-powered market intelligence platform developed by a team of Cambridge MBA students. For the purposes of this policy, our contact address is: <strong>marketing.mavericks@cambridge.ac.uk</strong></p>
            <h4>2. Data We Collect</h4>
            <p>We collect the following categories of personal data:</p>
            <ul>
              <li><strong>Account data:</strong> Name, email address, and password (hashed) when you register.</li>
              <li><strong>Usage data:</strong> Pages visited, search queries, products viewed, and session duration.</li>
              <li><strong>Technical data:</strong> IP address, browser type, device type, and operating system.</li>
              <li><strong>Communication data:</strong> Any messages you send us via support channels.</li>
            </ul>
            <h4>3. How We Use Your Data</h4>
            <p>We use your data to: provide and improve our services; personalise your experience; send service-related communications; analyse usage patterns to improve the platform; and comply with legal obligations.</p>
            <h4>4. Legal Basis (GDPR)</h4>
            <p>We process your data under the following legal bases: <strong>Contract</strong> (to provide the service you signed up for); <strong>Legitimate interests</strong> (to improve our platform); <strong>Consent</strong> (for marketing communications and non-essential cookies).</p>
            <h4>5. Data Retention</h4>
            <p>We retain your account data for as long as your account is active. Search history is retained for 12 months. You may request deletion at any time.</p>
            <h4>6. Your Rights</h4>
            <p>Under GDPR, you have the right to: access your data; rectify inaccurate data; erase your data ("right to be forgotten"); restrict processing; data portability; and object to processing. To exercise these rights, contact us at the address above.</p>
            <h4>7. Third-Party Services</h4>
            <p>We use the following third-party services: Google Fonts (typography); Chart.js (data visualisation); Unsplash (product imagery). These services may set their own cookies.</p>
            <h4>8. International Transfers</h4>
            <p>Your data is stored within the European Economic Area (EEA). Where transfers outside the EEA occur, we ensure adequate safeguards are in place.</p>
          </div>

          <div class="privacy-tab-content" id="tab-cookies">
            <h3>Cookie Policy</h3>
            <p class="privacy-date">Last updated: 28 February 2026</p>
            <h4>What Are Cookies?</h4>
            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you use our platform.</p>
            <h4>Cookies We Use</h4>
            <div class="cookie-table-wrapper">
              <table class="cookie-table">
                <thead><tr><th>Cookie</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
                <tbody>
                  <tr><td><code>mm_user</code></td><td>Essential</td><td>Stores your login session</td><td>Session</td></tr>
                  <tr><td><code>mm_users</code></td><td>Essential</td><td>Local user account storage</td><td>Persistent</td></tr>
                  <tr><td><code>mm_db</code></td><td>Functional</td><td>Caches product database locally</td><td>7 days</td></tr>
                  <tr><td><code>mm_search_history</code></td><td>Functional</td><td>Stores your search history</td><td>12 months</td></tr>
                  <tr><td><code>mm_cookies_accepted</code></td><td>Essential</td><td>Remembers your cookie preference</td><td>1 year</td></tr>
                  <tr><td><code>_ga</code></td><td>Analytics</td><td>Google Analytics (if enabled)</td><td>2 years</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Managing Cookies</h4>
            <p>You can control cookies through your browser settings. Note that disabling essential cookies may affect platform functionality. You can also update your preferences below.</p>
          </div>

          <div class="privacy-tab-content" id="tab-imprint">
            <h3>Imprint / Legal Notice</h3>
            <p class="privacy-date">In accordance with § 5 TMG (Germany) and equivalent EU regulations</p>
            <h4>Service Provider</h4>
            <p><strong>Marketing Mavericks</strong><br/>Cambridge Judge Business School<br/>Trumpington Street<br/>Cambridge, CB2 1AG<br/>United Kingdom</p>
            <h4>Contact</h4>
            <p>Email: <strong>marketing.mavericks@cambridge.ac.uk</strong><br/>This platform was created as part of the AI Vibe Coding Hackathon 2026.</p>
            <h4>Academic Context</h4>
            <p>This product is a prototype developed by Cambridge MBA students for educational and demonstration purposes. It does not constitute financial or investment advice. All market data shown is simulated for demonstration purposes.</p>
            <h4>Intellectual Property</h4>
            <p>All content, design, and code on this platform is the intellectual property of the Marketing Mavericks team. Unauthorised reproduction is prohibited.</p>
            <h4>Disclaimer</h4>
            <p>The information provided on this platform is for informational purposes only. We make no representations as to the accuracy or completeness of any information. Market projections are AI-generated estimates and should not be relied upon as financial advice.</p>
            <h4>Dispute Resolution</h4>
            <p>The European Commission provides an online dispute resolution platform: <strong>https://ec.europa.eu/consumers/odr</strong>. We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
          </div>

          <div class="privacy-tab-content" id="tab-preferences">
            <h3>My Cookie Preferences</h3>
            <p>Choose which types of cookies you allow. Essential cookies cannot be disabled as they are required for the platform to function.</p>
            <div class="pref-list">
              <div class="pref-item">
                <div class="pref-info">
                  <strong>Essential Cookies</strong>
                  <p>Required for login, session management, and core functionality. Cannot be disabled.</p>
                </div>
                <div class="pref-toggle pref-toggle-locked">Always On</div>
              </div>
              <div class="pref-item">
                <div class="pref-info">
                  <strong>Functional Cookies</strong>
                  <p>Remember your preferences, search history, and personalisation settings.</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="prefFunctional" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="pref-item">
                <div class="pref-info">
                  <strong>Analytics Cookies</strong>
                  <p>Help us understand how you use the platform so we can improve it.</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="prefAnalytics" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="pref-item">
                <div class="pref-info">
                  <strong>Marketing Cookies</strong>
                  <p>Used to show you relevant content and measure campaign effectiveness.</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="prefMarketing" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div style="margin-top:24px;display:flex;gap:12px;">
              <button class="cookie-btn-reject" onclick="rejectCookies();closePrivacyModal()">Reject All</button>
              <button class="cookie-btn-accept" onclick="savePreferences()">Save Preferences</button>
            </div>
          </div>
        </div>
        <div class="privacy-modal-footer">
          <button class="cookie-btn-reject" onclick="rejectCookies();closePrivacyModal()">Reject All</button>
          <button class="cookie-btn-accept" onclick="acceptCookies();closePrivacyModal()">Accept All & Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
  } else {
    modal.classList.add('open');
  }
}

function closePrivacyModal() {
  const modal = document.getElementById('privacyModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function switchPrivacyTab(btn, tabId) {
  document.querySelectorAll('.privacy-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.privacy-tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');
}

function savePreferences() {
  const functional = document.getElementById('prefFunctional')?.checked;
  const analytics = document.getElementById('prefAnalytics')?.checked;
  const marketing = document.getElementById('prefMarketing')?.checked;
  const prefs = { essential: true, functional, analytics, marketing };
  localStorage.setItem('mm_cookies_accepted', JSON.stringify(prefs));
  hideCookieBanner();
  closePrivacyModal();
}

// ============================================================
// INIT ON DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  guardPage();
  updateNavAuth();
  initCookieBanner();
});

function updateNavAuth() {
  const user = AUTH.current();
  const isLoggedIn = !!user;

  // Update nav links visibility
  document.querySelectorAll('.nav-protected').forEach(el => {
    el.style.display = isLoggedIn ? '' : 'none';
  });
  document.querySelectorAll('.nav-public-only').forEach(el => {
    el.style.display = isLoggedIn ? 'none' : '';
  });

  // Update navbar actions
  document.querySelectorAll('.navbar-actions').forEach((actions) => {
    if (isLoggedIn) {
      const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
      const planLabel = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' }[user.plan] || 'Starter';
      actions.innerHTML = `
        <div class="live-badge"><div class="live-dot"></div>Live Data</div>
        <div class="nav-user-menu" id="navUserMenu">
          <button class="nav-user-btn" id="navUserBtn" onclick="toggleUserDropdown(event)">
            <div class="nav-user-avatar">${initials}</div>
            <span class="nav-user-name">${user.firstName}</span>
            <span class="nav-user-plan-badge">${planLabel}</span>
            <span class="nav-user-chevron">▾</span>
          </button>
          <div class="nav-user-dropdown" id="navUserDropdown">
            <div class="nav-dropdown-header">
              <div class="nav-dropdown-avatar">${initials}</div>
              <div>
                <div class="nav-dropdown-name">${user.firstName} ${user.lastName}</div>
                <div class="nav-dropdown-email">${user.email}</div>
              </div>
            </div>
            <div class="nav-dropdown-divider"></div>
            <a href="profile.html" class="nav-dropdown-item">👤 My Profile</a>
            <a href="profile.html#subscription" class="nav-dropdown-item">💳 Subscription</a>
            <a href="profile.html#history" class="nav-dropdown-item">🕐 Search History</a>
            <div class="nav-dropdown-divider"></div>
            <button class="nav-dropdown-item nav-dropdown-logout" onclick="AUTH.logout()">🚪 Sign Out</button>
          </div>
        </div>
      `;
    }
    // If not logged in, keep existing Sign In / Get Started buttons
  });
}
