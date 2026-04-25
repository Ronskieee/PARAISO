import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';


interface Partner {
  name: string;
  category: 'wedding' | 'debutante' | 'social';
  logo: string;
  description: string;
}


const partners: Partner[] = [
  { name: 'Casa Ibarra', category: 'wedding', logo: 'CI', description: 'A charming and elegant event venue perfect for intimate and grand wedding celebrations alike.' },
  { name: 'Whitespace Manila', category: 'wedding', logo: 'WM', description: 'A modern, versatile venue in the heart of Manila ideal for sophisticated wedding receptions.' },
  { name: 'Brittany Palazzo', category: 'wedding', logo: 'BP', description: 'An exquisite palazzo-inspired venue offering a luxurious backdrop for your dream wedding.' },
  { name: 'Glass Garden Events Venue', category: 'wedding', logo: 'GG', description: 'A stunning glass-enclosed garden venue that blends nature and elegance for unforgettable weddings.' },
  { name: 'Lights of Love Event Space', category: 'wedding', logo: 'LL', description: 'A romantic event space in Quezon City adorned with warm lights, perfect for heartfelt celebrations.' },

  { name: 'Fernwood Gardens', category: 'debutante', logo: 'FG', description: 'A lush garden venue in BGC offering a magical and picturesque setting for debut celebrations.' },
  { name: 'Marquis Events Place', category: 'debutante', logo: 'ME', description: 'An elegant and spacious venue designed to make every debutante\'s milestone truly unforgettable.' },
  { name: 'Hillcreek Gardens', category: 'debutante', logo: 'HG', description: 'A breathtaking hillside garden venue that adds natural beauty and charm to debut events.' },
  { name: 'Stella Suites', category: 'debutante', logo: 'SS', description: 'A sophisticated suite venue offering a refined and intimate atmosphere for debut celebrations.' },
  { name: 'The Blue Leaf Events Pavillion', category: 'debutante', logo: 'BL', description: 'A grand pavilion venue known for its striking architecture and world-class event facilities.' },

  { name: 'The Silica Event Place', category: 'social', logo: 'SE', description: 'A sleek and contemporary venue perfect for corporate gatherings, parties, and social events.' },
  { name: 'Woodlane Event Place', category: 'social', logo: 'WE', description: 'A warm and rustic event space surrounded by nature, ideal for intimate social gatherings.' },
  { name: 'Gallio', category: 'social', logo: 'GA', description: 'A stylish and flexible event space that adapts seamlessly to any social occasion or theme.' },
  { name: 'The Pergola', category: 'social', logo: 'TP', description: 'An open-air venue with a beautiful pergola structure, perfect for relaxed and elegant gatherings.' },
  { name: 'Apogee Events and Lifestyle', category: 'social', logo: 'AE', description: 'A premium lifestyle venue curated for elevated social events and exclusive community gatherings.' },
];


const categoryConfig = {
  wedding: {
    label: 'Wedding',
    pill: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    logoBg: 'bg-pink-50 dark:bg-pink-900/30',
    logoRing: 'ring-2 ring-pink-200 dark:ring-pink-700',
    logoText: 'text-pink-600 dark:text-pink-300',
    hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-600',
    hoverShadow: 'hover:shadow-pink-100 dark:hover:shadow-pink-900/20',
    title: 'Wedding Venues',
    dividerColor: 'bg-pink-300 dark:bg-pink-600',
    badgeDot: 'bg-pink-400 dark:bg-pink-500',
  },
  debutante: {
    label: 'Debutante',
    pill: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    logoBg: 'bg-purple-50 dark:bg-purple-900/30',
    logoRing: 'ring-2 ring-purple-200 dark:ring-purple-700',
    logoText: 'text-purple-600 dark:text-purple-300',
    hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-600',
    hoverShadow: 'hover:shadow-purple-100 dark:hover:shadow-purple-900/20',
    title: 'Debutante Venues',
    dividerColor: 'bg-purple-300 dark:bg-purple-600',
    badgeDot: 'bg-purple-400 dark:bg-purple-500',
  },
  social: {
    label: 'Social Gathering',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    logoBg: 'bg-amber-50 dark:bg-amber-900/30',
    logoRing: 'ring-2 ring-amber-200 dark:ring-amber-700',
    logoText: 'text-amber-600 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-600',
    hoverShadow: 'hover:shadow-amber-100 dark:hover:shadow-amber-900/20',
    title: 'Social Gathering Venues',
    dividerColor: 'bg-amber-300 dark:bg-amber-600',
    badgeDot: 'bg-amber-400 dark:bg-amber-500',
  },
};


export function Sponsors() {
  const { darkMode } = useTheme();
  const [selected, setSelected] = useState<Partner | null>(null);

  const weddingPartners   = partners.filter((p) => p.category === 'wedding');
  const debutantePartners = partners.filter((p) => p.category === 'debutante');
  const socialPartners    = partners.filter((p) => p.category === 'social');

  // Dynamic classes based on darkMode state
  const pageBg   = darkMode ? 'bg-gray-950' : 'bg-gray-50';
  const cardBg   = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const cardName = darkMode ? 'text-gray-100' : 'text-gray-800';
  const cardHint = darkMode ? 'text-gray-500' : 'text-gray-400';
  const modalBg  = darkMode ? 'bg-gray-800' : 'bg-white';
  const modalTitle = darkMode ? 'text-gray-100' : 'text-gray-900';
  const modalDesc  = darkMode ? 'text-gray-400' : 'text-gray-500';
  const modalClose = darkMode
    ? 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600';
  const sectionBg  = darkMode ? 'bg-gray-900' : 'bg-white';
  const sectionAlt = darkMode ? 'bg-gray-950' : 'bg-gradient-to-b from-purple-50/50 to-white';
  const headingColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const subColor     = darkMode ? 'text-gray-500' : 'text-gray-400';
  const dividerColor = darkMode ? 'via-gray-700' : 'via-gray-200';

  const renderCards = (list: Partner[], category: keyof typeof categoryConfig) => {
    const cfg = categoryConfig[category];
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {list.map((partner, index) => (
          <div
            key={index}
            onClick={() => setSelected(partner)}
            className={`${cardBg} p-6 rounded-xl border shadow-sm ${cfg.hoverBorder} ${cfg.hoverShadow} hover:shadow-lg transition-all duration-300 cursor-pointer text-center group`}
          >
            <div className="flex items-center justify-center mb-4">
              <div className={`w-20 h-20 ${cfg.logoBg} ${cfg.logoRing} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <span className={`text-xl font-bold ${cfg.logoText}`}>{partner.logo}</span>
              </div>
            </div>
            <h3 className={`text-sm font-semibold leading-tight ${cardName}`}>{partner.name}</h3>
            <p className={`text-xs mt-1 ${cardHint}`}>Click to learn more</p>
          </div>
        ))}
      </div>
    );
  };

  const renderSectionHeader = (category: keyof typeof categoryConfig) => {
    const cfg = categoryConfig[category];
    return (
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`h-px w-16 ${cfg.dividerColor}`} />
          <div className={`inline-flex items-center gap-2 px-5 py-2 ${cfg.pill} text-xs font-bold rounded-full uppercase tracking-widest`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.badgeDot}`} />
            {cfg.label}
          </div>
          <div className={`h-px w-16 ${cfg.dividerColor}`} />
        </div>
        <h2 className={`text-4xl font-bold ${headingColor}`}>{cfg.title}</h2>
        <p className={`mt-2 text-sm ${subColor}`}>Click on a venue to learn more</p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${pageBg}`}>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`${modalBg} rounded-2xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${modalClose}`}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className={`w-28 h-28 ${categoryConfig[selected.category].logoBg} ${categoryConfig[selected.category].logoRing} rounded-full flex items-center justify-center mb-4`}>
                <span className={`text-3xl font-bold ${categoryConfig[selected.category].logoText}`}>{selected.logo}</span>
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${categoryConfig[selected.category].pill}`}>
                {categoryConfig[selected.category].label}
              </span>
              <h3 className={`text-2xl font-bold mb-3 ${modalTitle}`}>{selected.name}</h3>
              <p className={`leading-relaxed text-sm ${modalDesc}`}>{selected.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-amber-900/20 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-yellow-400" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-600" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-yellow-400/70 text-xs uppercase tracking-[4px] mb-4 font-medium">PARAISO 2026</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Our Partners
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            We're grateful to our venue partners who make PARAISO possible and share our vision for unforgettable celebrations
          </p>
        </div>
      </section>

      {/* Wedding Venues */}
      <section className={`py-20 transition-colors duration-300 ${sectionBg}`}>
        <div className="container mx-auto px-4">
          {renderSectionHeader('wedding')}
          {renderCards(weddingPartners, 'wedding')}
        </div>
      </section>

      <div className={`h-px bg-gradient-to-r from-transparent ${dividerColor} to-transparent mx-8`} />

      {/* Debutante Venues */}
      <section className={`py-20 transition-colors duration-300 ${sectionAlt}`}>
        <div className="container mx-auto px-4">
          {renderSectionHeader('debutante')}
          {renderCards(debutantePartners, 'debutante')}
        </div>
      </section>

      <div className={`h-px bg-gradient-to-r from-transparent ${dividerColor} to-transparent mx-8`} />

      {/* Social Gathering Venues */}
      <section className={`py-20 transition-colors duration-300 ${sectionBg}`}>
        <div className="container mx-auto px-4">
          {renderSectionHeader('social')}
          {renderCards(socialPartners, 'social')}
        </div>
      </section>
    </div>
  );
}