import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/useCart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { lang, dir, t } = useLanguage();
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);
  const isRTL = dir === 'rtl';

  const inCart = items.find(item => item.id === product.id);
  const cartQuantity = inCart?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayName = lang === 'fr' ? product.nameFr : product.nameAr;
  const displayDesc = lang === 'fr' ? product.descriptionFr : product.descriptionAr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden border border-pink-100 card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100/50">
        <motion.img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-pink-500/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <motion.button
            onClick={handleAdd}
            className="bg-white text-pink-500 px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 hover:bg-pink-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            {t('addToCart')}
          </motion.button>
        </motion.div>

        {/* Cart Badge */}
        {cartQuantity > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ [isRTL ? 'left' : 'right']: '0.75rem', [isRTL ? 'right' : 'left']: 'auto' }}
          >
            {cartQuantity}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <h3
          className={`font-display font-semibold text-gray-800 mb-1 text-lg leading-tight ${
            lang === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {displayName}
        </h3>
        <p
          className={`text-sm text-gray-400 mb-3 line-clamp-2 ${
            lang === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {displayDesc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-bold text-pink-600">
              {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-pink-400 font-medium">
              {t('da')}
            </span>
          </div>

          <motion.button
            onClick={handleAdd}
            className={`relative p-2.5 rounded-full transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
