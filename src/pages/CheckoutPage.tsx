import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2, Phone, User, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/useCart';
import { wilayas } from '@/data/wilayas';
import { sendOrderEmail } from '@/services/sendOrderEmail';

interface CheckoutPageProps {
  onNavigate: (page: 'home' | 'products' | 'cart') => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  wilaya: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  wilaya?: string;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { lang, dir, t } = useLanguage();
  const { items, subtotal, clearCart } = useCart();
  const isRTL = dir === 'rtl';

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    wilaya: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('enterFirstName');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('enterLastName');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('enterPhone');
    } else if (!/^(0[5-7]\d{8})$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('invalidPhone');
    }
    if (!formData.wilaya) {
      newErrors.wilaya = t('selectWilayaError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const orderDetails = items
        .map(
          (item) =>
            `- ${lang === 'fr' ? item.nameFr : item.nameAr} x${item.quantity} = ${(
              item.price * item.quantity
            ).toLocaleString()} DA`
        )
        .join('\n');

      const selectedWilaya = wilayas.find((w) => w.code === parseInt(formData.wilaya));
      const wilayaName = selectedWilaya
        ? lang === 'fr'
          ? selectedWilaya.nameFr
          : selectedWilaya.nameAr
        : formData.wilaya;

      await sendOrderEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        wilaya: wilayaName,
        orderDetails,
        total: subtotal.toLocaleString(),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      });

      setStatus('success');
      clearCart();
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 pt-24 sm:pt-28 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle size={40} className="text-green-500" />
          </motion.div>
          <h2
            className={`font-display text-2xl font-bold text-gray-800 mb-2 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t('thankYou')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t('contactYou')}
          </p>
          <motion.button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('backToHome')}</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 pb-16" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('cart')}
          className="flex items-center gap-2 text-gray-400 hover:text-pink-500 mb-6 transition-colors"
          whileHover={{ x: isRTL ? 4 : -4 }}
        >
          {isRTL ? null : <ArrowLeft size={18} className="rtl-flip" />}
          <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('continueShopping')}</span>
          {isRTL ? <ArrowLeft size={18} className="rtl-flip" /> : null}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
        >
          <h1
            className={`font-display text-2xl sm:text-3xl font-bold text-gray-800 mb-8 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t('checkoutTitle')}
          </h1>

          {/* Order Summary Mini */}
          <div className="bg-pink-50/50 rounded-xl p-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                {lang === 'fr' ? 'articles' : 'عناصر'}
              </span>
              <span className="font-display text-lg font-bold text-pink-600">
                {subtotal.toLocaleString()} {t('da')}
              </span>
            </div>
          </div>

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              <span>{t('orderError')}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-1.5 ${
                  lang === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {t('firstName')} *
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                  style={{ [isRTL ? 'right' : 'left']: '0.875rem' }}
                />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.firstName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-pink-400 focus:ring-pink-100'
                  } focus:ring-2 transition-all bg-gray-50/50`}
                  placeholder={t('firstName')}
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>
              <AnimatePresence>
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Last Name */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-1.5 ${
                  lang === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {t('lastName')} *
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                  style={{ [isRTL ? 'right' : 'left']: '0.875rem' }}
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.lastName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-pink-400 focus:ring-pink-100'
                  } focus:ring-2 transition-all bg-gray-50/50`}
                  placeholder={t('lastName')}
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>
              <AnimatePresence>
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-1.5 ${
                  lang === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {t('phone')} *
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                  style={{ [isRTL ? 'right' : 'left']: '0.875rem' }}
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-pink-400 focus:ring-pink-100'
                  } focus:ring-2 transition-all bg-gray-50/50`}
                  placeholder="05XX XX XX XX"
                  dir="ltr"
                />
              </div>
              <p className="text-gray-400 text-xs mt-1">{t('phoneFormat')}</p>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Wilaya */}
            <div>
              <label
                className={`block text-sm font-medium text-gray-700 mb-1.5 ${
                  lang === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {t('wilaya')} *
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400 z-10"
                  style={{ [isRTL ? 'right' : 'left']: '0.875rem' }}
                />
                <select
                  value={formData.wilaya}
                  onChange={(e) => handleChange('wilaya', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border appearance-none ${
                    errors.wilaya
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-pink-400 focus:ring-pink-100'
                  } focus:ring-2 transition-all bg-gray-50/50`}
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  <option value="">{t('selectWilaya')}</option>
                  {wilayas.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {lang === 'fr' ? w.nameFr : w.nameAr}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ [isRTL ? 'left' : 'right']: '0.875rem' }}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {errors.wilaya && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.wilaya}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: status === 'sending' ? 1 : 1.02, y: status === 'sending' ? 0 : -1 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('placeOrder')}</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
