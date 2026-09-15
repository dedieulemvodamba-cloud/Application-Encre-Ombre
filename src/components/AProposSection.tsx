import React from 'react';
import { Sparkles, Shield, Globe, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKS_COLLECTION } from '../data/books';

export const AProposSection: React.FC = () => {
  return (
    <section id="apropos" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#13111a] border-t border-[#c9a84c]/15">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#c9a84c] text-xs uppercase tracking-[0.25em] font-semibold opacity-80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Manifeste Littéraire
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0ead8] leading-tight">
              Raconter l'Afrique autrement
            </h2>

            <div className="w-16 h-0.5 bg-[#c9a84c]" />

            <div className="space-y-4 text-sm sm:text-base text-[#8a8699] leading-relaxed font-light">
              <p>
                <strong className="text-[#f0ead8] font-normal">Encre &amp; Ombre</strong> est né
                d'un désir simple : raconter des histoires africaines complexes, multiculturelles,
                sans clichés. Des récits qui parlent de Brazzaville, de Kinshasa, de New York, de
                Séoul — parce que nos vies n'ont pas de frontières.
              </p>
              <p>
                Chaque livre est une porte. Vers une vérité cachée, une émotion oubliée, une part de
                nous-mêmes que nous n'osions pas regarder.
              </p>
              <p className="font-serif italic text-lg text-[#e8d49a] pt-2">
                « La littérature n'est pas une fuite. C'est un retour. »
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#8a8699]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40">
                <Globe className="w-4 h-4 text-[#c9a84c]" />
                <span>Brazzaville • New York • Kinshasa</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e1b28] border border-[#3d3854]/40">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Diffusion Numérique Certifiée &amp; Sécurisée</span>
              </div>
            </div>
          </div>

          {/* Right Column Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-[#1e1b28] border-l-2 border-l-[#c9a84c] border border-[#3d3854]/30"
            >
              <span className="font-serif font-black text-4xl sm:text-5xl text-[#c9a84c] block mb-1">
                {BOOKS_COLLECTION.length}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#8a8699] font-medium">
                Œuvres &amp; Manuscrits
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-[#1e1b28] border-l-2 border-l-[#c9a84c] border border-[#3d3854]/30"
            >
              <span className="font-serif font-black text-4xl sm:text-5xl text-[#c9a84c] block mb-1">
                2
              </span>
              <span className="text-xs uppercase tracking-wider text-[#8a8699] font-medium">
                Continents
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-[#1e1b28] border-l-2 border-l-[#c9a84c] border border-[#3d3854]/30"
            >
              <span className="font-serif font-black text-4xl sm:text-5xl text-[#c9a84c] block mb-1">
                5
              </span>
              <span className="text-xs uppercase tracking-wider text-[#8a8699] font-medium">
                Genres abordés
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-[#1e1b28] border-l-2 border-l-[#c9a84c] border border-[#3d3854]/30"
            >
              <span className="font-serif font-black text-4xl sm:text-5xl text-[#c9a84c] block mb-1">
                ∞
              </span>
              <span className="text-xs uppercase tracking-wider text-[#8a8699] font-medium">
                Histoires à raconter
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
