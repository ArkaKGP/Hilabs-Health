# Care Workbench — Comprehensive Technical & Product Documentation

> **“A clearer next step for every member.”**  
> *HiLabs Product Caselet: “Reimagining the Case Management Workbench: giving clinicians back their clinical judgment.”*  
> *Author / Engineering Reference: Senior Product Designer & Senior Frontend Engineer*  
> *Status: Fully functional, interactive, zero-dependency frontend web prototype (React 19 + Vite 8 + Tailwind CSS v4).*

---

## Table of Contents

1. [Executive Summary & Product Goal](#1-executive-summary--product-goal)
2. [Prototype Boundary & Clinical Safety Disclaimer](#2-prototype-boundary--clinical-safety-disclaimer)
3. [The Core Healthcare Problem](#3-the-core-healthcare-problem)
4. [System Architecture & Technology Stack](#4-system-architecture--technology-stack)
5. [The 5 Fictional Cohort Patients](#5-the-5-fictional-cohort-patients)
6. [Data Dictionary & The 10 Multi-System Feeds](#6-data-dictionary--the-10-multi-system-feeds)
7. [The 4 Core Application Modules](#7-the-4-core-application-modules)
   - [7.1 Module 1: Work Queue (Monday 8:00 AM Triage)](#71-module-1-work-queue-monday-800-am-triage)
   - [7.2 Module 2: Member 360 (Unified Clinical Provenance)](#72-module-2-member-360-unified-clinical-provenance)
   - [7.3 Module 3: Outreach & Clinical Notes (AI-Assisted Documentation)](#73-module-3-outreach--clinical-notes-ai-assisted-documentation)
   - [7.4 Module 4: Care Plan & Tasks (Accountable Orchestration)](#74-module-4-care-plan--tasks-accountable-orchestration)
8. [Workflow Triage Scoring Model & Formula](#8-workflow-triage-scoring-model--formula)
9. [AI Safety Guardrails & Human-in-the-Loop Architecture](#9-ai-safety-guardrails--human-in-the-loop-architecture)
10. [Pilot Measurement Plan, Metrics & Time ROI](#10-pilot-measurement-plan-metrics--time-roi)
11. [Codebase Tour & File Organization](#11-codebase-tour--file-organization)
12. [Installation, Build & Verification Guide](#12-installation-build--verification-guide)
13. [Context Primer for Claude / AI Reviewers](#13-context-primer-for-claude--ai-reviewers)

---

## 1. Executive Summary & Product Goal

**Care Workbench** is a specialized enterprise web application designed for health-plan nurse case managers (e.g., transitions of care, complex chronic disease, and high-utilizer care coordination). 

In traditional payer environments, nurse case managers waste hours hunting across disconnected systems: electronic health records (EHRs), hospital Admission-Discharge-Transfer (ADT) feeds, pharmacy benefit managers (PBMs), claims warehouses, and scheduling tools. This results in **alert fatigue**, **redundant manual documentation**, **unreconciled medication discrepancies**, **outreach friction**, and **clinician burnout**.

**Care Workbench** re-centers the clinician's judgment by:
1. Assembling a single, trustworthy, holistic view of each member across 10 source categories.
2. Sequencing Monday morning work items with a transparent, explainable operational triage score.
3. Displaying multi-source discrepancies (e.g., discharge dose vs. active plan list) side-by-side with source timestamps rather than silently guessing or auto-resolving.
4. Surfacing verified contact channels, preferred language, and privacy guardrails before outreach calls.
5. Providing deterministic, AI-assisted draft clinical notes and accountable care tasks that require explicit nurse approval.

---

## 2. Prototype Boundary & Clinical Safety Disclaimer

> [!IMPORTANT]
> **FRONTEND PROTOTYPE ONLY · SYNTHETIC PATIENT DATA · NOT FOR CLINICAL DECISIONS**
>
> 1. **Synthetic Data Only:** All patient identities, IDs (`P-1001` through `P-1005`), clinical notes, diagnoses, laboratory values, and dates are completely fictional and derived from the *HiLabs Synthetic Patient Annex*. No protected health information (PHI) is present.
> 2. **Not a Clinical Device:** This software is a product concept prototype created for design and engineering evaluation. It is **not** certified as medical software, has not been evaluated by the FDA, and must **never** be used to make clinical diagnosis or treatment choices.
> 3. **Non-Clinical Workflow Scores:** All numerical scores (0–100) are **illustrative operational workflow triage hypotheses** designed to order morning task queues. They are **not** medical risk scores, diagnostic predictors, or severity indices.
> 4. **No External Dispatches:** The application runs entirely client-side. No telephone calls, SMS messages, electronic prescriptions, or provider referrals are transmitted.

---

## 3. The Core Healthcare Problem

Time-motion studies of health-plan case managers reveal severe operational inefficiencies during an 8-hour workday:

```
┌────────────────────────────────────────────────────────────────────────┐
│              TYPICAL 8-HOUR CASE MANAGER WORKDAY (CURRENT)             │
├───────────────────────────────────┬──────────┬──────────┬──────────────┤
│ Activity                          │ Hours    │ Share    │ Status       │
├───────────────────────────────────┼──────────┼──────────┼──────────────┤
│ Data Hunting & Chart Prep         │ 2.0 hrs  │ 25.0%    │ WASTE / LAG  │
│ Documentation & Repeated Entry    │ 1.5 hrs  │ 18.75%   │ WASTE / TYPING│
│ Outreach Admin & Task Tracking    │ 1.0 hr   │ 12.5%    │ FRICTION     │
│ Member Care & Direct Engagement   │ 2.5 hrs  │ 31.25%   │ HIGH VALUE   │
│ Team Support, Breaks & Other      │ 1.0 hr   │ 12.5%    │ NECESSARY    │
└───────────────────────────────────┴──────────┴──────────┴──────────────┘
Total Time Lost to Disconnected Tools & Documentation: 3.5 hrs / day (43.75%)
```

### Critical Pain Points Addressed
- **The "Data Scavenger Hunt":** Clinicians spend up to 12 minutes per case toggling between 5+ portals to verify if an admitted member was actually discharged, what medicines were prescribed, and whether a PCP appointment exists.
- **The "Silent Auto-Resolution" Trap:** Traditional aggregators frequently overwrite older records with newer incomplete feeds, hiding critical medication discrepancies from the nurse.
- **The "Missing Claim" Fallacy:** Claims data lags real-world clinical encounters by 30 to 60 days. Treating the absence of a claim as proof that care did not occur leads to disastrous coordination errors.
- **Contact & Privacy Hazards:** Calling wrong numbers, leaving sensitive voicemails with unverified relatives, or contacting night-shift workers during sleeping hours causes outreach failure rates to exceed 70%.
- **Orphaned Workflow Tasks:** Coordination tasks generated by vendor portals or inpatient coordinators frequently lack an assigned owner, falling through administrative cracks.

---

## 4. System Architecture & Technology Stack

Care Workbench is engineered as an ultra-fast, zero-latency single-page application (SPA) with pure client-side state and deterministic mock intelligence.

```
                    ┌───────────────────────────────────┐
                    │          CARE WORKBENCH           │
                    │        (AppShell Component)       │
                    └─────────────────┬─────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
┌────────┴────────┐          ┌────────┴────────┐          ┌────────┴────────┐
│     Sidebar     │          │     TopBar      │          │ Safety Modals   │
│  - Tab Router   │          │  - Global Search│          │  - Methodology  │
│  - Quick Switch │          │  - Telemetry    │          │  - Pilot Metrics│
│  - Branding     │          │  - Alerts Popover│         │  - AI Guardrails│
└─────────────────┘          └─────────────────┘          └─────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ Work Queue Page │          │ Member 360 Page │          │ Outreach Page   │
│ - 8 AM Triage   │          │ - What Matters  │          │ - Privacy Check │
│ - Grounded Signals│        │ - Side-by-Side  │          │ - Call Logger   │
│ - Multi-Filters │          │ - 10-Source View│          │ - AI Draft Note │
└─────────────────┘          └─────────────────┘          └─────────────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │ Care Plan Page  │
                             │ - Task Manager  │
                             │ - Ownership Lock│
                             │ - Live Audit Log│
                             └─────────────────┘
```

### Technology Highlights
- **React 19:** Functional components, modern hooks (`useState`, `useMemo`, `useEffect`).
- **Vite 8:** Lightning-fast HMR and optimized production bundling (1.09s build time).
- **Tailwind CSS v4:** Enterprise healthcare color palette, high contrast, readable typography, and custom scrollbars.
- **Lucide Icons:** Semantic iconography across all clinical and operational states.
- **Deterministic Mock Intelligence Engine (`aiAssist.js`):** AI synthesis is strictly reproducible, grounding every draft note and task in visible records with exact date citations. No unpredictable external generative APIs are invoked.

---

## 5. The 5 Fictional Cohort Patients

The cohort contains 5 fictional members precisely matched to the *HiLabs Synthetic Patient Annex*.

| ID | Member Name | Age / Sex | Plan / Program | Primary Care Provider | Scenario & Core Dilemma | Priority & Score |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `P-1001` | **Jordan Lee** | 76 / M | Medicare Advantage PPO<br>*Transitions of Care* | Dr. A. Rao | **Fresh heart-failure discharge.** Contradictory furosemide dosage (40mg vs 20mg). Delayed ADT alert. No post-discharge PCP appointment. Transport difficulty. | **High Priority**<br>**75 / 100** |
| `P-1003` | **Luis Ramirez** | 54 / M | Medicare Advantage PPO<br>*High Utilizer / Coordination* | Dr. M. Johnson | **Frequent ED visits & hard to reach.** 3 ED visits in 30 days. Latest ED alert missing diagnosis. 4 voicemails. Phone may belong to cousin Carlos. Spanish preferred. | **Medium Priority**<br>**60 / 100** |
| `P-1002` | **Maya Patel** | 62 / F | Medicare Advantage HMO<br>*Diabetes Management* | Dr. N. Chen | **Rising-risk diabetes with refill gap.** A1c 9.1%. Pharmacy feed shows no Metformin fill for >60 days. Evening shift worker (calls only after 18:00). Copay concerns. | **Medium Priority**<br>**55 / 100** |
| `P-1004` | **Amina Brooks** | 43 / F | Medicaid Managed Care<br>*Behavioral Health / Social* | Community Health Center | **Behavioral health referral & housing instability.** Address is a transitional P.O. Box. Unverified safe contact protocol. SDOH screen 90 days old. | **Medium Priority**<br>**55 / 100** |
| `P-1005` | **Evelyn Carter** | 81 / F | Dual-Eligible (D-SNP)<br>*Complex Care Management* | Dr. R. Williams | **Older member with caregiver strain.** Missed vendor home-support shift unsynced to case file. Dual medication changes. Daughter requested calls after 17:00; HIPAA auth unverified. | **Medium Priority**<br>**55 / 100** |

---

## 6. Data Dictionary & The 10 Multi-System Feeds

Each patient record is constructed from 10 distinct healthcare feeds (50 total synthetic records). The system models real-world interoperability imperfections:

```
                                  MEMBER (Anchor ID)
                                          │
    ┌──────────────┬──────────────┬───────┴──────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼              ▼
1. Eligibility 2. ADT Alerts 3. EHR Summary 4. Pharmacy   5. Claims      6. Labs
  (Plan Enrollment) (Hospital Feeds) (CCD Clinical)  (PBM Dispense) (Lagged Warehouse) (Diagnostic)
                                          │
                   ┌──────────────────────┼──────────────────────┐
                   ▼                      ▼                      ▼
             7. Appointments        8. Contact History     9. SDOH Screen   10. Care Plan
             (Clinic Schedulers)   (CRM / Call Logs)     (Social Needs)     (Open Tasks)
```

### The 10 Feed Categories & Embedded Data Imperfections

1. **Member & Eligibility (Enrollment System):**
   - *Cadence:* Daily refresh.
   - *Planted Imperfections:* Duplicate member IDs across systems; stale mailing addresses; unconfirmed authorized representatives.
   - *Clinical Action:* Anchor to primary plan member ID; verify identity and language preference before sharing details.
2. **Hospital ADT Alerts (ADT Feeds / HIE):**
   - *Cadence:* Real-time / hourly.
   - *Planted Imperfections:* ADT alert for Jordan Lee arrived ~20 hours post-discharge; latest ED arrival for Luis Ramirez lacked diagnosis and clinical disposition.
   - *Clinical Action:* Separate event timestamp from receipt timestamp; never infer missing discharge details.
3. **EHR / CCD Clinical Records (Hospital & Provider HIE):**
   - *Cadence:* Event-driven.
   - *Planted Imperfections:* Conflicting medication lists (furosemide 40mg vs 20mg); free-text medication entries.
   - *Clinical Action:* Preserve original source text and timestamps; display side-by-side for physician reconciliation.
4. **Pharmacy Fills (PBM / Pharmacy Feeds):**
   - *Cadence:* Daily target.
   - *Planted Imperfections:* Maya Patel shows a 60+ day gap for Metformin, but external retail $4 generic plans or physician samples are not captured.
   - *Clinical Action:* Present as *"possible gap to verify"*, never as proof of patient non-adherence.
5. **Medical Claims (Claims Warehouse):**
   - *Cadence:* Weekly or adjudicated batch.
   - *Planted Imperfections:* Jordan Lee's claims lag by ~45 days (through 18 Sep only); October hospitalizations are not yet adjudicated.
   - *Clinical Action:* Explicitly display through-dates; never treat absence of a recent claim as proof that care did not happen.
6. **Labs & Results (Lab Interfaces / Provider EHR):**
   - *Cadence:* Result receipt.
   - *Planted Imperfections:* Delayed source links; missing laboratory reference ranges.
   - *Clinical Action:* Surface raw values (A1c 9.1%) with units and date; never auto-diagnose or stage conditions.
7. **Appointments (Provider Schedulers & EHRs):**
   - *Cadence:* Event-driven.
   - *Planted Imperfections:* Maya Patel's portal shows a tentative slot while the provider feed shows none; external clinic appointments absent.
   - *Clinical Action:* Differentiate tentative vs. confirmed; generate verification tasks rather than assuming missed visits.
8. **Contact History (Care-Management CRM):**
   - *Cadence:* Immediate.
   - *Planted Imperfections:* Luis Ramirez's listed mobile belongs to cousin Carlos; Amina Brooks has no approved safe contact channel.
   - *Clinical Action:* Require identity check before disclosure; prevent voicemails containing protected health info.
9. **SDOH Screen (Health-Related Social Needs Tools):**
   - *Cadence:* Periodic screen.
   - *Planted Imperfections:* Screens are 60 to 90 days old (Amina Brooks 04 Aug; Evelyn Carter 12 Sep); situations may have changed.
   - *Clinical Action:* Reconfirm whether transport, affordability, or housing needs remain active before booking resources.
10. **Care Plan / Referrals (Care-Management Platform):**
    - *Cadence:* Real-time on change.
    - *Planted Imperfections:* Maya Patel had an overdue medication review with no assigned owner; Evelyn Carter had an unsynced missed vendor visit.
    - *Clinical Action:* Enforce single accountable task ownership and due dates; prevent orphan items.

---

## 7. The 4 Core Application Modules

### 7.1 Module 1: Work Queue (Monday 8:00 AM Triage)
- **Caseload Telemetry Strip:**
  - `48` Active Cases (Sample Caseload Panel)
  - `6` New Discharge Alerts (24h Window)
  - `12` Follow-Ups Due (Post-ED & Post-Discharge)
  - `3` Medication Discrepancies Requiring Clinician Review
  - `5` Synthetic Demo Members Loaded
- **Grounded Triage Table:** Ordered by the transparent workflow score (Jordan Lee #1 at 75 pts; Luis Ramirez #2 at 60 pts; Maya, Amina, Evelyn tied at 55 pts).
- **Grounded Signals ("Why Now?"):** 1–3 bulleted evidence signals per card explaining why the member surfaced this morning.
- **Data Quality Badges:** Visual tags highlighting feed lag, medication conflict, or contact risks.
- **Interactive Filtering:** Instantaneous filtering by priority band, care program, and data quality flags, with responsive empty state and reset button.

### 7.2 Module 2: Member 360 (Unified Clinical Provenance)
- **Header Summary:** Identity, plan, program, language, PCP, verified contact status, and workflow score breakdown.
- **"What Matters Today" Panel:** Concise summary of immediate transition barriers and recommended 8 AM Monday action.
- **Side-by-Side Medication Reconciliation Panel:**
  - Highlights Jordan Lee's diuretic conflict:
    - *Hospital Discharge Summary (30 Oct 18:20):* Furosemide 40 mg daily.
    - *Plan Baseline Active List (12 Sep):* Furosemide 20 mg daily.
    - *PBM Pharmacy Dispense Feed (29 Oct):* Last fill 20 mg; no 40 mg fill on record.
  - Amber banner: **"Needs Clinician Reconciliation"**.
  - Clinician routing dropdown (*"Pending Clinician Review"*, *"Sent to Treating Physician"*, *"Clinician Confirmed"*) with interactive note-to-chart logger.
- **Multi-Source Timeline (10 Feeds):** Inspects all 10 source feeds with filterable categories, source badges, timestamps, data caveats, and nurse guidance.
- **"Missing is Not Negative" Banner:** Educational reminder preventing false inferences from delayed feeds.

### 7.3 Module 3: Outreach & Clinical Notes (AI-Assisted Documentation)
- **Contact Preferences & Safety Protocol:** Displays primary phone, verification date, preferred call window, and language.
- **Privacy & Consent Guardrails:**
  - *Luis Ramirez:* Warning regarding suspected cousin's phone; forbids disclosing ED visit details without direct identity verification.
  - *Amina Brooks:* Warning regarding transitional mailing address; forbids leaving clinical details on unverified voicemail.
  - *Evelyn Carter:* Warning regarding daughter's request; requires checking formal HIPAA authorized representative paperwork.
- **Interaction State Logger:** Buttons for *Connected*, *Voicemail*, *No voicemail left (Safety)*, *Needs verification*, and *Unanswered*. Updates outreach history instantly.
- **Structured Note Editor (6 Sections):** Pre-populated with deterministic AI drafts citing source records:
  1. Reason for Contact & Clinical Transition
  2. Member-Reported Needs & Current Symptoms
  3. Clinical Provenance & Medication Discrepancies
  4. Barriers Identified (Transport, Cost, Housing, Safe Channel)
  5. Agreed Interventions & Next Care Plan Steps
  6. Follow-up Owner & Target Due Date
- **Human-in-the-Loop Protocol:** Explicit label: *"AI-Assisted Draft — Review Before Saving"*. Nurse edits and saves note locally.
- **Suggested Tasks:** Proposes grounded next steps (e.g., offer NEMT ride, screen 90-day mail-order savings) with *Accept Task* or *Dismiss* options.

### 7.4 Module 4: Care Plan & Tasks (Accountable Orchestration)
- **Accountable Task Manager:** Displays all active tasks across the cohort. Eliminates orphaned tasks.
- **Accountable Fields:** Task Title, Patient, Owner (e.g. Maria · RN, Clinic Coordinator, Social Work Specialist), Due Date, Priority, Category, Status.
- **Live State Updates:** Changing a status (*Not started*, *In progress*, *Waiting*, *Done*) or reassigning an owner immediately updates state and logs an entry to the live audit log.
- **Add Custom Task Modal:** Allows the nurse to assign new tasks with clinical rationales.
- **Live Activity Audit Log:** Displays real-time task lifecycle transitions.

---

## 8. Workflow Triage Scoring Model & Formula

The triage score is calculated using an explainable, 4-component additive formula (0–100 points):

$$\mathbf{Workflow\ Score} = \mathbf{Acute\ Event\ (0–30)} + \mathbf{Medication\ Signal\ (0–25)} + \mathbf{Outreach\ Difficulty\ (0–20)} + \mathbf{Social\ Barrier\ (0–25)}$$

### Component Breakdown & Weights

| Component | Max Pts | Focus & Description |
| :--- | :--- | :--- |
| **Acute Event Points** | `30` | Recent acute hospital discharge, multiple emergency room visits, or urgent care escalation. |
| **Medication Signal** | `25` | Contradictory medication strengths across discharge EHR and plan lists, visible refill gaps, or high-risk regimen shifts. |
| **Outreach Difficulty** | `20` | Repeated voicemails, uncertain phone ownership (relative's number), language barriers, or lack of verified safe contact. |
| **Social / Coordination Barrier** | `25` | Housing instability, lack of transport, severe caregiver strain, or unsynced vendor handoffs. |

### Cohort Score Breakdown Table

| Patient ID & Name | Acute (0–30) | Med (0–25) | Outreach (0–20) | Social (0–25) | Total Score | Priority Band |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **`P-1001` Jordan Lee** | 30 | 25 | 5 | 15 | **75 / 100** | **High Priority** |
| **`P-1003` Luis Ramirez** | 25 | 0 | 20 | 15 | **60 / 100** | **Medium Priority** |
| **`P-1002` Maya Patel** | 10 | 25 | 5 | 15 | **55 / 100** | **Medium Priority** |
| **`P-1004` Amina Brooks** | 15 | 0 | 15 | 25 | **55 / 100** | **Medium Priority** |
| **`P-1005` Evelyn Carter** | 10 | 15 | 5 | 25 | **55 / 100** | **Medium Priority** |

### Priority Bands & Action Thresholds
- **High Priority ($\ge 70$ points):** Immediate Monday 8:00 AM action required. Acute transition risk, contradictory high-risk medications, or imminent handoff breakdown.
- **Medium Priority ($45–69$ points):** Review and act today. Active coordination barrier, medication verification need, or outreach obstacle present.
- **Routine Priority ($< 45$ points):** Scheduled ongoing case monitoring; no acute barrier or transition event identified in current window.

---

## 9. AI Safety Guardrails & Human-in-the-Loop Architecture

The Care Workbench enforces 5 non-negotiable safety guardrails:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     THE 5 AI CLINICAL GUARDRAILS                       │
├────────────────────────────────┬───────────────────────────────────────┤
│ Guardrail                      │ Operational Enforcement               │
├────────────────────────────────┼───────────────────────────────────────┤
│ 1. No Automated Diagnosis      │ Lab values (A1c 9.1%) surfaced as raw │
│                                │ facts; no diagnostic inference.       │
│ 2. No Prescription / Dose Recs │ Side-by-side reconciliation; never    │
│                                │ auto-picks a 'correct' dose.          │
│ 3. Missing Data != Absence     │ Labeled "Feed does not show"; never   │
│                                │ assumes non-compliance.               │
│ 4. Privacy & Consent Protocol  │ Enforces identity check before third- │
│                                │ party contact (cousin/caregiver).     │
│ 5. Human-in-the-Loop Approval  │ All notes & tasks require explicit    │
│                                │ nurse click to accept and sign.       │
└────────────────────────────────┴───────────────────────────────────────┘
```

1. **No Automated Clinical Diagnosis:** The system displays lab values (HbA1c 9.1%) and encounter codes as objective evidence. It never infers disease staging, prognosis, or medical diagnoses.
2. **No Prescription or Dosage Recommendations:** When medication records conflict (e.g. Furosemide 40 mg vs 20 mg), the workbench displays both sources with timestamps. It never selects a "winner" or advises dose changes.
3. **Missing Data is Not Proof of Absence:** A missing claim or empty pharmacy feed is explicitly framed as an unconfirmed gap. The system accounts for cash fills, clinic samples, and 45-day claims lag.
4. **Privacy, Contact & Consent Boundaries:** Flags unverified phone numbers and potential relatives before any call. Forbids leaving clinical details on unverified voicemails (e.g., Amina Brooks or Luis Ramirez).
5. **Human-in-the-Loop Authority:** AI assists by organizing, citing, and drafting; the licensed nurse case manager verifies facts, confirms consent, edits the note, and signs the care plan.

---

## 10. Pilot Measurement Plan, Metrics & Time ROI

The workbench is designed to achieve measurable time-savings during health plan pilot deployments:

| Metric | Baseline | Pilot Target | Projected Improvement | Operational Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Member Chart Preparation Time** | 12 min / case | **5 min / case** | **58% faster** | Reduces time spent hunting across disconnected EHR, claims, and PBM tabs. |
| **After-Contact Documentation Time** | 10 min / contact | **4 min / contact** | **60% reduction** | Eliminates repetitive typing by pre-populating verified facts into draft notes. |
| **Successful Outreach Connection Rate** | 30% of attempts | **40% of attempts** | **+10 pp lift** | Surfaces verified numbers, evening call windows, and language preferences upfront. |
| **Cases with Owned Next Action** | 70% of cases | **95% of cases** | **+25 pp lift** | Eliminates orphan tasks and unassigned vendor follow-ups. |
| **Source Conflict Review Time** | 8 min / conflict | **3 min / conflict** | **62% faster** | Displays side-by-side provenance rather than forcing manual discovery. |

---

## 11. Codebase Tour & File Organization

```
f:\Web Development\Hilabs\
├── index.html                   # HTML5 shell, Inter font import, metadata
├── package.json                 # Dependencies (React 19, Vite 8, Tailwind v4, Lucide)
├── vite.config.ts               # Vite configuration with React and Tailwind plugins
├── tsconfig.json                # Root TypeScript configuration
├── tsconfig.app.json            # Client TypeScript compilation settings
├── README.md                    # Comprehensive documentation (this file)
└── src/
    ├── main.tsx                 # React application DOM mount
    ├── App.tsx                  # Top-level application shell, routing state, modals
    ├── index.css                # Tailwind CSS v4 setup and custom scrollbars
    ├── data/
    │   └── mockData.js          # Ground-truth synthetic dataset (5 patients, 50 records)
    ├── utils/
    │   ├── workflowScore.js     # Scoring formula calculations & priority band formatters
    │   └── aiAssist.js          # Deterministic draft note generator & safety rules
    ├── components/
    │   ├── Sidebar.jsx          # Left persistent navigation & member quick-switcher
    │   ├── TopBar.jsx           # Top header, search bar, notifications, modal triggers
    │   ├── StatCard.jsx         # Telemetry stat cards with color themes
    │   ├── PriorityBadge.jsx    # Accessible priority badges with score tooltips
    │   ├── DataFreshnessBadge.jsx # Freshness indicators (High, Medium, Low confidence)
    │   ├── PatientTable.jsx     # Sortable, filterable 8 AM triage work queue
    │   ├── PatientSummaryCard.jsx # Member 360 demographic & "What matters today" card
    │   ├── SourceTimeline.jsx   # 10-feed provenance timeline with expandable detail
    │   ├── DataConflictCard.jsx # Side-by-side medication reconciliation & routing
    │   ├── OutreachForm.jsx     # Phone verification, call logger, AI note editor
    │   ├── TaskList.jsx         # Accountable task manager, status dropdowns, audit log
    │   ├── MethodologyModal.jsx # Interactive scoring formula modal
    │   ├── MetricsModal.jsx     # Pilot measurement plan & 8-hour day ROI modal
    │   └── AiBoundariesModal.jsx # 5 AI clinical guardrails modal
    └── pages/
        ├── WorkQueuePage.jsx    # Work Queue page container
        ├── Member360Page.jsx    # Member 360 page container
        ├── OutreachPage.jsx     # Outreach & Notes page container
        └── CarePlanPage.jsx     # Care Plan / Tasks page container
```

---

## 12. Installation, Build & Verification Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Execution Commands
```bash
# 1. Clone or navigate to the project directory
cd "f:\Web Development\Hilabs"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run linter (oxlint)
npm run lint

# 5. Type-check and build for production
npm run build
```

### Verification Results
- **Linter Status:** Passed with **0 errors and 0 warnings** across all 24 project files.
- **Build Status:** `tsc -b && vite build` completed successfully in 1.09s, outputting optimized bundles to `dist/`.

---

## 13. Context Primer for Claude / AI Reviewers

When analyzing or discussing this codebase with Claude (or any AI agent), keep these core design principles in mind:

1. **Why not an external LLM API?**  
   In clinical enterprise SaaS, non-deterministic API calls introduce hallucination risks, latency, vendor lock-in, and unpredictable API token costs. The prototype uses **deterministic procedural synthesis** (`generateStructuredDraftNote()` in `aiAssist.js`), ensuring that every summary cites exact timestamps from visible records without variance.
2. **Why does Jordan Lee have score 75 while others have 55 or 60?**  
   Jordan has an acute transition event (CHF discharge, 30 pts) and a critical high-risk medication conflict (furosemide 40mg vs 20mg, 25 pts), plus social/transport barriers (15 pts) and minor outreach friction (5 pts) = 75 pts. Luis has 3 ED visits (25 pts), high outreach difficulty with an unverified relative's phone (20 pts), and social barriers (15 pts) = 60 pts.
3. **How does the system prevent orphaned tasks?**  
   `TaskList.jsx` enforces that every task must have a named owner (e.g. *Maria · RN*, *Clinic Coordinator*, *Social Work Specialist*). If an owner is unassigned, the row is flagged with an amber warning border and counted in the "Orphaned Tasks" telemetry counter.
4. **How are privacy guardrails enforced?**  
   Before a call is logged or note is drafted, `OutreachForm.jsx` inspects the member's privacy flags. If phone ownership is unverified (Luis Ramirez) or safe contact consent is absent (Amina Brooks), a red warning banner alerts the nurse not to leave clinical voicemails.
5. **How does the UI handle responsiveness?**  
   The workbench employs a desktop-first layout with high information density for nurse laptops, while providing a responsive mobile drawer (`Sidebar.jsx`), collapsible filters, and horizontally scrolling data cards on tablets and smartphones.
