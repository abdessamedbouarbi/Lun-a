import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, Trash } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/useCart';

interface CartPageProps {
  onNavigate: (page: 'products' | 'checkout') => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { lang, dir, t } = useLanguage();
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const isRTL = dir === 'rtl';

  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 pt-24 sm:pt-28 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-pink-50 flex items-center justify-center"
          >
            <ShoppingBag size={40} className="text-pink-300" />
          </motion.div>
          <h2
            className={`font-display text-2xl font-bold text-gray-700 mb-2 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t('emptyCart')}
          </h2>
          <p className="text-gray-400 mb-6">
            {lang === 'fr'
              ? 'Découvrez nos produits et commencez vos achats'
              : 'اكتشف منتجاتنا وابدأ تسوقك'}
          </p>
          <motion.button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRTL ? null : <ArrowLeft size={18} className="rtl-flip" />}
            <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('continueShopping')}</span>
            {isRTL ? <ArrowLeft size={18} className="rtl-flip" /> : null}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 pb-16" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`font-display text-3xl sm:text-4xl font-bold text-gray-800 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t('shoppingCart')}
          </h1>
          <p className="text-gray-400 mt-1">
            {t('cartItems').replace('{count}', String(totalItems))}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image Placeholder */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-2xl text-pink-400 font-bold">
                        {lang === 'fr' ? item.nameFr.charAt(0) : item.nameAr.charAt(0)}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-display font-semibold text-gray-800 text-base sm:text-lg truncate ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        {lang === 'fr' ? item.nameFr : item.nameAr}
                      </h3>
                      <p className="text-sm text-gray-400 capitalize">
                        {lang === 'fr'
                          ? item.category === 'accessoires'
                            ? 'Accessoire'
                            : item.category === 'cosmetique'
                            ? 'Cosmétique'
                            : 'Vêtement'
                          : item.category === 'accessoires'
                          ? 'إكسسوار'
                          : item.category === 'cosmetique'
                          ? 'تجميل'
                          : 'ملابس'}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-50 hover:text-pink-500 transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={14} />
                        </motion.button>
                        <span className="w-8 text-center font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-50 hover:text-pink-500 transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={14} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                      <div className="font-display text-lg sm:text-xl font-bold text-pink-600">
                        {(item.price * item.quantity).toLocaleString()} {t('da')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart Button */}
            <motion.button
              onClick={clearCart}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-500 rounded-full text-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash size={16} />
              <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('clearCart')}</span>
            </motion.button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h2 className={`font-display text-xl font-bold text-gray-800 mb-6 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {t('orderSummary')}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('subtotal')}</span>
                  <span className="font-medium text-gray-700">
                    {subtotal.toLocaleString()} {t('da')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('shipping')}</span>
                  <span className="font-medium text-green-600">{t('free')}</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className={`font-semibold text-gray-800 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {t('total')}
                    </span>
                    <span className="font-display text-xl font-bold text-pink-600">
                      {total.toLocaleString()} {t('da')}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => onNavigate('checkout')}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-shadow"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('proceedToCheckout')}</span>
              </motion.button>

              <motion.button
                onClick={() => onNavigate('products')}
                className="w-full mt-3 py-2.5 text-gray-400 hover:text-pink-500 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRTL ? null : <ArrowLeft size={16} className="rtl-flip" />}
                <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('continueShopping')}</span>
                {isRTL ? <ArrowLeft size={16} className="rtl-flip" /> : null}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
