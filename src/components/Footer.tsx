import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onNavigate: (page: 'home') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { lang, dir, t } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <footer className="bg-gradient-to-b from-pink-50/50 to-pink-100/30 border-t border-pink-100" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => onNavigate('home')}
              className="font-display text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-3"
            >
              Lunéa
            </button>
            <p className={`text-gray-400 text-sm leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t('footerText')}
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className={`font-display font-semibold text-gray-700 mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'fr' ? 'Catégories' : 'الفئات'}
            </h3>
            <ul className="space-y-2">
              {[
                { fr: 'Accessoires', ar: 'إكسسوارات' },
                { fr: 'Produits Cosmétiques', ar: 'منتجات التجميل' },
                { fr: 'Vêtements', ar: 'ملابس' },
              ].map((cat, i) => (
                <li key={i} className="text-sm text-gray-400 hover:text-pink-500 transition-colors cursor-default">
                  {lang === 'fr' ? cat.fr : cat.ar}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`font-display font-semibold text-gray-700 mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={16} className="text-pink-400" />
                <span>luneashope@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={16} className="text-pink-400" />
                <span dir="ltr">+213 7 83 90 66 50</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} className="text-pink-400" />
                <span>{lang === 'fr' ? 'Algérie' : 'الجزائر'}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-pink-100 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Lunéa. {t('allRightsReserved')}.
            <span className="flex items-center gap-1">
              {lang === 'fr' ? 'Fait avec' : 'صنع بـ'}
              <Heart size={14} className="text-pink-400 fill-pink-400" />
              {lang === 'fr' ? 'en Algérie' : 'في الجزائر'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
