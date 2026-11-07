/**
 * HiLabs Case Management Workbench — Synthetic Patient Annex Data
 * Source: HiLabs Product Caselet & Synthetic Patient Annex (Nov 2, 2026 snapshot)
 * All patient identities, events, and records are fictional.
 * Not for clinical decision-making.
 */

export const DEMO_USER = {
  name: "Maria Hernandez",
  title: "RN Case Manager",
  role: "Transitions & High Risk",
  badge: "Maria · RN Case Manager",
  caseload: 48,
};

export const DASHBOARD_STATS = {
  activeCases: 48,
  newDischarges: 6,
  followUpsDue: 12,
  demoPatientsCount: 5,
  pendingReconciliations: 3,
  unassignedTasks: 4,
};

export const WORKFLOW_SCORE_FORMULA = {
  name: "Workflow Triage Hypothesis",
  description: "Illustrative operational urgency score to order morning review. Never a clinical risk score, diagnostic metric, or clinical decision substitute.",
  components: [
    { name: "Acute event points", max: 30, description: "Recent hospital discharge, emergency department visits, or urgent care escalation" },
    { name: "Medication signal", max: 25, description: "Discharge medication list discrepancies, visible refill gaps, or high-risk regimen shifts" },
    { name: "Outreach difficulty", max: 20, description: "Repeated voicemails, uncertain phone ownership, language barriers, or unverified safe contact" },
    { name: "Social / coordination barrier", max: 25, description: "Housing instability, transport barriers, caregiver strain, or orphaned vendor handoffs" },
  ],
  maxScore: 100,
  bands: [
    { label: "High priority", min: 70, max: 100, color: "red", bg: "bg-red-50 text-red-700 border-red-200" },
    { label: "Medium priority", min: 45, max: 69, color: "amber", bg: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Routine priority", min: 0, max: 44, color: "slate", bg: "bg-slate-50 text-slate-700 border-slate-200" },
  ],
};

export const PILOT_METRICS = [
  {
    metric: "Member chart preparation time",
    baseline: "12 min / case",
    target: "5 min / case",
    improvement: "58% faster",
    howToMeasure: "Median time from opening work item to clinician-ready summary",
    whyItMatters: "Measures reduction in time spent hunting across disconnected EHR, claims, and PBM tabs.",
    caveat: "Baseline is a pilot hypothesis; measure during first 2-week baseline cohort."
  },
  {
    metric: "Documentation time after contact",
    baseline: "10 min / contact",
    target: "4 min / contact",
    improvement: "60% reduction",
    howToMeasure: "Median after-call documentation duration",
    whyItMatters: "Reduces repetitive data entry by pre-populating verified facts into draft notes.",
    caveat: "Do not trade completeness or audit quality for speed."
  },
  {
    metric: "Successful outreach connection rate",
    baseline: "30% of attempts",
    target: "40% of attempts",
    improvement: "+10 pp lift",
    howToMeasure: "Connected conversations / valid outreach attempts",
    whyItMatters: "Surfaces verified numbers, evening call preferences, and preferred language upfront.",
    caveat: "Segment by preferred language, channel, and member housing/consent circumstances."
  },
  {
    metric: "Cases with assigned next action & owner",
    baseline: "70%",
    target: "95%",
    improvement: "+25 pp ownership",
    howToMeasure: "Open cases with a current, owned action / all open cases",
    whyItMatters: "Prevents ownerless queues, unassigned vendor follow-ups, and dropped care handoffs.",
    caveat: "Define what constitutes a validated 'current action' with clinical leads."
  },
  {
    metric: "Source conflict review time",
    baseline: "8 min / conflict",
    target: "3 min / conflict",
    improvement: "62% faster",
    howToMeasure: "Median time to identify sources, timestamps, and discrepancy",
    whyItMatters: "Displays side-by-side source provenance rather than silently picking an incorrect value.",
    caveat: "No automated clinical reconciliation; nurse and physician retain clinical judgment."
  }
];

export const TIME_ALLOCATION = [
  { activity: "Member conversations & care coordination", hours: 2.5, percent: 31.25, current: "High cognitive value", color: "#0284c7" },
  { activity: "Data hunting & chart preparation", hours: 2.0, percent: 25.0, current: "Target for 58% reduction", color: "#e11d48" },
  { activity: "Documentation & repeated data entry", hours: 1.5, percent: 18.75, current: "Target for 60% reduction", color: "#f59e0b" },
  { activity: "Outreach administration & task tracking", hours: 1.0, percent: 12.5, current: "Target for auto-orchestration", color: "#64748b" },
  { activity: "Other work, breaks & team coordination", hours: 1.0, percent: 12.5, current: "Team support & reflection", color: "#94a3b8" }
];

export const DATA_DICTIONARY = [
  {
    category: "Member & eligibility",
    source: "Health plan enrollment / eligibility system",
    fields: "Identity, coverage, PCP, plan, language, authorized contacts",
    cadence: "Daily eligibility refresh; verify on access",
    imperfections: "Duplicate IDs, coverage changes, stale contact fields",
    guidance: "Use plan member ID as anchor; show match confidence and duplicate queue",
    priority: "Must-have",
    citation: "ONC Interoperability / Health plan enrollment rules"
  },
  {
    category: "Hospital ADT alerts",
    source: "Hospital admission-discharge-transfer feeds / HIE",
    fields: "Recent ED, admission and discharge events; event time and facility",
    cadence: "Near real-time to hourly target; late alerts flagged",
    imperfections: "Missing diagnosis/disposition, delayed or duplicate messages",
    guidance: "Show event timestamp and received timestamp separately; never infer missing details",
    priority: "Must-have",
    citation: "AHRQ Care Coordination Care Transitions guidance"
  },
  {
    category: "EHR / CCD clinical records",
    source: "Provider EHR / HIE",
    fields: "Problem list, discharge summary, allergies, medication list, notes",
    cadence: "At event; nightly sync for other updates",
    imperfections: "Free text, conflicting lists, incomplete documents",
    guidance: "Preserve source, timestamp, and original detail; highlight conflicts for clinician review",
    priority: "Must-have",
    citation: "ONC USCDI v3/v4 Clinical Data Interoperability"
  },
  {
    category: "Pharmacy fills",
    source: "PBM / pharmacy claims / e-prescribing feed",
    fields: "Paid fills, refill dates, days' supply, pharmacy location",
    cadence: "Daily target; source timestamps visible",
    imperfections: "Cash fills or external pharmacies missing; reversals; delayed adjudication",
    guidance: "Label as fill history rather than proof of taking a medicine; flag possible gaps",
    priority: "Must-have",
    citation: "CMS Medicare Part D Medication Adherence Star Ratings"
  },
  {
    category: "Medical claims",
    source: "Health plan claims warehouse",
    fields: "Historical services, utilization, diagnoses and procedures",
    cadence: "Weekly or when adjudicated; often delayed",
    imperfections: "Weeks-long lag; coding without narrative; incomplete in-flight claims",
    guidance: "Show claims through-date; never treat absence as proof of no care",
    priority: "Must-have",
    citation: "CMS Star Ratings & claims adjudication timelines"
  },
  {
    category: "Labs & results",
    source: "Lab interface / provider EHR",
    fields: "Lab values, dates, units, reference ranges and ordering context",
    cadence: "On result receipt; target within hours",
    imperfections: "Unit mismatch, missing reference range, duplicate result",
    guidance: "Display unit, result date and source; do not auto-interpret or diagnose",
    priority: "Later",
    citation: "ONC USCDI Laboratory Data interoperability"
  },
  {
    category: "Appointments",
    source: "Provider scheduler / plan directory",
    fields: "Upcoming, missed and completed appointments; clinic details",
    cadence: "Daily or event-driven; confirm external slots",
    imperfections: "External appointments absent; pending status inconsistent",
    guidance: "Show confirmed vs tentative; provide a confirm task rather than assuming a missed visit",
    priority: "Must-have",
    citation: "AHRQ Care Coordination follow-up protocols"
  },
  {
    category: "Contact history",
    source: "Care-management CRM / call platform",
    fields: "Attempts, successful contact, channel, time preference, language support",
    cadence: "Immediate after each attempt",
    imperfections: "Wrong number, stale preference, number belongs to caregiver",
    guidance: "Track source and verification date; require identity/permission check before disclosure",
    priority: "Must-have",
    citation: "HiLabs outreach equity & privacy protocol"
  },
  {
    category: "SDOH / health-related social needs",
    source: "Plan screening / community referral partner",
    fields: "Transport, food, housing, utility and support barriers",
    cadence: "At screening and whenever member reports change",
    imperfections: "Self-reported data may be stale or sensitive; missing responses",
    guidance: "Display date and consent; reconfirm before acting; show resource referral status",
    priority: "Must-have",
    citation: "CMS Accountable Health Communities Model"
  },
  {
    category: "Care plan / referral / tasks",
    source: "Care-management platform / UM referral",
    fields: "Goals, barriers, interventions, owner, due date, status and outcome",
    cadence: "Real-time on change",
    imperfections: "Duplicate tasks, ownerless tasks, inconsistent referral status",
    guidance: "Single task owner, due date, audit trail; generate draft tasks for human approval",
    priority: "Must-have",
    citation: "AHRQ Care Coordination proactive care plans"
  }
];

export const PATIENTS = [
  {
    id: "P-1001",
    name: "Jordan Lee",
    age: 76,
    gender: "M",
    plan: "Medicare Advantage PPO",
    program: "Transitions of Care",
    language: "English",
    pcp: "Dr. A. Rao",
    scenario: "Fresh heart-failure discharge",
    workflowScore: 75,
    priority: "High",
    scoreBreakdown: {
      acuteEvent: 30,
      medicationSignal: 25,
      outreachDifficulty: 5,
      socialBarrier: 15,
      total: 75,
    },
    holisticSummary: "Discharged after an acute heart-failure admission; new medication instructions are not aligned across records; no follow-up appointment is visible.",
    mondayAction: "Verify the discharge medication list with the treating team, confirm the member's current medicines, arrange timely PCP follow-up, and check transport needs.",
    plantedImperfections: "ADT feed arrived late; medication list conflict; claims are stale; social-needs screen may be old.",
    signals: [
      "Discharged 30 Oct 2026 at 18:20; ADT alert received 31 Oct at 14:00 (~20h delay)",
      "Hospital EHR summary shows furosemide 40 mg daily vs older plan list showing 20 mg daily",
      "Pharmacy feed does not show a new-strength fill (claims through 18 Sep only)",
      "No post-discharge PCP appointment in connected scheduling feed",
      "Member previously reported transport can sometimes be difficult (Screen: 01 Sep)"
    ],
    dataQualityBadges: [
      { label: "ADT delayed ~20h", level: "amber" },
      { label: "Medication list conflict", level: "red" },
      { label: "Stale claims (~45d lag)", level: "amber" },
      { label: "Old SDOH screen (60d)", level: "slate" },
      { label: "Unscheduled PCP visit", level: "blue" }
    ],
    contactInfo: {
      primaryPhone: "(555) 234-8901",
      phoneType: "Mobile",
      phoneVerified: true,
      verifiedDate: "2026-10-15",
      safeChannelConfirmed: true,
      preferredWindow: "Morning / Early Afternoon (9:00 - 13:00)",
      preferredLanguage: "English",
      address: "412 Oakridge Terrace, Apt 3B",
      cityStateZip: "Columbus, OH 43215",
      addressType: "Residential confirmed",
      caregiverName: "None listed / Independent",
      caregiverRelation: "N/A",
      caregiverAuthorized: false
    },
    medicationReconciliation: {
      hasConflict: true,
      title: "Diuretic Regimen Discrepancy: Furosemide",
      urgency: "Needs clinician reconciliation before member outreach",
      items: [
        {
          source: "Hospital Discharge EHR / HIE",
          date: "2026-10-30 18:20",
          status: "Discharge Instruction",
          detail: "Furosemide 40 mg oral tablet — 1 tablet daily every morning with water",
          notes: "Prescribed at acute discharge following CHF volume overload treatment.",
          badge: "Hospital EHR"
        },
        {
          source: "Plan Baseline Active Medication List",
          date: "2026-09-12 (Prior auth / historical)",
          status: "Historical Plan Record",
          detail: "Furosemide 20 mg oral tablet — 1 tablet daily",
          notes: "Pre-admission maintenance dose recorded in care management file.",
          badge: "Plan Record"
        },
        {
          source: "PBM / Retail Pharmacy Feed",
          date: "2026-10-29 (Last paid claim)",
          status: "Pharmacy Dispense History",
          detail: "Furosemide 20 mg (30-day supply dispensed 2026-09-28). No 40 mg fill on record.",
          notes: "Feed does not show a new-strength fill. Could be pending pickup, unfilled, or external cash fill.",
          badge: "Pharmacy Feed"
        }
      ],
      safetyNotice: "Important Safety Boundary: Do not infer whether the member took or did not take a medicine from an absent pharmacy record. Do not recommend a dose or instruct changes. Present both sources to Dr. A. Rao / treating hospital team for clinical reconciliation."
    },
    records: [
      {
        category: "Member & eligibility",
        sourceSystem: "Enrollment system",
        recordDate: "2026-11-02",
        record: "MA PPO; PCP Dr. A. Rao; English; preferred contact: mobile",
        caveat: "Current record",
        freshness: "High",
        guidance: "Confirm identity and plan before coordination",
        mvpPriority: "Must-have"
      },
      {
        category: "Hospital ADT alert",
        sourceSystem: "ADT feed",
        recordDate: "2026-10-31",
        record: "Discharged 2026-10-30 18:20 after heart-failure admission; alert received 2026-10-31 14:00",
        caveat: "Arrived ~20 hours after discharge",
        freshness: "Medium",
        guidance: "Treat as a recent transition; verify discharge details",
        mvpPriority: "Must-have"
      },
      {
        category: "EHR / CCD summary",
        sourceSystem: "Hospital EHR / HIE",
        recordDate: "2026-10-30",
        record: "Discharge summary notes medication change; hospital list shows furosemide 40 mg daily",
        caveat: "Medication list conflicts with older plan list (20 mg daily)",
        freshness: "Medium",
        guidance: "Show both sources and ask clinician to reconcile; do not auto-resolve",
        mvpPriority: "Must-have"
      },
      {
        category: "Pharmacy fills",
        sourceSystem: "PBM / pharmacy feed",
        recordDate: "2026-10-29",
        record: "Most recent paid fill shows prior furosemide strength; no new-strength fill visible",
        caveat: "May be a feed delay or a true fill gap",
        freshness: "Medium",
        guidance: "Prompt verification with member/pharmacy; label as unconfirmed",
        mvpPriority: "Must-have"
      },
      {
        category: "Medical claims",
        sourceSystem: "Claims warehouse",
        recordDate: "2026-09-18",
        record: "Last adjudicated claim available; no October discharge event visible",
        caveat: "Claims are ~45 days behind care",
        freshness: "Low",
        guidance: "Never treat missing recent claims as proof that care did not occur",
        mvpPriority: "Must-have"
      },
      {
        category: "Labs & results",
        sourceSystem: "Hospital lab feed",
        recordDate: "2026-10-30",
        record: "Basic metabolic panel listed as completed; result available in hospital summary",
        caveat: "Result timestamp is present but source link is delayed",
        freshness: "Medium",
        guidance: "Display result and source timestamp; clinician interprets",
        mvpPriority: "Later"
      },
      {
        category: "Appointments",
        sourceSystem: "Provider scheduling feed",
        recordDate: "2026-11-02",
        record: "No PCP follow-up appointment found after discharge",
        caveat: "Scheduling feed may not include external appointments",
        freshness: "Medium",
        guidance: "Suggest checking with member and PCP office",
        mvpPriority: "Must-have"
      },
      {
        category: "Contact history",
        sourceSystem: "Care-management CRM",
        recordDate: "2026-10-15",
        record: "Last successful contact; mobile number listed as preferred",
        caveat: "No recent post-discharge contact yet",
        freshness: "Medium",
        guidance: "Use verified preferred channel; log attempt and outcome",
        mvpPriority: "Must-have"
      },
      {
        category: "SDOH screen",
        sourceSystem: "Health-related social needs tool",
        recordDate: "2026-09-01",
        record: "Member reported transport can sometimes be a problem",
        caveat: "Screen is ~2 months old",
        freshness: "Medium",
        guidance: "Confirm whether need is still current before arranging transport",
        mvpPriority: "Must-have"
      },
      {
        category: "Care plan / referral",
        sourceSystem: "Care-management system",
        recordDate: "2026-10-31",
        record: "Transition-of-care case opened; post-discharge tasks incomplete",
        caveat: "Task list has not been reconciled with new discharge summary",
        freshness: "Medium",
        guidance: "Create a short, owned checklist and prevent duplicate tasks",
        mvpPriority: "Must-have"
      }
    ],
    recentOutreach: [
      { date: "2026-10-15 10:14", channel: "Phone (Outbound)", caller: "Maria · RN", outcome: "Connected", notes: "Pre-admission check-in. Member reported mild shortness of breath upon exertion. Mobile confirmed." }
    ],
    tasks: [
      { id: "T-101", title: "Verify discharge furosemide dose (40mg vs 20mg) with Dr. A. Rao's office", owner: "Maria · RN", priority: "High", dueDate: "2026-11-02", status: "Not started", reason: "Reconcile discharge summary with plan active list", category: "Clinical Reconciliation" },
      { id: "T-102", title: "Schedule 7-day post-discharge PCP appointment with Dr. Rao", owner: "Clinic Coordinator", priority: "High", dueDate: "2026-11-03", status: "In progress", reason: "Transition of care benchmark protocol", category: "Appointment Scheduling" },
      { id: "T-103", title: "Screen for transport barrier for upcoming clinic visit", owner: "Maria · RN", priority: "Medium", dueDate: "2026-11-04", status: "Not started", reason: "Previous SDOH screen noted transport difficulty", category: "Social Coordination" }
    ],
    suggestedTasks: [
      { id: "ST-101", title: "Confirm member has acquired new prescription from community pharmacy", reason: "PBM feed shows no 40mg fill as of 29 Oct", owner: "Maria · RN", priority: "High" },
      { id: "ST-102", title: "Offer non-emergency medical transportation (NEMT) benefit ride", reason: "Historical transport barrier flagged in 01 Sep screen", owner: "Community Health Worker", priority: "Medium" }
    ]
  },
  {
    id: "P-1003",
    name: "Luis Ramirez",
    age: 54,
    gender: "M",
    plan: "Medicare Advantage PPO",
    program: "High Utilizer / Care Coordination",
    language: "Spanish",
    pcp: "Dr. M. Johnson",
    scenario: "Frequent ED visits and hard to reach",
    workflowScore: 60,
    priority: "Medium",
    scoreBreakdown: {
      acuteEvent: 25,
      medicationSignal: 0,
      outreachDifficulty: 20,
      socialBarrier: 15,
      total: 60,
    },
    holisticSummary: "Three ED alerts in 30 days, no confirmed primary-care follow-up, and several unsuccessful outreach attempts; a contact number may belong to a relative.",
    mondayAction: "Review the recent ED pattern, verify a safe and preferred contact route, arrange Spanish-language outreach, and coordinate a follow-up after clinician review.",
    plantedImperfections: "Duplicate member identifier in one feed; ED alert lacks diagnosis; phone ownership is uncertain.",
    signals: [
      "Three ED visits in 30 days: 04 Oct, 17 Oct, and 29 Oct",
      "Latest ED alert (29 Oct) lacks diagnosis and disposition details",
      "Four calls in three weeks went straight to voicemail",
      "Listed phone number may belong to cousin (ownership unverified)",
      "Preferred language is Spanish; requires bilingual/certified interpreter outreach"
    ],
    dataQualityBadges: [
      { label: "Duplicate ID in HIE", level: "red" },
      { label: "ED alert lacks diagnosis", level: "amber" },
      { label: "Uncertain phone ownership", level: "red" },
      { label: "Language: Spanish", level: "teal" },
      { label: "SDOH screen >90d", level: "slate" }
    ],
    contactInfo: {
      primaryPhone: "(555) 871-3329",
      phoneType: "Mobile (Unconfirmed ownership)",
      phoneVerified: false,
      verifiedDate: "Unverified (Last logged 2026-10-31)",
      safeChannelConfirmed: false,
      preferredWindow: "Late Afternoon (15:00 - 18:00)",
      preferredLanguage: "Spanish (Español) — interpreter requested",
      address: "884 Southwood Blvd, Apt 12",
      cityStateZip: "Austin, TX 78704",
      addressType: "Residential on file",
      caregiverName: "Carlos (Cousin - unverified authorization)",
      caregiverRelation: "Cousin",
      caregiverAuthorized: false
    },
    medicationReconciliation: {
      hasConflict: false,
      title: "Medication Status: No active refill conflict detected",
      urgency: "Routine review; do not infer taking status from absent fills",
      items: [
        {
          source: "PBM / Pharmacy Feed",
          date: "2026-10-26",
          status: "Available Feed",
          detail: "Lisinopril 10 mg oral tablet (30d supply dispensed 2026-10-02)",
          notes: "Feed shows regular fills, though cash/independent pharmacy purchases would not be captured.",
          badge: "Pharmacy Feed"
        }
      ],
      safetyNotice: "Privacy & Consent Guardrail: Four consecutive voicemails reached a number that may belong to a relative. Do not leave clinical, diagnosis, or health plan details on this voicemail until identity and member consent are confirmed directly with Luis."
    },
    records: [
      {
        category: "Member & eligibility",
        sourceSystem: "Enrollment system",
        recordDate: "2026-11-02",
        record: "MA PPO; Spanish preferred; PCP Dr. M. Johnson",
        caveat: "Current record",
        freshness: "High",
        guidance: "Confirm identity and language preference",
        mvpPriority: "Must-have"
      },
      {
        category: "Hospital ADT alert",
        sourceSystem: "ADT feed",
        recordDate: "2026-10-30",
        record: "ED visits recorded on 2026-10-04, 2026-10-17 and 2026-10-29; latest alert says ED arrival only",
        caveat: "Latest alert has no diagnosis or disposition",
        freshness: "Medium",
        guidance: "Show event count and missing disposition; seek source clarification",
        mvpPriority: "Must-have"
      },
      {
        category: "EHR / CCD summary",
        sourceSystem: "HIE / provider EHR",
        recordDate: "2026-10-29",
        record: "One ED note available; reason for visit is incomplete in inbound extract",
        caveat: "Duplicate ID appears in one inbound record",
        freshness: "Low",
        guidance: "Hold merge; route duplicate-resolution task before linking records",
        mvpPriority: "Must-have"
      },
      {
        category: "Pharmacy fills",
        sourceSystem: "PBM / pharmacy feed",
        recordDate: "2026-10-26",
        record: "No obvious medication refill gap detected in the available feed",
        caveat: "Feed may omit cash purchases and some external pharmacies",
        freshness: "Medium",
        guidance: "Do not infer medication status from missing data alone",
        mvpPriority: "Must-have"
      },
      {
        category: "Medical claims",
        sourceSystem: "Claims warehouse",
        recordDate: "2026-09-30",
        record: "Two ED claims visible; most recent event not yet adjudicated",
        caveat: "Claims lag hides newest ED visit",
        freshness: "Low",
        guidance: "Pair claims with ADT; show separate through-dates",
        mvpPriority: "Must-have"
      },
      {
        category: "Labs & results",
        sourceSystem: "Lab interface",
        recordDate: "2026-10-29",
        record: "No lab result attached to the latest ED alert",
        caveat: "Missing result may reflect interface limitations",
        freshness: "Low",
        guidance: "Show 'not received' rather than 'not performed'",
        mvpPriority: "Later"
      },
      {
        category: "Appointments",
        sourceSystem: "Provider scheduling feed",
        recordDate: "2026-11-02",
        record: "No follow-up appointment visible after latest ED visit",
        caveat: "External clinic schedule may not be connected",
        freshness: "Medium",
        guidance: "Suggest verification with member or clinic",
        mvpPriority: "Must-have"
      },
      {
        category: "Contact history",
        sourceSystem: "Care-management CRM",
        recordDate: "2026-10-31",
        record: "Four calls in 3 weeks went to voicemail; listed number may belong to cousin",
        caveat: "Phone ownership and consent are uncertain",
        freshness: "Low",
        guidance: "Do not disclose sensitive details until identity and permission are confirmed",
        mvpPriority: "Must-have"
      },
      {
        category: "SDOH screen",
        sourceSystem: "Health-related social needs tool",
        recordDate: "2026-07-20",
        record: "Member previously requested help with transport",
        caveat: "Screen is >3 months old",
        freshness: "Low",
        guidance: "Reconfirm need and preferred communication method",
        mvpPriority: "Must-have"
      },
      {
        category: "Care plan / referral",
        sourceSystem: "Care-management system",
        recordDate: "2026-10-31",
        record: "High-utilizer referral open; no assigned outreach owner",
        caveat: "Ownership gap",
        freshness: "Medium",
        guidance: "Assign accountable case manager and language support",
        mvpPriority: "Must-have"
      }
    ],
    recentOutreach: [
      { date: "2026-10-31 16:20", channel: "Phone (Outbound)", caller: "Outreach Assistant", outcome: "Voicemail", notes: "Left neutral generic callback request in Spanish. No medical details disclosed." },
      { date: "2026-10-24 14:10", channel: "Phone (Outbound)", caller: "Maria · RN", outcome: "Voicemail", notes: "Voicemail greeting mentions name Carlos. Suspected cousin's phone." },
      { date: "2026-10-18 11:30", channel: "Phone (Outbound)", caller: "Maria · RN", outcome: "Voicemail", notes: "Unanswered. Voicemail full or unconfigured." },
      { date: "2026-10-11 15:45", channel: "Phone (Outbound)", caller: "Outreach Assistant", outcome: "Voicemail", notes: "Spanish callback message left." }
    ],
    tasks: [
      { id: "T-201", title: "Assign Spanish-bilingual case manager & resolve duplicate ID queue", owner: "Maria · RN", priority: "High", dueDate: "2026-11-02", status: "In progress", reason: "Bilingual protocol & data governance lock", category: "Identity & Governance" },
      { id: "T-202", title: "Request clinical discharge summary & diagnosis for 29 Oct ED visit", owner: "Maria · RN", priority: "High", dueDate: "2026-11-03", status: "Not started", reason: "ADT alert arrived without diagnosis/disposition", category: "Clinical Record Retrieval" },
      { id: "T-203", title: "Verify Luis's direct mobile number and obtain consent for voicemail", owner: "Outreach Specialist", priority: "Medium", dueDate: "2026-11-04", status: "Not started", reason: "Four voicemails to possible cousin number", category: "Outreach Verification" }
    ],
    suggestedTasks: [
      { id: "ST-201", title: "Coordinate with Dr. M. Johnson's clinic for post-ED PCP visit", reason: "Three ED visits without primary care continuity", owner: "Maria · RN", priority: "High" },
      { id: "ST-202", title: "Send bilingual Spanish/English verified mailer with care coordination options", reason: "Phone contact barrier persisting for 3 weeks", owner: "Outreach Specialist", priority: "Medium" }
    ]
  },
  {
    id: "P-1002",
    name: "Maya Patel",
    age: 62,
    gender: "F",
    plan: "Medicare Advantage HMO",
    program: "Diabetes Management",
    language: "English",
    pcp: "Dr. N. Chen",
    scenario: "Rising-risk diabetes with refill gap",
    workflowScore: 55,
    priority: "Medium",
    scoreBreakdown: {
      acuteEvent: 10,
      medicationSignal: 25,
      outreachDifficulty: 5,
      socialBarrier: 15,
      total: 55,
    },
    holisticSummary: "Recent A1c is elevated and pharmacy history shows a long refill gap; member reports cost and shift-work barriers.",
    mondayAction: "Confirm the medication list and refill status, ask about affordability and work schedule, then coordinate a clinician-approved follow-up and support options.",
    plantedImperfections: "Pharmacy feed and old case note disagree; latest claim is delayed; old phone preference may be stale.",
    signals: [
      "PCP note (25 Oct) records elevated HbA1c at 9.1% (lab confirmed 24 Oct)",
      "Pharmacy feed shows no Metformin paid fill since 28 Aug (>60-day gap)",
      "Member previously noted prescription affordability concerns (SDOH: 15 Aug)",
      "Evening contact requested after 18:00 due to nursing home shift work",
      "Scheduling discrepancy: portal shows tentative slot, provider feed shows none"
    ],
    dataQualityBadges: [
      { label: "Possible refill gap (Metformin)", level: "amber" },
      { label: "Elevated lab (A1c 9.1%)", level: "red" },
      { label: "Appointment status conflict", level: "amber" },
      { label: "Evening calls only (>18:00)", level: "teal" },
      { label: "Claims lag (~40d)", level: "slate" }
    ],
    contactInfo: {
      primaryPhone: "(555) 492-1180",
      phoneType: "Mobile",
      phoneVerified: true,
      verifiedDate: "2026-10-08",
      safeChannelConfirmed: true,
      preferredWindow: "Evening after 18:00 (Due to shift work)",
      preferredLanguage: "English",
      address: "219 Pinecrest Drive",
      cityStateZip: "Charlotte, NC 28205",
      addressType: "Residential confirmed",
      caregiverName: "None",
      caregiverRelation: "N/A",
      caregiverAuthorized: false
    },
    medicationReconciliation: {
      hasConflict: true,
      title: "Antidiabetic Adherence & Refill Gap: Metformin 1000 mg",
      urgency: "Verify possible gap with member; do not assume non-adherence",
      items: [
        {
          source: "Primary Care EHR Note (Dr. N. Chen)",
          date: "2026-10-25",
          status: "Clinical Note",
          detail: "Metformin ER 1000 mg PO daily. Patient encouraged to take consistently. A1c 9.1%.",
          notes: "Free-text medication section imported from office visit note.",
          badge: "PCP Note"
        },
        {
          source: "PBM / Retail Pharmacy Claims Feed",
          date: "2026-10-31 (Current feed through-date)",
          status: "Pharmacy Dispense History",
          detail: "Metformin ER 1000 mg #60. Last dispensed 2026-08-28. Days supply: 30 days.",
          notes: "No paid pharmacy fill visible in the feed for 64 days. External cash program ($4 retail list) or sample use would not appear.",
          badge: "PBM Feed"
        }
      ],
      safetyNotice: "Important Framing: Present the refill gap as a 'possible gap to verify', not as proof of non-adherence. Inquire whether Maya filled through a retail $4 generic plan, received samples, had adverse effects, or faced copay barriers."
    },
    records: [
      {
        category: "Member & eligibility",
        sourceSystem: "Enrollment system",
        recordDate: "2026-11-02",
        record: "MA HMO; PCP Dr. N. Chen; English; preferred contact: mobile",
        caveat: "Current record",
        freshness: "High",
        guidance: "Confirm identity and plan before coordination",
        mvpPriority: "Must-have"
      },
      {
        category: "Hospital ADT alert",
        sourceSystem: "ADT feed",
        recordDate: "2026-10-10",
        record: "No acute admission alert in the current 30-day window",
        caveat: "Absence of an alert is not proof of no care event",
        freshness: "Medium",
        guidance: "Keep as context; use other signals for prioritization",
        mvpPriority: "Must-have"
      },
      {
        category: "EHR / CCD summary",
        sourceSystem: "Primary-care EHR",
        recordDate: "2026-10-25",
        record: "Most recent visit documents diabetes follow-up; A1c 9.1% in note",
        caveat: "Imported note uses a free-text medication list",
        freshness: "Medium",
        guidance: "Summarize clinically relevant facts and show source date",
        mvpPriority: "Must-have"
      },
      {
        category: "Pharmacy fills",
        sourceSystem: "PBM / pharmacy feed",
        recordDate: "2026-10-31",
        record: "Metformin refill not visible since 2026-08-28; no recent paid fill in feed",
        caveat: "Possible 60+ day gap; external cash fill is not captured",
        freshness: "Medium",
        guidance: "Flag a possible gap, not confirmed non-adherence; ask member",
        mvpPriority: "Must-have"
      },
      {
        category: "Medical claims",
        sourceSystem: "Claims warehouse",
        recordDate: "2026-09-20",
        record: "Last processed claim predates latest primary-care note",
        caveat: "Claims lag may hide more recent activity",
        freshness: "Low",
        guidance: "Show through-date beside claims; do not over-weight stale claims",
        mvpPriority: "Must-have"
      },
      {
        category: "Labs & results",
        sourceSystem: "Lab interface",
        recordDate: "2026-10-24",
        record: "A1c 9.1% reported by primary-care lab",
        caveat: "Result is recent; units/reference context are carried with source",
        freshness: "High",
        guidance: "Display as a signal for clinician review, not an automated diagnosis",
        mvpPriority: "Must-have"
      },
      {
        category: "Appointments",
        sourceSystem: "Provider scheduling feed",
        recordDate: "2026-11-02",
        record: "Follow-up appointment not visible; patient portal lists a tentative slot",
        caveat: "Two systems disagree on appointment status",
        freshness: "Medium",
        guidance: "Show both statuses and ask staff/member to confirm",
        mvpPriority: "Must-have"
      },
      {
        category: "Contact history",
        sourceSystem: "Care-management CRM",
        recordDate: "2026-10-08",
        record: "Member said evening calls after 18:00 work best due to shift schedule",
        caveat: "Preference may have changed",
        freshness: "Medium",
        guidance: "Offer a call window and reconfirm preference",
        mvpPriority: "Must-have"
      },
      {
        category: "SDOH screen",
        sourceSystem: "Health-related social needs tool",
        recordDate: "2026-08-15",
        record: "Member reported medication affordability as a concern",
        caveat: "Screen is ~11 weeks old",
        freshness: "Medium",
        guidance: "Ask whether cost remains a barrier; route to approved support",
        mvpPriority: "Must-have"
      },
      {
        category: "Care plan / referral",
        sourceSystem: "Care-management system",
        recordDate: "2026-10-29",
        record: "Diabetes program case open; medication review task overdue",
        caveat: "Task owner is blank",
        freshness: "Medium",
        guidance: "Assign owner and due date; prevent task from remaining orphaned",
        mvpPriority: "Must-have"
      }
    ],
    recentOutreach: [
      { date: "2026-10-08 18:25", channel: "Phone (Outbound)", caller: "Maria · RN", outcome: "Connected", notes: "Discussed shift work at rehabilitation facility. Requested evening calls after 18:00." }
    ],
    tasks: [
      { id: "T-301", title: "Reconcile overdue diabetes medication review (orphan task)", owner: "Maria · RN", priority: "High", dueDate: "2026-11-02", status: "In progress", reason: "Task owner was previously blank", category: "Care Plan Maintenance" },
      { id: "T-302", title: "Verify tentative follow-up appointment status with Dr. Chen's scheduler", owner: "Clinic Coordinator", priority: "Medium", dueDate: "2026-11-03", status: "Not started", reason: "Portal tentative slot disagrees with provider feed", category: "Appointment Reconciliation" },
      { id: "T-303", title: "Prepare evening outreach call after 18:00 re: Metformin supply and copays", owner: "Maria · RN", priority: "Medium", dueDate: "2026-11-02", status: "Not started", reason: "Respect member shift-work preference", category: "Member Outreach" }
    ],
    suggestedTasks: [
      { id: "ST-301", title: "Screen for plan-sponsored 90-day mail-order copay savings", reason: "Member noted affordability concerns on 15 Aug screen", owner: "Care Coordinator", priority: "Medium" },
      { id: "ST-302", title: "Offer Certified Diabetes Care and Education Specialist (CDCES) consult", reason: "A1c at 9.1% indicates opportunity for lifestyle and dosing support", owner: "Maria · RN", priority: "Medium" }
    ]
  },
  {
    id: "P-1004",
    name: "Amina Brooks",
    age: 43,
    gender: "F",
    plan: "Medicaid Managed Care",
    program: "Behavioral Health / Social Needs",
    language: "English",
    pcp: "Community Health Center",
    scenario: "Behavioral-health referral and housing instability",
    workflowScore: 55,
    priority: "Medium",
    scoreBreakdown: {
      acuteEvent: 15,
      medicationSignal: 0,
      outreachDifficulty: 15,
      socialBarrier: 25,
      total: 55,
    },
    holisticSummary: "Behavioral-health referral is open; member-reported housing and transportation needs may affect appointment attendance and continuity.",
    mondayAction: "Check the member's preferred safe contact method, confirm whether the referral is still wanted, and offer connection to housing and transport resources without assuming consent.",
    plantedImperfections: "Address is not stable; social-needs screen is 90 days old; referral status differs across systems.",
    signals: [
      "Open outpatient behavioral-health referral from Community Health Center",
      "Discrepant referral status: EHR notes 'pending follow-up' while scheduler shows 'pending confirmation'",
      "SDOH screen (04 Aug, ~90d old) noted housing instability and transit barriers",
      "Address on file is a P.O. Box / transitional mailing address only",
      "No approved safe contact method documented; voicemail was withheld on 29 Oct for safety"
    ],
    dataQualityBadges: [
      { label: "Mailing address only", level: "amber" },
      { label: "Safe channel unverified", level: "red" },
      { label: "SDOH screen ~90d old", level: "amber" },
      { label: "Referral status mismatch", level: "amber" },
      { label: "Behavioral Health sensitivity", level: "teal" }
    ],
    contactInfo: {
      primaryPhone: "(555) 712-4091",
      phoneType: "Mobile (Discretion advised)",
      phoneVerified: false,
      verifiedDate: "Unconfirmed safety status",
      safeChannelConfirmed: false,
      preferredWindow: "Unspecified — reconfirm safe window first",
      preferredLanguage: "English",
      address: "P.O. Box 7420 (Transitional mailing address)",
      cityStateZip: "Atlanta, GA 30301",
      addressType: "Mailing / Non-residential",
      caregiverName: "None",
      caregiverRelation: "N/A",
      caregiverAuthorized: false
    },
    medicationReconciliation: {
      hasConflict: false,
      title: "Medication Status: No active issues flagged in available feeds",
      urgency: "Use only as supporting context; data coverage is limited",
      items: [
        {
          source: "PBM / Retail Pharmacy Claims Feed",
          date: "2026-10-27",
          status: "Available Context",
          detail: "Sertraline 50 mg PO daily (dispensed 2026-09-15)",
          notes: "Coverage is fragmented across county and clinic programs. Absence of recent claims must not be assumed as stopped medication.",
          badge: "Pharmacy Feed"
        }
      ],
      safetyNotice: "Sensitive Data & Privacy Boundary: Keep behavioral health details minimally displayed and access-conscious. Never imply a diagnosis beyond synthetic source notes. Never disclose referral details in a voicemail without prior safe-channel confirmation."
    },
    records: [
      {
        category: "Member & eligibility",
        sourceSystem: "Enrollment system",
        recordDate: "2026-11-02",
        record: "Medicaid managed care; English; contact preference not recently confirmed",
        caveat: "Address on file is a mailing address only",
        freshness: "Medium",
        guidance: "Ask member to confirm a safe contact method and mailing preference",
        mvpPriority: "Must-have"
      },
      {
        category: "Hospital ADT alert",
        sourceSystem: "ADT feed",
        recordDate: "2026-10-12",
        record: "No acute admission alert in current view",
        caveat: "Not a complete view of all care settings",
        freshness: "Medium",
        guidance: "Keep alert absence neutral; do not infer clinical stability",
        mvpPriority: "Must-have"
      },
      {
        category: "EHR / CCD summary",
        sourceSystem: "Community health center EHR",
        recordDate: "2026-10-28",
        record: "Behavioral-health referral noted; latest note requests follow-up",
        caveat: "Referral status may be duplicated in another system",
        freshness: "Medium",
        guidance: "Show referral owner and current status; avoid displaying unnecessary sensitive detail",
        mvpPriority: "Must-have"
      },
      {
        category: "Pharmacy fills",
        sourceSystem: "PBM / pharmacy feed",
        recordDate: "2026-10-27",
        record: "No recent medication issue flagged in available feed",
        caveat: "Data coverage is incomplete",
        freshness: "Low",
        guidance: "Use only as supporting context",
        mvpPriority: "Later"
      },
      {
        category: "Medical claims",
        sourceSystem: "Claims warehouse",
        recordDate: "2026-09-15",
        record: "Behavioral-health visit claim visible; later care may not yet appear",
        caveat: "Claims lag and fragmented networks",
        freshness: "Low",
        guidance: "Show claims through-date and source coverage",
        mvpPriority: "Must-have"
      },
      {
        category: "Labs & results",
        sourceSystem: "Lab interface",
        recordDate: "2026-10-28",
        record: "No relevant lab result is attached to this care-coordination scenario",
        caveat: "No record received is not equivalent to no test",
        freshness: "Low",
        guidance: "Avoid surfacing irrelevant blank data as a risk flag",
        mvpPriority: "Later"
      },
      {
        category: "Appointments",
        sourceSystem: "Community clinic scheduler",
        recordDate: "2026-11-02",
        record: "Behavioral-health follow-up marked 'pending confirmation'",
        caveat: "Scheduler status differs from referral system",
        freshness: "Medium",
        guidance: "Show mismatch and task staff to confirm with member",
        mvpPriority: "Must-have"
      },
      {
        category: "Contact history",
        sourceSystem: "Care-management CRM",
        recordDate: "2026-10-29",
        record: "One outreach attempt; voicemail not left because safe-contact preference is unknown",
        caveat: "No approved safe channel documented",
        freshness: "Low",
        guidance: "Confirm permission and contact safety before leaving details",
        mvpPriority: "Must-have"
      },
      {
        category: "SDOH screen",
        sourceSystem: "Health-related social needs tool",
        recordDate: "2026-08-04",
        record: "Member reported unstable housing and transport barrier",
        caveat: "Screen is ~90 days old; situation may have changed",
        freshness: "Medium",
        guidance: "Ask permission to re-screen and offer community resource navigation",
        mvpPriority: "Must-have"
      },
      {
        category: "Care plan / referral",
        sourceSystem: "Care-management system",
        recordDate: "2026-10-30",
        record: "Behavioral-health referral open; housing-resource task pending",
        caveat: "Referral and case notes show different statuses",
        freshness: "Medium",
        guidance: "Reconcile ownership and status; keep member choice central",
        mvpPriority: "Must-have"
      }
    ],
    recentOutreach: [
      { date: "2026-10-29 13:40", channel: "Phone (Outbound)", caller: "Maria · RN", outcome: "No voicemail left", notes: "No voicemail left due to lack of verified safe-channel consent. Sent SMS verification prompt." }
    ],
    tasks: [
      { id: "T-401", title: "Establish safe contact protocol and verify preferred phone/SMS consent", owner: "Maria · RN", priority: "High", dueDate: "2026-11-02", status: "Not started", reason: "Protect sensitive health information privacy", category: "Privacy & Consent" },
      { id: "T-402", title: "Reconcile behavioral-health referral status between clinic EHR and scheduler", owner: "Care Coordinator", priority: "Medium", dueDate: "2026-11-03", status: "In progress", reason: "Dual status records: 'pending follow-up' vs 'pending confirmation'", category: "Referral Alignment" },
      { id: "T-403", title: "Assess current housing stability & offer community shelter/housing voucher navigator", owner: "Social Work Specialist", priority: "Medium", dueDate: "2026-11-04", status: "Not started", reason: "SDOH screen is ~90 days old; update social needs", category: "Housing & SDOH" }
    ],
    suggestedTasks: [
      { id: "ST-401", title: "Confirm whether member still desires the outpatient behavioral health intake", reason: "Ensure member-directed care before confirming provider schedule", owner: "Maria · RN", priority: "High" },
      { id: "ST-402", title: "Coordinate Medicaid transit van voucher for clinic appointment", reason: "Transport barrier noted in August screen", owner: "Community Health Worker", priority: "Medium" }
    ]
  },
  {
    id: "P-1005",
    name: "Evelyn Carter",
    age: 81,
    gender: "F",
    plan: "Dual-Eligible Medicare-Medicaid",
    program: "Complex Care Management",
    language: "English",
    pcp: "Dr. R. Williams",
    scenario: "Older member with caregiver strain",
    workflowScore: 55,
    priority: "Medium",
    scoreBreakdown: {
      acuteEvent: 10,
      medicationSignal: 15,
      outreachDifficulty: 5,
      socialBarrier: 25,
      total: 55,
    },
    holisticSummary: "Caregiver reports increasing strain and a missed home-support visit; medication lists do not fully match between primary care and pharmacy records.",
    mondayAction: "Contact the member and authorized caregiver using the preferred time, reconcile medication discrepancies with the care team, and re-coordinate home support.",
    plantedImperfections: "Caregiver authorization needs confirmation; medication mismatch; home-support appointment status is unclear.",
    signals: [
      "Caregiver (daughter) reports significant strain and fatigue",
      "Vendor scheduler notes home-support visit on 30 Oct was missed / needs rescheduling",
      "Vendor status has not synced to health plan's case record (orphan handoff)",
      "PCP medication reconciliation note (23 Oct) lists 2 medication changes not yet reflected in pharmacy feed",
      "Daughter requested calls after 17:00, but member's own consent & authorization require verification"
    ],
    dataQualityBadges: [
      { label: "Caregiver auth unverified", level: "red" },
      { label: "Missed vendor visit unsynced", level: "amber" },
      { label: "Medication list mismatch", level: "amber" },
      { label: "Dual-Eligible (D-SNP)", level: "teal" },
      { label: "Caregiver strain noted", level: "red" }
    ],
    contactInfo: {
      primaryPhone: "(555) 388-7241",
      phoneType: "Home / Landline",
      phoneVerified: true,
      verifiedDate: "2026-10-10",
      safeChannelConfirmed: true,
      preferredWindow: "Late Afternoon after 17:00 (Daughter's request)",
      preferredLanguage: "English",
      address: "1420 Greenfield Lane",
      cityStateZip: "Indianapolis, IN 46220",
      addressType: "Residential confirmed",
      caregiverName: "Sarah Carter (Daughter)",
      caregiverRelation: "Daughter / Primary caregiver",
      caregiverAuthorized: false // Needs formal HIPAA verification
    },
    medicationReconciliation: {
      hasConflict: true,
      title: "Medication Regimen Mismatch: Dual Changes from 23 Oct PCP Visit",
      urgency: "Verify with primary care clinic and member's daughter; check pharmacy dispenser",
      items: [
        {
          source: "Primary Care Visit Note (Dr. R. Williams)",
          date: "2026-10-23",
          status: "Visit Note Reconciliation",
          detail: "Amlodipine titrated from 5 mg to 10 mg daily; Atorvastatin 20 mg added for lipid control.",
          notes: "Doctor documented dose increase and statin start following cardiovascular risk assessment.",
          badge: "PCP Note"
        },
        {
          source: "PBM / Retail Pharmacy Claims Feed",
          date: "2026-10-29",
          status: "Dispense Feed",
          detail: "Amlodipine 5 mg (dispensed 2026-10-02, 30d). Atorvastatin not present in feed.",
          notes: "Pharmacy claims do not reflect the new 10 mg strength or statin fill. May have been filled outside network or not picked up.",
          badge: "PBM Feed"
        }
      ],
      safetyNotice: "Caregiver Consent Rule: Do not assume daughter Sarah is authorized to receive clinical details without signed authorization on file. Confirm member Evelyn's consent during the joint call before reviewing medical changes."
    },
    records: [
      {
        category: "Member & eligibility",
        sourceSystem: "Enrollment system",
        recordDate: "2026-11-02",
        record: "Dual-eligible member; English; daughter listed as caregiver contact",
        caveat: "Caregiver authorization status is not visible in summary",
        freshness: "Medium",
        guidance: "Verify authorized representative status before sharing member information",
        mvpPriority: "Must-have"
      },
      {
        category: "Hospital ADT alert",
        sourceSystem: "ADT feed",
        recordDate: "2026-10-06",
        record: "No recent discharge alert; complex-care referral remains open",
        caveat: "Not a complete view of all care settings",
        freshness: "Medium",
        guidance: "Use caregiver and service signals; do not infer no care needs",
        mvpPriority: "Must-have"
      },
      {
        category: "EHR / CCD summary",
        sourceSystem: "Primary-care EHR",
        recordDate: "2026-10-23",
        record: "Medication reconciliation note lists two medicines changed at last visit",
        caveat: "Note and pharmacy feed do not fully align",
        freshness: "Medium",
        guidance: "Display discrepancy with source and timestamp for nurse review",
        mvpPriority: "Must-have"
      },
      {
        category: "Pharmacy fills",
        sourceSystem: "PBM / pharmacy feed",
        recordDate: "2026-10-29",
        record: "One maintenance prescription refill is visible; second medication status unclear",
        caveat: "Pharmacy feed may not include samples or outside pharmacy",
        freshness: "Medium",
        guidance: "Ask member/caregiver and verify with pharmacy",
        mvpPriority: "Must-have"
      },
      {
        category: "Medical claims",
        sourceSystem: "Claims warehouse",
        recordDate: "2026-09-25",
        record: "Claims show home-health service in September",
        caveat: "Claims do not confirm whether today's service is scheduled",
        freshness: "Low",
        guidance: "Use service feed for operational status; claims as historical context",
        mvpPriority: "Must-have"
      },
      {
        category: "Labs & results",
        sourceSystem: "Lab interface",
        recordDate: "2026-10-23",
        record: "Latest routine lab panel available in primary-care record",
        caveat: "No abnormality interpretation included in case-management extract",
        freshness: "Medium",
        guidance: "Show result metadata; clinician interprets values",
        mvpPriority: "Later"
      },
      {
        category: "Appointments",
        sourceSystem: "Home-support vendor scheduler",
        recordDate: "2026-10-31",
        record: "Home-support visit on 2026-10-30 marked 'missed / reschedule needed'",
        caveat: "Vendor status has not synced to plan case record",
        freshness: "Medium",
        guidance: "Create a rescheduling task after confirming member preference",
        mvpPriority: "Must-have"
      },
      {
        category: "Contact history",
        sourceSystem: "Care-management CRM",
        recordDate: "2026-10-30",
        record: "Daughter requested calls after 17:00; member preference not separately confirmed",
        caveat: "Caregiver preference may not equal member preference",
        freshness: "Medium",
        guidance: "Confirm member's preference and caregiver permission",
        mvpPriority: "Must-have"
      },
      {
        category: "SDOH screen",
        sourceSystem: "Health-related social needs tool",
        recordDate: "2026-09-12",
        record: "Caregiver strain and transport needs reported",
        caveat: "Screen is ~7 weeks old",
        freshness: "Medium",
        guidance: "Recheck current needs and available support",
        mvpPriority: "Must-have"
      },
      {
        category: "Care plan / referral",
        sourceSystem: "Care-management system",
        recordDate: "2026-10-31",
        record: "Complex-care case open; home-support reschedule task has no owner",
        caveat: "Task ownership gap",
        freshness: "Medium",
        guidance: "Assign owner, confirm authorization and track closure",
        mvpPriority: "Must-have"
      }
    ],
    recentOutreach: [
      { date: "2026-10-30 17:15", channel: "Phone (Inbound from daughter)", caller: "Maria · RN", outcome: "Connected", notes: "Daughter Sarah called expressing exhaustion with medication changes and noted home aide missed Friday shift." }
    ],
    tasks: [
      { id: "T-501", title: "Reschedule missed home-support aide visit with vendor (orphan handoff)", owner: "Maria · RN", priority: "High", dueDate: "2026-11-02", status: "In progress", reason: "Vendor marked missed/reschedule on 30 Oct; no owner assigned in plan system", category: "Vendor Coordination" },
      { id: "T-502", title: "Verify formal caregiver HIPAA authorization for daughter Sarah", owner: "Compliance / Records", priority: "High", dueDate: "2026-11-03", status: "Not started", reason: "Prevent unauthorized clinical disclosure while honoring daughter's care role", category: "Consent & Authorization" },
      { id: "T-503", title: "Clarify Amlodipine 10mg & Atorvastatin status with Dr. Williams' nurse", owner: "Maria · RN", priority: "Medium", dueDate: "2026-11-04", status: "Not started", reason: "Reconciliation discrepancy between PCP note and PBM feed", category: "Medication Reconciliation" }
    ],
    suggestedTasks: [
      { id: "ST-501", title: "Connect caregiver to Area Agency on Aging respite care resources", reason: "Severe caregiver strain flagged in 12 Sep screen and 30 Oct call", owner: "Social Work Specialist", priority: "Medium" },
      { id: "ST-502", title: "Schedule joint evening call with Evelyn & Sarah after 17:00", reason: "Daughter requested late afternoon window to accommodate work hours", owner: "Maria · RN", priority: "Medium" }
    ]
  }
];

export const INITIAL_TASKS = [
  ...PATIENTS.flatMap(p => p.tasks.map(t => ({ ...t, patientId: p.id, patientName: p.name, program: p.program })))
];

