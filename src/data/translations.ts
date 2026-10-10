import type { Language } from '@/types';

export const translations = {
  fr: {
    // Navbar
    home: 'Accueil',
    products: 'Produits',
    cart: 'Panier',
    cartEmpty: 'Panier vide',
    language: 'Langue',

    // Hero
    heroTitle: 'Lunéa',
    heroSubtitle: 'Votre destination beauté et mode en Algérie',
    shopNow: 'Acheter Maintenant',

    // Categories
    accessoires: 'Accessoires',
    cosmetique: 'Produits Cosmétiques',
    vetements: 'Vêtements',
    viewAll: 'Voir Tout',

    // Products
    addToCart: 'Ajouter au Panier',
    price: 'Prix',
    da: 'DA',
    discover: 'Découvrir nos produits',
    ourCategories: 'Nos Catégories',

    // Cart
    shoppingCart: 'Panier',
    cartItems: 'articles dans votre panier',
    emptyCart: 'Votre panier est vide',
    continueShopping: 'Continuer vos achats',
    orderSummary: 'Récapitulatif',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuite',
    total: 'Total',
    clearCart: 'Vider le Panier',
    remove: 'Supprimer',
    checkout: 'Commander',
    proceedToCheckout: 'Passer la Commande',
    quantity: 'Quantité',

    // Checkout
    checkoutTitle: 'Finaliser votre Commande',
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Numéro de Téléphone',
    wilaya: 'Wilaya',
    selectWilaya: 'Sélectionnez votre wilaya',
    requiredField: 'Ce champ est obligatoire',
    invalidPhone: 'Numéro de téléphone invalide',
    placeOrder: 'Confirmer la Commande',
    orderSuccess: 'Commande envoyée avec succès !',
    orderError: 'Une erreur est survenue. Veuillez réessayer.',
    thankYou: 'Merci pour votre commande !',
    contactYou: 'Nous vous contacterons bientôt pour confirmer votre commande.',
    backToHome: 'Retour à l\'accueil',

    // Footer
    footerText: 'Votre boutique en ligne de confiance en Algérie',
    allRightsReserved: 'Tous droits réservés',
    contact: 'Contact',

    // Validation
    enterFirstName: 'Veuillez entrer votre prénom',
    enterLastName: 'Veuillez entrer votre nom',
    enterPhone: 'Veuillez entrer votre numéro de téléphone',
    selectWilayaError: 'Veuillez sélectionner votre wilaya',
    phoneFormat: 'Format: 05XX XX XX XX ou 06XX XX XX XX ou 07XX XX XX XX',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    products: 'المنتجات',
    cart: 'سلة التسوق',
    cartEmpty: 'سلة فارغة',
    language: 'اللغة',

    // Hero
    heroTitle: 'Lunéa',
    heroSubtitle: 'وجهتك للجمال والأناقة في الجزائر',
    shopNow: 'تسوق الآن',

    // Categories
    accessoires: 'إكسسوارات',
    cosmetique: 'منتجات التجميل',
    vetements: 'ملابس',
    viewAll: 'عرض الكل',

    // Products
    addToCart: 'أضف إلى السلة',
    price: 'السعر',
    da: 'د.ج',
    discover: 'اكتشف منتجاتنا',
    ourCategories: 'فئاتنا',

    // Cart
    shoppingCart: 'سلة التسوق',
    cartItems: 'عناصر في سلتك',
    emptyCart: 'سلة التسوق فارغة',
    continueShopping: 'مواصلة التسوق',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    shipping: 'التوصيل',
    free: 'مجاني',
    total: 'المجموع',
    clearCart: 'إفراغ السلة',
    remove: 'حذف',
    checkout: 'طلب',
    proceedToCheckout: 'تأكيد الطلب',
    quantity: 'الكمية',

    // Checkout
    checkoutTitle: 'إتمام طلبك',
    firstName: 'الاسم',
    lastName: 'اللقب',
    phone: 'رقم الهاتف',
    wilaya: 'الولاية',
    selectWilaya: 'اختر ولايتك',
    requiredField: 'هذا الحقل مطلوب',
    invalidPhone: 'رقم هاتف غير صالح',
    placeOrder: 'تأكيد الطلب',
    orderSuccess: 'تم إرسال الطلب بنجاح!',
    orderError: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    thankYou: 'شكراً لطلبك!',
    contactYou: 'سن contactك قريباً لتأكيد طلبك.',
    backToHome: 'العودة إلى الرئيسية',

    // Footer
    footerText: 'متجرك الإلكتروني الموثوق في الجزائر',
    allRightsReserved: 'جميع الحقوق محفوظة',
    contact: 'اتصل بنا',

    // Validation
    enterFirstName: 'يرجى إدخال اسمك',
    enterLastName: 'يرجى إدخال لقبك',
    enterPhone: 'يرجى إدخال رقم هاتفك',
    selectWilayaError: 'يرجى اختيار ولايتك',
    phoneFormat: 'الصيغة: 05XX XX XX XX أو 06XX XX XX XX أو 07XX XX XX XX',
  },
} as const;

export type Translations = typeof translations.fr;

export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key] || key;
}

export const categoryNames: Record<Category, Record<Language, string>> = {
  accessoires: { fr: 'Accessoires', ar: 'إكسسوارات' },
  cosmetique: { fr: 'Produits Cosmétiques', ar: 'منتجات التجميل' },
  vetements: { fr: 'Vêtements', ar: 'ملابس' },
};

import type { Category } from '@/types';
