import { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, Download, Printer } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router';

type EventType = 'wedding' | 'debut' | 'social';

interface VenueOption { name: string; address: string; capacity: string; features: string[]; }
interface EventDetail { title: string; color: string; emoji: string; venues: VenueOption[]; schedule: { time: string; activity: string }[]; }

const eventDetails: Record<EventType, EventDetail> = {
  wedding: {
    title: 'Wedding Celebrations', color: 'from-yellow-400 to-yellow-600', emoji: '💍',
    venues: [
      { name: 'Casa Ibarra', address: 'Tandang Sora Ave, Quezon City, Philippines', capacity: 'Up to 500 guests', features: ['Elegant Floral Arrangements', 'Bridal Suite', 'Catering Services', 'Sound & Lighting'] },
      { name: 'Whitespace Manila', address: '3F Infinity Tower, 26th St, Bonifacio Global City, Taguig', capacity: 'Up to 400 guests', features: ['Garden Setup', 'Outdoor Ceremony', 'Floral Arch', 'Fairy Lights'] },
      { name: 'Brittany Palazzo', address: 'Brittany Palazzo Events Place, Las Piñas, Philippines', capacity: 'Up to 300 guests', features: ['Rose Theme Decor', 'Bridal Suite', 'Photo Booth', 'Valet Parking'] },
      { name: 'Glass Garden Events Venue', address: 'Glass Garden, Pasig City, Philippines', capacity: 'Up to 200 guests', features: ['Open Air Setup', 'Scenic View', 'Intimate Setting', 'Bar Service'] },
      { name: 'Light of Love Events Place, Quezon City', address: 'Light of Love Events Place, Quezon City, Philippines', capacity: 'Up to 600 guests', features: ['Grand Entrance', 'Pearl Theme', 'Full Catering', 'Audio Visual'] },
    ],
    schedule: [{ time: '8:00 AM', activity: 'Venue Setup & Decoration' }, { time: '10:00 AM', activity: 'Bridal Party Preparation' }, { time: '12:00 PM', activity: 'Guest Arrival & Welcome' }, { time: '2:00 PM', activity: 'Wedding Ceremony' }, { time: '4:00 PM', activity: 'Photo & Video Coverage' }, { time: '6:00 PM', activity: 'Reception & Dinner' }, { time: '8:00 PM', activity: 'Cake Cutting & First Dance' }, { time: '10:00 PM', activity: 'Party & Celebration' }],
  },
  debut: {
    title: 'Dream Debut Moments', color: 'from-yellow-300 to-yellow-500', emoji: '👑',
    venues: [
      { name: 'Fernwood Gardens', address: 'Fernwood Gardens, Quezon City, Philippines', capacity: 'Up to 300 guests', features: ['Fairy Light Setup', 'Debut Throne Chair', 'Red Carpet Entrance', 'Photo Booth'] },
      { name: 'Marquis Events Place', address: 'Marquis Events Place, Quezon City, Philippines', capacity: 'Up to 250 guests', features: ['Crown Theme Decor', 'Stage Setup', 'Catering', 'Sound System'] },
      { name: 'Hillcreek Gardens', address: 'Hillcreek Gardens, Antipolo, Rizal, Philippines', capacity: 'Up to 200 guests', features: ['Floral Theme', 'Garden Setting', 'Intimate Atmosphere', 'Fairy Lights'] },
      { name: 'Stella Suites', address: 'Stella Suites Events Place, Quezon City, Philippines', capacity: 'Up to 350 guests', features: ['Royal Theme', 'Chandelier Lighting', 'Full Catering', 'Valet Parking'] },
      { name: 'The Blue Leaf Events Pavilion', address: 'The Blue Leaf Events Pavilion, McKinley Hill, Taguig, Philippines', capacity: 'Up to 400 guests', features: ['Star Ceiling Setup', 'Dance Floor', 'Bar Service', 'Photo & Video'] },
    ],
    schedule: [{ time: '3:00 PM', activity: 'Guest Arrival & Registration' }, { time: '4:00 PM', activity: 'Debut Ceremony Begins' }, { time: '4:30 PM', activity: '18 Roses Presentation' }, { time: '5:00 PM', activity: '18 Candles Presentation' }, { time: '5:30 PM', activity: 'Cotillion de Honor' }, { time: '6:00 PM', activity: 'Grand Dinner' }, { time: '7:00 PM', activity: 'Birthday Message & Speeches' }, { time: '8:00 PM', activity: 'Cake Cutting & Party' }],
  },
  social: {
    title: 'Elegant Social Gatherings', color: 'from-yellow-500 to-yellow-700', emoji: '🥂',
    venues: [
      { name: 'The Silica Events Place', address: 'The Silica Events Place, Quezon City, Philippines', capacity: 'Up to 200 guests', features: ['Flexible Setup', 'AV Equipment', 'Bar Services', 'Event Coordinator'] },
      { name: 'Woodlane Events Place', address: 'Woodlane Events Place, Quezon City, Philippines', capacity: 'Up to 300 guests', features: ['Open Concept', 'Natural Lighting', 'Cocktail Setup', 'Full Catering'] },
      { name: 'Gallio', address: 'Gallio Bar and Restaurant, Quezon City, Philippines', capacity: 'Up to 150 guests', features: ['Rooftop View', 'Open Air', 'Bar Service', 'Intimate Setting'] },
      { name: 'The Pergola', address: 'The Pergola Garden and Events, Quezon City, Philippines', capacity: 'Up to 250 guests', features: ['Lakeside View', 'Outdoor Setup', 'Scenic Photography', 'Catering'] },
      { name: 'Apogée Events and Lifestyle', address: 'Apogée Events and Lifestyle, Quezon City, Philippines', capacity: 'Up to 180 guests', features: ['Cliff View', 'Exclusive Ambiance', 'Fine Dining', 'Valet Parking'] },
    ],
    schedule: [{ time: '5:00 PM', activity: 'Guest Arrival & Cocktails' }, { time: '6:00 PM', activity: 'Program Proper Begins' }, { time: '6:30 PM', activity: 'Welcome Remarks' }, { time: '7:00 PM', activity: 'Dinner Service' }, { time: '8:00 PM', activity: 'Entertainment & Program' }, { time: '9:00 PM', activity: 'Open Networking' }, { time: '10:00 PM', activity: 'Closing & Farewell' }],
  },
};

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getMinDate() {
  const d = new Date(); d.setMonth(d.getMonth() + 4); return d.toISOString().split('T')[0];
}

export function Schedule() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ Read event type + venue from URL params passed by Venue page
  const eventTypeParam = searchParams.get('eventType') as EventType | null;
  const venueIndexParam = searchParams.get('venueIndex');

  const selectedEvent = eventTypeParam && eventDetails[eventTypeParam] ? eventTypeParam : null;
  const selectedVenueIndex = venueIndexParam !== null && venueIndexParam !== '' ? Number(venueIndexParam) : null;

  const details = selectedEvent ? eventDetails[selectedEvent] : null;
  const venues = details?.venues ?? [];
  const selectedVenue = selectedVenueIndex !== null ? venues[selectedVenueIndex] ?? null : null;

  // ✅ Only date selection state — no personal info form
  const [dateError, setDateError] = useState('');

  // Calendar state (starts 4 months from today)
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date(); d.setMonth(d.getMonth() + 4); d.setDate(1); return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const bg   = darkMode ? 'bg-gray-950' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200';
  const text = darkMode ? 'text-white' : 'text-gray-900';
  const sub  = darkMode ? 'text-gray-400' : 'text-gray-500';

  // Calendar helpers
  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDay    = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const canGoPrev = () => {
    const min = new Date(); min.setMonth(min.getMonth() + 4); min.setDate(1); min.setHours(0,0,0,0);
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1) >= min;
  };
  const canGoNext = () => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getFullYear() <= 2027;
  const isSelectable = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const min = new Date(); min.setHours(0,0,0,0); min.setMonth(min.getMonth() + 4);
    return d >= min && d <= new Date(2027, 11, 31);
  };
  const isSelected = (day: number) =>
    selectedDate
      ? selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear()
      : false;

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay    = getFirstDay(currentDate);
    const dayNames    = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="p-2" />);
    for (let day = 1; day <= daysInMonth; day++) {
      const sel    = isSelectable(day);
      const active = isSelected(day);
      days.push(
        <button
          key={day}
          onClick={() => { if (sel) { setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)); setDateError(''); } }}
          disabled={!sel}
          className={`p-2 rounded-lg text-center text-sm transition-all ${
            active  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold shadow'
            : sel   ? `cursor-pointer font-medium ${darkMode ? 'text-white hover:bg-yellow-500/20' : 'text-gray-900 hover:bg-yellow-100'}`
                    : `cursor-not-allowed ${darkMode ? 'text-gray-600' : 'text-gray-300'}`
          }`}
        >
          {day}
        </button>
      );
    }
    return (
      <>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(n => (
            <div key={n} className={`text-center font-semibold py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{n}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">{days}</div>
      </>
    );
  };

  const handlePrint = () => {
    if (!details || !selectedVenue) return;
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'Date not selected';
    const scheduleRows = details.schedule.map(item =>
      `<tr><td style="padding:10px 16px;border-bottom:1px solid #f0e68c;font-weight:700;color:#b45309;">${item.time}</td><td style="padding:10px 16px;border-bottom:1px solid #f0e68c;color:#374151;">${item.activity}</td></tr>`
    ).join('');
    const featuresHtml = selectedVenue.features.map(f => `<li style="margin-bottom:6px;">• ${f}</li>`).join('');
    const printContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>PARAISO 2026 — Schedule</title>
      <style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#111;}
      .header{background:linear-gradient(135deg,#000,#1a1a1a 60%,#78350f);color:#fff;padding:36px 40px;}
      .header h1{font-size:32px;font-weight:900;color:#fbbf24;}.header p{font-size:14px;color:#d1d5db;margin-top:4px;}
      .badge{display:inline-block;background:#fbbf24;color:#000;font-weight:700;font-size:13px;padding:4px 14px;border-radius:999px;margin-top:12px;}
      .body{padding:32px 40px;}.section-title{font-size:18px;font-weight:800;color:#92400e;margin-bottom:12px;border-left:4px solid #fbbf24;padding-left:10px;}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;}
      .info-box{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;}
      .info-box .label{font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:1px;font-weight:700;}
      .info-box .value{font-size:15px;font-weight:700;color:#111;margin-top:4px;}
      table{width:100%;border-collapse:collapse;margin-bottom:28px;}thead tr{background:linear-gradient(90deg,#fbbf24,#f59e0b);}
      thead th{padding:12px 16px;text-align:left;font-size:13px;font-weight:800;color:#000;text-transform:uppercase;}
      tbody tr:nth-child(even){background:#fffbeb;}
      .features{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:28px;}
      .footer{border-top:2px solid #fde68a;padding:18px 40px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#9ca3af;}
      .footer .logo{font-size:18px;font-weight:900;color:#fbbf24;}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}</style></head>
      <body>
        <div class="header"><h1>PARAISO 2026</h1><p>Event Schedule & Agenda</p><div class="badge">${details.emoji} ${details.title}</div></div>
        <div class="body">
          <div class="section-title">Event Information</div>
          <div class="info-grid">
            <div class="info-box"><div class="label">Venue</div><div class="value">${selectedVenue.name}</div></div>
            <div class="info-box"><div class="label">Capacity</div><div class="value">${selectedVenue.capacity}</div></div>
            <div class="info-box"><div class="label">Address</div><div class="value">${selectedVenue.address}</div></div>
            <div class="info-box"><div class="label">Event Date</div><div class="value">${dateStr}</div></div>
          </div>
          <div class="section-title">Event Schedule</div>
          <table><thead><tr><th>Time</th><th>Activity</th></tr></thead><tbody>${scheduleRows}</tbody></table>
          <div class="section-title">Venue Features & Inclusions</div>
          <div class="features"><ul>${featuresHtml}</ul></div>
        </div>
        <div class="footer"><div class="logo">PARAISO</div><div>Generated on ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</div><div>paraisoeventmanagement@gmail.com</div></div>
      </body></html>`;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(printContent); w.document.close(); w.focus();
    setTimeout(() => w.print(), 500);
  };

  // ✅ FIXED: Only saves eventType, venueIndex, venueName, eventDate — NO personal info
  // Personal info will be filled in Registration page
  const handleContinue = () => {
    if (!selectedDate) {
      setDateError('Please select a date to continue.');
      return;
    }

    const dateStr = [
  selectedDate.getFullYear(),
  String(selectedDate.getMonth() + 1).padStart(2, '0'),
  String(selectedDate.getDate()).padStart(2, '0'),
].join('-');


    // Save only booking context — Registration page handles personal info
    sessionStorage.setItem('paraiso_booking_draft', JSON.stringify({
      eventType:   selectedEvent,
      venueIndex:  selectedVenueIndex,
      venueName:   selectedVenue!.name,
      eventDate:   dateStr,
    }));

    navigate('/registration');
  };

  // Guard: redirect if arriving without params
  if (!selectedEvent || !selectedVenue) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center p-8">
          <p className="text-xl mb-4">Please select an event type and venue first.</p>
          <button onClick={() => navigate('/venue')} className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg">
            Go to Venues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            {details!.emoji} {details!.title}
          </h1>
          <p className="text-xl text-white mb-2">{selectedVenue.name}</p>
          <p className="text-yellow-400 text-sm">📅 Bookings require at least 4 months advance notice</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT — Venue info + Schedule */}
          <div className="space-y-8">

            {/* Venue details */}
            <div className={`p-8 rounded-2xl shadow-lg border ${card}`}>
              <h2 className={`text-2xl font-bold mb-4 ${text}`}>📍 Venue Details</h2>
              <h3 className={`text-xl font-bold mb-1 ${text}`}>{selectedVenue.name}</h3>
              <p className={`text-sm mb-4 ${sub}`}>{selectedVenue.address}</p>
              <div className={`p-3 rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                <p className={`font-semibold text-sm ${text}`}>👥 {selectedVenue.capacity}</p>
              </div>
              <h4 className={`font-bold mb-2 text-sm ${text}`}>✨ Features & Inclusions</h4>
              <div className="space-y-1">
                {selectedVenue.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className={`p-8 rounded-2xl shadow-lg border ${card}`}>
              <div className="flex flex-wrap gap-3 mb-6 justify-end">
                <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-amber-500 transition-all shadow text-sm">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2 bg-black text-yellow-400 font-bold rounded-full hover:bg-gray-900 transition-all shadow text-sm">
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${text}`}>
                <Clock className="w-6 h-6" /> Event Schedule
              </h2>
              <div className="space-y-3">
                {details!.schedule.map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-700 border-gray-600 hover:border-yellow-500' : 'bg-yellow-50 border-yellow-100 hover:border-yellow-400'}`}>
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap shadow min-w-[7rem] text-center">
                      {item.time}
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ RIGHT — Calendar + Book button ONLY (no personal info form) */}
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl shadow-lg border ${card}`}>
              <h2 className={`text-2xl font-bold mb-4 ${text}`}>📅 Select Event Date</h2>
              <div className={`mb-4 p-3 rounded-lg text-center border ${darkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Earliest available: <span className="font-bold">{new Date(getMinDate()).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </p>
              </div>

              {/* Calendar navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  disabled={!canGoPrev()}
                  className={`p-2 rounded-lg ${canGoPrev() ? darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className={`text-xl font-bold ${text}`}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  disabled={!canGoNext()}
                  className={`p-2 rounded-lg ${canGoNext() ? darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {renderCalendar()}

              {/* Selected date display */}
              {selectedDate && (
                <div className={`mt-4 p-3 rounded-xl text-center font-semibold text-sm ${darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
                  ✅ {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
              {dateError && <p className="text-red-500 text-sm mt-2 text-center">{dateError}</p>}

              {/* ✅ Continue to Registration — passes venue + date via sessionStorage */}
              <button
                onClick={handleContinue}
                className="mt-6 w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg"
              >
                Book This Schedule 🎉
              </button>

              <p className={`text-xs text-center mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                You'll fill in your personal details on the next page
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}