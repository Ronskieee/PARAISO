import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';




interface FAQItem { question: string; answer: string; category: string; }




const faqs: FAQItem[] = [
  // General
  { category: 'General', question: 'What is PARAISO?', answer: 'PARAISO is a premier event management company based in the Philippines specializing in weddings, debut celebrations, and social gatherings. We partner with top venues across the country to help you create unforgettable moments tailored to your vision and budget.' },
  { category: 'General', question: 'What types of events does PARAISO handle?', answer: 'We specialize in three main event types: Weddings, Debut (18th birthday) celebrations, and Social Gatherings such as reunions, corporate parties, and other milestone events. Each category has dedicated venue partners and packages to suit your needs.' },
  { category: 'General', question: 'Where are your partner venues located?', answer: 'Our partner venues are located across Metro Manila and nearby areas including Quezon City, BGC, Makati, and more. Each venue has been carefully selected for its quality, ambiance, and capacity to ensure the best experience for your event.' },
  { category: 'General', question: 'How do I get started with PARAISO?', answer: 'Getting started is easy! Simply visit our Book page, select your event type and preferred venue, choose a package, and complete your registration. Our team will reach out to you to finalize the details and begin planning your dream event.' },
  { category: 'General', question: 'Does PARAISO only serve events in the Philippines?', answer: 'Currently, PARAISO focuses on events within Metro Manila and nearby provinces. However, we are continuously expanding our network of venue partners. Contact us if you have a specific location in mind and we will do our best to accommodate you.' },




  // Booking & Registration
  { category: 'Booking & Registration', question: 'How do I book an event with PARAISO?', answer: 'You can book directly through our website. Go to the Book page, choose your event type (Wedding, Debut, or Social Gathering), select your preferred venue, pick your ticket package, and fill in your personal details. You must be logged in to complete a booking.' },
  { category: 'Booking & Registration', question: 'Do I need to create an account to book?', answer: 'Yes, you need to be logged in to register for an event. Creating an account allows us to securely save your booking details and send you confirmation and reminder notifications.' },
  { category: 'Booking & Registration', question: 'Can I book multiple events?', answer: 'Yes! You can book multiple events under the same account. Each booking will appear as a separate reminder in your notification bell so you can keep track of all your upcoming celebrations.' },
  { category: 'Booking & Registration', question: 'What information do I need to provide when booking?', answer: 'You will need to provide your full name, email address, phone number, preferred event type, venue, event date, and ticket package. You may also include any special requests or accommodation needs in the provided field.' },
  { category: 'Booking & Registration', question: 'Can I change my booking after submitting?', answer: 'To make changes to an existing booking, please contact our team directly at paraisoeventmanagement@gmail.com or call +63 927 587 1239. We will do our best to accommodate changes depending on venue availability.' },




  // Venues
  { category: 'Venues', question: 'How many venue partners does PARAISO have?', answer: 'PARAISO currently has 15 partner venues across three event categories — 5 for Weddings, 5 for Debut celebrations, and 5 for Social Gatherings. Each venue has been handpicked for its ambiance, facilities, and service quality.' },
  { category: 'Venues', question: 'Can I visit a venue before booking?', answer: 'Yes, we highly recommend visiting your preferred venue before making a final decision. You may coordinate directly with the venue or reach out to our team and we can help arrange an ocular visit.' },
  { category: 'Venues', question: 'What is the maximum guest capacity of your venues?', answer: 'Guest capacity varies per venue. Our wedding venues accommodate between 200 to 600 guests, debut venues between 200 to 400 guests, and social gathering venues between 150 to 300 guests. Exact capacity details are shown on each venue card in the booking page.' },
  { category: 'Venues', question: 'Do venues provide their own catering?', answer: 'Most of our partner venues include catering services as part of their packages. The extent of catering (basic, premium, or full catering) depends on the package tier you select. Details are clearly listed in each package description.' },
  { category: 'Venues', question: 'Are the venues available on weekdays?', answer: 'Yes, most venues are available on both weekdays and weekends, though availability may vary. Weekday bookings may sometimes offer better rates. When booking, simply select your preferred date and the system will confirm availability.' },




  // Packages & Pricing
  { category: 'Packages & Pricing', question: 'What packages are available?', answer: 'Each venue offers four package tiers: Standard, Premium, VIP, and All-Inclusive. Each tier builds on the previous one — Standard covers the basics, while All-Inclusive includes everything from pro videography and live entertainment to an event coordinator and luxury accommodations.' },
  { category: 'Packages & Pricing', question: 'What is included in the All-Inclusive package?', answer: 'The All-Inclusive package covers everything in the VIP tier plus professional videography, live entertainment, luxury accommodations, a dedicated event coordinator, and unlimited plan revisions. It is our most comprehensive offering for a truly stress-free celebration.' },
  { category: 'Packages & Pricing', question: 'Are there promo codes or discounts available?', answer: 'Yes! We offer promo codes that can be applied during checkout. Current active codes include PARAISO20 (20% off), EARLYBIRD (15% off), and VIP10 (10% off). Enter your code in the Promo Code field in the Order Summary section during booking.' },
  { category: 'Packages & Pricing', question: 'Are the prices listed per head or for the whole event?', answer: 'All prices listed are for the entire event package, not per head. The price covers the venue and the inclusions of your chosen package tier for the full event duration.' },
  { category: 'Packages & Pricing', question: 'Can I customize my package?', answer: 'While our packages are pre-defined, we understand that every event is unique. Reach out to our team after booking and we will do our best to accommodate special requests or add-ons based on venue availability and your budget.' },




  // Event Day
  { category: 'Event Day', question: 'What is the typical schedule for a wedding event?', answer: 'A typical PARAISO wedding follows this schedule: Venue Setup at 8:00 AM, Bridal Party Preparation at 10:00 AM, Guest Arrival at 12:00 PM, Wedding Ceremony at 2:00 PM, Photo & Video Coverage at 4:00 PM, Reception & Dinner at 6:00 PM, Cake Cutting & First Dance at 8:00 PM, and Party & Celebration until 10:00 PM.' },
  { category: 'Event Day', question: 'What is the typical schedule for a debut celebration?', answer: 'A typical debut schedule includes: Guest Arrival & Registration at 3:00 PM, Debut Ceremony at 4:00 PM, 18 Roses Presentation at 4:30 PM, 18 Candles Presentation at 5:00 PM, Cotillion de Honor at 5:30 PM, Grand Dinner at 6:00 PM, Birthday Messages & Speeches at 7:00 PM, and Cake Cutting & Party at 8:00 PM.' },
  { category: 'Event Day', question: 'Can I request changes to the event schedule?', answer: 'Yes, the schedules shown are standard templates. You may request adjustments to fit your program flow. Our team and the venue coordinator will work with you to finalize the timeline closer to your event date.' },
  { category: 'Event Day', question: 'What happens if it rains on my outdoor event day?', answer: 'Several of our partner venues offer indoor alternatives or covered areas for outdoor setups. We recommend discussing contingency plans with your venue coordinator during the planning stage to ensure your event runs smoothly regardless of the weather.' },




  // Reminders & Notifications
  { category: 'Reminders & Notifications', question: 'How does the booking reminder system work?', answer: 'Once you complete a booking, a reminder is automatically saved to your account. You can view all your upcoming bookings by clicking the bell icon in the navigation bar. Each reminder shows the venue, package, total cost, and a countdown to your event date.' },
  { category: 'Reminders & Notifications', question: 'Can I delete a reminder?', answer: 'Yes, you can remove any reminder by clicking the trash icon next to it in the notification panel. This only removes the reminder from your bell — it does not cancel your actual booking.' },
  { category: 'Reminders & Notifications', question: 'Will I receive email notifications about my booking?', answer: 'Yes, a confirmation email is sent to your registered email address upon successful booking. We may also send follow-up communications as your event date approaches with important reminders and preparation tips.' },




  // Support
  { category: 'Support', question: 'How can I contact the PARAISO team?', answer: 'You can reach us via email at paraisoeventmanagement@gmail.com or call us at +63 927 587 1239. You can also message us on Facebook (Paraiso - Event Management) or Instagram (@Paraiso). Our team is available Monday to Friday, 10AM to 9PM.' },
  { category: 'Support', question: 'What if I encounter a technical issue on the website?', answer: 'If you experience any technical issues while using our website such as problems with registration, login, or bookings, please contact our support team immediately via email or phone. Include a brief description of the issue and a screenshot if possible so we can resolve it quickly.' },
  { category: 'Support', question: 'Is my personal information safe with PARAISO?', answer: 'Absolutely. PARAISO complies with the Data Privacy Act of 2012 (RA 10173). Your personal data is collected solely for event-related purposes and is never sold to third parties. You may review our full Data Privacy Notice during the booking process.' },
];




export function FAQ() {
  const { darkMode } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');




  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];




  const filteredFAQs = faqs.filter((faq) => {
    const categoryMatch = selectedCategory === 'All' || faq.category === selectedCategory;
    const searchMatch = searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });




  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Frequently Asked Questions</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">Find answers to common questions about PARAISO and our event management services</p>
        </div>
      </section>




      {/* Search & Filter */}
      <section className={`py-12 border-b transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search for answers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 focus:bg-white'}`} />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedCategory === category ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No FAQs found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className={`rounded-lg shadow-md border-2 transition-all overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-600 hover:border-yellow-500' : 'bg-white border-gray-200 hover:border-yellow-400'}`}>
                    <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className={`w-full px-6 py-5 flex items-center justify-between text-left transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <div className="flex-1 pr-4">
                        <div className="text-sm font-semibold text-yellow-500 mb-1">{faq.category}</div>
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{faq.question}</div>
                      </div>
                      {expandedIndex === index ? <ChevronUp className="w-6 h-6 text-yellow-500 flex-shrink-0" /> : <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />}
                    </button>
                    {expandedIndex === index && (
                      <div className={`px-6 pb-5 pt-2 border-t ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>




      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Still Have Questions?</h2>
            <p className="text-xl text-black/80 mb-8">Our team is here to help! Reach out to us and we'll get back to you as soon as possible.</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Email', value: 'paraisoeventmanagement@gmail.com' },
                { title: 'Phone', value: '+63 927 587 1239' },
                { title: 'Hours', value: 'Mon–Fri, 10AM–9PM PST' },
              ].map((item) => (
                <div key={item.title} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-black/30">
                  <h3 className="font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-black/80">{item.value}</p>
                </div>
              ))}
            </div>
            <a href="mailto:paraisoeventmanagement@gmail.com" className="inline-block px-8 py-4 bg-black text-yellow-400 font-bold text-lg rounded-lg hover:bg-gray-900 transition-all shadow-lg">Contact Support</a>
          </div>
        </div>
      </section>




      {/* Quick Links */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-black'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-white text-center">Helpful Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Book an Event', description: 'Reserve your preferred venue and package', link: '/registration' },
              { title: 'Our Partners', description: 'Browse all 15 venue partners', link: '/sponsors' },
              { title: 'Venue Information', description: 'Explore our event venues', link: '/venue' },
              { title: 'Meet Our BOD', description: 'Get to know the team behind PARAISO', link: '/speakers' },
            ].map((item, index) => (
              <a key={index} href={item.link} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-yellow-500/30 hover:border-yellow-500 transition-all group">
                <h3 className="text-xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}







