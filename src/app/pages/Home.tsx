import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, Users, Award, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useTheme } from '../components/ThemeContext';

export function Home() {
  const { darkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [bookedDate, setBookedDate] = useState(localStorage.getItem('paraiso_event_date'));
  const [bookedEvent, setBookedEvent] = useState(localStorage.getItem('paraiso_event_type'));
  const [bookedVenue, setBookedVenue] = useState(localStorage.getItem('paraiso_venue'));
  const hasBooking = !!bookedDate;

  useEffect(() => {
    const syncBooking = () => {
      setBookedDate(localStorage.getItem('paraiso_event_date'));
      setBookedEvent(localStorage.getItem('paraiso_event_type'));
      setBookedVenue(localStorage.getItem('paraiso_venue'));
    };
    syncBooking();
    window.addEventListener('focus', syncBooking);
    window.addEventListener('storage', syncBooking);
    return () => {
      window.removeEventListener('focus', syncBooking);
      window.removeEventListener('storage', syncBooking);
    };
  }, []);

  const backgroundImages = [
    'https://static.vecteezy.com/system/resources/thumbnails/043/918/635/small/wedding-stage-decoration-background-inside-the-building-with-elegant-and-beautiful-flower-decorations-free-photo.jpeg',
    'https://static.vecteezy.com/system/resources/thumbnails/047/009/091/small/outdoor-wedding-reception-warm-glow-of-the-lights-creates-a-magical-atmosphere-as-guests-gather-the-background-is-blurred-joyful-ambiance-of-the-celebration-romantic-and-festive-photo.jpg',
    'https://i.pinimg.com/736x/a1/e2/b7/a1e2b7c87f75b060c538e30e06c6624b.jpg',
    'https://i.pinimg.com/736x/6a/91/83/6a91836b1c84681b988f9f9e6deb4b75.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1KXV2hzWmuZrpU19EFvdLhkSo2YaRi_v2Cw&s',
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [backgroundImages.length]);

  useEffect(() => {
    if (!bookedDate) return;
    const eventDate = new Date(bookedDate + 'T00:00:00').getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [bookedDate]);

  const highlights = [
    { image: 'https://images.unsplash.com/photo-1554132286-24c3f6113a86?q=80&w=1169&auto=format&fit=crop', title: 'Paraiso 2026', description: 'Where every celebration feels like paradise' },
    { image: 'https://images.unsplash.com/photo-1637238276176-ef042a533ea1?w=400&auto=format&fit=crop&q=60', title: 'Dream Debut Moment', description: 'Your magical 18th birthday perfectly organized' },
    { image: 'https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=1170&auto=format&fit=crop', title: 'Wedding Celebrations', description: 'Timeless weddings crafted with love and elegance' },
    { image: 'https://images.unsplash.com/photo-1545150665-c72a8f0cf311?q=80&w=2070&auto=format&fit=crop', title: 'Elegant Social Gathering', description: 'Unforgettable events for every social occasion' },
    { image: 'https://images.unsplash.com/photo-1478088702756-f16754aaf0c4?w=400&auto=format&fit=crop&q=60', title: 'Theme Celebrations', description: 'Creative themes that bring your vision to life' },
    { image: 'https://images.unsplash.com/photo-1772683432601-599dc91ca134?w=400&auto=format&fit=crop&q=60', title: 'Special Occasions', description: 'Every milestone deserves a moment to remember' },
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Customers' },
    { icon: Award, value: '15+', label: 'Venues' },
    { icon: Calendar, value: '1', label: 'Special Day' },
    { icon: Star, value: '10+', label: 'Partners' },
  ];

  const formattedDate = bookedDate
    ? new Date(bookedDate + 'T00:00:00').toLocaleDateString('en-PH', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>

      {/*
       * ONE SECTION: Hero + Highlights share the SAME carousel background.
       * Single <section>, single carousel behind everything — no seam, one image.
       */}
      <section className="relative overflow-hidden">

        {/* Shared carousel — stretches the full height of this entire section */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        </div>

        {/* Hero text */}
        <div className="relative z-20 container mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            PARAISO
          </h1>
          <p className="text-xl md:text-3xl text-white mb-8">
            Where every celebration feels like paradise
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/registration"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center gap-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/schedule"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span>View Schedule</span>
              <Calendar className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Countdown — only if booked, still same background */}
        {hasBooking && (
          <div className="relative z-20 container mx-auto px-4 pb-16 text-center">
            <div className="flex justify-center mb-8">
              <div
                className="w-32 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Mark Your Calendar</h2>
            <p className="text-yellow-400 text-lg mb-1">🎉 Your 👑 {bookedEvent} at {bookedVenue}</p>
            <p className="text-white/50 text-sm mb-10 tracking-wide">{formattedDate}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="rounded-xl p-4 md:p-6"
                  style={{ background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(212,175,55,0.4)' }}
                >
                  <div className="text-3xl md:text-5xl font-bold text-yellow-400 tabular-nums">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest mt-2">{unit}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <Link
                to="/registration"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Book now!</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/schedule"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <span>View Schedule</span>
                <Calendar className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Event Highlights — inside same section, same background, no seam */}
        <div className="relative z-20 container mx-auto px-4 pb-20 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide uppercase">
            Event Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-6xl">
            {highlights.map((highlight, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-xl cursor-pointer h-60">
                <ImageWithFallback
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{highlight.title}</h3>
                  <p className="text-white/80 text-sm">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Stats */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-black to-amber-900/20' : 'bg-gradient-to-br from-gray-100 via-white to-amber-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-6 md:p-8 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-black/50 backdrop-blur-sm border-yellow-500/30 hover:border-yellow-500'
                      : 'bg-white border-yellow-300 hover:border-yellow-500 shadow-md'
                  }`}
                >
                  <Icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{stat.value}</div>
                  <div className={`text-sm md:text-base ${darkMode ? 'text-white' : 'text-gray-700'}`}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-500 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't Miss Out!</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/registration"
              className="px-10 py-4 bg-black text-yellow-400 font-bold text-lg rounded-lg hover:bg-gray-900 transition-all shadow-xl"
            >
              Secure Your Spot
            </Link>
            <Link
              to="/speakers"
              className="px-10 py-4 bg-white/20 backdrop-blur-sm text-black font-bold text-lg rounded-lg border-2 border-black/20 hover:bg-white/40 transition-all"
            >
              Meet Our BOD
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}