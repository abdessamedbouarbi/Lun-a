import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartProvider';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsPage from '@/pages/ProductsPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import Footer from '@/components/Footer';
import type { Page } from '@/types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleNavigate = useCallback((page: Page | 'checkout') => {
    if (page === 'checkout') {
      setShowCheckout(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setShowCheckout(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCheckoutNavigate = useCallback((page: 'home' | 'products' | 'cart') => {
    setShowCheckout(false);
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {showCheckout ? (
          <motion.div
            key="checkout"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CheckoutPage onNavigate={handleCheckoutNavigate} />
          </motion.div>
        ) : currentPage === 'home' ? (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Hero onNavigate={handleNavigate} />
            <ProductsPage />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        ) : currentPage === 'products' ? (
          <motion.div
            key="products"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ProductsPage />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CartPage onNavigate={handleNavigate} />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
