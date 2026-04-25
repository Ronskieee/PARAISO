import { Target, Eye, Heart, Users, Lightbulb, Globe } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useTheme } from '../components/ThemeContext';








export function About() {
  const { darkMode } = useTheme();








  const values = [
    { icon: Lightbulb, title: ' Precision & Excellence', description: 'We believe that greatness is found in the details; from the first sketch of a wedding to the final dance of a debut, we maintain a relentless focus on high-quality execution and organized coordination.' },
    { icon: Users, title: 'Authentic Storytelling', description: 'Every client has a unique journey, and we are dedicated to translating your personal emotions and dreams into beautifully styled realities that authentically reflect who you are.' },
    { icon: Globe, title: ' Relentless Innovation', description: 'The events industry is ever-evolving, so we constantly push the boundaries of creativity to offer fresh, trendy, and unique concepts, ensuring no two Paraiso events are ever the same.' },
    { icon: Heart, title: 'Absolute Integrity', description: 'We build long-term relationships through open communication and professional ethics, ensuring our clients can rest easy knowing their most precious moments are in reliable hands.' },
  ];








  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1549002942-c6af9c116f79?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Conference"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-amber-900/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            About PARAISO
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Where visionaries gather to shape tomorrow's innovations
          </p>
        </div>
      </section>








      {/* Mission & Vision */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`p-12 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-yellow-500/50' : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'}`}>
              <Target className="w-16 h-16 text-yellow-500 mb-6" />
              <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Our Mission</h2>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Our mission is to provide exceptional, personalized event planning and styling that exceeds expectations while respecting our clients’ budgets. We are committed to seamless execution and open communication, ensuring a stress-free experience from the first concept to the final moment. By staying ahead of industry trends and prioritizing integrity, we dedicate ourselves to creating joyful, high-quality memories that last a lifetime.
              </p>
            </div>
            <div className={`p-12 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-yellow-400' : 'bg-gradient-to-br from-gray-900 to-black border-yellow-500'}`}>
              <Eye className="w-16 h-16 text-yellow-400 mb-6" />
              <h2 className="text-4xl font-bold mb-6 text-white">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
               To be the industry’s most trusted leader in transforming weddings, debuts, and parties into extraordinary, unforgettable experiences. We aspire to set a new standard of excellence through innovation, elegance, and a relentless focus on detail. Our goal is to expand our reach as a symbol of reliability and inspiration, turning every client’s unique story into a beautifully designed reality.
              </p>
            </div>
          </div>
        </div>
      </section>








      {/* Story Section */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-gray-900 via-black to-amber-900/20'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-white">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>Paraiso was created in 2020 from a simple yet powerful belief: life’s most meaningful milestones deserve more than just a celebration—they deserve to be transformed into unforgettable masterpieces. What began as a passion for storytelling quickly evolved into a purpose-driven journey. We saw that while many could organize events, only a few could truly understand and capture the essence—the “paraiso,” or paradise—within each client’s unique vision.
</p>
                <p>From the very beginning, we committed ourselves to going beyond the expected. Every love story, every coming-of-age moment, every joyful gathering carries a deeper narrative waiting to be brought to life. Whether it is the timeless romance of a wedding, the vibrant energy of a party, or the graceful transition of a debut, we approach each event as a canvas—carefully designing every detail to reflect not just style, but soul.
</p>
                <p>Over the years, Paraiso has grown into a team of passionate creatives, detail-oriented planners, and visionary designers who share one mission: to turn fleeting dreams into lasting memories. We pride ourselves on creating experiences that are not only visually stunning but also seamless and stress-free, allowing our clients to be fully present in the moments that matter most.</p>
                <p>Today, Paraiso stands as more than an event planning brand—it is a trusted partner in celebrating life’s most cherished occasions. With every event we craft, we aim to leave a legacy of beauty, emotion, and meaning—moments that families will treasure, stories that will be retold, and memories that will last a lifetime.
</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback src="https://images.unsplash.com/photo-1590632396158-a5765ff11bda?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Conference room" className="w-full h-64 object-cover rounded-lg" />
              <ImageWithFallback src="https://images.unsplash.com/photo-1654723011680-0e037c2a4f18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVoaW5kJTIwdGhlJTIwc2NlbmVzfGVufDB8fDB8fHww" alt="Panel discussion" className="w-full h-64 object-cover rounded-lg mt-8" />
              <ImageWithFallback src="https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGRlc2lnbiUyMGV2ZW50fGVufDB8fDB8fHww" alt="Workshop" className="w-full h-64 object-cover rounded-lg -mt-8" />
              <ImageWithFallback src="https://images.unsplash.com/photo-1697217866029-2aef7068ecee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGludml0YXRpb25zfGVufDB8fDB8fHww" alt="Event catering" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>








      {/* Values Section */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-5xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Our Core Values</h2>
          <p className={`text-center mb-16 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>The principles that guide everything we do</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={`p-8 rounded-lg border-2 transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 border-yellow-500/30 hover:border-yellow-500' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200 hover:border-yellow-400'}`}>
                  <Icon className="w-12 h-12 text-yellow-500 mb-4" />
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>{value.title}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>








      {/* What Makes Us Different */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-500">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Personalized Storytelling', description: 'We prioritize your unique narrative over generic templates, ensuring every wedding, party, and debut is a one-of-a-kind reflection of your personality.' },
              { title: 'Seamless Precision', description: 'We bridge the gap between high-end creative styling and military-grade logistical coordination for a flawlessly executed event.' },
              { title: 'Stress-Free Advocacy', description: 'Our "client-first" process handles every complex detail and supplier fire so you can actually be a guest at your own celebration.' },
              { title: 'Trend-Setting Innovation', description: 'We continuously evolve our aesthetic and techniques to bring modern, sophisticated, and "ahead-of-the-curve" concepts to every milestone.' },
              { title: 'Uncompromising Integrity', description: 'We build trust through radical transparency in communication and a commitment to delivering high-quality results within your specific budget.' },
              { title: 'The "Paraiso" Standard', description: 'We do not just plan events we curate forever moments by focusing on the small meaningful details that turn a party into a lifelong memory.' },
            ].map((item, index) => (
              <div key={index} className="bg-black/20 backdrop-blur-sm p-8 rounded-lg border-2 border-black/30 hover:bg-black/30 transition-all">
                <h3 className="text-2xl font-bold mb-4 text-black">{item.title}</h3>
                <p className="text-black/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>








      {/* By the Numbers */}
      <section className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-black'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">PARAISO By the Numbers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '6', label: 'Years of Excellence' },
              { number: '5000+', label: 'Attendees Annually' },
              { number: '200+', label: 'Expert Speakers' },
              { number: '50+', label: 'Countries Represented' },
              { number: '100+', label: 'Sessions & Workshops' },
              { number: '30+', label: 'Industry Partners' },
              { number: '10K+', label: 'Connections Made' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div key={index} className={`text-center p-8 rounded-lg border transition-colors duration-300 ${darkMode ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500' : 'bg-gradient-to-br from-yellow-500/10 to-amber-600/10 border-yellow-500/30'}`}>
                <div className="text-5xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}















