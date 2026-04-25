import { useState, useEffect } from 'react';
import { Check, AlertCircle, Shield, X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

// ─── Data mirrored from Venue.tsx ────────────────────────────────────────────

type EventType = 'wedding' | 'debut' | 'social';

interface TicketTier {
  name: string;
  price: number;
  perks: string[];
  popular?: boolean;
  dark?: boolean;
}

interface VenueOption {
  name: string;
  capacity: string;
  features: string[];
  pricing: TicketTier[];
}

interface EventDetail {
  title: string;
  emoji: string;
  venues: VenueOption[];
  schedule: { time: string; activity: string }[];
}

const eventDetails: Record<EventType, EventDetail> = {
  wedding: {
    title: 'Wedding Celebrations',
    emoji: '💍',
    venues: [
      {
        name: 'Casa Ibarra',
        capacity: 'Up to 500 guests',
        features: ['Elegant Floral Arrangements', 'Bridal Suite', 'Catering Services', 'Sound & Lighting'],
        pricing: [
          { name: 'Standard', price: 25000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 45000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 75000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 120000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Whitespace Manila',
        capacity: 'Up to 400 guests',
        features: ['Garden Setup', 'Outdoor Ceremony', 'Floral Arch', 'Fairy Lights'],
        pricing: [
          { name: 'Standard', price: 20000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 38000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 62000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 100000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Brittany Palazzo',
        capacity: 'Up to 300 guests',
        features: ['Rose Theme Decor', 'Bridal Suite', 'Photo Booth', 'Valet Parking'],
        pricing: [
          { name: 'Standard', price: 15000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 28000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 48000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 80000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Glass Garden Events Venue',
        capacity: 'Up to 200 guests',
        features: ['Open Air Setup', 'Scenic View', 'Intimate Setting', 'Bar Service'],
        pricing: [
          { name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 32000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 55000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Light of Love Events Place, Quezon City',
        capacity: 'Up to 600 guests',
        features: ['Grand Entrance', 'Pearl Theme', 'Full Catering', 'Audio Visual'],
        pricing: [
          { name: 'Standard', price: 30000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 55000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 90000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 150000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
    ],
    schedule: [
      { time: '8:00 AM', activity: 'Venue Setup & Decoration' },
      { time: '10:00 AM', activity: 'Bridal Party Preparation' },
      { time: '12:00 PM', activity: 'Guest Arrival & Welcome' },
      { time: '2:00 PM', activity: 'Wedding Ceremony' },
      { time: '4:00 PM', activity: 'Photo & Video Coverage' },
      { time: '6:00 PM', activity: 'Reception & Dinner' },
      { time: '8:00 PM', activity: 'Cake Cutting & First Dance' },
      { time: '10:00 PM', activity: 'Party & Celebration' },
    ],
  },

  debut: {
    title: 'Dream Debut Moments',
    emoji: '👑',
    venues: [
      {
        name: 'Fernwood Gardens',
        capacity: 'Up to 300 guests',
        features: ['Fairy Light Setup', 'Debut Throne Chair', 'Red Carpet Entrance', 'Photo Booth'],
        pricing: [
          { name: 'Standard', price: 12000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 22000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 38000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 65000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Marquis Events Place',
        capacity: 'Up to 250 guests',
        features: ['Crown Theme Decor', 'Stage Setup', 'Catering', 'Sound System'],
        pricing: [
          { name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 32000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 55000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Hillcreek Gardens',
        capacity: 'Up to 200 guests',
        features: ['Floral Theme', 'Garden Setting', 'Intimate Atmosphere', 'Fairy Lights'],
        pricing: [
          { name: 'Standard', price: 8000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 15000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 26000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 45000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Stella Suites',
        capacity: 'Up to 350 guests',
        features: ['Royal Theme', 'Chandelier Lighting', 'Full Catering', 'Valet Parking'],
        pricing: [
          { name: 'Standard', price: 18000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 32000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 55000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 90000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'The Blue Leaf Events Pavilion',
        capacity: 'Up to 400 guests',
        features: ['Star Ceiling Setup', 'Dance Floor', 'Bar Service', 'Photo & Video'],
        pricing: [
          { name: 'Standard', price: 22000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 40000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 68000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 110000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
    ],
    schedule: [
      { time: '3:00 PM', activity: 'Guest Arrival & Registration' },
      { time: '4:00 PM', activity: 'Debut Ceremony Begins' },
      { time: '4:30 PM', activity: '18 Roses Presentation' },
      { time: '5:00 PM', activity: '18 Candles Presentation' },
      { time: '5:30 PM', activity: 'Cotillion de Honor' },
      { time: '6:00 PM', activity: 'Grand Dinner' },
      { time: '7:00 PM', activity: 'Birthday Message & Speeches' },
      { time: '8:00 PM', activity: 'Cake Cutting & Party' },
    ],
  },

  social: {
    title: 'Elegant Social Gatherings',
    emoji: '🥂',
    venues: [
      {
        name: 'The Silica Events Place',
        capacity: 'Up to 200 guests',
        features: ['Flexible Setup', 'AV Equipment', 'Bar Services', 'Event Coordinator'],
        pricing: [
          { name: 'Standard', price: 7000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 13000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 22000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 38000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Woodlane Events Place',
        capacity: 'Up to 300 guests',
        features: ['Open Concept', 'Natural Lighting', 'Cocktail Setup', 'Full Catering'],
        pricing: [
          { name: 'Standard', price: 12000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 22000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 38000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 65000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Gallio',
        capacity: 'Up to 150 guests',
        features: ['Rooftop View', 'Open Air', 'Bar Service', 'Intimate Setting'],
        pricing: [
          { name: 'Standard', price: 5000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 10000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 18000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 30000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'The Pergola',
        capacity: 'Up to 250 guests',
        features: ['Lakeside View', 'Outdoor Setup', 'Scenic Photography', 'Catering'],
        pricing: [
          { name: 'Standard', price: 10000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 18000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 30000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 52000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
      {
        name: 'Apogée Events and Lifestyle',
        capacity: 'Up to 180 guests',
        features: ['Cliff View', 'Exclusive Ambiance', 'Fine Dining', 'Valet Parking'],
        pricing: [
          { name: 'Standard', price: 9000, perks: ['Venue access', 'Basic catering', 'Sound system'] },
          { name: 'Premium', price: 17000, perks: ['Everything in Standard', 'Premium catering', 'Photo booth', 'Valet parking'] },
          { name: 'VIP', price: 28000, popular: true, perks: ['Everything in Premium', 'Private lounge', 'Bar service', 'Personalized decor', 'Gift bags'] },
          { name: 'All-Inclusive', price: 48000, dark: true, perks: ['Everything in VIP', 'Pro videography', 'Live entertainment', 'Luxury accommodations', 'Event coordinator', 'Unlimited revisions'] },
        ],
      },
    ],
    schedule: [
      { time: '5:00 PM', activity: 'Guest Arrival & Cocktails' },
      { time: '6:00 PM', activity: 'Program Proper Begins' },
      { time: '6:30 PM', activity: 'Welcome Remarks' },
      { time: '7:00 PM', activity: 'Dinner Service' },
      { time: '8:00 PM', activity: 'Entertainment & Program' },
      { time: '9:00 PM', activity: 'Open Networking' },
      { time: '10:00 PM', activity: 'Closing & Farewell' },
    ],
  },
};

function formatPeso(amount: number) {
  return '₱' + amount.toLocaleString('en-PH');
}

// ─── Privacy Modal ────────────────────────────────────────────────────────────

function PrivacyModal({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20) setScrolledToBottom(true);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Privacy Notice</h2>
            <p className="text-sm text-gray-500">Republic Act No. 10173 — Data Privacy Act of 2012</p>
          </div>
        </div>
        <div onScroll={handleScroll} className="overflow-y-auto flex-1 p-6 text-sm text-gray-700 space-y-4">
          <p className="font-semibold text-gray-900">Please read this notice carefully before completing your registration.</p>
          <section><h3 className="font-bold text-gray-900 mb-1">1. Data Controller</h3><p>PARAISO 2026 Conference ("we," "us," or "our"), organized under applicable Philippine law, is the personal information controller responsible for the data you provide during registration.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">2. Data We Collect</h3><p>We collect the following personal information:</p><ul className="list-disc pl-5 mt-1 space-y-1"><li>Full name, email address, and phone number</li><li>Dietary preferences and special accommodation requests</li><li>Ticket type, quantity, and payment-related details</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">3. Purpose of Collection</h3><p>Your personal data is collected and processed for the following purposes:</p><ul className="list-disc pl-5 mt-1 space-y-1"><li>Processing and confirming your event registration</li><li>Sending event-related communications and updates</li><li>Managing dietary and accommodation arrangements</li><li>Issuing certificates of attendance</li><li>Improving future events and services</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">4. Legal Basis</h3><p>Processing is based on your consent and the performance of a contract (event registration), in accordance with Sections 12 and 13 of the Data Privacy Act of 2012 (RA 10173).</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">5. Data Sharing</h3><p>Your data will not be sold to third parties. It may be shared only with:</p><ul className="list-disc pl-5 mt-1 space-y-1"><li>Event venue and logistics partners</li><li>Payment processors (for billing only)</li><li>Authorized event staff and speakers</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">6. Data Retention</h3><p>Personal data will be retained for a period of three (3) years after the event, after which it will be securely deleted or anonymized, unless longer retention is required by law.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">7. Your Rights Under RA 10173</h3><p>As a data subject, you have the right to:</p><ul className="list-disc pl-5 mt-1 space-y-1"><li><strong>Be informed</strong> — know how your data is being processed</li><li><strong>Access</strong> — request a copy of your personal data</li><li><strong>Rectification</strong> — correct inaccurate or outdated data</li><li><strong>Erasure</strong> — request deletion of your data under certain conditions</li><li><strong>Object</strong> — object to processing based on legitimate interests</li><li><strong>Data portability</strong> — receive your data in a structured format</li><li><strong>Lodge a complaint</strong> — file a complaint with the National Privacy Commission (NPC)</li></ul></section>
          <section><h3 className="font-bold text-gray-900 mb-1">8. Security Measures</h3><p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction.</p></section>
          <section><h3 className="font-bold text-gray-900 mb-1">9. Contact Us</h3><p>For privacy-related concerns, you may reach our Data Protection Officer at: <span className="font-semibold text-yellow-600">privacy@paraiso2026.com</span></p></section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-xs text-gray-600">By clicking <strong>"I Agree & Continue"</strong>, you acknowledge that you have read, understood, and consent to the collection and processing of your personal data as described in this notice, in compliance with the Data Privacy Act of 2012 (RA 10173) and its Implementing Rules and Regulations.</p>
          </div>
          {!scrolledToBottom && (
            <p className="text-center text-xs text-gray-400 animate-pulse">↓ Scroll to the bottom to enable the Accept button</p>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <button onClick={onDecline} className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
            <X className="w-4 h-4" /><span>Decline</span>
          </button>
          <button onClick={onAccept} disabled={!scrolledToBottom}
            className={`flex-1 py-3 px-6 font-bold rounded-lg transition-all flex items-center justify-center space-x-2 ${scrolledToBottom ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            <Shield className="w-4 h-4" /><span>I Agree & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Registration Component ─────────────────────────────────────────────

export function Registration() {
  const { darkMode } = useTheme();

  // Auth check
  const [user_id] = useState<string | null>(localStorage.getItem('paraiso_user_id'));
  const [userName] = useState<string | null>(localStorage.getItem('paraiso_user'));

  useEffect(() => {
    if (!localStorage.getItem('paraiso_user_id')) {
      window.location.href = '/login';
    }
  }, []);

  if (!user_id) return null;

  // ── Form state ──
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Venue / ticket state ──
  const [selectedEventType, setSelectedEventType] = useState<EventType | ''>('');
  const [selectedVenueIndex, setSelectedVenueIndex] = useState<number | ''>('');
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | ''>('');
  const [eventDate, setEventDate] = useState('');

  // ── Promo / privacy / submit ──
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Derived data ──
  const currentEvent = selectedEventType ? eventDetails[selectedEventType] : null;
  const currentVenue = currentEvent && selectedVenueIndex !== '' ? currentEvent.venues[selectedVenueIndex] : null;
  const currentTicket = currentVenue && selectedTicketIndex !== '' ? currentVenue.pricing[selectedTicketIndex] : null;

  const subtotal = currentTicket?.price ?? 0;
  const discountAmount = Math.round(subtotal * discount / 100);
  const total = subtotal - discountAmount;

  // ── Handlers ──
  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventType(e.target.value as EventType | '');
    setSelectedVenueIndex('');
    setSelectedTicketIndex('');
  };

  const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVenueIndex(e.target.value !== '' ? Number(e.target.value) : '');
    setSelectedTicketIndex('');
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    const codes: Record<string, number> = { PARAISO20: 20, EARLYBIRD: 15, VIP10: 10 };
    if (codes[code]) {
      setDiscount(codes[code]);
      setPromoMsg(`${codes[code]}% discount applied!`);
    } else {
      setDiscount(0);
      setPromoMsg('Invalid promo code.');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!selectedEventType) newErrors.eventType = 'Please select an event type';
    if (selectedVenueIndex === '') newErrors.venue = 'Please select a venue';
    if (selectedTicketIndex === '') newErrors.ticket = 'Please select a ticket package';
    if (!eventDate) newErrors.eventDate = 'Please select your event date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!privacyAccepted) { setShowPrivacyModal(true); return; }
    submitForm();
  };

  const submitForm = async () => {
    try {
      const payload = {
        ...formData,
        user_id,
        eventType: selectedEventType,
        venueName: currentVenue?.name ?? '',
        ticketPackage: currentTicket?.name ?? '',
        ticketPrice: currentTicket?.price ?? 0,
        eventDate,
        discount,
        total,
      };
      const response = await fetch('http://localhost/paraiso-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) setSubmitted(true);
      else alert('Registration failed: ' + result.message);
    } catch (error) {
      alert('Could not connect to server. Make sure XAMPP is running.');
      console.error(error);
    }
  };

  const handlePrivacyAccept = () => { setPrivacyAccepted(true); setShowPrivacyModal(false); submitForm(); };
  const handlePrivacyDecline = () => setShowPrivacyModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      field && errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : darkMode
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500'
        : 'border-gray-300 focus:ring-yellow-500'
    }`;

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-12 max-w-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-black">Registration Successful!</h1>
          <p className="text-xl text-gray-700 mb-2">
            Thank you for registering, {formData.firstName}!
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">{currentEvent?.emoji} {currentEvent?.title}</span> at{' '}
            <span className="font-semibold">{currentVenue?.name}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Package: <span className="font-semibold">{currentTicket?.name}</span>{' '}
            — <span className="font-semibold text-yellow-600">{formatPeso(total)}</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Confirmation sent to <span className="font-semibold">{formData.email}</span>
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-amber-500 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {showPrivacyModal && <PrivacyModal onAccept={handlePrivacyAccept} onDecline={handlePrivacyDecline} />}

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Register for PARAISO 2026
          </h1>
          <p className="text-xl text-white mb-4">Secure your spot at the most anticipated event of the year</p>
          <p className="text-green-400 text-sm mt-2">Registering as: <strong>{userName}</strong></p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmitClick}>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Left: Form Sections ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* 1. Personal Info */}
              <div className={`rounded-lg shadow-lg p-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Personal Information</h2>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputClass('firstName')} />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputClass('lastName')} />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass('email')} />
                    {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass('phone')} />
                    {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* 2. Venue Selection */}
              <div className={`rounded-lg shadow-lg p-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Venue Selection</h2>

                {/* Step 1 — Event Type */}
                <div className="mb-5">
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Event Type *</label>
                  <select
                    value={selectedEventType}
                    onChange={handleEventTypeChange}
                    className={inputClass('eventType')}
                  >
                    <option value="">— Select event type —</option>
                    <option value="wedding">💍 Wedding</option>
                    <option value="debut">👑 Debut</option>
                    <option value="social">🥂 Social Gathering</option>
                  </select>
                  {errors.eventType && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.eventType}</p>}
                </div>

                {/* Step 2 — Venue (unlocks after event type) */}
                <div className={`mb-5 transition-opacity duration-200 ${!selectedEventType ? 'opacity-40 pointer-events-none' : ''}`}>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Venue *</label>
                  <select
                    value={selectedVenueIndex}
                    onChange={handleVenueChange}
                    disabled={!selectedEventType}
                    className={inputClass('venue')}
                  >
                    <option value="">{selectedEventType ? '— Select a venue —' : 'Select event type first'}</option>
                    {currentEvent?.venues.map((v, i) => (
                      <option key={i} value={i}>{v.name} — {v.capacity}</option>
                    ))}
                  </select>
                  {errors.venue && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.venue}</p>}
                </div>

                {/* Venue feature badges */}
                {currentVenue && (
                  <div className={`mb-5 p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                    <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      ✨ {currentVenue.name} — {currentVenue.capacity}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentVenue.features.map((f, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-600 border border-yellow-300'}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 — Event Date (unlocks after venue) */}
                <div className={`mb-5 transition-opacity duration-200 ${selectedVenueIndex === '' ? 'opacity-40 pointer-events-none' : ''}`}>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Event Date *</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={e => {
                      setEventDate(e.target.value);
                      if (errors.eventDate) setErrors(prev => ({ ...prev, eventDate: '' }));
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    disabled={selectedVenueIndex === ''}
                    className={inputClass('eventDate')}
                  />
                  {errors.eventDate && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.eventDate}</p>}
                </div>

                {/* Special Requests */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Special Requests or Accommodations
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className={inputClass()}
                    placeholder="Accessibility needs, dietary preferences, or other requirements…"
                  />
                </div>
              </div>

              {/* 3. Schedule (visible after venue selected) */}
              {currentEvent && selectedVenueIndex !== '' && (
                <div className={`rounded-lg shadow-lg p-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                    {currentEvent.emoji} Event Schedule
                  </h2>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentEvent.title}
                  </p>
                  <div className="space-y-3">
                    {currentEvent.schedule.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 hover:border-yellow-500'
                            : 'bg-yellow-50 border-yellow-100 hover:border-yellow-400'
                        }`}
                      >
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap shadow min-w-[7rem] text-center">
                          {item.time}
                        </span>
                        <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {item.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Ticket Selection (visible after venue selected) */}
              {currentVenue && (
                <div className={`rounded-lg shadow-lg p-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                    💳 Select Ticket Package
                  </h2>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Pricing for <span className="font-semibold text-yellow-600">{currentVenue.name}</span>
                  </p>
                  {errors.ticket && (
                    <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />{errors.ticket}
                    </p>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    {currentVenue.pricing.map((tier, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedTicketIndex(i);
                          if (errors.ticket) setErrors(prev => ({ ...prev, ticket: '' }));
                        }}
                        className={`relative text-left p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                          ${selectedTicketIndex === i
                            ? 'border-yellow-500 ring-2 ring-yellow-300'
                            : tier.dark
                            ? 'border-yellow-400'
                            : darkMode
                            ? 'border-gray-600 hover:border-yellow-500'
                            : 'border-gray-200 hover:border-yellow-300'
                          }
                          ${tier.dark
                            ? 'bg-gradient-to-br from-black to-gray-900'
                            : darkMode
                            ? 'bg-gray-700'
                            : 'bg-yellow-50'
                          }
                        `}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                            POPULAR
                          </div>
                        )}
                        {selectedTicketIndex === i && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                        )}
                        <div className={`text-lg font-bold mb-1 ${tier.dark ? 'text-white' : darkMode ? 'text-white' : 'text-black'}`}>
                          {tier.name} Package
                        </div>
                        <div className={`text-2xl font-bold mb-3 ${tier.dark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {formatPeso(tier.price)}
                        </div>
                        <ul className="space-y-1.5">
                          {tier.perks.map((perk, pi) => (
                            <li key={pi} className={`flex items-start gap-2 text-sm ${tier.dark ? 'text-gray-300' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className={`mt-0.5 font-bold flex-shrink-0 ${tier.dark ? 'text-yellow-400' : 'text-yellow-600'}`}>✓</span>
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Privacy Notice + Submit */}
              <div className={`rounded-lg shadow-lg p-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`flex items-start gap-3 p-4 rounded-lg border mb-6 ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    By registering, you will be asked to review and accept our <strong>Data Privacy Notice</strong> in compliance with <strong>RA 10173 (Data Privacy Act of 2012)</strong>.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg"
                >
                  Complete Registration
                </button>
              </div>

            </div>{/* end left col */}

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-1">
              <div className={`rounded-lg shadow-lg p-8 sticky top-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Order Summary</h2>

                {/* Logged-in user */}
                <div className={`p-4 rounded-lg border mb-6 ${darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>✓ Logged in as</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userName}</p>
                </div>

                {/* Summary rows */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Event Type', value: currentEvent ? `${currentEvent.emoji} ${currentEvent.title}` : '—' },
                    { label: 'Venue', value: currentVenue?.name ?? '—' },
                    { label: 'Capacity', value: currentVenue?.capacity ?? '—' },
                    {
                      label: 'Event Date',
                      value: eventDate
                        ? new Date(eventDate + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
                        : '—',
                    },
                    { label: 'Package', value: currentTicket?.name ? `${currentTicket.name} Package` : '—' },
                  ].map(row => (
                    <div key={row.label} className={`flex justify-between text-sm gap-3 pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <span className={`flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{row.label}</span>
                      <span className={`text-right font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{row.value}</span>
                    </div>
                  ))}

                  {/* Pricing */}
                  <div className={`flex justify-between text-sm pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Subtotal</span>
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>{currentTicket ? formatPeso(subtotal) : '—'}</span>
                  </div>
                  <div className={`flex justify-between text-sm pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Discount</span>
                    <span className="text-green-500">
                      {discount > 0 && currentTicket ? `−${formatPeso(discountAmount)} (${discount}%)` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span className={darkMode ? 'text-white' : 'text-black'}>Total</span>
                    <span className="text-yellow-600">{currentTicket ? formatPeso(total) : '—'}</span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mb-4">
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <p className={`text-sm mt-2 ${promoMsg.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
                      {promoMsg}
                    </p>
                  )}
                </div>

                <div className={`p-3 rounded-lg border text-xs ${darkMode ? 'bg-yellow-500/10 border-yellow-500/30 text-gray-300' : 'bg-yellow-50 border-yellow-200 text-gray-600'}`}>
                  <strong>Codes:</strong> PARAISO20 (20% off) · EARLYBIRD (15% off) · VIP10 (10% off)
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}