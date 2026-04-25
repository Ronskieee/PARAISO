import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';




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
  const { darkMode } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
  const [selectedVenueIndex, setSelectedVenueIndex] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);




  const eventTypes: { key: EventType; label: string; emoji: string }[] = [
    { key: 'wedding', label: 'Wedding', emoji: '💍' },
    { key: 'debut', label: 'Debut', emoji: '👑' },
    { key: 'social', label: 'Social Gathering', emoji: '🥂' },
  ];




  const details = selectedEvent ? eventDetails[selectedEvent] : null;
  const venues = details?.venues || [];
  const selectedVenue = selectedVenueIndex !== null ? venues[selectedVenueIndex] : null;




  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };




  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };




  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };




  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (nextMonthDate.getFullYear() <= 2027) {
      setCurrentDate(nextMonthDate);
    }
  };




  const isDateSelectable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(2027, 11, 31);
    return date >= today && date <= maxDate;
  };




  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };




  const handleDateClick = (day: number) => {
    if (isDateSelectable(day)) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };




  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];




    const headers = dayNames.map((name) => (
      <div key={name} className={`text-center font-semibold py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {name}
      </div>
    ));




    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }




    for (let day = 1; day <= daysInMonth; day++) {
      const selectable = isDateSelectable(day);
      const selected = isDateSelected(day);


      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={!selectable}
          className={`p-2 rounded-lg text-center transition-all ${
            selected
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold'
              : selectable
              ? darkMode
                ? 'hover:bg-yellow-900/40 text-gray-100 cursor-pointer'
                : 'hover:bg-yellow-100 text-gray-900 cursor-pointer'
              : darkMode
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
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




  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];




  const canGoPrevious = () => {
    const today = new Date();
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    return prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1);
  };




  const canGoNext = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    return nextMonthDate.getFullYear() <= 2027;
  };




  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>


      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent text-center">
            Event Schedule
          </h1>
          <p className="text-xl text-white text-center mb-8">
            Select your event type, choose a venue, and pick your perfect date
          </p>
        </div>
      </section>




      {/* Event Type and Venue Selectors */}
      <section className={`py-12 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">


            {/* Event Type Selector */}
            <div className={`p-6 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-amber-50'}`}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>🎉</span>
                <span>Select Event Type</span>
              </h2>
              <div className="space-y-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => {
                      setSelectedEvent(type.key);
                      setSelectedVenueIndex(null);
                      setSelectedDate(null);
                    }}
                    className={`w-full p-4 rounded-lg font-semibold text-lg transition-all border-2 text-left flex items-center space-x-3 ${
                      selectedEvent === type.key
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black border-amber-600 shadow-lg scale-105'
                        : darkMode
                        ? 'bg-gray-700 text-gray-200 border-gray-600 hover:border-yellow-500 hover:shadow-md'
                        : 'bg-white text-gray-700 border-yellow-300 hover:border-yellow-500 hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span>{type.label}</span>
                    {selectedEvent === type.key && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>




            {/* Venue Selector */}
            <div className={`p-6 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-amber-50'}`}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <MapPin className="w-6 h-6" />
                <span>Select Venue</span>
              </h2>
              {!selectedEvent ? (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please select an event type first</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {venues.map((venue, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedVenueIndex(index);
                        setSelectedDate(null);
                      }}
                      className={`w-full p-4 rounded-lg font-semibold transition-all border-2 text-left ${
                        selectedVenueIndex === index
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black border-amber-600 shadow-lg'
                          : darkMode
                          ? 'bg-gray-700 text-gray-200 border-gray-600 hover:border-yellow-500 hover:shadow-md'
                          : 'bg-white text-gray-700 border-yellow-300 hover:border-yellow-500 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-base">{venue.name}</div>
                          <div className={`text-xs mt-1 ${selectedVenueIndex === index ? 'text-black/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {venue.capacity}
                          </div>
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




      {/* Calendar Section */}
      {selectedEvent && selectedVenue && (
        <section className={`py-12 transition-colors ${darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-amber-50 to-yellow-50'}`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className={`p-8 rounded-lg shadow-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={previousMonth}
                  disabled={!canGoPrevious()}
                  className={`p-2 rounded-lg transition-colors ${
                    canGoPrevious()
                      ? darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                      : darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  disabled={!canGoNext()}
                  className={`p-2 rounded-lg transition-colors ${
                    canGoNext()
                      ? darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                      : darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>


              {renderCalendar()}


              {selectedDate && (
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-lg">
                  <p className="text-black font-semibold text-center">
                    Selected Date: {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}




      {/* Venue Details & Schedule */}
      {selectedEvent && selectedVenue && details && (
        <section className={`py-12 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">


              {/* Venue Details */}
              <div className={`p-8 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-amber-50'}`}>
                <h3 className={`text-2xl font-bold mb-4 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span>{details.emoji}</span>
                  <span>Venue Details</span>
                </h3>


                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedVenue.name}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedVenue.address}</p>
                  </div>


                  <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-yellow-600' : 'bg-white border-yellow-300'}`}>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>👥 Capacity</p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedVenue.capacity}</p>
                  </div>


                  <div>
                    <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>✨ Features & Inclusions</h4>
                    <div className="space-y-2">
                      {selectedVenue.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>




              {/* Event Schedule */}
              <div className={`p-8 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-amber-50'}`}>
                <h3 className={`text-2xl font-bold mb-4 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Clock className="w-6 h-6" />
                  <span>Event Schedule</span>
                </h3>


                <div className="space-y-3">
                  {details.schedule.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-3 rounded-lg border-2 transition-all ${
                        darkMode
                          ? 'bg-gray-700 border-yellow-700 hover:border-yellow-500'
                          : 'bg-white border-yellow-200 hover:border-yellow-400'
                      }`}
                    >
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap min-w-[100px] text-center">
                        {item.time}
                      </span>
                      <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>




            {/* Book Button */}
            {selectedDate && (
              <div className="mt-8 text-center">
                <a
                  href="/registration"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Book {selectedVenue.name} for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 🎉
                </a>
              </div>
            )}
          </div>
        </section>
      )}




      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let us make your celebration feel like paradise. Contact us today!
          </p>
          <a
            href="/registration"
            className="inline-block px-8 py-4 bg-white text-amber-900 font-bold text-lg rounded-lg hover:bg-yellow-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Register for PARAISO 2026
          </a>
        </div>
      </section>
    </div>
  );
}



