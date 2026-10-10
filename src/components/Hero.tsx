import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onNavigate: (page: 'products') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t, lang, dir } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50/50 to-pink-100/30">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-pink-200/40 to-pink-300/30"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Sparkle Icons */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-pink-300"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Sparkles size={20 + i * 4} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <motion.h1
            className="font-display text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent leading-none tracking-tight"
            style={{
              textShadow: '0 0 60px rgba(236, 72, 153, 0.2)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {t('heroTitle')}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className={`text-lg sm:text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed ${
            lang === 'ar' ? 'font-arabic' : ''
          }`}
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.button
            onClick={() => onNavigate('products')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-medium rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('shopNow')}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '3', label: lang === 'fr' ? 'Catégories' : 'فئات' },
            { value: '18', label: lang === 'fr' ? 'Produits' : 'منتجات' },
            { value: '58', label: lang === 'fr' ? 'Wilayas' : 'ولايات' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-pink-500">
                {stat.value}
              </div>
              <div className={`text-sm text-gray-400 mt-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
