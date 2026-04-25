import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Search, Filter, Download, Heart, X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';



interface Session {
  id: string;
  title: string;
  description: string;
  speaker: string;
  day: string;
  time: string;
  duration: string;
  room: string;
  track: string;
  status?: 'early-bird' | 'sold-out' | 'available';
}


const sessions: Session[] = [
  { id: '1', title: 'Opening Keynote: The Future of Innovation', description: 'Join us for an inspiring keynote address that explores emerging trends and technologies reshaping industries worldwide. Our distinguished speaker will share insights on navigating disruption and leading transformation.', speaker: 'Dr. Sarah Chen', day: 'Day 1', time: '09:00 AM', duration: '90 min', room: 'Main Hall', track: 'Keynote', status: 'available' },
  { id: '2', title: 'AI & Machine Learning in Business', description: 'Discover practical applications of AI and ML that are revolutionizing business operations. Learn implementation strategies, common pitfalls, and success metrics from real-world case studies.', speaker: 'Michael Rodriguez', day: 'Day 1', time: '11:00 AM', duration: '60 min', room: 'Room A', track: 'Technology', status: 'early-bird' },
  { id: '3', title: 'Leadership in the Digital Age', description: 'Explore new leadership paradigms essential for guiding teams through digital transformation. Topics include remote leadership, digital culture, and building high-performing distributed teams.', speaker: 'Emily Thompson', day: 'Day 1', time: '11:00 AM', duration: '60 min', room: 'Room B', track: 'Leadership', status: 'available' },
  { id: '4', title: 'Sustainable Business Practices', description: 'Learn how leading companies are integrating sustainability into their core business strategy. Discover frameworks for measuring environmental impact and creating lasting positive change.', speaker: 'James Wilson', day: 'Day 1', time: '02:00 PM', duration: '75 min', room: 'Room A', track: 'Sustainability', status: 'available' },
  { id: '5', title: 'Building High-Performance Teams', description: 'Master the art of team building with proven strategies for recruiting, developing, and retaining top talent. Includes hands-on activities and real-world scenarios.', speaker: 'Dr. Sarah Chen', day: 'Day 1', time: '02:00 PM', duration: '75 min', room: 'Room C', track: 'Leadership', status: 'early-bird' },
  { id: '6', title: 'Networking Reception', description: 'Connect with fellow attendees, speakers, and industry leaders in a relaxed evening atmosphere. Enjoy refreshments while building meaningful professional relationships.', speaker: 'All Attendees', day: 'Day 1', time: '06:00 PM', duration: '120 min', room: 'Grand Ballroom', track: 'Networking', status: 'available' },
  { id: '7', title: 'Design Thinking Workshop', description: 'Immersive hands-on workshop teaching design thinking methodology. Participants will work through real challenges using human-centered design principles and rapid prototyping.', speaker: 'Lisa Park', day: 'Day 2', time: '09:00 AM', duration: '120 min', room: 'Room B', track: 'Innovation', status: 'sold-out' },
  { id: '8', title: 'Data Analytics & Business Intelligence', description: 'Transform data into actionable insights with advanced analytics techniques. Learn to build dashboards, interpret complex data, and drive data-informed decision making.', speaker: 'David Kumar', day: 'Day 2', time: '09:00 AM', duration: '90 min', room: 'Room A', track: 'Technology', status: 'available' },
  { id: '9', title: 'Customer Experience Excellence', description: 'Create unforgettable customer experiences that drive loyalty and growth. Explore journey mapping, touchpoint optimization, and measuring CX success.', speaker: 'Jennifer Martinez', day: 'Day 2', time: '11:30 AM', duration: '60 min', room: 'Room C', track: 'Marketing', status: 'early-bird' },
  { id: '10', title: 'Blockchain & Web3 Opportunities', description: 'Navigate the evolving landscape of blockchain technology and Web3 applications. Understand cryptocurrency, NFTs, DeFi, and their business implications.', speaker: 'Alex Zhang', day: 'Day 2', time: '11:30 AM', duration: '60 min', room: 'Room A', track: 'Technology', status: 'available' },
  { id: '11', title: 'Financial Planning for Growth', description: 'Strategic financial management for scaling businesses. Topics include fundraising, budgeting, forecasting, and optimizing cash flow for sustainable growth.', speaker: 'Robert Anderson', day: 'Day 2', time: '02:00 PM', duration: '75 min', room: 'Room B', track: 'Business', status: 'available' },
  { id: '12', title: 'Personal Branding Masterclass', description: 'Build a powerful personal brand that opens doors and creates opportunities. Learn content strategy, social media presence, and authentic storytelling.', speaker: 'Emily Thompson', day: 'Day 2', time: '02:00 PM', duration: '75 min', room: 'Room C', track: 'Marketing', status: 'early-bird' },
  { id: '13', title: 'Panel: The Future of Work', description: "Industry leaders discuss the evolving workplace landscape, remote work trends, automation impact, and preparing for tomorrow's job market.", speaker: 'Panel Discussion', day: 'Day 2', time: '04:30 PM', duration: '90 min', room: 'Main Hall', track: 'Panel', status: 'available' },
  { id: '14', title: 'Keynote: Leading Through Change', description: 'Inspirational closing keynote on navigating uncertainty and leading organizations through transformation. Drawing on decades of experience and research.', speaker: 'Michael Rodriguez', day: 'Day 3', time: '09:00 AM', duration: '90 min', room: 'Main Hall', track: 'Keynote', status: 'available' },
  { id: '15', title: 'Agile Transformation Workshop', description: 'Practical workshop on implementing agile methodologies across your organization. Includes frameworks, tools, and change management strategies.', speaker: 'David Kumar', day: 'Day 3', time: '11:00 AM', duration: '90 min', room: 'Room A', track: 'Innovation', status: 'available' },
  { id: '16', title: 'Mental Health & Wellbeing', description: 'Address the critical importance of mental health in the workplace. Learn to create supportive environments, recognize warning signs, and implement wellness programs.', speaker: 'Dr. Sarah Chen', day: 'Day 3', time: '11:00 AM', duration: '60 min', room: 'Room B', track: 'Leadership', status: 'early-bird' },
  { id: '17', title: 'Influencer Marketing Strategies', description: 'Leverage influencer partnerships for brand growth. Learn selection criteria, campaign management, ROI measurement, and authenticity best practices.', speaker: 'Jennifer Martinez', day: 'Day 3', time: '02:00 PM', duration: '60 min', room: 'Room C', track: 'Marketing', status: 'sold-out' },
  { id: '18', title: 'Cybersecurity Essentials', description: 'Protect your business from evolving cyber threats. Covers risk assessment, security protocols, incident response, and building a security-first culture.', speaker: 'Alex Zhang', day: 'Day 3', time: '02:00 PM', duration: '75 min', room: 'Room A', track: 'Technology', status: 'available' },
  { id: '19', title: 'Closing Remarks & Networking', description: 'Reflect on key learnings from the conference and connect with attendees one final time. Celebrate achievements and plan next steps.', speaker: 'All Attendees', day: 'Day 3', time: '04:00 PM', duration: '90 min', room: 'Grand Ballroom', track: 'Networking', status: 'available' },
];


export function Schedule() {
  const { darkMode } = useTheme();
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mySchedule, setMySchedule] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showFilters, setShowFilters] = useState(false);


  const days = ['All', 'Day 1', 'Day 2', 'Day 3'];
  const tracks = ['All', 'Keynote', 'Technology', 'Leadership', 'Business', 'Marketing', 'Innovation', 'Sustainability', 'Panel', 'Networking'];


  useEffect(() => {
    const saved = localStorage.getItem('mySchedule');
    if (saved) setMySchedule(JSON.parse(saved));
  }, []);


  const toggleMySchedule = (sessionId: string) => {
    const updated = mySchedule.includes(sessionId)
      ? mySchedule.filter((id) => id !== sessionId)
      : [...mySchedule, sessionId];
    setMySchedule(updated);
    localStorage.setItem('mySchedule', JSON.stringify(updated));
  };


  const filteredSessions = sessions.filter((session) => {
    const dayMatch = selectedDay === 'All' || session.day === selectedDay;
    const trackMatch = selectedTrack === 'All' || session.track === selectedTrack;
    const searchMatch = searchQuery === '' ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    return dayMatch && trackMatch && searchMatch;
  });


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent text-center">
            Conference Schedule
          </h1>
          <p className="text-xl text-white text-center mb-8">Explore our comprehensive 3-day agenda</p>


          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search sessions, speakers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2">
                <Filter className="w-5 h-5" /><span>Filters</span>
              </button>
              <button onClick={() => window.print()} className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" /><span>Print</span>
              </button>
            </div>


            {showFilters && (
              <div className={`p-6 rounded-lg shadow-lg space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Day</label>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <button key={day} onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedDay === day ? 'bg-yellow-500 text-black' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Track</label>
                  <div className="flex flex-wrap gap-2">
                    {tracks.map((track) => (
                      <button key={track} onClick={() => setSelectedTrack(track)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTrack === track ? 'bg-yellow-500 text-black' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {track}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Schedule */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {['Day 1', 'Day 2', 'Day 3'].map((day) => {
              const daySessions = filteredSessions.filter((s) => s.day === day);
              if (daySessions.length === 0 && selectedDay !== 'All') return null;
              return (
                <div key={day} className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6">
                    <h2 className="text-3xl font-bold text-black flex items-center space-x-3">
                      <Calendar className="w-8 h-8" />
                      <span>{day} - {day === 'Day 1' ? 'June 15' : day === 'Day 2' ? 'June 16' : 'June 17'}, 2026</span>
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {daySessions.map((session) => (
                      <div key={session.id} onClick={() => setSelectedSession(session)}
                        className={`border-l-4 border-yellow-500 p-6 rounded-r-lg hover:shadow-md transition-all cursor-pointer relative ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50'}`}>
                        {session.status && (
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${session.status === 'early-bird' ? 'bg-green-100 text-green-800 border border-green-300' : session.status === 'sold-out' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-blue-100 text-blue-800 border border-blue-300'}`}>
                              {session.status === 'early-bird' ? 'Early Bird' : session.status === 'sold-out' ? 'Sold Out' : 'Available'}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <h3 className={`text-xl font-bold mb-2 md:mb-0 pr-24 ${darkMode ? 'text-white' : 'text-black'}`}>{session.title}</h3>
                          <button onClick={(e) => { e.stopPropagation(); toggleMySchedule(session.id); }} className="self-start md:self-auto">
                            <Heart className={`w-6 h-6 transition-all ${mySchedule.includes(session.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                          </button>
                        </div>
                        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-yellow-500" /><span>{session.time} ({session.duration})</span></div>
                          <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-yellow-500" /><span>{session.room}</span></div>
                          <div className="flex items-center space-x-2"><User className="w-4 h-4 text-yellow-500" /><span>{session.speaker}</span></div>
                          <div className="flex items-center space-x-2"><Filter className="w-4 h-4 text-yellow-500" /><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">{session.track}</span></div>
                        </div>
                        <p className={`line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{session.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No sessions found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>


      {/* My Schedule */}
      {mySchedule.length > 0 && (
        <section className={`py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-yellow-50 to-amber-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold mb-8 flex items-center space-x-3 ${darkMode ? 'text-white' : 'text-black'}`}>
              <Heart className="w-10 h-10 fill-red-500 text-red-500" />
              <span>My Schedule ({mySchedule.length})</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.filter((s) => mySchedule.includes(s.id)).map((session) => (
                <div key={session.id} className={`p-6 rounded-lg shadow-md border-2 border-yellow-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{session.title}</h3>
                  <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>{session.day}</span></div>
                    <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>{session.time}</span></div>
                    <div className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>{session.room}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Session Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 flex items-start justify-between sticky top-0">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-black mb-2">{selectedSession.title}</h2>
                <p className="text-black/80">{selectedSession.speaker}</p>
              </div>
              <button onClick={() => setSelectedSession(null)} className="p-2 hover:bg-black/10 rounded-lg transition-all">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: 'Date', value: selectedSession.day },
                  { icon: Clock, label: 'Time', value: `${selectedSession.time} (${selectedSession.duration})` },
                  { icon: MapPin, label: 'Location', value: selectedSession.room },
                  { icon: Filter, label: 'Track', value: selectedSession.track },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <Icon className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
                      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>Description</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedSession.description}</p>
              </div>
              <button onClick={() => { toggleMySchedule(selectedSession.id); setSelectedSession(null); }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${mySchedule.includes(selectedSession.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500'}`}>
                {mySchedule.includes(selectedSession.id) ? 'Remove from My Schedule' : 'Add to My Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

