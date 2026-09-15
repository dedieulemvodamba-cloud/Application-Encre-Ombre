import React from 'react';
import { GENRES_LIST } from '../data/books';
import { Sparkles, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const GenresSection: React.FC = () => {
  return (
    <section id="genres" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#0c0b0f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#c9a84c] text-xs uppercase tracking-[0.25em] font-semibold mb-2 opacity-80 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Univers Littéraires
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0ead8]">
            Les Genres Explorés
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4" />
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#c9a84c]/15 border border-[#c9a84c]/20 rounded-xl overflow-hidden shadow-xl">
          {GENRES_LIST.map((genre, idx) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-[#1e1b28] hover:bg-[#2d293d] p-6 sm:p-7 flex flex-col justify-start transition-colors duration-300 group cursor-default"
            >
              <span className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 block">
                {genre.icon}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#f0ead8] group-hover:text-[#c9a84c] transition-colors mb-2">
                {genre.name}
              </h3>
              <p className="text-xs text-[#8a8699] leading-relaxed">
                {genre.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Citation Section */}
        <div className="mt-20 relative bg-[#1e1b28]/60 border border-[#c9a84c]/25 rounded-2xl p-8 sm:p-14 text-center overflow-hidden">
          <div className="absolute top-0 right-10 -translate-y-1/2 opacity-10 text-[#c9a84c]">
            <Quote className="w-32 h-32" />
          </div>

          <blockquote className="relative z-10 font-serif italic text-lg sm:text-2xl md:text-3xl text-[#f0ead8] max-w-3xl mx-auto leading-relaxed mb-6 font-light">
            « Les secrets que les hommes gardent le plus farouchement ne sont jamais des vérités cachées.
            Ce sont des peurs. »
          </blockquote>

          <cite className="block text-xs uppercase tracking-[0.25em] text-[#c9a84c] font-semibold not-italic">
            Encre &amp; Ombre — L'Ombre du Congo
          </cite>
        </div>
      </div>
    </section>
  );
};
