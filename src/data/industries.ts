export interface Industry {
  slug: string
  name: string
  emoji: string
  headline: string
  headlineAccent: string
  subCopy: string
  painPoints: string[]
  faqs: { q: string; a: string }[]
  transcript: { speaker: "caller" | "ruxi"; text: string }[]
  seo: {
    title: string
    description: string
    keywords: string[]
    canonicalPath: string
    ogTitle: string
    ogDescription: string
  }
}

export const industries: Industry[] = [
  {
    slug: "solicitors",
    name: "Solicitors",
    emoji: "⚖️",
    headline: "Never miss a new client",
    headlineAccent: "enquiry again.",
    subCopy:
      "Ruxi handles every inbound call with the precision your practice demands — booking consultations, answering FAQs, and escalating urgent matters. Fully GDPR-compliant, ICO-registered, and trained to sound like part of your team.",
    painPoints: [
      "Missed calls during court hearings cost you new instructions",
      "Receptionists can't work 24/7 — your competitors' AI does",
      "Clients judge your firm by the first call they make",
      "Manual callback lists waste your fee-earners' billable hours",
    ],
    faqs: [
      {
        q: "Can Ruxi book consultation slots into our case management system?",
        a: "Ruxi integrates with Google Calendar out of the box. Connections to Clio, LEAP, and other case management systems are available on request.",
      },
      {
        q: "Is this compliant with SRA Handbook requirements?",
        a: "Ruxi discloses its AI nature and recording status on every call, satisfying transparency obligations. You remain the data controller under UK GDPR.",
      },
    ],
    transcript: [
      { speaker: "caller", text: "Hi, I need to speak to someone about a potential divorce case." },
      {
        speaker: "ruxi",
        text: "Good afternoon, you've reached Hartley & Sons Solicitors — I'm Ruxi, the AI receptionist. This call may be recorded for quality purposes. I'd be happy to arrange a confidential consultation for you. Are mornings or afternoons better?",
      },
      { speaker: "caller", text: "Afternoons are fine, Thursday if possible." },
      {
        speaker: "ruxi",
        text: "Perfect. I've reserved 2:30 PM this Thursday with one of our family law specialists. You'll receive a confirmation text shortly. Is there anything else I can help with today?",
      },
    ],
    seo: {
      title: "AI Receptionist for Solicitors UK | PRUXIN — Never Miss a Client Call",
      description:
        "PRUXIN's AI receptionist answers every call to your law firm, books consultations, and handles FAQs — 24/7. GDPR compliant, ICO registered. From £0.18/min.",
      keywords: [
        "AI receptionist for solicitors UK",
        "virtual receptionist law firm",
        "missed call handling solicitors",
        "AI phone answering law firm",
        "24 hour receptionist solicitors",
        "legal practice call handling",
        "solicitors after hours answering",
        "AI call handling UK law firm",
        "law firm virtual receptionist",
        "automated receptionist solicitors",
      ],
      canonicalPath: "/industries/solicitors",
      ogTitle: "AI Receptionist for Solicitors | PRUXIN",
      ogDescription:
        "Stop losing new client instructions to voicemail. Ruxi answers every call, books consultations, and notifies your team — 24/7.",
    },
  },
  {
    slug: "garages",
    name: "Garages & MOT Centres",
    emoji: "🔧",
    headline: "Fill your ramps.",
    headlineAccent: "Answer every call.",
    subCopy:
      "Customers call when their warning light appears — not during your working hours. Ruxi books MOTs, takes service enquiries, and sends your team a clean summary, so no job ever slips through the cracks.",
    painPoints: [
      "Mechanics can't answer the phone while under a car",
      "Missed booking calls go straight to the nearest competitor",
      "Out-of-hours enquiries represent 30% of your potential bookings",
      "Manual booking diaries create double-booking chaos",
    ],
    faqs: [
      {
        q: "Can Ruxi book MOT slots directly into our diary?",
        a: "Yes — Ruxi integrates with Google Calendar and can hold slots based on your available bays. It collects vehicle reg, make, and model before confirming.",
      },
      {
        q: "What if a customer calls about a breakdown emergency?",
        a: "Ruxi detects emergency intent and immediately notifies your designated on-call number via SMS and call, while keeping the customer informed.",
      },
    ],
    transcript: [
      { speaker: "caller", text: "Hi, need to book an MOT for my Transit. When's the next slot?" },
      {
        speaker: "ruxi",
        text: "Hi there, welcome to Riverside Garage — I'm Ruxi. This call may be recorded. I can get that booked for you right away. What's the registration number?",
      },
      { speaker: "caller", text: "It's GX21 RBF." },
      {
        speaker: "ruxi",
        text: "Got it — 2021 Ford Transit. We have a slot tomorrow at 8:30 AM. Shall I book that in and send a reminder to this number?",
      },
    ],
    seo: {
      title: "AI Receptionist for Garages & MOT Centres UK | PRUXIN",
      description:
        "Ruxi books MOT slots, takes service calls, and handles out-of-hours enquiries for your garage — automatically. No missed calls. From £0.18/min.",
      keywords: [
        "AI receptionist for garages UK",
        "MOT centre call answering",
        "virtual receptionist garage",
        "automated MOT booking system",
        "after hours garage phone answering",
        "AI phone system for mechanics",
        "missed call handling garage",
        "24 hour garage receptionist UK",
        "AI booking system MOT centre",
        "garage virtual assistant UK",
      ],
      canonicalPath: "/industries/garages",
      ogTitle: "AI Receptionist for Garages | PRUXIN",
      ogDescription:
        "Never miss a booking while you're under a car. Ruxi answers every call, fills your diary, and keeps your team notified.",
    },
  },
  {
    slug: "clinics",
    name: "Clinics & GP Practices",
    emoji: "🩺",
    headline: "Every patient heard.",
    headlineAccent: "Every appointment booked.",
    subCopy:
      "Phone lines in healthcare are a bottleneck. Ruxi triages calls, books appointments, and escalates clinical emergencies to the duty team — without putting patients on hold for 40 minutes.",
    painPoints: [
      "Patients hang up after waiting — and seek care elsewhere",
      "Receptionists spend 60% of their day on appointment booking",
      "Out-of-hours urgent calls need instant escalation, not voicemail",
      "Repeat prescription queries clog the phone lines needlessly",
    ],
    faqs: [
      {
        q: "How does Ruxi handle a patient describing an emergency?",
        a: "Ruxi is trained to detect emergency keywords and immediately escalates to your on-call clinician or directs the caller to 999/111 as appropriate.",
      },
      {
        q: "Can Ruxi handle repeat prescription requests?",
        a: "Yes — Ruxi collects patient name, DOB, and medication details and logs the request for your admin team, eliminating the need for a callback.",
      },
    ],
    transcript: [
      { speaker: "caller", text: "I need to see the doctor today — my chest has been tight since this morning." },
      {
        speaker: "ruxi",
        text: "Thank you for calling Westfield Medical Centre — I'm Ruxi. This call may be recorded. I can hear this is urgent. I'm notifying the duty clinician now and reserving you an emergency slot at 11:15 AM. Is this number best to reach you on?",
      },
      { speaker: "caller", text: "Yes, that's fine." },
      {
        speaker: "ruxi",
        text: "Confirmed. The duty doctor will also call you within the next 20 minutes. Please call 999 immediately if symptoms worsen.",
      },
    ],
    seo: {
      title: "AI Receptionist for Clinics & GP Practices UK | PRUXIN",
      description:
        "Ruxi answers patient calls, books appointments, and escalates emergencies for UK clinics and GP practices. GDPR compliant. From £0.18/min.",
      keywords: [
        "AI receptionist for clinics UK",
        "GP practice phone answering",
        "virtual receptionist medical",
        "automated appointment booking GP",
        "clinic call handling AI",
        "NHS GP out of hours answering",
        "patient call triage AI",
        "24 hour medical receptionist UK",
        "AI phone system for clinics",
        "doctor surgery virtual receptionist",
      ],
      canonicalPath: "/industries/clinics",
      ogTitle: "AI Receptionist for Clinics | PRUXIN",
      ogDescription:
        "Stop making patients wait on hold. Ruxi books appointments, handles repeat prescription requests, and escalates emergencies — 24/7.",
    },
  },
  {
    slug: "restaurants",
    name: "Restaurants & Hospitality",
    emoji: "🍽️",
    headline: "Full tables.",
    headlineAccent: "Zero missed reservations.",
    subCopy:
      "Your kitchen staff can't answer the phone during a Friday dinner rush. Ruxi takes reservations, answers menu questions, and handles special requests — keeping your team focused on the food.",
    painPoints: [
      "Missed calls during service means empty tables you could have filled",
      "Staff answering phones disrupt service quality and table turns",
      "Last-minute reservation changes require immediate acknowledgement",
      "Allergy and dietary enquiries need accurate, confident answers",
    ],
    faqs: [
      {
        q: "Can Ruxi take reservations and add them to our booking system?",
        a: "Ruxi integrates with Google Calendar and can be connected to OpenTable, ResDiary, and other reservation platforms via webhook.",
      },
      {
        q: "How does Ruxi handle dietary and allergy questions?",
        a: "You provide Ruxi with your allergen information and menu details. It answers confidently and always recommends confirming with staff on arrival for serious allergies.",
      },
    ],
    transcript: [
      { speaker: "caller", text: "Hi, I'd like to book a table for 4 on Saturday evening." },
      {
        speaker: "ruxi",
        text: "Hello, welcome to The Copper Kettle — I'm Ruxi. This call may be recorded. Lovely! Saturday evening — I have 7:30 PM available. Any dietary requirements I should note?",
      },
      { speaker: "caller", text: "One vegetarian and one nut allergy, please." },
      {
        speaker: "ruxi",
        text: "Noted — I've flagged both for the kitchen team. Your table for 4 is confirmed at 7:30 PM Saturday. You'll receive a text confirmation shortly.",
      },
    ],
    seo: {
      title: "AI Receptionist for Restaurants UK | PRUXIN — Never Miss a Reservation",
      description:
        "Ruxi takes reservations, answers menu questions, and handles dietary enquiries for UK restaurants — even during service. From £0.18/min.",
      keywords: [
        "AI receptionist for restaurants UK",
        "restaurant reservation answering service",
        "virtual receptionist hospitality",
        "automated restaurant booking system",
        "phone answering service restaurant",
        "restaurant call handling AI UK",
        "24 hour reservation taking service",
        "AI booking system hospitality",
        "restaurant virtual assistant UK",
        "missed call handling restaurant",
      ],
      canonicalPath: "/industries/restaurants",
      ogTitle: "AI Receptionist for Restaurants | PRUXIN",
      ogDescription:
        "Keep your kitchen staff in the kitchen. Ruxi takes reservations, handles dietary questions, and fills your tables — automatically.",
    },
  },
  {
    slug: "trades",
    name: "Tradespeople & Contractors",
    emoji: "🏗️",
    headline: "On the job.",
    headlineAccent: "Not on the phone.",
    subCopy:
      "You can't take calls from a rooftop or under a floorboard. Ruxi captures every lead, provides quotes, and books site visits — so your diary fills while you focus on the work.",
    painPoints: [
      "Missed calls on job sites means leads go cold and call a competitor",
      "Quote enquiries need fast acknowledgement or you lose the job",
      "Customers expect immediate response even at 7 AM or 8 PM",
      "Managing callbacks while on site is disruptive and dangerous",
    ],
    faqs: [
      {
        q: "Can Ruxi provide rough quotes over the phone?",
        a: "You provide Ruxi with your rate card and it can give indicative estimates, qualifying the lead and booking a site visit for a firm quote.",
      },
      {
        q: "What if an existing customer has an emergency?",
        a: "Ruxi identifies returning customers and escalates emergencies directly to your mobile via call and SMS, with full context of the enquiry.",
      },
    ],
    transcript: [
      { speaker: "caller", text: "Hi, I need a plumber urgently — my kitchen is flooding." },
      {
        speaker: "ruxi",
        text: "Hello, I'm Ruxi from Swift Plumbing — this call may be recorded. I'm alerting the team right now. Can you give me your postcode so we can see who's nearest?",
      },
      { speaker: "caller", text: "It's SW12 9JT." },
      {
        speaker: "ruxi",
        text: "On it — I've sent your details to our nearest engineer in Balham. Turn off your stopcock under the kitchen sink to reduce damage. You'll get a call within 10 minutes.",
      },
    ],
    seo: {
      title: "AI Receptionist for Tradespeople UK | PRUXIN — Never Miss a Lead",
      description:
        "Ruxi captures leads, provides quotes, and books site visits for UK tradespeople while you're on the job. No missed calls. From £0.18/min.",
      keywords: [
        "AI receptionist for tradespeople UK",
        "virtual receptionist plumber",
        "call answering service electrician UK",
        "missed call handling tradesman",
        "AI phone answering builder UK",
        "24 hour answering service trades",
        "contractor virtual receptionist",
        "lead capture service tradesperson",
        "AI booking system tradespeople",
        "phone answering service plumber UK",
      ],
      canonicalPath: "/industries/trades",
      ogTitle: "AI Receptionist for Tradespeople | PRUXIN",
      ogDescription:
        "Stop losing jobs because you couldn't answer the phone. Ruxi captures every lead and books site visits while you're on the tools.",
    },
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}
