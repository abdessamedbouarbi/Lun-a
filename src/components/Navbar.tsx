import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Globe, Menu, X, Home, Package } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/useCart';
import { useState, useEffect } from 'react';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { lang, toggleLang, t } = useLanguage();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { key: Page; label: string; icon: typeof Home }[] = [
    { key: 'home', label: t('home'), icon: Home },
    { key: 'products', label: t('products'), icon: Package },
    { key: 'cart', label: t('cart'), icon: ShoppingCart },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-pink-100/50'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Lunéa
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              return (
                <motion.button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-pink-600'
                      : 'text-gray-600 hover:text-pink-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-pink-50 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={18} />
                    {item.label}
                    {item.key === 'cart' && totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Side: Language Toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{lang === 'fr' ? 'Français' : 'العربية'}</span>
              <span className="sm:hidden">{lang === 'fr' ? 'FR' : 'AR'}</span>
            </motion.button>

            {/* Mobile Cart Button */}
            <motion.button
              onClick={() => onNavigate('cart')}
              className="md:hidden relative p-2 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.key;
                return (
                  <motion.button
                    key={item.key}
                    onClick={() => {
                      onNavigate(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-600 hover:bg-pink-50/50 hover:text-pink-500'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.key === 'cart' && totalItems > 0 && (
                      <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
