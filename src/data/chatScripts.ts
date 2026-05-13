export interface ScriptStep {
  text: string;
  options: { label: string; action: any }[];
}

export const CHAT_SCRIPTS: Record<string, ScriptStep> = {
  'booking_start': {
    text: "Excellent choice. To begin curating your journey, how many travelers will be joining this expedition?",
    options: [
      { label: 'Solo Traveler', action: { type: 'scripted_next', nextStep: 'booking_date' } },
      { label: 'Couple / 2 People', action: { type: 'scripted_next', nextStep: 'booking_date' } },
      { label: 'Private Group (3+)', action: { type: 'scripted_next', nextStep: 'booking_date' } }
    ]
  },
  'booking_date': {
    text: "Wonderful. And when are you planning to embark on this extraordinary escape?",
    options: [
      { label: 'Next 3 Months', action: { type: 'scripted_next', nextStep: 'booking_contact' } },
      { label: 'Later this Year', action: { type: 'scripted_next', nextStep: 'booking_contact' } },
      { label: 'Just Exploring', action: { type: 'navigate', path: '/tours' } }
    ]
  },
  'booking_contact': {
    text: "Thank you. A senior travel curator will review your preferences. Would you like us to contact you via email or phone for the final itinerary?",
    options: [
      { label: 'Email me details', action: { type: 'scripted_next', nextStep: 'booking_finish' } },
      { label: 'Schedule a call', action: { type: 'scripted_next', nextStep: 'booking_finish' } }
    ]
  },
  'booking_finish': {
    text: "Perfect. Your request has been prioritized. We will reach out within 2 hours to finalize your Lumina experience.",
    options: [
      { label: 'Back to Home', action: { type: 'navigate', path: '/' } },
      { label: 'View Destinations', action: { type: 'navigate', path: '/destinations' } }
    ]
  }
};

export const FAQ_DATA = [
  { keywords: ['cancel', 'refund'], answer: "Lumina offers flexible cancellations up to 14 days before departure for our Elite members." },
  { keywords: ['visa', 'passport'], answer: "Our concierge team handles all visa requirements for your selected destinations once your booking is confirmed." },
  { keywords: ['wifi', 'internet'], answer: "High-speed satellite connectivity is standard across all our private yacht and villa collection." }
];
