import { useState } from 'react';
import { Linkedin, Twitter, Globe, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useTheme } from '../components/ThemeContext';








interface Speaker {
  id: string;
  name: string;
  title: string;
  age: string;
  image: string;
  bio: string;
  expertise: string[];
  social: { linkedin?: string; twitter?: string; website?: string; };
}








const speakers: Speaker[] = [
  { id: '1', name: 'Jasmine Alexa Martin', title: 'Chief Executive Officer', age: '17 Years Old', image: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/636537911_925967179933724_885554147796867777_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEMVbp4LO96R4VdZxSyhnAKBzC73Lf94agHMLvct_3hqFKq41ygGZuZBEjIUl_Cq2nveFN0o4-909I5SE4O-hcz&_nc_ohc=Odlpjc5bmK8Q7kNvwH69qAn&_nc_oc=AdrQ9YXRfkYfz8Sgrcyn3hfvOBpIFG8WqpuIJqiekl4S1xDSZWptFmilYYblok3Cyqc&_nc_zt=23&_nc_ht=scontent-lax3-2.xx&_nc_ss=7a32e&oh=03_Q7cD4wEuOqM_XOyi11Fo0YbacRGsOPzIG_PBhgZ7iXiCnDWgfw&oe=69EB07E4', bio: 'Ms. Alexa is a dedicated event planner at Paraiso Event Management, turning visions into unforgettable experiences. She specializes in weddings, debuts, and social gatherings, combining creativity with flawless execution. Known for her attention to detail and energetic approach, she ensures every event runs smoothly and leaves a lasting impression.', expertise: ['Wedding Planning & Coordination', 'Interior Designer', 'Vendor & Logistics Coordinator', 'Event Design & Decor'], social: { linkedin: '#', twitter: '#', website: '#' } },
  { id: '2', name: 'Exequiel John Manansala', title: 'Front End', age: '18 Years Old', image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.15752-9/637889843_1577014166906897_1974905259868472825_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH3AeWrS6bBMR9N747OC6j7Ju1Z3HNqC_Am7Vncc2oL8MXl0l8-kKmAlmEdjk0W3iRiZ5j1xCMmAsOFVFv3KCdo&_nc_ohc=5METobpM0fwQ7kNvwHoT-dS&_nc_oc=Adpo-AbvMW4PA4uqPfirKV-A7xZxEMPLRDgvBlg_bhoYSPsWbOd5XHkXeV1n37cx1fY&_nc_zt=23&_nc_ht=scontent-lax3-1.xx&_nc_ss=7a32e&oh=03_Q7cD4wF95rvEQt8XsJrvVnrsN6IC5BPDE6fSvaJFPCC9soP0zA&oe=69EB0E47', bio: 'Mr. Exequiel is a cornerstone of the Paraiso Event Management team, where he transforms ambitious visions into sophisticated, high-impact experiences. Specializing in high-end social gatherings, weddings, and debuts, he bridges the gap between bold innovation and logistical precision.', expertise: ['Responsive UI Architecture', 'Component-Driven Development', 'Advanced State Management', 'Performance & Accessibility Optimization'], social: { linkedin: '#', twitter: '#' } },
  { id: '3', name: 'James Arron Nellas', title: 'Front End', age: '17 Years Old', image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.15752-9/636719660_1326094112886261_3895275076038613800_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFN3ooNBVCGigEj8YJpOVht2wiIeqMw_xLbCIh6ozD_EqZwikG-A1w_Y8aVD6xNGa0fm1TqptBySh-uoxQU8qEl&_nc_ohc=NFBdLkrpSZ0Q7kNvwEf8b-u&_nc_oc=Adr3ps6aNmG4nGMKsFukcC6GmUfhfPgkNqj16q1MMOMqGgYms5vHJFlzOebLZ5LmwZE&_nc_zt=23&_nc_ht=scontent-lax3-1.xx&_nc_ss=7a32e&oh=03_Q7cD4wGPVjMMtax3jsjSTVSSR-UMW7cb8GDbWfVJYzt-P9L9_Q&oe=69EB1B5E', bio: 'Mr. James Nellas is a dedicated and creative member of Paraiso Event Management, specializing in debut celebrations, social gatherings, and weddings. With a strong eye for detail and passion for event coordination, he ensures that every celebration is beautifully organized and memorable.', expertise: ['Responsive Web Design', 'User Interface (UI) Design', 'Front-End Framework', 'Visual Branding Implementation'], social: { linkedin: '#', website: '#' } },
  { id: '4', name: 'John Mark Pantig', title: 'Front End', age: '17 Years Old', image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.15752-9/631730960_2324964254595603_7339906337725967507_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeERJkndCbztJyyjzsmBM0fyOB-d5AY0nO04H53kBjSc7TKPI2DwWh8bZxJVFp1sgnlouRegPo1lZKe9eFj5vVyU&_nc_ohc=N-yxt_7WzHsQ7kNvwE3p0Xu&_nc_oc=Adp1VQh_GgmQCcGFWw2c4FDkUIlYhWfLfbu9u4LxwU5QbNvF9Lx5rYiIcBmnXumMWYo&_nc_zt=23&_nc_ht=scontent-lax3-1.xx&_nc_ss=7a32e&oh=03_Q7cD4wFbbxf9Y1XBQ_KqpbL8mp2HwQ-mRB6qU1vzy5lC5kmuSw&oe=69EB1731', bio: 'Mr. John Mark stands as the creative heartbeat behind every celebration, transforming simple visions into breathtaking realities. Specializing in weddings, debuts, and curated social gatherings, he balances high-energy innovation with a meticulous eye for detail.', expertise: ['Visual Expert', 'Execution Pro', 'Full-Service', 'Structure'], social: { linkedin: '#', twitter: '#', website: '#' } },
  { id: '5', name: 'Jomar Papellero', title: 'Back End', age: '18 Years Old', image: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/634141784_1211930251152705_4897093169762049076_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGL5u2QEE_WQSFPon-H09hEs8NXdzTkm3-zw1d3NOSbf1Ll8cDLK1HlyVBYGU_H_uKK5m_UVYULQ1t2bfH31_Ge&_nc_ohc=iIHZWszPxLkQ7kNvwGpwUhP&_nc_oc=AdoZsE3NSTg_7f7vmAwrai1Nhuiv2RVEcr1-_ZTRVgGwuHyh193GnzBxxFc_UFQOpOc&_nc_zt=23&_nc_ht=scontent-lax3-2.xx&_nc_ss=7a32e&oh=03_Q7cD4wGjPQpJyNyyc0QCK3NfQWrH0hr36MUomm-p4TcQdV1nDg&oe=69EAEA43', bio: 'Leveraging a foundation in backend programming, Mr. Jomar approaches event management with an innovative mindset, focusing on efficient solutions and robust operational frameworks. Their technical acumen allows for a structured approach to planning and execution.', expertise: ['Backend System Integration & Automation', 'Process Optimization', 'Cross-Functional Problem Solving', 'Data-Driven Event Support'], social: { linkedin: '#', twitter: '#' } },
];








export function Speakers() {
  const { darkMode } = useTheme();
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');








  const filteredSpeakers = speakers.filter((speaker) => {
    if (searchQuery === '') return true;
    const query = searchQuery.toLowerCase();
    return speaker.name.toLowerCase().includes(query) || speaker.title.toLowerCase().includes(query) || speaker.age.toLowerCase().includes(query) || speaker.expertise.some((exp) => exp.toLowerCase().includes(query)) || speaker.bio.toLowerCase().includes(query);
  });








  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center">Our Board of Directors</h1>
          <p className="text-xl text-white text-center mb-8 max-w-3xl mx-auto">Learn from industry pioneers, thought leaders, and visionaries shaping the future</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search speakers by name, expertise, or company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500" />
            </div>
          </div>
        </div>
      </section>








      {/* Speakers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpeakers.map((speaker) => (
              <div key={speaker.id} className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="relative h-80 overflow-hidden group">
                  <ImageWithFallback src={speaker.image} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{speaker.name}</h3>
                    <p className="text-yellow-400 font-semibold">{speaker.title}</p>
                    <p className="text-white/90">{speaker.age}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {speaker.expertise.map((exp, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">{exp}</span>
                    ))}
                  </div>
                  <div className="mb-4">
                    <p className={`${expandedSpeaker === speaker.id ? '' : 'line-clamp-3'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{speaker.bio}</p>
                    <button onClick={() => setExpandedSpeaker(expandedSpeaker === speaker.id ? null : speaker.id)}
                      className="text-yellow-500 font-semibold mt-2 flex items-center space-x-1 hover:text-yellow-400">
                      <span>{expandedSpeaker === speaker.id ? 'Show less' : 'Read more'}</span>
                      {expandedSpeaker === speaker.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className={`flex items-center space-x-3 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {speaker.social.linkedin && <a href={speaker.social.linkedin} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-yellow-100'}`} title="LinkedIn"><Linkedin className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} /></a>}
                    {speaker.social.twitter && <a href={speaker.social.twitter} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-yellow-100'}`} title="Twitter"><Twitter className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} /></a>}
                    {speaker.social.website && <a href={speaker.social.website} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-yellow-100'}`} title="Website"><Globe className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} /></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredSpeakers.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No speakers found matching your search.</p>
            </div>
          )}
        </div>
      </section>








      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Want to Meet Our CEOs?</h2>
          <p className="text-xl mb-8 text-black/80 max-w-2xl mx-auto">Register now!!!</p>
          <a href="/registration" className="inline-block px-8 py-4 bg-black text-yellow-400 font-bold text-lg rounded-lg hover:bg-gray-900 transition-all shadow-lg">Register for PARAISO 2026</a>
        </div>
      </section>
    </div>
  );
}















