import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';


type EventType = 'wedding' | 'debut' | 'social' | null;


interface VenueOption {
  name: string;
  address: string;
  capacity: string;
  features: string[];
  pics: string[];
}


interface EventDetail {
  title: string;
  color: string;
  emoji: string;
  circleImg: string;
  venues: VenueOption[];
  schedule: { time: string; activity: string }[];
}


const eventDetails: Record<string, EventDetail> = {
  wedding: {
    title: 'Wedding Celebrations', color: 'from-yellow-400 to-yellow-600', emoji: '💍',
    circleImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    venues: [
      { name: 'Casa Ibarra', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 500 guests', features: ['Elegant Floral Arrangements', 'Bridal Suite', 'Catering Services', 'Sound & Lighting'], pics: ['/CASA_16.jpg', '/CASA_17..jpg', '/CASA_18.jpg'] },
      { name: 'Whitespace Manila', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 400 guests', features: ['Garden Setup', 'Outdoor Ceremony', 'Floral Arch', 'Fairy Lights'], pics: ['/WhiteSpaceManila.jpg', '/WhiteSpaceManila2.jpg', '/WhiteSpaceManila1.png'] },
      { name: 'Brittany Palazzo', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Rose Theme Decor', 'Bridal Suite', 'Photo Booth', 'Valet Parking'], pics: ['/BrittannyPalazzo0.jpg', '/BrittannyPalazzo1.jpg', '/BrittannyPalazzo2.jpg'] },
      { name: 'Glass Garden Events Venue', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Open Air Setup', 'Scenic View', 'Intimate Setting', 'Bar Service'], pics: ['/GGE.jpg', '/GGE0.jpg', '/GGE2.jpg'] },
      { name: 'Light of Love Events Place, Quezon City', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 600 guests', features: ['Grand Entrance', 'Pearl Theme', 'Full Catering', 'Audio Visual'], pics: ['/LightofLoves.jpg', '/LightofLoves1.jpg', '/LightofLoves2.jpg'] },
    ],
    schedule: [
      { time: '8:00 AM', activity: 'Venue Setup & Decoration' }, { time: '10:00 AM', activity: 'Bridal Party Preparation' },
      { time: '12:00 PM', activity: 'Guest Arrival & Welcome' }, { time: '2:00 PM', activity: 'Wedding Ceremony' },
      { time: '4:00 PM', activity: 'Photo & Video Coverage' }, { time: '6:00 PM', activity: 'Reception & Dinner' },
      { time: '8:00 PM', activity: 'Cake Cutting & First Dance' }, { time: '10:00 PM', activity: 'Party & Celebration' },
    ],
  },
  debut: {
    title: 'Dream Debut Moments', color: 'from-yellow-300 to-yellow-500', emoji: '👑',
    circleImg: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
    venues: [
      { name: 'Fernwood Gardens', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Fairy Light Setup', 'Debut Throne Chair', 'Red Carpet Entrance', 'Photo Booth'], pics: ['/FW.jpg', '/FW1.jpg', '/FW2.jpg'] },
      { name: 'Marquis Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 250 guests', features: ['Crown Theme Decor', 'Stage Setup', 'Catering', 'Sound System'], pics: ['/MEP1.jpg', '/MEP.jpg', '/MEP2.jpg'] },
      { name: 'Hillcreek Gardens', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Floral Theme', 'Garden Setting', 'Intimate Atmosphere', 'Fairy Lights'], pics: ['/HCG1.jpg', '/HCG.jpg', '/HCG2.jpg'] },
      { name: 'Stella Suites', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 350 guests', features: ['Royal Theme', 'Chandelier Lighting', 'Full Catering', 'Valet Parking'], pics: ['/SS2.jpg', '/SS.jpg', '/SS5.jpg'] },
      { name: 'The Blue Leaf Events Pavilion', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 400 guests', features: ['Star Ceiling Setup', 'Dance Floor', 'Bar Service', 'Photo & Video'], pics: ['/BL.jpg', '/BL2.jpg', '/BL4.jpg'] },
    ],
    schedule: [
      { time: '3:00 PM', activity: 'Guest Arrival & Registration' }, { time: '4:00 PM', activity: 'Debut Ceremony Begins' },
      { time: '4:30 PM', activity: '18 Roses Presentation' }, { time: '5:00 PM', activity: '18 Candles Presentation' },
      { time: '5:30 PM', activity: 'Cotillion de Honor' }, { time: '6:00 PM', activity: 'Grand Dinner' },
      { time: '7:00 PM', activity: 'Birthday Message & Speeches' }, { time: '8:00 PM', activity: 'Cake Cutting & Party' },
    ],
  },
  social: {
    title: 'Elegant Social Gatherings', color: 'from-yellow-500 to-yellow-700', emoji: '🥂',
    circleImg: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
    venues: [
      { name: 'The Silica Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 200 guests', features: ['Flexible Setup', 'AV Equipment', 'Bar Services', 'Event Coordinator'], pics: ['/SE3.jpg', '/SE4.jpg', '/SE5.jpg'] },
      { name: 'Woodlane Events Place', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 300 guests', features: ['Open Concept', 'Natural Lighting', 'Cocktail Setup', 'Full Catering'], pics: ['/WL.jpg', '/WL1.jpg', '/WL2.jpg'] },
      { name: 'Gallio', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 150 guests', features: ['Rooftop View', 'Open Air', 'Bar Service', 'Intimate Setting'], pics: ['/GL2.jpg', '/GL1.jpg', '/GL3.jpg'] },
      { name: 'The Pergola', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 250 guests', features: ['Lakeside View', 'Outdoor Setup', 'Scenic Photography', 'Catering'], pics: ['/TP.jpg', '/TP1.jpg', '/TP2.jpg'] },
      { name: 'Apogée Events and Lifestyle', address: 'PARAISO Events Place, Philippines', capacity: 'Up to 180 guests', features: ['Cliff View', 'Exclusive Ambiance', 'Fine Dining', 'Valet Parking'], pics: ['/AP.jpg', '/AP1.jpg', '/AP2.jpg'] },
    ],
    schedule: [
      { time: '5:00 PM', activity: 'Guest Arrival & Cocktails' }, { time: '6:00 PM', activity: 'Program Proper Begins' },
      { time: '6:30 PM', activity: 'Welcome Remarks' }, { time: '7:00 PM', activity: 'Dinner Service' },
      { time: '8:00 PM', activity: 'Entertainment & Program' }, { time: '9:00 PM', activity: 'Open Networking' },
      { time: '10:00 PM', activity: 'Closing & Farewell' },
    ],
  },
};


export function Venue() {
  const { darkMode } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);


  const circles = [
    { key: 'wedding' as EventType, label: 'Wedding', emoji: '💍' },
    { key: 'debut' as EventType, label: 'Debut', emoji: '👑' },
    { key: 'social' as EventType, label: 'Social Gathering', emoji: '🥂' },
  ];


  const handleEventClick = (key: EventType) => {
    if (selectedEvent === key) { setSelectedEvent(null); setSelectedVenue(null); }
    else { setSelectedEvent(key); setSelectedVenue(0); }
  };


  const details = selectedEvent ? eventDetails[selectedEvent] : null;
  const venueData = details && selectedVenue !== null ? details.venues[selectedVenue] : null;


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Our Events</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">Choose an event type, select a venue, and explore the schedule</p>
        </div>
      </section>


      {/* 3 Circles */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            {circles.map((circle) => (
              <button key={circle.key} onClick={() => handleEventClick(circle.key)}
                className={`relative w-72 h-72 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 border-8 ${selectedEvent === circle.key ? 'border-yellow-500 scale-105 ring-4 ring-yellow-300' : 'border-yellow-400'}`}>
                <img src={eventDetails[circle.key!]?.circleImg} alt={circle.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-yellow-400 font-extrabold text-2xl text-center px-4 drop-shadow-lg">{circle.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Main Card */}
      {details && venueData && (
        <section className={`py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className={`text-4xl font-bold text-center mb-10 bg-gradient-to-r ${details.color} bg-clip-text text-transparent`}>
              {details.emoji} {details.title}
            </h2>
            <div className={`rounded-2xl shadow-lg overflow-hidden border mb-10 ${darkMode ? 'bg-gray-800 border-yellow-500/30' : 'bg-white border-yellow-200'}`}>
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col">
                  {venueData.pics.map((pic, index) => (
                    <div key={index} className="overflow-hidden" style={{ height: '180px' }}>
                      <img src={pic} alt={`${venueData.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
                <div className="p-8 flex flex-col">
                  <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>📍 Select Venue</h3>
                  <div className="flex flex-col gap-2 mb-6">
                    {details.venues.map((venue, index) => (
                      <button key={index} onClick={() => setSelectedVenue(index)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2 text-left ${selectedVenue === index ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-600' : darkMode ? 'bg-gray-700 text-gray-300 border-yellow-500/30 hover:border-yellow-500' : 'bg-white text-gray-700 border-yellow-300 hover:border-yellow-500'}`}>
                        {selectedVenue === index ? '✅' : '📍'} {venue.name}
                      </button>
                    ))}
                  </div>
                  <div className={`border-t pt-4 flex-1 ${darkMode ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{venueData.address}</p>
                    <div className={`rounded-xl p-3 border mb-3 ${darkMode ? 'bg-gray-700 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
                      <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>👥 Capacity</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{venueData.capacity}</p>
                    </div>
                    <h4 className={`font-bold mb-2 text-sm ${darkMode ? 'text-white' : 'text-black'}`}>✨ Features & Inclusions</h4>
                    <div className="space-y-1 mb-4">
                      {venueData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a href="/registration" className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg text-sm">
                      Book This Venue 🎉
                    </a>
                  </div>
                </div>
              </div>
            </div>


            {/* Schedule */}
            <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-yellow-500/30' : 'bg-white border-yellow-200'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl">📅</span>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Schedule</h3>
              </div>
              <div className="w-full h-0.5 bg-yellow-400 mb-6"></div>
              <div className="space-y-3">
                {details.schedule.map((item, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-700 border-yellow-500/20 hover:border-yellow-500' : 'bg-yellow-50 border-yellow-100 hover:border-yellow-400'}`}>
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap shadow text-center min-w-24">{item.time}</span>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">Ready to Plan Your Event?</h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">Let us make your celebration feel like paradise. Contact us today!</p>
          <a href="/registration" className="inline-block px-8 py-4 bg-black text-yellow-400 font-bold text-lg rounded-lg hover:bg-gray-900 transition-all shadow-lg">Register for PARAISO 2026</a>
        </div>
      </section>
    </div>
  );
}



