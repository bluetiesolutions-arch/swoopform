// SwoopForm Plans — Single source of truth
const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    currency: '$',
    period: 'forever',
    color: '#64748b',
    limits: {
      activeForms: 3,
      responsesPerMonth: 100,
      teamMembers: 1,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: false,
      customRedirect: false,
      prioritySupport: false,
      apiAccess: false,
      dedicatedSupport: false,
    }
  },
  starter: {
    name: 'Starter',
    price: 9,
    currency: '$',
    period: 'per month',
    color: '#0ea5e9',
    limits: {
      activeForms: 15,
      responsesPerMonth: 1000,
      teamMembers: 1,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: false,
      customRedirect: false,
      prioritySupport: false,
      apiAccess: false,
      dedicatedSupport: false,
    }
  },
  pro: {
    name: 'Pro',
    price: 29,
    currency: '$',
    period: 'per month',
    color: '#7c3aed',
    limits: {
      activeForms: -1,
      responsesPerMonth: -1,
      teamMembers: 3,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: true,
      customRedirect: true,
      prioritySupport: true,
      apiAccess: false,
      dedicatedSupport: false,
    }
  },
  business: {
    name: 'Business',
    price: 79,
    currency: '$',
    period: 'per month',
    color: '#2d1b69',
    limits: {
      activeForms: -1,
      responsesPerMonth: -1,
      teamMembers: 10,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: true,
      customRedirect: true,
      prioritySupport: true,
      apiAccess: true,
      dedicatedSupport: true,
    }
  },
  student: {
    name: 'Student',
    price: 0,
    currency: '$',
    period: 'annual verification',
    color: '#0ea5e9',
    limits: {
      activeForms: -1,
      responsesPerMonth: -1,
      teamMembers: 1,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: false,
      customRedirect: false,
      prioritySupport: false,
      apiAccess: false,
      dedicatedSupport: false,
    }
  },
  educator: {
    name: 'Educator',
    price: 0,
    currency: '$',
    period: 'annual verification',
    color: '#10b981',
    limits: {
      activeForms: -1,
      responsesPerMonth: -1,
      teamMembers: 1,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: false,
      customRedirect: false,
      prioritySupport: false,
      apiAccess: false,
      dedicatedSupport: false,
    }
  },
  ngo: {
    name: 'NGO',
    price: 0,
    currency: '$',
    period: 'annual verification',
    color: '#d97706',
    limits: {
      activeForms: -1,
      responsesPerMonth: -1,
      teamMembers: 1,
    },
    features: {
      allFormTypes: true,
      liveQuiz: true,
      pulseCheck: true,
      qrEmbed: true,
      csvExport: true,
      removeBranding: false,
      customRedirect: false,
      prioritySupport: false,
      apiAccess: false,
      dedicatedSupport: false,
    }
  }
};

// Check if user can use a feature
function canUseFeature(userData, feature) {
  const plan = userData?.plan || 'free';
  const planConfig = PLANS[plan] || PLANS.free;
  // Admin feature overrides take priority
  const overrides = userData?.features || {};
  if (overrides[feature] === true) return true;
  if (overrides[feature] === false) return false;
  return planConfig.features[feature] || false;
}

// Check if user is within limits
function withinLimit(userData, limit, currentCount) {
  const plan = userData?.plan || 'free';
  const planConfig = PLANS[plan] || PLANS.free;
  const max = planConfig.limits[limit];
  if (max === -1) return true; // unlimited
  return currentCount < max;
}

// Get plan config
function getPlanConfig(plan) {
  return PLANS[plan] || PLANS.free;
}

if (typeof module !== 'undefined') module.exports = { PLANS, canUseFeature, withinLimit, getPlanConfig };
