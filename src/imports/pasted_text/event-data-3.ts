import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Download, Printer } from 'lucide-react';

type EventType = 'wedding' | 'debut' | 'social' | null;

interface VenueOption {
  name: string;
  address: string;
  capacity: string;
  features: string[];
}

interface EventDetail {
  title: string;
  color: string;
  emoji: string;
  venues: VenueOption[];
  schedule: { time: string; activity: string }[];
}

const eventDetails: Record<string, EventDetail> = {
  wedding: {
    title: 'Wedding Celebrations',
    color: 'from-yellow-400 to-yellow-600',
    emoji: '💍',
    venues: [
      { name: 'Casa Ibarra', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 500 guests', features: ['Elegant Floral Arrangements', 'Bridal Suite', 'Catering Services', 'Sound & Lighting'] },
      { name: 'Whitespace Manila', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 400 guests', features: ['Garden Setup', 'Outdoor Ceremony', 'Floral Arch', 'Fairy Lights'] },
      { name: 'Brittany Palazzo', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Rose Theme Decor', 'Bridal Suite', 'Photo Booth', 'Valet Parking'] },
      { name: 'Glass Garden Events Venue', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Open Air Setup', 'Scenic View', 'Intimate Setting', 'Bar Service'] },
      { name: 'Light of Love Events Place, Quezon City', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 600 guests', features: ['Grand Entrance', 'Pearl Theme', 'Full Catering', 'Audio Visual'] },
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
    color: 'from-yellow-300 to-yellow-500',
    emoji: '👑',
    venues: [
      { name: 'Fernwood Gardens', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Fairy Light Setup', 'Debut Throne Chair', 'Red Carpet Entrance', 'Photo Booth'] },
      { name: 'Marquis Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 250 guests', features: ['Crown Theme Decor', 'Stage Setup', 'Catering', 'Sound System'] },
      { name: 'Hillcreek Gardens', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Floral Theme', 'Garden Setting', 'Intimate Atmosphere', 'Fairy Lights'] },
      { name: 'Stella Suites', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 350 guests', features: ['Royal Theme', 'Chandelier Lighting', 'Full Catering', 'Valet Parking'] },
      { name: 'The Blue Leaf Events Pavilion', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 400 guests', features: ['Star Ceiling Setup', 'Dance Floor', 'Bar Service', 'Photo & Video'] },
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
    color: 'from-yellow-500 to-yellow-700',
    emoji: '🥂',
    venues: [
      { name: 'The Silica Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Flexible Setup', 'AV Equipment', 'Bar Services', 'Event Coordinator'] },
      { name: 'Woodlane Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Open Concept', 'Natural Lighting', 'Cocktail Setup', 'Full Catering'] },
      { name: 'Gallio', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 150 guests', features: ['Rooftop View', 'Open Air', 'Bar Service', 'Intimate Setting'] },
      { name: 'The Pergola', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 250 guests', features: ['Lakeside View', 'Outdoor Setup', 'Scenic Photography', 'Catering'] },
      { name: 'Apogée Events and Lifestyle', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 180 guests', features: ['Cliff View', 'Exclusive Ambiance', 'Fine Dining', 'Valet Parking'] },
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

export function Schedule() {
  const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
  const [selectedVenueIndex, setSelectedVenueIndex] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(() => {
    // ✅ Start calendar at 4 months from now
    const d = new Date();
    d.setMonth(d.getMonth() + 4);
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventTypes: { key: EventType; label: string; emoji: string }[] = [
    { key: 'wedding', label: 'Wedding', emoji: '💍' },
    { key: 'debut', label: 'Debut', emoji: '👑' },
    { key: 'social', label: 'Social Gathering', emoji: '🥂' },
  ];

  const details = selectedEvent ? eventDetails[selectedEvent] : null;
  const venues = details?.venues || [];
  const selectedVenue = selectedVenueIndex !== null ? venues[selectedVenueIndex] : null;

  const handlePrint = () => {
    if (!details || !selectedVenue) return;
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'Date not selected';
    const scheduleRows = details.schedule.map(item => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #f0e68c;font-weight:700;color:#b45309;white-space:nowrap;">${item.time}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #f0e68c;color:#374151;">${item.activity}</td>
      </tr>`).join('');
    const featuresHtml = selectedVenue.features.map(f => `<li style="margin-bottom:6px;">• ${f}</li>`).join('');
    const printContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>PARAISO 2026 — Schedule</title>
      <style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#111;}
      .header{background:linear-gradient(135deg,#000 0%,#1a1a1a 60%,#78350f 100%);color:#fff;padding:36px 40px;}
      .header h1{font-size:32px;font-weight:900;color:#fbbf24;letter-spacing:1px;}.header p{font-size:14px;color:#d1d5db;margin-top:4px;}
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
        <div class="footer"><div class="logo">PARAISO</div><div>Generated on ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</div><div>paraiso2026.com</div></div>
      </body></html>`;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (next.getFullYear() <= 2027) setCurrentDate(next);
  };

  // ✅ 4 months minimum from today
  const isDateSelectable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    minDate.setMonth(minDate.getMonth() + 4);
    const maxDate = new Date(2027, 11, 31);
    return date >= minDate && date <= maxDate;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();
  };

  const handleDateClick = (day: number) => {
    if (isDateSelectable(day)) setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  // ✅ Prevent going back before 4 months from today
  const canGoPrevious = () => {
    const minMonth = new Date();
    minMonth.setMonth(minMonth.getMonth() + 4);
    minMonth.setDate(1);
    minMonth.setHours(0, 0, 0, 0);
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    return prevMonth >= minMonth;
  };

  const canGoNext = () => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getFullYear() <= 2027;

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headers = dayNames.map(name => <div key={name} className="text-center font-semibold text-gray-700 py-2">{name}</div>);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="p-2"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const selectable = isDateSelectable(day);
      const selected = isDateSelected(day);
      days.push(
        <button key={day} onClick={() => handleDateClick(day)} disabled={!selectable}
          className={`p-2 rounded-lg text-center transition-all ${selected ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold' : selectable ? 'hover:bg-yellow-100 text-gray-900 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}>
          {day}
        </button>
      );
    }
    return (
      <>
        <div className="grid grid-cols-7 gap-1">{headers}</div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </>
    );
  };

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`@media print{body *{visibility:hidden;}#print-area,#print-area *{visibility:visible;}#print-area{position:absolute;left:0;top:0;width:100%;}}`}</style>

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent text-center">Event Schedule</h1>
          <p className="text-xl text-white text-center mb-4">Select your event type, choose a venue, and pick your perfect date</p>
          {/* ✅ 4 months notice */}
          <p className="text-yellow-400 text-sm text-center">📅 Bookings require at least 4 months advance notice for proper preparation</p>
        </div>
      </section>

      {/* Event Type & Venue */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2"><span>🎉</span><span>Select Event Type</span></h2>
              <div className="space-y-3">
                {eventTypes.map((type) => (
                  <button key={type.key} onClick={() => { setSelectedEvent(type.key); setSelectedVenueIndex(null); setSelectedDate(null); }}
                    className={`w-full p-4 rounded-lg font-semibold text-lg transition-all border-2 text-left flex items-center space-x-3 ${selectedEvent === type.key ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black border-amber-600 shadow-lg scale-105' : 'bg-white text-gray-700 border-yellow-300 hover:border-yellow-500 hover:shadow-md'}`}>
                    <span className="text-2xl">{type.emoji}</span>
                    <span>{type.label}</span>
                    {selectedEvent === type.key && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2"><MapPin className="w-6 h-6" /><span>Select Venue</span></h2>
              {!selectedEvent ? (
                <p className="text-gray-500 text-center py-8">Please select an event type first</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {venues.map((venue, index) => (
                    <button key={index} onClick={() => { setSelectedVenueIndex(index); setSelectedDate(null); }}
                      className={`w-full p-4 rounded-lg font-semibold transition-all border-2 text-left ${selectedVenueIndex === index ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black border-amber-600 shadow-lg' : 'bg-white text-gray-700 border-yellow-300 hover:border-yellow-500 hover:shadow-md'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-base">{venue.name}</div>
                          <div className={`text-xs mt-1 ${selectedVenueIndex === index ? 'text-black/80' : 'text-gray-500'}`}>{venue.capacity}</div>
                        </div>
                        {selectedVenueIndex === index && <span className="text-xl">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      {selectedEvent && selectedVenue && (
        <section className="py-12 bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              {/* ✅ Notice about 4 months */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-sm text-yellow-700 font-medium">📋 Earliest available date: <span className="font-bold">{(() => { const d = new Date(); d.setMonth(d.getMonth() + 4); return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }); })()}</span></p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button onClick={previousMonth} disabled={!canGoPrevious()} className={`p-2 rounded-lg ${canGoPrevious() ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}>
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={nextMonth} disabled={!canGoNext()} className={`p-2 rounded-lg ${canGoNext() ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}>
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {renderCalendar()}

              {selectedDate && (
                <a href={`/registration?eventType=${selectedEvent}&venue=${encodeURIComponent(selectedVenue.name)}&date=${selectedDate.toISOString().split('T')[0]}`}
                  className="mt-6 block p-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-lg hover:from-yellow-500 hover:to-amber-700 transition-all shadow-lg cursor-pointer">
                  <p className="text-black font-bold text-center text-lg">📅 Book this Date</p>
                  <p className="text-black/80 text-center text-sm mt-1">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Venue Details & Schedule */}
      {selectedEvent && selectedVenue && details && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-3 mb-8 justify-end">
              <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg hover:scale-105">
                <Download className="w-5 h-5" />Download Schedule PDF
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-black text-yellow-400 font-bold rounded-full hover:bg-gray-900 transition-all shadow-lg hover:scale-105">
                <Printer className="w-5 h-5" />Print Schedule
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2"><span>{details.emoji}</span><span>Venue Details</span></h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{selectedVenue.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedVenue.address}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                    <p className="font-semibold text-gray-900">👥 Capacity</p>
                    <p className="text-gray-700">{selectedVenue.capacity}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-900">✨ Features & Inclusions</h4>
                    <div className="space-y-2">
                      {selectedVenue.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2"><Clock className="w-6 h-6" /><span>Event Schedule</span></h3>
                <div className="space-y-3">
                  {details.schedule.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border-2 border-yellow-200 hover:border-yellow-400 transition-all">
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap min-w-[100px] text-center">{item.time}</span>
                      <span className="font-medium text-gray-700">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedDate && (
              <div className="mt-8 text-center">
                <a href="/registration" className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                  Book {selectedVenue.name} for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 🎉
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Plan Your Event?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Let us make your celebration feel like paradise. Contact us today!</p>
          <a href="/registration" className="inline-block px-8 py-4 bg-white text-amber-900 font-bold text-lg rounded-lg hover:bg-yellow-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
             Book for PARAISO 2026
          </a>
        </div>
      </section>
    </div>
  );
}