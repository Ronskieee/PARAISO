import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Download, Printer, Calendar, MapPin, Users, Ticket, X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const API = 'http://localhost/paraiso-api/bookings.php';

interface Booking {
  id: string;
  eventType: string;
  venueName: string;
  venueCapacity: string;
  ticketPackage: string;
  ticketPrice: number;
  discount: number;
  discountAmount: number;
  total: number;
  eventDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  bookedAt: string;
}

// ── Visual Ticket Modal ───────────────────────────────────────────────────────
function TicketModal({ booking, darkMode, onClose }: { booking: Booking; darkMode: boolean; onClose: () => void }) {
  const formattedDate = booking.eventDate
    ? new Date(booking.eventDate + 'T00:00:00').toLocaleDateString('en-PH', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'TBD';

  const downloadTicketHTML = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>PARAISO Ticket – ${booking.id.slice(-8)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #111; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 40px 20px; }
    .ticket { background: #fff; border-radius: 20px; overflow: hidden; max-width: 600px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .ticket-header { background: linear-gradient(135deg, #EAB308, #D97706); padding: 32px 36px; position: relative; }
    .ticket-header h1 { font-size: 32px; font-weight: 900; color: #000; letter-spacing: -0.5px; }
    .ticket-header p { color: rgba(0,0,0,0.65); font-size: 14px; margin-top: 4px; }
    .badge { position: absolute; top: 28px; right: 36px; background: rgba(0,0,0,0.15); color: #000; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 999px; letter-spacing: 1px; text-transform: uppercase; }
    .divider { display: flex; align-items: center; }
    .divider-line { flex: 1; height: 2px; background: #f3f4f6; }
    .divider-circle { width: 28px; height: 28px; border-radius: 50%; background: #111; flex-shrink: 0; }
    .ticket-body { padding: 28px 36px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .field label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 4px; display: block; }
    .field p { font-size: 15px; font-weight: 600; color: #111; }
    .field p.big { font-size: 22px; color: #D97706; }
    .ticket-footer { background: #fafafa; border-top: 2px dashed #e5e7eb; padding: 20px 36px; display: flex; justify-content: space-between; align-items: center; }
    .ticket-footer p { font-size: 12px; color: #6b7280; }
    .ticket-footer .id { font-family: monospace; font-size: 14px; font-weight: 700; color: #111; letter-spacing: 2px; }
    .discount-badge { display: inline-block; background: #dcfce7; color: #16a34a; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="ticket-header">
      <h1>PARAISO 2026</h1>
      <p>Official Event Ticket</p>
      <span class="badge">${booking.ticketPackage} Package</span>
    </div>
    <div class="divider">
      <div class="divider-circle" style="margin-left:-14px"></div>
      <div class="divider-line"></div>
      <div class="divider-circle" style="margin-right:-14px"></div>
    </div>
    <div class="ticket-body">
      <div class="grid-2">
        <div class="field"><label>Guest Name</label><p>${booking.firstName} ${booking.lastName}</p></div>
        <div class="field"><label>Event Date</label><p>${formattedDate}</p></div>
        <div class="field"><label>Event Type</label><p>${booking.eventType}</p></div>
        <div class="field"><label>Venue</label><p>${booking.venueName}</p></div>
        <div class="field"><label>Email</label><p>${booking.email}</p></div>
        <div class="field"><label>Phone</label><p>${booking.phone}</p></div>
        <div class="field"><label>Total Paid</label><p class="big">₱${booking.total.toLocaleString('en-PH')}</p>
          ${booking.discount > 0 ? `<span class="discount-badge">${booking.discount}% discount applied</span>` : ''}</div>
        <div class="field"><label>Capacity</label><p>${booking.venueCapacity}</p></div>
      </div>
      ${booking.specialRequests ? `<div class="field" style="margin-top:8px;padding-top:16px;border-top:1px solid #f3f4f6;"><label>Special Requests</label><p style="font-weight:400;font-size:14px;color:#374151;">${booking.specialRequests}</p></div>` : ''}
    </div>
    <div class="ticket-footer">
      <p>Present this ticket at the venue entrance.<br/>paraisoeventmanagement@gmail.com · +63 927 587 1239</p>
      <div>
        <p style="font-size:11px;color:#9ca3af;text-align:right;margin-bottom:2px;">BOOKING ID</p>
        <span class="id">${booking.id.slice(-12).toUpperCase()}</span>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `PARAISO-Ticket-${booking.id.slice(-8)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <div className="flex justify-end mb-3">
          <button onClick={onClose} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-6 relative">
            <div>
              <h2 className="text-3xl font-black text-black tracking-tight">PARAISO 2026</h2>
              <p className="text-black/60 text-sm mt-1">Official Event Ticket</p>
            </div>
            <span className="absolute top-6 right-6 bg-black/15 text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {booking.ticketPackage} Package
            </span>
          </div>
          <div className="flex items-center bg-white">
            <div className="w-5 h-5 rounded-full bg-black/80 -ml-2.5 flex-shrink-0" />
            <div className="flex-1 border-t-2 border-dashed border-gray-200" />
            <div className="w-5 h-5 rounded-full bg-black/80 -mr-2.5 flex-shrink-0" />
          </div>
          <div className="bg-white px-8 py-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
              {[
                { label: 'Guest Name', value: `${booking.firstName} ${booking.lastName}` },
                { label: 'Event Date', value: formattedDate },
                { label: 'Event Type', value: booking.eventType },
                { label: 'Venue',      value: booking.venueName },
                { label: 'Email',      value: booking.email },
                { label: 'Phone',      value: booking.phone },
                { label: 'Capacity',   value: booking.venueCapacity },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Paid</p>
                <p className="text-2xl font-black text-amber-500">₱{booking.total.toLocaleString('en-PH')}</p>
                {booking.discount > 0 && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                    {booking.discount}% discount applied
                  </span>
                )}
              </div>
            </div>
            {booking.specialRequests && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Special Requests</p>
                <p className="text-sm text-gray-600">{booking.specialRequests}</p>
              </div>
            )}
          </div>
          <div className="bg-gray-50 border-t-2 border-dashed border-gray-200 px-8 py-4 flex items-center justify-between">
            <p className="text-xs text-gray-400 leading-relaxed">
              Present at venue entrance.<br />paraisoeventmanagement@gmail.com
            </p>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Booking ID</p>
              <p className="font-mono text-sm font-bold text-gray-800 tracking-widest">{booking.id.slice(-12).toUpperCase()}</p>
            </div>
          </div>
        </div>
        <button onClick={downloadTicketHTML}
          className="mt-4 w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center gap-2">
          <Download className="w-5 h-5" /> Download Ticket
        </button>
      </div>
    </div>
  );
}

// ── Main Bookings Page ────────────────────────────────────────────────────────
export function Bookings() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [timeLeft, setTimeLeft] = useState<{
    [key: string]: { days: number; hours: number; minutes: number; seconds: number };
  }>({});
  const [viewingTicket, setViewingTicket] = useState<Booking | null>(null);

  // ── Fetch bookings from DATABASE ──────────────────────────────────────
  useEffect(() => {
    const userId = localStorage.getItem('paraiso_user_id');
    if (!userId) { navigate('/login?from=/bookings'); return; }

    fetch(`${API}?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings ?? []);

        // Save latest booking to localStorage for Home countdown
        if (data.bookings && data.bookings.length > 0) {
          const latest = data.bookings[0];
          localStorage.setItem('paraiso_event_date', latest.eventDate);
          localStorage.setItem('paraiso_event_type', latest.eventType);
          localStorage.setItem('paraiso_venue',      latest.venueName);
        }
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  // ── Countdown timer ───────────────────────────────────────────────────
  useEffect(() => {
    if (bookings.length === 0) return;
    const update = () => {
      const next: typeof timeLeft = {};
      bookings.forEach((b) => {
        const diff = new Date(b.eventDate + 'T00:00:00').getTime() - Date.now();
        next[b.id] = diff > 0
          ? {
              days:    Math.floor(diff / 86400000),
              hours:   Math.floor((diff % 86400000) / 3600000),
              minutes: Math.floor((diff % 3600000)  / 60000),
              seconds: Math.floor((diff % 60000)    / 1000),
            }
          : { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
      setTimeLeft(next);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [bookings]);

  const printSchedule = (booking: Booking) => {
    const formattedDate = booking.eventDate
      ? new Date(booking.eventDate + 'T00:00:00').toLocaleDateString('en-PH', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'TBD';

    const html = `<!DOCTYPE html>
<html><head><title>PARAISO Schedule</title>
<style>body{font-family:Arial,sans-serif;padding:32px;max-width:640px;margin:auto;}
h1{color:#D97706;text-align:center;font-size:28px;margin-bottom:4px;}
.sub{text-align:center;color:#6b7280;margin-bottom:32px;font-size:14px;}
.card{border:2px solid #EAB308;padding:20px 24px;border-radius:12px;margin-bottom:24px;}
.row{display:flex;justify-content:space-between;margin:6px 0;font-size:14px;}
.label{font-weight:bold;color:#374151;}.val{color:#111;text-align:right;}
.total{font-size:18px;color:#D97706;font-weight:bold;}
footer{text-align:center;margin-top:32px;color:#9ca3af;font-size:12px;}</style>
</head><body>
<h1>🎉 MY PARAISO SCHEDULE</h1>
<p class="sub">Printed on ${new Date().toLocaleString('en-PH')}</p>
<div class="card">
<h2>${booking.eventType} — ${booking.venueName}</h2>
<div class="row"><span class="label">Date</span><span class="val">${formattedDate}</span></div>
<div class="row"><span class="label">Capacity</span><span class="val">${booking.venueCapacity}</span></div>
<div class="row"><span class="label">Package</span><span class="val">${booking.ticketPackage} Package</span></div>
<div class="row"><span class="label">Base Price</span><span class="val">₱${booking.ticketPrice.toLocaleString('en-PH')}</span></div>
${booking.discount > 0 ? `<div class="row"><span class="label">Discount</span><span class="val" style="color:#16a34a">${booking.discount}% (−₱${booking.discountAmount.toLocaleString('en-PH')})</span></div>` : ''}
<div class="row"><span class="label total">Total Paid</span><span class="val total">₱${booking.total.toLocaleString('en-PH')}</span></div>
<div class="row"><span class="label">Booking ID</span><span class="val" style="font-family:monospace">${booking.id.slice(-12).toUpperCase()}</span></div>
${booking.specialRequests ? `<div class="row" style="margin-top:12px;border-top:1px solid #e5e7eb;padding-top:12px;"><span class="label">Special Requests</span><span class="val">${booking.specialRequests}</span></div>` : ''}
</div>
<footer>For inquiries: paraisoeventmanagement@gmail.com · +63 927 587 1239</footer>
</body></html>`;

    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  };

  const userName = localStorage.getItem('paraiso_user') || 'Guest';
  const dm = darkMode;

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={`min-h-screen ${dm ? 'bg-gray-950' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`font-semibold ${dm ? 'text-white' : 'text-black'}`}>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  // ── No bookings ───────────────────────────────────────────────────────
  if (bookings.length === 0) {
    return (
      <div className={`min-h-screen ${dm ? 'bg-gray-950' : 'bg-gray-50'} py-20`}>
        <div className="container mx-auto px-4 text-center">
          <div className={`max-w-md mx-auto ${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12`}>
            <Ticket className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
            <h2 className={`text-3xl font-bold mb-4 ${dm ? 'text-white' : 'text-black'}`}>No Bookings Yet</h2>
            <p className={`mb-8 ${dm ? 'text-gray-300' : 'text-gray-600'}`}>
              You haven't made any bookings yet. Start planning your perfect event!
            </p>
            <button onClick={() => navigate('/venue')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg">
              Browse Venues
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dm ? 'bg-gray-950' : 'bg-gray-50'}`}>

      {viewingTicket && (
        <TicketModal booking={viewingTicket} darkMode={dm} onClose={() => setViewingTicket(null)} />
      )}

      {/* Hero */}
      <section className={`py-20 ${dm ? 'bg-gradient-to-br from-gray-900 via-black to-amber-900/10' : 'bg-gradient-to-br from-black via-gray-900 to-amber-900/20'}`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-xl text-white">Welcome back, {userName}!</p>
        </div>
      </section>

      {/* Bookings List */}
      <section className={`py-12 ${dm ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-6xl mx-auto">
            {bookings.map((booking) => (
              <div key={booking.id} className={`${dm ? 'bg-gray-800 border-yellow-600/30' : 'bg-white border-yellow-200'} rounded-2xl shadow-xl overflow-hidden border-2`}>

                {/* Card Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-black mb-2">{booking.eventType}</h2>
                      <p className="text-black/80 text-lg">{booking.venueName}</p>
                      <p className="text-black/60 text-sm">{booking.venueCapacity}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-black/70">Booking ID</div>
                      <div className="font-mono text-black font-bold">{booking.id.slice(-8)}</div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div>
                          <div className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Event Date</div>
                          <div className={`font-bold ${dm ? 'text-white' : 'text-black'}`}>
                            {booking.eventDate
                              ? new Date(booking.eventDate + 'T00:00:00').toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                              : 'TBD'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div>
                          <div className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Package</div>
                          <div className={`font-bold ${dm ? 'text-white' : 'text-black'}`}>{booking.ticketPackage} Package</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div>
                          <div className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Guest</div>
                          <div className={`font-bold ${dm ? 'text-white' : 'text-black'}`}>{booking.firstName} {booking.lastName}</div>
                          <div className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{booking.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ticket className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div>
                          <div className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Total Paid</div>
                          {booking.discount > 0 && (
                            <div className={`text-sm line-through ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
                              ₱{booking.ticketPrice.toLocaleString('en-PH')}
                            </div>
                          )}
                          <div className="font-bold text-2xl text-yellow-600">₱{booking.total.toLocaleString('en-PH')}</div>
                          {booking.discount > 0 && (
                            <div className="text-green-500 text-sm font-semibold">{booking.discount}% discount applied</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Countdown */}
                    {timeLeft[booking.id] && (
                      <div className={`${dm ? 'bg-gray-900/50' : 'bg-yellow-50'} rounded-xl p-6`}>
                        <h3 className={`text-lg font-bold mb-4 text-center ${dm ? 'text-white' : 'text-black'}`}>
                          ⏳ Countdown to Your Event
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(timeLeft[booking.id]).map(([unit, value]) => (
                            <div key={unit} className={`${dm ? 'bg-black/50' : 'bg-white'} rounded-lg p-3 text-center border-2 border-yellow-500/30`}>
                              <div className="text-2xl font-bold text-yellow-500">{value.toString().padStart(2, '0')}</div>
                              <div className={`text-xs uppercase mt-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>{unit}</div>
                            </div>
                          ))}
                        </div>
                        {Object.values(timeLeft[booking.id]).every(v => v === 0) && (
                          <p className="text-center text-yellow-500 font-bold mt-4">🎉 Your event day has arrived!</p>
                        )}
                      </div>
                    )}
                  </div>

                  {booking.specialRequests && (
                    <div className={`mb-6 p-4 rounded-xl border ${dm ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                      <p className={`text-sm font-semibold mb-1 ${dm ? 'text-yellow-400' : 'text-yellow-700'}`}>📝 Special Requests</p>
                      <p className={`text-sm ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{booking.specialRequests}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setViewingTicket(booking)}
                      className="flex-1 min-w-[160px] px-5 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center gap-2">
                      <Ticket className="w-4 h-4" /> View & Download Ticket
                    </button>
                    <button onClick={() => printSchedule(booking)}
                      className={`flex-1 min-w-[160px] px-5 py-3 font-bold rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${dm ? 'border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'}`}>
                      <Printer className="w-4 h-4" /> Print Schedule
                    </button>
                  </div>

                  <div className={`mt-6 pt-6 border-t ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                      Booked on: {new Date(booking.bookedAt).toLocaleString('en-PH')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}