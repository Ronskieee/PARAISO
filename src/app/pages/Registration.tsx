import { useState, useEffect } from 'react';
import { Check, AlertCircle, Shield, X, CalendarCheck, PartyPopper } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useNavigate } from 'react-router';

const API = 'http://localhost/paraiso-api/bookings.php';

async function fetchBookedDates(venueName: string, eventType: string): Promise<string[]> {
  try {
    const params = new URLSearchParams({ booked_dates: '1', venue: venueName, event_type: eventType });
const res = await fetch(`${API}?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.dates ?? [];
  } catch { return []; }
}

async function saveBookingToDB(booking: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
const res = await fetch(API, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    return await res.json();
  } catch { return { success: false, error: 'Network error. Please try again.' }; }
}

type EventType = 'wedding' | 'debut' | 'social';
interface TicketTier  { name: string; price: number; perks: string[]; popular?: boolean; dark?: boolean; }
interface VenueOption { name: string; capacity: string; features: string[]; pricing: TicketTier[]; }
interface EventDetail { title: string; emoji: string; venues: VenueOption[]; schedule: { time: string; activity: string }[]; }

const eventDetails: Record<EventType, EventDetail> = {
  wedding: {
    title: 'Wedding Celebrations', emoji: '💍',
    venues: [
      { name: 'Casa Ibarra', capacity: 'Up to 500 guests', features: ['Elegant Floral Arrangements', 'Bridal Suite', 'Catering Services', 'Sound & Lighting'], pricing: [{ name: 'Standard', price: 25000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 45000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 75000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 120000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Whitespace Manila', capacity: 'Up to 400 guests', features: ['Garden Setup', 'Outdoor Ceremony', 'Floral Arch', 'Fairy Lights'], pricing: [{ name: 'Standard', price: 20000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 38000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 62000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 100000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Brittany Palazzo', capacity: 'Up to 300 guests', features: ['Rose Theme Decor', 'Bridal Suite', 'Photo Booth', 'Valet Parking'], pricing: [{ name: 'Standard', price: 15000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 28000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 48000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 80000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Glass Garden Events Venue', capacity: 'Up to 200 guests', features: ['Open Air Setup', 'Scenic View', 'Intimate Setting', 'Bar Service'], pricing: [{ name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 32000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 55000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Light of Love Events Place, Quezon City', capacity: 'Up to 600 guests', features: ['Grand Entrance', 'Pearl Theme', 'Full Catering', 'Audio Visual'], pricing: [{ name: 'Standard', price: 30000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 55000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 90000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 150000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
    ],
    schedule: [{ time: '8:00 AM', activity: 'Venue Setup & Decoration' }, { time: '10:00 AM', activity: 'Bridal Party Preparation' }, { time: '12:00 PM', activity: 'Guest Arrival & Welcome' }, { time: '2:00 PM', activity: 'Wedding Ceremony' }, { time: '4:00 PM', activity: 'Photo & Video Coverage' }, { time: '6:00 PM', activity: 'Reception & Dinner' }, { time: '8:00 PM', activity: 'Cake Cutting & First Dance' }, { time: '10:00 PM', activity: 'Party & Celebration' }],
  },
  debut: {
    title: 'Dream Debut Moments', emoji: '👑',
    venues: [
      { name: 'Fernwood Gardens', capacity: 'Up to 300 guests', features: ['Fairy Light Setup', 'Debut Throne Chair', 'Red Carpet Entrance', 'Photo Booth'], pricing: [{ name: 'Standard', price: 12000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 22000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 38000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 65000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Marquis Events Place', capacity: 'Up to 250 guests', features: ['Crown Theme Decor', 'Stage Setup', 'Catering', 'Sound System'], pricing: [{ name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 32000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 55000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Hillcreek Gardens', capacity: 'Up to 200 guests', features: ['Floral Theme', 'Garden Setting', 'Intimate Atmosphere', 'Fairy Lights'], pricing: [{ name: 'Standard', price: 8000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 15000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 26000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 45000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Stella Suites', capacity: 'Up to 350 guests', features: ['Royal Theme', 'Chandelier Lighting', 'Full Catering', 'Valet Parking'], pricing: [{ name: 'Standard', price: 18000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 32000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 55000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 90000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'The Blue Leaf Events Pavilion', capacity: 'Up to 400 guests', features: ['Star Ceiling Setup', 'Dance Floor', 'Bar Service', 'Photo & Video'], pricing: [{ name: 'Standard', price: 22000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 40000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 68000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 110000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
    ],
    schedule: [{ time: '3:00 PM', activity: 'Guest Arrival & Registration' }, { time: '4:00 PM', activity: 'Debut Ceremony Begins' }, { time: '4:30 PM', activity: '18 Roses Presentation' }, { time: '5:00 PM', activity: '18 Candles Presentation' }, { time: '5:30 PM', activity: 'Cotillion de Honor' }, { time: '6:00 PM', activity: 'Grand Dinner' }, { time: '7:00 PM', activity: 'Birthday Message & Speeches' }, { time: '8:00 PM', activity: 'Cake Cutting & Party' }],
  },
  social: {
    title: 'Elegant Social Gatherings', emoji: '🥂',
    venues: [
      { name: 'The Silica Events Place', capacity: 'Up to 200 guests', features: ['Flexible Setup', 'AV Equipment', 'Bar Services', 'Event Coordinator'], pricing: [{ name: 'Standard', price: 7000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 13000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 22000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 38000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Woodlane Events Place', capacity: 'Up to 300 guests', features: ['Open Concept', 'Natural Lighting', 'Cocktail Setup', 'Full Catering'], pricing: [{ name: 'Standard', price: 12000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 22000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 38000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 65000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Gallio', capacity: 'Up to 150 guests', features: ['Rooftop View', 'Open Air', 'Bar Service', 'Intimate Setting'], pricing: [{ name: 'Standard', price: 5000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 10000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 18000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 30000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'The Pergola', capacity: 'Up to 250 guests', features: ['Lakeside View', 'Outdoor Setup', 'Scenic Photography', 'Catering'], pricing: [{ name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 30000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 52000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
      { name: 'Apogée Events and Lifestyle', capacity: 'Up to 180 guests', features: ['Cliff View', 'Exclusive Ambiance', 'Fine Dining', 'Valet Parking'], pricing: [{ name: 'Standard', price: 9000, perks: ['Venue access', 'Basic catering', 'Sound system'] }, { name: 'Premium', price: 17000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] }, { name: 'VIP', price: 28000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] }, { name: 'All-Inclusive', price: 48000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator'] }] },
    ],
    schedule: [{ time: '5:00 PM', activity: 'Guest Arrival & Cocktails' }, { time: '6:00 PM', activity: 'Program Proper Begins' }, { time: '6:30 PM', activity: 'Welcome Remarks' }, { time: '7:00 PM', activity: 'Dinner Service' }, { time: '8:00 PM', activity: 'Entertainment & Program' }, { time: '9:00 PM', activity: 'Open Networking' }, { time: '10:00 PM', activity: 'Closing & Farewell' }],
  },
};

function formatPeso(n: number) { return '₱' + n.toLocaleString('en-PH'); }

function validatePromoCode(
  code: string, ticketName: string, eventDate: string, isNewUser: boolean
): { valid: boolean; discount: number; message: string } {
  const upper = code.toUpperCase().trim();
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() + 4);

  if (upper === 'VIPCODE') {
    if (ticketName.toLowerCase() !== 'vip')
      return { valid: false, discount: 0, message: 'VIPCODE is only applicable for VIP ticket packages.' };
    return { valid: true, discount: 15, message: '🎉 15% VIP discount applied!' };
  }
  if (upper === 'EARLYBIRD') {
    if (!eventDate) return { valid: false, discount: 0, message: 'Event date not set.' };
    const diff = (new Date(eventDate).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diff > 7) return { valid: false, discount: 0, message: 'EARLYBIRD is only valid within 1 week of the earliest available date.' };
    return { valid: true, discount: 15, message: '🐦 15% Early Bird discount applied!' };
  }
  if (upper === 'PARAISO20') {
    if (!isNewUser) return { valid: false, discount: 0, message: 'PARAISO20 is only available for new users.' };
    return { valid: true, discount: 20, message: '🌟 20% New User discount applied!' };
  }
  return { valid: false, discount: 0, message: 'Invalid promo code.' };
}

// ─── Privacy Modal ────────────────────────────────────────────────────────────
function PrivacyModal({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0"><Shield className="w-6 h-6 text-yellow-600" /></div>
          <div><h2 className="text-xl font-bold text-gray-900">Data Privacy Notice</h2><p className="text-sm text-gray-500">Republic Act No. 10173 — Data Privacy Act of 2012</p></div>
        </div>
        <div onScroll={e => { const el = e.currentTarget; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) setScrolledToBottom(true); }}
          className="overflow-y-auto flex-1 p-6 text-sm text-gray-700 space-y-4">
          <p className="font-semibold text-gray-900">Please read this notice carefully before completing your registration.</p>
          <section><h3 className="font-bold text-gray-900 mb-1">1. Data Controller</h3><p>PARAISO 2026 Conference is responsible for the data you provide during registration.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">2. Data We Collect</h3><ul className="list-disc pl-5 mt-1 space-y-1"><li>Full name, email address, and phone number</li><li>Dietary preferences and special accommodation requests</li><li>Ticket type, quantity, and payment-related details</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">3. Purpose of Collection</h3><ul className="list-disc pl-5 mt-1 space-y-1"><li>Processing and confirming your event registration</li><li>Sending event-related communications and updates</li><li>Managing dietary and accommodation arrangements</li><li>Issuing certificates of attendance</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">4. Legal Basis</h3><p>Processing is based on your consent and the performance of a contract, in accordance with Sections 12 and 13 of RA 10173.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">5. Data Sharing</h3><ul className="list-disc pl-5 mt-1 space-y-1"><li>Event venue and logistics partners</li><li>Payment processors (for billing only)</li><li>Authorized event staff</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">6. Data Retention</h3><p>Personal data will be retained for three (3) years after the event, then securely deleted.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">7. Your Rights Under RA 10173</h3><ul className="list-disc pl-5 mt-1 space-y-1"><li>Be informed, access, rectification, erasure, object, data portability, lodge a complaint with NPC.</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">8. Contact Us</h3><p>Data Protection Officer: <span className="font-semibold text-yellow-600">privacy@paraiso2026.com</span></p></section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-xs text-gray-600">By clicking <strong>"I Agree & Continue"</strong>, you consent to the collection and processing of your personal data in compliance with RA 10173.</p>
          </div>
          {!scrolledToBottom && <p className="text-center text-xs text-gray-400 animate-pulse">↓ Scroll to the bottom to enable the Accept button</p>}
        </div>
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <button onClick={onDecline} className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"><X className="w-4 h-4" /><span>Decline</span></button>
          <button onClick={onAccept} disabled={!scrolledToBottom}
            className={`flex-1 py-3 px-6 font-bold rounded-lg transition-all flex items-center justify-center space-x-2 ${scrolledToBottom ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            <Shield className="w-4 h-4" /><span>I Agree & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────
function BookedSuccessModal({ onGoToBookings }: { onGoToBookings: () => void }) {
  const navigate = useNavigate();  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <PartyPopper className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-black">Booked Successfully!</h2>
          <p className="text-black/80 mt-2">Your event has been confirmed 🎉</p>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6">Your booking details and downloadable ticket are waiting in <strong>My Bookings</strong>!</p>
          <button onClick={onGoToBookings}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center gap-2">
            <div className="p-8 text-center">
  <p className="text-gray-600 mb-6">
    Your event has been confirmed! See your countdown on the home page.
  </p>
  <button
    onClick={() => navigate('/')}
    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center gap-2"
  >
    🏠 Go to Home & See Countdown
  </button>
</div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Registration Component ──────────────────────────────────────────────
export function Registration() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // ── Draft from Schedule page (venue + date only) ──
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(false);

  // ── User session ──
  const [userId,    setUserId]    = useState<string | null>(null);
  const [userName,  setUserName]  = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  // ✅ Personal info form — lives here in Registration, NOT in Schedule
  const [firstName,   setFirstName]   = useState('');
  const [lastName,    setLastName]    = useState('');
  const [email,       setEmail]       = useState('');
  const [phone,       setPhone]       = useState('');
  const [specialReqs, setSpecialReqs] = useState('');
  const [formErrors,  setFormErrors]  = useState<Record<string, string>>({});

  useEffect(() => {
    const storedUserId = localStorage.getItem('paraiso_user_id');
    if (!storedUserId) { window.location.href = '/login'; return; }
    setUserId(storedUserId);
    setUserName(localStorage.getItem('paraiso_user'));

    const regAt = localStorage.getItem('paraiso_registered_at');
    if (regAt) setIsNewUser(Date.now() - new Date(regAt).getTime() < 24 * 60 * 60 * 1000);

    // ✅ Pre-fill name + email from localStorage (logged-in user)
    const stored = localStorage.getItem('paraiso_user') || '';
    const parts = stored.split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setEmail(localStorage.getItem('paraiso_email') || '');

    // ✅ Read venue + date draft from sessionStorage (set by Schedule page)
    const raw = sessionStorage.getItem('paraiso_booking_draft');
    if (raw) {
      try { setDraft(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setDraftLoaded(true);
  }, []);

  // ── Derived values from draft (venue + date — auto-filled, read-only) ──
  const eventType  = draft?.eventType as EventType | undefined;
  const venueIndex = draft?.venueIndex !== undefined ? Number(draft.venueIndex) : undefined;
  const eventDate  = draft?.eventDate ?? '';

  const currentEvent = eventType ? eventDetails[eventType] : null;
  const currentVenue = currentEvent && venueIndex !== undefined ? currentEvent.venues[venueIndex] ?? null : null;

  // ── Ticket selection ──
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | ''>('');
  const currentTicket = currentVenue && selectedTicketIndex !== '' ? currentVenue.pricing[selectedTicketIndex] : null;

  // ── Promo ──
  const [promoCode,    setPromoCode]    = useState('');
  const [discount,     setDiscount]     = useState(0);
  const [promoMsg,     setPromoMsg]     = useState('');
  const [promoMsgType, setPromoMsgType] = useState<'success' | 'error'>('error');

  // ── Booked dates ──
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  useEffect(() => {
    if (!currentVenue || !currentEvent) { setBookedDates([]); return; }
    fetchBookedDates(currentVenue.name, `${currentEvent.emoji} ${currentEvent.title}`).then(setBookedDates);
  }, [currentVenue, currentEvent]);

  const dateBooked = bookedDates.includes(eventDate);

  // ── Privacy / confirm / success ──
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted,  setPrivacyAccepted]  = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting,     setIsSubmitting]     = useState(false);
  const [ticketError,      setTicketError]      = useState('');

  // ── Pricing ──
  const subtotal    = currentTicket?.price ?? 0;
  const discountAmt = Math.round(subtotal * discount / 100);
  const total       = subtotal - discountAmt;

  const applyPromo = () => {
    const result = validatePromoCode(promoCode, currentTicket?.name ?? '', eventDate, isNewUser);
    setDiscount(result.valid ? result.discount : 0);
    setPromoMsgType(result.valid ? 'success' : 'error');
    setPromoMsg(result.message);
  };

  // ✅ Validate personal info form
  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = 'First name is required';
    if (!lastName.trim())  e.lastName  = 'Last name is required';
    if (!email.trim())     e.email     = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email format';
    if (!phone.trim())     e.phone     = 'Phone number is required';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitClick = () => {
    if (!currentTicket) { setTicketError('Please select a ticket package.'); return; }
    if (dateBooked) { alert('This date is already booked for this venue. Please go back and pick a different date.'); return; }
    if (!validateForm()) return;
    setTicketError('');
    if (!privacyAccepted) { setShowPrivacyModal(true); return; }
    setShowConfirmation(true);
  };

  const submitForm = async (): Promise<boolean> => {
    const bookingId = `${userId}-${Date.now()}`;
    const payload = {
      id: bookingId, user_id: userId,
      event_type:       `${currentEvent?.emoji} ${currentEvent?.title}`,
      venue_name:       currentVenue?.name ?? '',
      venue_capacity:   currentVenue?.capacity ?? '',
      ticket_package:   currentTicket?.name ?? '',
      ticket_price:     currentTicket?.price ?? 0,
      discount, discount_amount: discountAmt, total,
      event_date:       eventDate,
      first_name:       firstName,
      last_name:        lastName,
      email,
      phone,
      special_requests: specialReqs,
    };
    const result = await saveBookingToDB(payload);
    if (!result.success) { alert(result.error ?? 'Booking failed. Please try again.'); return false; }

    localStorage.setItem('paraiso_booking_info', JSON.stringify({ ...payload, bookedAt: new Date().toISOString() }));
    sessionStorage.removeItem('paraiso_booking_draft');
    return true;
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const ok = await submitForm();
      if (!ok) return;
      localStorage.setItem('paraiso_event_date', eventDate);
      localStorage.setItem('paraiso_event_type', `${currentEvent?.emoji} ${currentEvent?.title}`);
      localStorage.setItem('paraiso_venue',       currentVenue?.name ?? '');
      setShowConfirmation(false);
      setShowSuccessModal(true);
    } finally { setIsSubmitting(false); }
  };

  const inputClass = (err?: string) => `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
    err
      ? 'border-red-500 focus:ring-red-500'
      : darkMode
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500'
        : 'border-gray-300 focus:ring-yellow-500'
  }`;

  // ── Guard: wait for useEffect to load draft ──
  if (!draftLoaded) return null;

  if (!draft || !eventType || !currentVenue) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center p-8">
          <p className="text-xl mb-4">No booking found. Please start from the Venue page.</p>
          <button onClick={() => navigate('/venue')} className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg">
            Go to Venues
          </button>
        </div>
      </div>
    );
  }

  if (showSuccessModal) {
    return <BookedSuccessModal onGoToBookings={() => navigate('/bookings')} />;
  }

  // ── Confirmation page ──
  if (showConfirmation) {
    const formattedDate = eventDate
      ? new Date(eventDate + 'T00:00:00').toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"><CalendarCheck className="w-10 h-10 text-yellow-600" /></div>
            <h1 className="text-3xl font-bold text-black mb-1">Booking Confirmation</h1>
            <p className="text-black/80">Please review your booking details before confirming</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '👤 Name',       value: `${firstName} ${lastName}` },
                { label: '📧 Email',      value: email },
                { label: '📞 Phone',      value: phone },
                { label: '🎉 Event Type', value: `${currentEvent?.emoji} ${currentEvent?.title}` },
                { label: '📍 Venue',      value: currentVenue?.name },
                { label: '👥 Capacity',   value: currentVenue?.capacity },
                { label: '📅 Event Date', value: formattedDate },
                { label: '🎫 Ticket',     value: `${currentTicket?.name} Package` },
              ].map(row => (
                <div key={row.label} className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-xs text-yellow-700 font-semibold mb-1">{row.label}</p>
                  <p className="text-gray-800 font-medium text-sm">{row.value}</p>
                </div>
              ))}
            </div>
            {discount > 0 && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-200 flex justify-between">
                <span className="text-green-700 font-semibold">Discount ({discount}%)</span>
                <span className="text-green-600 font-bold">−{formatPeso(discountAmt)}</span>
              </div>
            )}
            <div className="bg-black rounded-xl p-4 flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total Amount</span>
              <span className="text-yellow-400 font-bold text-2xl">{formatPeso(total)}</span>
            </div>
            {specialReqs && (
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <p className="text-xs text-yellow-700 font-semibold mb-1">📝 Special Requests</p>
                <p className="text-gray-700 text-sm">{specialReqs}</p>
              </div>
            )}
          </div>
          <div className="px-8 pb-8 flex flex-col gap-3">
            <button onClick={handleConfirm} disabled={isSubmitting}
              className={`w-full py-4 font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500'}`}>
              <Check className="w-5 h-5" />{isSubmitting ? 'Saving your booking…' : 'Confirm My Booking'}
            </button>
            <button onClick={() => setShowConfirmation(false)}
              className={`w-full py-3 font-semibold rounded-xl border-2 transition-all ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
              ← Go Back & Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Registration form ──
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {showPrivacyModal && (
        <PrivacyModal
          onAccept={() => { setPrivacyAccepted(true); setShowPrivacyModal(false); setShowConfirmation(true); }}
          onDecline={() => setShowPrivacyModal(false)}
        />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Complete Your Booking
          </h1>
          {userName && <p className="text-green-400 text-sm mt-2">Booking as: <strong>{userName}</strong></p>}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">

            {/* ✅ Read-only booking context (auto-filled from Schedule page) */}
            <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>📋 Your Booking</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Selected from the Schedule page</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Event Type', value: `${currentEvent?.emoji} ${currentEvent?.title}` },
                  { label: 'Venue',      value: currentVenue?.name ?? '—' },
                  { label: 'Event Date', value: eventDate ? new Date(eventDate + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
                ].map(row => (
                  <div key={row.label} className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                    <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>{row.label}</p>
                    <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{row.value}</p>
                  </div>
                ))}
              </div>
              {dateBooked && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">This date is already booked. Please <button onClick={() => navigate(-1)} className="underline font-semibold">go back</button> and choose a different date.</p>
                </div>
              )}
              <button onClick={() => navigate(-1)} className={`mt-4 text-sm font-semibold underline ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                ← Change date or venue
              </button>
            </div>

            {/* ✅ Personal info form — lives here in Registration */}
            <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>👤 Your Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                    <input type="text" value={firstName}
                      onChange={e => { setFirstName(e.target.value); if (formErrors.firstName) setFormErrors(p => ({ ...p, firstName: '' })); }}
                      className={inputClass(formErrors.firstName)} placeholder="Juan" />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                    <input type="text" value={lastName}
                      onChange={e => { setLastName(e.target.value); if (formErrors.lastName) setFormErrors(p => ({ ...p, lastName: '' })); }}
                      className={inputClass(formErrors.lastName)} placeholder="dela Cruz" />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                  <input type="email" value={email}
                    onChange={e => { setEmail(e.target.value); if (formErrors.email) setFormErrors(p => ({ ...p, email: '' })); }}
                    className={inputClass(formErrors.email)} placeholder="juan@email.com" />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                  <input type="tel" value={phone}
                    onChange={e => { setPhone(e.target.value); if (formErrors.phone) setFormErrors(p => ({ ...p, phone: '' })); }}
                    className={inputClass(formErrors.phone)} placeholder="+63 9XX XXX XXXX" />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Special Requests <span className="font-normal opacity-60">(optional)</span>
                  </label>
                  <textarea rows={3} value={specialReqs} onChange={e => setSpecialReqs(e.target.value)}
                    className={`${inputClass()} resize-none`} placeholder="Dietary needs, accessibility, etc." />
                </div>
              </div>
            </div>

            {/* Ticket package selection */}
            {currentVenue && (
              <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>💳 Select Ticket Package</h2>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Pricing for <span className="font-semibold text-yellow-600">{currentVenue.name}</span>
                </p>
                {ticketError && <p className="text-red-500 text-sm mb-4 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{ticketError}</p>}
                <div className="grid md:grid-cols-2 gap-4">
                  {currentVenue.pricing.map((tier, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setSelectedTicketIndex(i); setTicketError(''); setDiscount(0); setPromoMsg(''); }}
                      disabled={dateBooked}
                      className={`relative text-left p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                        dateBooked ? 'opacity-40 cursor-not-allowed' : ''
                      } ${
                        selectedTicketIndex === i ? 'border-yellow-500 ring-2 ring-yellow-300' : tier.dark ? 'border-yellow-400' : darkMode ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-300'
                      } ${tier.dark ? 'bg-gradient-to-br from-black to-gray-900' : darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}
                    >
                      {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">POPULAR</div>}
                      {selectedTicketIndex === i && <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center"><Check className="w-3 h-3 text-black" /></div>}
                      <div className={`text-lg font-bold mb-1 ${tier.dark ? 'text-white' : darkMode ? 'text-white' : 'text-black'}`}>{tier.name} Package</div>
                      <div className={`text-2xl font-bold mb-3 ${tier.dark ? 'text-yellow-400' : 'text-yellow-600'}`}>{formatPeso(tier.price)}</div>
                      <ul className="space-y-1.5">
                        {tier.perks.map((perk, pi) => (
                          <li key={pi} className={`flex items-start gap-2 text-sm ${tier.dark ? 'text-gray-300' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className={`mt-0.5 font-bold flex-shrink-0 ${tier.dark ? 'text-yellow-400' : 'text-yellow-600'}`}>✓</span>{perk}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Event Schedule preview */}
            {currentEvent && (
              <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>{currentEvent.emoji} Event Schedule</h2>
                <div className="space-y-3">
                  {currentEvent.schedule.map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap shadow min-w-[7rem] text-center">{item.time}</span>
                      <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy notice + Submit */}
            <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
              <div className={`flex items-start gap-3 p-4 rounded-lg border mb-6 ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  By registering, you will be asked to review and accept our <strong>Data Privacy Notice</strong> in compliance with <strong>RA 10173</strong>.
                </p>
              </div>
              <button
                onClick={handleSubmitClick}
                disabled={dateBooked || isSubmitting}
                className={`w-full py-4 font-bold text-lg rounded-lg transition-all shadow-lg ${
                  dateBooked || isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500'
                }`}
              >
                {isSubmitting ? 'Saving your booking…' : dateBooked ? 'Date Unavailable — Go Back' : 'Complete Registration'}
              </button>
            </div>
          </div>

          {/* Sidebar — Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl shadow-lg p-8 sticky top-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Order Summary</h2>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Event Type', value: currentEvent ? `${currentEvent.emoji} ${currentEvent.title}` : '—' },
                  { label: 'Venue',      value: currentVenue?.name ?? '—' },
                  { label: 'Date',       value: eventDate ? new Date(eventDate + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
                  { label: 'Ticket',     value: currentTicket?.name ? `${currentTicket.name} Package` : '—' },
                  { label: 'Subtotal',   value: currentTicket ? formatPeso(subtotal) : '—' },
                ].map(row => (
                  <div key={row.label} className={`flex justify-between text-sm gap-3 pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <span className={`flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{row.label}</span>
                    <span className={`text-right font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{row.value}</span>
                  </div>
                ))}
                <div className={`flex justify-between text-sm pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Discount</span>
                  <span className="text-green-500">{discount > 0 && currentTicket ? `−${formatPeso(discountAmt)} (${discount}%)` : '—'}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-1">
                  <span className={darkMode ? 'text-white' : 'text-black'}>Total</span>
                  <span className="text-yellow-600">{currentTicket ? formatPeso(total) : '—'}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Promo Code</label>
                <div className="flex gap-2">
                  <input type="text" value={promoCode}
                    onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoMsg(''); }}
                    placeholder="Enter code"
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`} />
                  <button type="button" onClick={applyPromo}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>Apply</button>
                </div>
                {promoMsg && <p className={`text-sm mt-2 ${promoMsgType === 'error' ? 'text-red-500' : 'text-green-500'}`}>{promoMsg}</p>}
              </div>

              <div className={`p-3 rounded-lg border text-xs space-y-1 ${darkMode ? 'bg-yellow-500/10 border-yellow-500/30 text-gray-300' : 'bg-yellow-50 border-yellow-200 text-gray-600'}`}>
                <p className="font-bold mb-1">Available Promo Codes:</p>
                <p>🎟️ <strong>VIPCODE</strong> — 15% off (VIP only)</p>
                <p>🐦 <strong>EARLYBIRD</strong> — 15% off (within 1 week of earliest date)</p>
                <p>🌟 <strong>PARAISO20</strong> — 20% off (new users only)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}