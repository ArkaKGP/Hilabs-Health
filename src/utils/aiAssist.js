/**
 * Safe, deterministic AI assistant for the Care Management Workbench.
 * Adheres strictly to HiLabs Clinical & Operational Guardrails:
 * - Deterministic generation based strictly on visible synthetic records.
 * - Explicit evidence citations (source + date).
 * - Careful epistemic language: "feed does not show", "record not received", "unverified".
 * - No automated diagnosis, dosage recommendation, or automated case closing.
 */

export function generateStructuredDraftNote(patient, nurseName = "Maria Hernandez, RN") {
  if (!patient) return null;

  const now = new Date().toISOString().split('T')[0];

  let reasonForContact = "";
  let memberReportedNeeds = "";
  let barriersIdentified = "";
  let agreedInterventions = "";
  let clinicalDiscrepancies = "";
  let followUpOwner = nurseName;
  let followUpDueDate = "2026-11-04";

  switch (patient.id) {
    case "P-1001": // Jordan Lee
      reasonForContact = "Transitions of Care post-discharge outreach following acute heart-failure hospitalization (Discharged: 2026-10-30).";
      memberReportedNeeds = "Confirm current symptoms, shortness of breath, daily weights, and post-discharge self-care comprehension.";
      clinicalDiscrepancies = "CRITICAL MEDICATION CONFLICT: Hospital discharge summary (30 Oct) indicates Furosemide 40 mg daily, whereas plan active baseline indicates 20 mg daily. PBM pharmacy feed through 29 Oct shows prior 20 mg fill with no 40 mg dispense on record. Treating team / Dr. A. Rao must reconcile.";
      barriersIdentified = "Transportation difficulty previously self-reported (SDOH screen 2026-09-01). Claims are delayed (~45-day lag through 18 Sep). No post-discharge PCP appointment visible in scheduler.";
      agreedInterventions = "1. Transmit side-by-side furosemide records to Dr. A. Rao for physician reconciliation.\n2. Inquire with member regarding which bottle is at bedside and pharmacy pickup status.\n3. Offer plan Non-Emergency Medical Transportation (NEMT) for PCP visit.";
      followUpOwner = "Maria Hernandez, RN";
      followUpDueDate = "2026-11-03";
      break;

    case "P-1003": // Luis Ramirez
      reasonForContact = "High-utilizer care coordination review following three ED visits in 30 days (04 Oct, 17 Oct, 29 Oct).";
      memberReportedNeeds = "Identify underlying clinical symptoms precipitating ED visits; establish Spanish-language care relationship.";
      clinicalDiscrepancies = "Incomplete ADT extract: Latest ED alert (29 Oct) arrived without recorded diagnosis or disposition. Duplicate identifier detected in inbound HIE feed requiring data governance resolution.";
      barriersIdentified = "Contact friction: Four prior outreach calls went to voicemail. Telephone on file may belong to cousin Carlos. Contact consent & member identity must be verified before disclosing protected health information.";
      agreedInterventions = "1. Initiate Spanish-language direct outreach via certified bilingual staff.\n2. Request complete ED clinical encounter summary from hospital records.\n3. Schedule primary care follow-up with Dr. M. Johnson once safe contact is confirmed.";
      followUpOwner = "Maria Hernandez, RN & Spanish Bilingual Coordinator";
      followUpDueDate = "2026-11-02";
      break;

    case "P-1002": // Maya Patel
      reasonForContact = "Diabetes chronic disease management review triggered by elevated HbA1c 9.1% (lab 2026-10-24) and potential medication refill gap.";
      memberReportedNeeds = "Discuss daily blood glucose monitoring, routine, and any obstacles managing metformin regimen around shift-work schedule.";
      clinicalDiscrepancies = "POSSIBLE REFILL GAP: PBM feed shows no Metformin 1000 mg paid fill since 2026-08-28 (>60d gap). Dr. Chen's EHR note (25 Oct) lists active Metformin. Note: Missing pharmacy feed fill is not proof of non-adherence (member may use cash generic $4 list or samples).";
      barriersIdentified = "Affordability concerns previously reported (SDOH 2026-08-15). Daytime phone outreach unsuccessful due to shift work; preferred call window is evening after 18:00.";
      agreedInterventions = "1. Place evening call after 18:00 to verify current medication supply and explore copay/affordability options.\n2. Reconcile tentative follow-up appointment with Dr. Chen's scheduler.\n3. Offer referral to Certified Diabetes Care and Education Specialist (CDCES).";
      followUpOwner = "Maria Hernandez, RN";
      followUpDueDate = "2026-11-02";
      break;

    case "P-1004": // Amina Brooks
      reasonForContact = "Behavioral Health & Social Care Coordination follow-up on open outpatient referral from Community Health Center.";
      memberReportedNeeds = "Check member-directed priorities and confirm whether member still desires outpatient behavioral health connection.";
      clinicalDiscrepancies = "Status mismatch: Referral system shows 'open referral' while clinic scheduler marks follow-up as 'pending confirmation'.";
      barriersIdentified = "Sensitive privacy protocol: Safe contact method not yet confirmed (voicemail was withheld on 29 Oct). Address is a transitional P.O. Box. Unstable housing and transit barriers noted on 90-day-old SDOH screen.";
      agreedInterventions = "1. Discreet outreach to confirm private safe contact method and communication preferences.\n2. Validate appointment date with community health center without leaving sensitive messages on unverified voicemail.\n3. Connect with housing navigator and transit voucher resources upon member consent.";
      followUpOwner = "Maria Hernandez, RN & Social Work Specialist";
      followUpDueDate = "2026-11-03";
      break;

    case "P-1005": // Evelyn Carter
      reasonForContact = "Complex Care Management review following missed home-support aide visit (30 Oct) and reported caregiver strain.";
      memberReportedNeeds = "Assess daily living assistance, home safety, and caregiver support needs for daughter Sarah.";
      clinicalDiscrepancies = "Vendor scheduling disconnect: Home-support visit on 30 Oct marked 'missed / reschedule needed' in vendor scheduler but never synced to plan case record. Dual medication titration (Amlodipine 10mg & Atorvastatin) from 23 Oct PCP note not reflected in PBM dispense history.";
      barriersIdentified = "Caregiver authorization: Daughter requested evening calls after 17:00, but signed HIPAA authorized representative documentation is not yet indexed in summary file. Severe caregiver strain reported.";
      agreedInterventions = "1. Conduct joint evening call after 17:00; confirm member's direct consent to discuss care with daughter Sarah.\n2. Coordinate with home-support vendor to reschedule missed shift immediately.\n3. Verify medication titration with Dr. Williams' clinic and community pharmacy.";
      followUpOwner = "Maria Hernandez, RN";
      followUpDueDate = "2026-11-02";
      break;

    default:
      reasonForContact = `Care management check-in for ${patient.name}.`;
      memberReportedNeeds = "Review current care plan, appointments, and barriers.";
      clinicalDiscrepancies = "Review visible clinical records for source updates.";
      barriersIdentified = "Confirm contact details and active social needs.";
      agreedInterventions = "Complete standard care management assessment.";
  }

  return {
    date: now,
    author: nurseName,
    patientId: patient.id,
    patientName: patient.name,
    reasonForContact,
    memberReportedNeeds,
    clinicalDiscrepancies,
    barriersIdentified,
    agreedInterventions,
    followUpOwner,
    followUpDueDate,
    status: "AI Draft — Review & edit before approving",
    disclaimer: "AI-Assisted Draft Note: Built deterministically from connected synthetic feeds. Requires nurse verification, clinician medication reconciliation, and member confirmation before saving."
  };
}

export const AI_SAFETY_GUARDRAILS = [
  {
    rule: "No Automated Clinical Diagnosis",
    detail: "The workbench surfaces lab values (e.g., A1c 9.1%) and encounter alerts, but never diagnoses conditions or infers prognosis. All interpretation belongs strictly to the licensed clinical team."
  },
  {
    rule: "No Prescription or Dosage Recommendations",
    detail: "When medication lists conflict (e.g. Furosemide 40 mg vs 20 mg), the system presents provenance side-by-side with timestamps. It never chooses a 'correct' dose or suggests changes."
  },
  {
    rule: "Missing Data is Not Proof of Absence",
    detail: "A missing pharmacy claim, delayed lab record, or unpopulated claims warehouse is explicitly labeled 'Feed does not show' or 'Not received'. The system never claims care did not occur based on an incomplete feed."
  },
  {
    rule: "Privacy, Contact & Consent Boundaries",
    detail: "The system flags unverified phone numbers, potential relative phones, and absent safe-contact permissions before any outreach. It prevents automated disclosures to unverified third parties."
  },
  {
    rule: "Human-in-the-Loop Task Approval",
    detail: "All AI-suggested tasks, notes, and care plan items require a single human click ('Accept' or 'Edit & Save'). No case or clinical action is ever auto-closed without licensed nurse review."
  }
];

