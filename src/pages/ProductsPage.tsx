import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import type { Category } from '@/types';

const categoryIcons: Record<Category, string> = {
  accessoires: '💎',
  cosmetique: '✨',
  vetements: '👗',
};

const categoryOrder: Category[] = ['accessoires', 'cosmetique', 'vetements'];

export default function ProductsPage() {
  const { lang, dir, t } = useLanguage();
  const isRTL = dir === 'rtl';

  const getCategoryTitle = (cat: Category) => {
    if (lang === 'fr') {
      return cat === 'accessoires'
        ? 'Accessoires'
        : cat === 'cosmetique'
        ? 'Produits Cosmétiques'
        : 'Vêtements';
    }
    return cat === 'accessoires'
      ? 'إكسسوارات'
      : cat === 'cosmetique'
      ? 'منتجات التجميل'
      : 'ملابس';
  };

  const getCategoryDesc = (cat: Category) => {
    if (lang === 'fr') {
      return cat === 'accessoires'
        ? 'Bijoux, montres et accessoires tendance'
        : cat === 'cosmetique'
        ? 'Maquillage, soins et parfums'
        : 'Mode et vêtements chic';
    }
    return cat === 'accessoires'
      ? 'مجوهرات، ساعات وإكسسوارات عصرية'
      : cat === 'cosmetique'
      ? 'مكياج، عناية وعطور'
      : 'موضة وملابس أنيقة';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 pt-24 sm:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full text-pink-500 text-sm font-medium mb-4">
            <Package size={16} />
            <span className={lang === 'ar' ? 'font-arabic' : ''}>{t('ourCategories')}</span>
          </div>
          <h1
            className={`font-display text-4xl sm:text-5xl font-bold text-gray-800 mb-3 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t('discover')}
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Explorez notre collection soigneusement sélectionnée pour vous'
              : 'استكشف مجموعتنا المختارة بعناية من أجلك'}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {categoryOrder.map((category, catIndex) => {
            const categoryProducts = products.filter((p) => p.category === category);

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                {/* Category Header */}
                <div
                  className="flex items-center gap-4 mb-8"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-200">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                  </div>
                  <div>
                    <h2
                      className={`font-display text-2xl sm:text-3xl font-bold text-gray-800 ${
                        lang === 'ar' ? 'font-arabic' : ''
                      }`}
                    >
                      {getCategoryTitle(category)}
                    </h2>
                    <p className="text-gray-400 text-sm mt-0.5">
                      {getCategoryDesc(category)}
                    </p>
                  </div>
                  <div className="hidden sm:block ml-auto">
                    <span className="text-sm text-pink-400 font-medium bg-pink-50 px-3 py-1 rounded-full">
                      {categoryProducts.length} {lang === 'fr' ? 'produits' : 'منتجات'}
                    </span>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
