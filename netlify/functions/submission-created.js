// Fires automatically on every Netlify Forms submission.
// Sends a formatted HTML email via Resend (resend.com).
// Required env vars in Netlify dashboard:
//   RESEND_API_KEY  — from resend.com (free account)
//   NOTIFY_EMAIL    — where to send notifications (default: support@companyperiscope.com)
//   RESEND_FROM     — sender address (default: onboarding@resend.dev until domain verified)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAILS  = (process.env.NOTIFY_EMAIL || 'support@companyperiscope.com')
                         .split(',').map(e => e.trim()).filter(Boolean);
const RESEND_FROM    = process.env.RESEND_FROM   || 'Company Periscope <onboarding@resend.dev>';

// ─── Field label map ─────────────────────────────────────────────────────────
const LABELS = {
  // General
  business_name:'Business Name', website_url:'Website URL', primary_phone:'Primary Phone',
  secondary_phones:'Secondary Phones', your_name:'Your Name', your_email:'Your Email',
  your_role:'Your Role', business_address:'Business Address', industry:'Industry',
  business_hours:'Business Hours', multiple_locations:'Multiple Locations',
  business_type:'Business Description', main_services:'Main Services', service_areas:'Service Areas',
  appointment_policy:'Appointment Policy', booking_phone:'Book via Phone', booking_email:'Book via Email',
  booking_advance_notice:'Advance Notice Required', booking_other_instructions:'Other Booking Instructions',
  cancellation_policy:'Cancellation Policy', appointment_requirements:'New Client Requirements',
  call_scheduling:'Call Scheduling Enabled', ask_about_services:'Answer Service Questions',
  call_other_instructions:'Other Call Instructions', accept_insurance:'Insurance Accepted',
  accept_credit_card:'Accept Credit Card', accept_debit_card:'Accept Debit Card',
  free_consultation:'Free Consultation Offered', other_payment_info:'Other Payment Info',
  emergency_services:'Emergency Services', after_hours_action:'After-Hours Action',
  after_hours_instructions:'After-Hours Instructions', emergency_contact_name:'Emergency Contact Name',
  emergency_contact_phone:'Emergency Contact Phone', emergency_escalation_method:'Escalation Method',
  ai_tone:'AI Tone', friendly_personality:'Friendly Personality', personality_notes:'Personality Notes',
  unique_selling_points:'Unique Selling Points', always_mention:'Always Mention',
  avoid_topics:'Topics to Avoid', primary_goal_priority:'Primary Goal Priority',
  goal_book_appointments:'Goal: Book Appointments', goal_answer_questions:'Goal: Answer Questions',
  goal_capture_contact:'Goal: Capture Contact Info', other_goals:'Other Goals',
  implementation_timeframe:'Implementation Timeframe', success_looks_like:'What Success Looks Like',
  additional_information:'Additional Notes', forward_all_calls:'Forward: All Calls (24/7)',
  forward_after_hours:'Forward: After Hours', forward_overflow:'Forward: Overflow / No Answer',
  rings_before_forward:'Rings Before Forwarding', daily_report_email:'Daily Report Email',
  call_summary_delivery:'Call Summary Delivery', current_software:'Current Software',
  multilingual_support:'Multilingual Support',
  // Dental
  practice_name:'Practice Name', practice_address:'Practice Address',
  secondary_phone:'Secondary Phone', office_hours:'Office Hours',
  practice_type:'Practice Type', num_providers:'Number of Providers',
  practice_software:'Practice Software', other_services:'Other Services',
  refer_out:'Procedures Referred Out', svc_cleanings:'✓ Cleanings & Hygiene',
  svc_xrays:'✓ X-Rays & Exams', svc_fillings:'✓ Fillings', svc_crowns:'✓ Crowns & Bridges',
  svc_implants:'✓ Dental Implants', svc_invisalign:'✓ Invisalign / Ortho',
  svc_whitening:'✓ Teeth Whitening', svc_veneers:'✓ Veneers', svc_rootcanal:'✓ Root Canals',
  svc_extractions:'✓ Extractions', svc_dentures:'✓ Dentures',
  svc_emergency:'✓ Emergency Care', svc_sedation:'✓ Sedation Dentistry', svc_kids:'✓ Pediatric / Kids',
  action_appointments:'Pencil In Appointments', action_new_patients:'Handle New Patient Inquiries',
  action_insurance:'Answer Insurance Questions', action_faqs:'Answer Treatment FAQs',
  action_collect_info:'Collect Patient Info', action_cancellations:'Handle Cancellations',
  other_call_actions:'Other Call Actions', ai_name:'AI Name', differentiators:'What Sets Practice Apart',
  appt_new_patient_exam:'✓ New Patient Exam', appt_cleaning:'✓ Cleaning / Hygiene',
  appt_emergency:'✓ Emergency Visit', appt_consult_cosmetic:'✓ Cosmetic Consult',
  appt_consult_invisalign:'✓ Invisalign Consult', appt_consult_implant:'✓ Implant Consult',
  appt_followup:'✓ Follow-Up Visit', appt_xray:'✓ X-Rays Only',
  walk_ins:'Walk-Ins Accepted', advance_notice:'Advance Notice Required',
  booking_method:'Booking Method', booking_link:'Online Booking Link',
  new_patient_requirements:'New Patient Requirements', insurance_plans:'Insurance Plans Accepted',
  accept_carecredit:'Accept CareCredit / Financing', payment_plan:'In-House Payment Plan',
  free_consult:'Free Consultation', common_questions:'Common Patient Questions',
  key_facts:'Key Facts for AI', emergency_definition:'What Counts as Emergency',
  same_day_emergency:'Same-Day Emergency Appointments', urgent_alert_contact:'Urgent Alert Contact',
  alert_method:'Preferred Alert Method', additional_recipients:'Additional Report Recipients',
  hipaa_acknowledged:'HIPAA Acknowledged', baa_required:'BAA Required',
  compliance_contact:'Compliance Contact', compliance_notes:'Compliance Notes',
  multilingual:'Multilingual Support', languages:'Languages Spoken at Practice',
  common_challenges:'Common Challenges / Pain Points',
};

// ─── Section groupings ────────────────────────────────────────────────────────
const SECTIONS = {
  'general-onboarding': [
    { title: 'Business Information', icon: '🏢',
      fields: ['business_name','website_url','primary_phone','secondary_phones','your_name','your_email','your_role','business_address'] },
    { title: 'Business Details', icon: '📋',
      fields: ['industry','business_hours','multiple_locations','business_type','main_services','service_areas'] },
    { title: 'Appointments & Booking', icon: '📅',
      fields: ['appointment_policy','booking_phone','booking_email','booking_advance_notice','booking_other_instructions','cancellation_policy','appointment_requirements'] },
    { title: 'Call Handling', icon: '📞',
      fields: ['call_scheduling','ask_about_services','call_other_instructions'] },
    { title: 'Payments & Insurance', icon: '💳',
      fields: ['accept_insurance','accept_credit_card','accept_debit_card','free_consultation','other_payment_info'] },
    { title: 'After Hours & Emergency', icon: '🚨',
      fields: ['emergency_services','after_hours_action','after_hours_instructions','emergency_contact_name','emergency_contact_phone','emergency_escalation_method'] },
    { title: 'AI Personality & Brand', icon: '🤖',
      fields: ['ai_tone','friendly_personality','personality_notes','unique_selling_points','always_mention','avoid_topics'] },
    { title: 'Goals', icon: '🎯',
      fields: ['primary_goal_priority','goal_book_appointments','goal_answer_questions','goal_capture_contact','other_goals','implementation_timeframe','success_looks_like'] },
    { title: 'Technical Setup', icon: '⚙️',
      fields: ['forward_all_calls','forward_after_hours','forward_overflow','rings_before_forward','daily_report_email','call_summary_delivery','current_software','multilingual_support','additional_information'] },
  ],
  'dental-onboarding': [
    { title: 'Practice Information', icon: '🦷',
      fields: ['practice_name','website_url','primary_phone','secondary_phone','your_name','your_email','your_role','practice_address','office_hours'] },
    { title: 'Practice Type & Software', icon: '🏥',
      fields: ['practice_type','num_providers','practice_software'] },
    { title: 'Services Offered', icon: '✅',
      fields: ['svc_cleanings','svc_xrays','svc_fillings','svc_crowns','svc_implants','svc_invisalign','svc_whitening','svc_veneers','svc_rootcanal','svc_extractions','svc_dentures','svc_emergency','svc_sedation','svc_kids','other_services','refer_out'] },
    { title: 'Call Actions', icon: '📞',
      fields: ['action_appointments','action_new_patients','action_insurance','action_faqs','action_collect_info','action_cancellations','other_call_actions'] },
    { title: 'AI Brand & Tone', icon: '🤖',
      fields: ['ai_tone','ai_name','differentiators','always_mention','avoid_topics'] },
    { title: 'Appointment Types & Booking', icon: '📅',
      fields: ['appt_new_patient_exam','appt_cleaning','appt_emergency','appt_consult_cosmetic','appt_consult_invisalign','appt_consult_implant','appt_followup','appt_xray','walk_ins','advance_notice','booking_method','booking_link','cancellation_policy','new_patient_requirements'] },
    { title: 'Insurance & Payments', icon: '💳',
      fields: ['insurance_plans','accept_credit_card','accept_carecredit','payment_plan','free_consult'] },
    { title: 'Knowledge Base', icon: '📚',
      fields: ['common_questions','key_facts'] },
    { title: 'Emergency Handling', icon: '🚨',
      fields: ['emergency_definition','same_day_emergency','after_hours_action','after_hours_instructions','emergency_contact_name','emergency_contact_phone','emergency_escalation_method'] },
    { title: 'Notifications', icon: '🔔',
      fields: ['daily_report_email','call_summary_delivery','urgent_alert_contact','alert_method','additional_recipients'] },
    { title: 'Compliance', icon: '🔒',
      fields: ['hipaa_acknowledged','baa_required','compliance_contact','compliance_notes'] },
    { title: 'Technical Setup', icon: '⚙️',
      fields: ['forward_all_calls','forward_after_hours','forward_overflow','rings_before_forward','multilingual','languages','common_challenges','success_looks_like','additional_information'] },
  ]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/\n/g,'<br/>');
}

function displayValue(val) {
  if (val === 'true'  || val === true)  return '<span style="color:#059669;font-weight:600;">✓ Yes</span>';
  if (val === 'false' || val === false) return '<span style="color:#dc2626;">✗ No</span>';
  return esc(String(val));
}

// ─── Email builder ────────────────────────────────────────────────────────────
function buildEmail(businessName, formTitle, formName, data, submittedAt) {
  const sections = SECTIONS[formName] || SECTIONS['general-onboarding'];
  const accentColor = formName === 'dental-onboarding' ? '#00E5C0' : '#1A6CF6';

  let bodyRows = '';
  for (const sec of sections) {
    const rows = sec.fields
      .filter(f => {
        const v = data[f];
        return v !== undefined && v !== '' && v !== 'false' && v !== false;
      })
      .map(f => {
        const label = LABELS[f] || f.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
        return `<tr>
          <td style="padding:9px 16px;border-bottom:1px solid #f0f2f5;width:36%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">${label}</td>
          <td style="padding:9px 16px;border-bottom:1px solid #f0f2f5;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#111827;font-weight:500;line-height:1.5;">${displayValue(data[f])}</td>
        </tr>`;
      });

    if (!rows.length) continue;

    bodyRows += `
      <tr>
        <td colspan="2" style="padding:16px 16px 6px;background:#f9fafb;border-top:2px solid ${accentColor};">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#374151;">${sec.icon}&nbsp; ${sec.title}</p>
        </td>
      </tr>
      ${rows.join('')}
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#e5e7eb;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e5e7eb;padding:32px 16px;">
<tr><td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.10);">

  <!-- HEADER -->
  <tr>
    <td colspan="2" style="background:#050D1A;padding:24px 28px 20px;">
      <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${accentColor};">Company Periscope</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">New Onboarding Submission</p>
    </td>
  </tr>

  <!-- BUSINESS NAME BAND -->
  <tr>
    <td colspan="2" style="background:#1A6CF6;padding:16px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0 0 1px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:0.1em;">Client</p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">${esc(businessName)}</p>
          </td>
          <td align="right" valign="middle">
            <span style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:5px 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;">${formTitle}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.55);">Received ${submittedAt} CT</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FORM DATA -->
  <tr>
    <td colspan="2" style="padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${bodyRows}
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td colspan="2" style="background:#050D1A;padding:16px 28px;text-align:center;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);">Company Periscope &nbsp;·&nbsp; companyperiscope.com &nbsp;·&nbsp; Auto-generated from onboarding form</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  if (!RESEND_API_KEY) {
    console.warn('[submission-created] RESEND_API_KEY not set — skipping formatted email.');
    return { statusCode: 200 };
  }

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 200 };
  }

  if (!payload) return { statusCode: 200 };

  const data      = payload.data || {};
  const formName  = payload.form_name || 'general-onboarding';
  const bizName   = data.business_name || data.practice_name || 'New Submission';
  const formTitle = formName === 'dental-onboarding' ? 'Dental Practice Onboarding' : 'General Business Onboarding';
  const replyTo   = data.your_email || undefined;

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const html = buildEmail(bizName, formTitle, formName, data, submittedAt);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: NOTIFY_EMAILS,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: `New Onboarding: ${bizName} — ${formTitle}`,
        html
      })
    });

    if (res.ok) {
      console.log(`[submission-created] Email sent for "${bizName}" (${formName})`);
    } else {
      const err = await res.text();
      console.error('[submission-created] Resend error:', err);
    }
  } catch (err) {
    console.error('[submission-created] Fetch error:', err);
  }

  return { statusCode: 200 };
};
