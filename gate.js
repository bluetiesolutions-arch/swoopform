// SwoopForm Gate System
// Include this on any page that needs feature gating
// Usage: await Gate.check(auth, db, 'liveQuiz') — returns true/false
// Usage: Gate.showUpgradeModal('liveQuiz')

const Gate = {
  userData: null,

  async load(auth, db) {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (u) => {
        if (!u) { resolve(null); return; }
        try {
          const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
          const snap = await getDoc(doc(db, 'users', u.uid));
          this.userData = snap.exists() ? { id: u.uid, ...snap.data() } : { id: u.uid, plan: 'free' };
          resolve(this.userData);
        } catch (e) {
          this.userData = { id: u.uid, plan: 'free' };
          resolve(this.userData);
        }
      });
    });
  },

  getPlan() {
    return this.userData?.plan || 'free';
  },

  PLANS: {
    free:     { activeForms:3,  responsesPerMonth:100,  teamMembers:1,  removeBranding:false, customRedirect:false, prioritySupport:false, apiAccess:false },
    starter:  { activeForms:15, responsesPerMonth:1000, teamMembers:1,  removeBranding:false, customRedirect:false, prioritySupport:false, apiAccess:false },
    pro:      { activeForms:-1, responsesPerMonth:-1,   teamMembers:3,  removeBranding:true,  customRedirect:true,  prioritySupport:true,  apiAccess:false },
    business: { activeForms:-1, responsesPerMonth:-1,   teamMembers:10, removeBranding:true,  customRedirect:true,  prioritySupport:true,  apiAccess:true  },
    student:  { activeForms:-1, responsesPerMonth:-1,   teamMembers:1,  removeBranding:false, customRedirect:false, prioritySupport:false, apiAccess:false },
    educator: { activeForms:-1, responsesPerMonth:-1,   teamMembers:1,  removeBranding:false, customRedirect:false, prioritySupport:false, apiAccess:false },
    ngo:      { activeForms:-1, responsesPerMonth:-1,   teamMembers:1,  removeBranding:false, customRedirect:false, prioritySupport:false, apiAccess:false },
  },

  UPGRADE_NEEDED: {
    removeBranding:  { minPlan: 'Pro', message: 'Remove branding is available on Pro and above.' },
    customRedirect:  { minPlan: 'Pro', message: 'Custom redirect is available on Pro and above.' },
    apiAccess:       { minPlan: 'Business', message: 'API access is available on Business plan.' },
    activeForms:     { minPlan: 'Starter', message: 'You\'ve reached your active form limit.' },
    responsesPerMonth:{ minPlan: 'Starter', message: 'You\'ve reached your monthly response limit.' },
  },

  canUse(feature) {
    const plan = this.getPlan();
    const config = this.PLANS[plan] || this.PLANS.free;
    // Admin overrides
    const overrides = this.userData?.features || {};
    if (overrides[feature] === true) return true;
    if (overrides[feature] === false) return false;
    const val = config[feature];
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return val === -1 || val > 0;
    return false;
  },

  withinLimit(feature, currentCount) {
    const plan = this.getPlan();
    const config = this.PLANS[plan] || this.PLANS.free;
    const limit = config[feature];
    if (limit === -1) return true;
    return currentCount < limit;
  },

  getLimit(feature) {
    const plan = this.getPlan();
    const config = this.PLANS[plan] || this.PLANS.free;
    return config[feature];
  },

  showUpgradeModal(feature) {
    const info = this.UPGRADE_NEEDED[feature] || { minPlan: 'Pro', message: 'This feature requires an upgrade.' };
    const plan = this.getPlan();

    // Remove existing modal
    const existing = document.getElementById('sf-upgrade-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'sf-upgrade-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:Sora,sans-serif;';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <div style="font-size:48px;margin-bottom:16px;">⭐</div>
        <div style="font-size:20px;font-weight:800;color:#0f0e1a;margin-bottom:8px;letter-spacing:-.02em;">Upgrade to ${info.minPlan}</div>
        <div style="font-size:14px;color:#64748b;margin-bottom:8px;line-height:1.6;">${info.message}</div>
        <div style="font-size:13px;color:#94a3b8;margin-bottom:24px;">You're currently on the <strong style="color:#2d1b69;">${plan.charAt(0).toUpperCase()+plan.slice(1)}</strong> plan.</div>
        <div style="display:flex;gap:10px;">
          <a href="/pricing/" style="flex:1;padding:12px;border-radius:10px;background:linear-gradient(135deg,#2d1b69,#7c3aed);color:#fff;font-size:14px;font-weight:700;text-decoration:none;display:block;">See plans →</a>
          <button onclick="document.getElementById('sf-upgrade-modal').remove()" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid #e2dad0;background:transparent;font-size:14px;font-weight:600;cursor:pointer;font-family:Sora,sans-serif;color:#64748b;">Not now</button>
        </div>
      </div>`;
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  },

  showLimitModal(feature, current, limit) {
    const existing = document.getElementById('sf-upgrade-modal');
    if (existing) existing.remove();

    const labels = { activeForms: 'active forms', responsesPerMonth: 'responses this month' };
    const label = labels[feature] || feature;
    const info = this.UPGRADE_NEEDED[feature] || { minPlan: 'Starter' };

    const modal = document.createElement('div');
    modal.id = 'sf-upgrade-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:Sora,sans-serif;';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <div style="font-size:48px;margin-bottom:16px;">📊</div>
        <div style="font-size:20px;font-weight:800;color:#0f0e1a;margin-bottom:8px;letter-spacing:-.02em;">Limit reached</div>
        <div style="font-size:14px;color:#64748b;margin-bottom:20px;line-height:1.6;">You've used <strong>${current} of ${limit}</strong> ${label} on your current plan.</div>
        <div style="background:#f5f0e8;border-radius:10px;padding:12px;margin-bottom:20px;">
          <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">Your plan limit</div>
          <div style="display:flex;height:8px;background:#e2dad0;border-radius:100px;overflow:hidden;">
            <div style="width:100%;background:linear-gradient(135deg,#2d1b69,#7c3aed);border-radius:100px;"></div>
          </div>
          <div style="font-size:12px;color:#e5484d;margin-top:4px;font-weight:600;">${current}/${limit} used</div>
        </div>
        <div style="display:flex;gap:10px;">
          <a href="/pricing/" style="flex:1;padding:12px;border-radius:10px;background:linear-gradient(135deg,#2d1b69,#7c3aed);color:#fff;font-size:14px;font-weight:700;text-decoration:none;display:block;">Upgrade →</a>
          <button onclick="document.getElementById('sf-upgrade-modal').remove()" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid #e2dad0;background:transparent;font-size:14px;font-weight:600;cursor:pointer;font-family:Sora,sans-serif;color:#64748b;">Not now</button>
        </div>
      </div>`;
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }
};

window.Gate = Gate;
