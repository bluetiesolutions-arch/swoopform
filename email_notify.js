// SwoopForm Email Notification Helper
var SF_EMAIL = {
  SERVICE: 'service_o34py9mte',
  KEY: 'xOsG4gZ6uR_UnN_ac',
  TEMPLATE_RESPONSE: 'template_pxp6m3p',
  TEMPLATE_LIMIT: 'template_awyfb6j',
  _inited: false,

  _init: function() {
    if (!this._inited && typeof emailjs !== 'undefined') {
      emailjs.init(this.KEY);
      this._inited = true;
    }
  },

  notifyNewResponse: function(hostEmail, hostName, formTitle, formType, totalResponses, responsesUrl) {
    if (!hostEmail || typeof emailjs === 'undefined') return;
    this._init();
    var now = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    emailjs.send(this.SERVICE, this.TEMPLATE_RESPONSE, {
      host_email: hostEmail,
      host_name: hostName || 'there',
      form_title: formTitle || 'Your Form',
      form_type: formType || 'Form',
      received_at: now,
      total_responses: totalResponses || 1,
      responses_url: responsesUrl || 'https://swoopform.com/dashboard/',
    }).then(function() {
      console.log('Response notification sent!');
    }).catch(function(e) {
      console.warn('Email failed:', e);
    });
  },

  notifyLimitWarning: function(hostEmail, hostName, plan, currentCount, limit) {
    if (!hostEmail || typeof emailjs === 'undefined') return;
    this._init();
    emailjs.send(this.SERVICE, this.TEMPLATE_LIMIT, {
      host_email: hostEmail,
      host_name: hostName || 'there',
      plan: plan || 'Free',
      current_count: currentCount,
      limit: limit,
    }).then(function() {
      console.log('Limit warning sent!');
    }).catch(function(e) {
      console.warn('Limit email failed:', e);
    });
  }
};
