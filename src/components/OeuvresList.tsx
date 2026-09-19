import React, { useState } from 'react';
import { Book, BookGenreBadge } from '../types';
import { BOOKS_COLLECTION } from '../data/books';
import { BookOpen, ShieldCheck, Lock, Star, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface OeuvresListProps {
  onReadExcerpt: (book: Book) => void;
  onOrderBook: (book: Book) => void;
}

export const OeuvresList: React.FC<OeuvresListProps> = ({ onReadExcerpt, onOrderBook }) => {
  const [filter, setFilter] = useState<'all' | BookGenreBadge>('all');

  const filteredBooks =
    filter === 'all'
      ? BOOKS_COLLECTION
      : BOOKS_COLLECTION.filter(
          b =>
            b.badge === filter ||
            (filter === 'roman' &&
              (b.id === 'ombre-de-kinshasa' ||
                b.id === 'amour-au-dela-du-hasard' ||
                b.id === 'les-enfants-de-lombre'))
        );

  return (
    <section id="oeuvres" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#13111a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.25em] mb-2 opacity-80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Catalogue Littéraire Certifié
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0ead8] leading-tight">
              Les Œuvres
            </h2>
            <div className="w-16 h-0.5 bg-[#c9a84c] mt-4" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] border border-[#3d3854]/40'
              }`}
            >
              Toutes ({BOOKS_COLLECTION.length})
            </button>
            <button
              onClick={() => setFilter('roman')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'roman'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] border border-[#3d3854]/40'
              }`}
            >
              Romans
            </button>
            <button
              onClick={() => setFilter('bd')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'bd'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] border border-[#3d3854]/40'
              }`}
            >
              Bandes Dessinées
            </button>
            <button
              onClick={() => setFilter('doc')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'doc'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-[#8a8699] hover:text-[#f0ead8] border border-[#3d3854]/40'
              }`}
            >
              Essais &amp; Docs
            </button>
            <button
              onClick={() => setFilter('jeunesse')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'jeunesse'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-amber-300/80 hover:text-[#f0ead8] border border-amber-400/30'
              }`}
            >
              🐰 Jeunesse &amp; Contes
            </button>
            <button
              onClick={() => setFilter('horreur')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'horreur'
                  ? 'bg-red-800 text-white font-bold'
                  : 'bg-[#1e1b28] text-red-400/90 hover:text-red-300 border border-red-800/40'
              }`}
            >
              🩸 Horreur
            </button>
            <button
              onClick={() => setFilter('sacre')}
              className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'sacre'
                  ? 'bg-[#c9a84c] text-[#0c0b0f] font-bold'
                  : 'bg-[#1e1b28] text-[#e8d49a] hover:text-[#f0ead8] border border-[#c9a84c]/30'
              }`}
            >
              ✦ Textes Sacrés
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map(book => {
            let badgeStyle = 'border-[#7a1c2e] text-[#c46a7a] bg-[#7a1c2e]/10';
            if (book.badge === 'bd') {
              badgeStyle = 'border-[#4a6fa5] text-[#7da3d3] bg-[#4a6fa5]/10';
            } else if (book.badge === 'doc') {
              badgeStyle = 'border-[#4a8c5c] text-[#7ab890] bg-[#4a8c5c]/10';
            } else if (book.badge === 'sacre') {
              badgeStyle = 'border-[#c9a84c] text-[#e8d49a] bg-[#c9a84c]/20 font-bold';
            } else if (book.badge === 'jeunesse') {
              badgeStyle = 'border-amber-400/50 text-amber-300 bg-amber-400/10 font-medium';
            } else if (book.badge === 'horreur') {
              badgeStyle = 'border-red-700/60 text-red-400 bg-red-950/40 font-bold shadow-[0_0_12px_rgba(220,38,38,0.15)]';
            }

            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#1e1b28] border border-[#c9a84c]/15 hover:border-[#c9a84c]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Book Cover if present */}
                  {book.coverImage && (
                    <div className="relative mb-5 w-full aspect-[16/10] sm:aspect-[16/11] rounded-lg overflow-hidden border border-[#c9a84c]/25 bg-[#0c0b0f] shadow-md group-hover:border-[#c9a84c]/60 transition-colors">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b28]/80 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-[#e8d49a] border border-[#c9a84c]/30">
                        Couverture certifiée
                      </span>
                    </div>
                  )}

                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] font-medium">
                      {book.genre}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded border ${badgeStyle}`}
                    >
                      {book.badgeLabel}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl font-bold text-[#f0ead8] group-hover:text-[#e8d49a] transition-colors leading-snug mb-1">
                    {book.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#8a8699] mb-4">
                    {book.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#8a8699] leading-relaxed mb-6 line-clamp-4">
                    {book.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {book.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] bg-[#13111a] border border-[#3d3854]/50 text-[#8a8699] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="pt-4 border-t border-[#3d3854]/40">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#8a8699] block">Prix officiel</span>
                      <span className="font-serif font-black text-lg text-[#c9a84c]">
                        {book.priceFcfa.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className="text-[11px] text-[#8a8699] ml-1.5">
                        (~{book.priceEur} €)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{book.rating}</span>
                      <span className="text-[#8a8699] text-[10px]">/ 5</span>
                    </div>
                  </div>

                  {/* Two Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onReadExcerpt(book)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[#c9a84c]/40 bg-[#13111a] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] text-[#e8d49a] text-xs font-semibold transition-colors cursor-pointer"
                      title="Lire les chapitres d'extrait sous protection DRM"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span>Lire l'extrait</span>
                    </button>

                    <button
                      onClick={() => onOrderBook(book)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#c9a84c] hover:bg-[#e8d49a] text-[#0c0b0f] text-xs font-bold transition-colors cursor-pointer shadow"
                      title="Acheter en toute sécurité via MTN MoMo ou Airtel Money"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Commander</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
