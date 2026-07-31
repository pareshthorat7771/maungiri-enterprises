import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { translations } from './translations'
import { 
  ShoppingCart, Plus, Minus, Trash2, User, LogOut,
  Settings, Package, Search, X, Menu, Star, Phone,
  MessageCircle, MapPin, ChevronRight, ShieldCheck,
  Truck, Clock, SlidersHorizontal, Upload, Award,
  Users, Building2, CheckCircle2, QrCode, Copy, Check,
  CreditCard, Wallet, Smartphone, Lock, ArrowLeft, BadgeCheck
} from 'lucide-react'

// ===== CONSTANTS =====
const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
const WHATSAPP_NUMBER = '919270726556'
const UPI_ID = 'maungirienterprises@okhdfcbank'
const MERCHANT_NAME = 'Maungiri Enterprises'

// ===== IMAGE COMPONENT WITH FALLBACK =====
const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setImgSrc(src || FALLBACK_IMAGE)
    setLoading(true)
  }, [src])
  
  const handleError = useCallback(() => {
    setImgSrc(FALLBACK_IMAGE)
    setLoading(false)
  }, [])
  
  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <div className={`${className || ''} bg-slate-200 animate-pulse`} />
  }

  return (
    <img
      src={imgSrc}
      alt={alt || 'Product image'}
      className={className || ''}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
    />
  )
}

// ===== IMAGE UPLOAD COMPONENT =====
const ImageUpload = ({ onImageSelect, currentImage, label }) => {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(currentImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [])

  const handleFileSelect = useCallback((file) => {
    if (!file) return
    setError('')
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP)')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`Image too large! Maximum ${MAX_IMAGE_SIZE / 1024 / 1024}MB allowed`)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      try {
        const result = reader.result
        setPreview(result)
        onImageSelect(result)
      } catch (err) {
        setError('Failed to read image file')
      }
    }
    reader.onerror = () => setError('Failed to read image file')
    reader.readAsDataURL(file)
  }, [onImageSelect])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        role="button"
        tabIndex={0}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging ? 'border-[#C9A84C] bg-[#C9A84C]/5' : preview ? 'border-green-400 bg-green-50/50' : 'border-slate-300 hover:border-[#C9A84C] hover:bg-slate-50'
        }`}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) handleFileSelect(file) }} className="hidden" />
        {preview ? (
          <div className="relative">
            <ImageWithFallback src={preview} alt="Product preview" className="max-h-48 mx-auto rounded-lg object-contain" />
            <button onClick={(e) => { e.stopPropagation(); setPreview(null); onImageSelect(''); setError(''); if (fileInputRef.current) fileInputRef.current.value = '' }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition">×</button>
            <p className="text-xs text-slate-500 mt-2">Click to change or drag new image</p>
          </div>
        ) : (
          <div>
            <Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-600 font-medium">Upload Product Image</p>
            <p className="text-xs text-slate-400 mt-1">Click or drag & drop (PNG, JPG, WEBP)</p>
          </div>
        )}
        {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      </div>
    </div>
  )
}

// ===== DATA (Inline to avoid extra files) =====
const categoryImages = {
  'Plastic Chairs': 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600',
  'Wooden Furniture': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
  'Designer Chairs': 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&q=80&w=600',
  'Cafe Chairs': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
  'Wooden Sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
  'Wardrobes': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600',
  'Sofa Cum Beds': 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&q=80&w=600',
  'Writing Tables': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600',
  'Appliances': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600'
}

// Generate mock products
const generateProducts = () => {
  const products = []
  const productGenerators = [
    { count: 12, idStart: 1, namePrefix: 'Ergonomic Executive Plastic Chair', category: 'Plastic Chairs', brands: ['Nilkamal', 'Cello', 'Vermora'], basePrice: 1200, priceIncrement: 150, image: categoryImages['Plastic Chairs'], ratingBase: 4.2, reviewsBase: 24, reviewsIncrement: 5, isNewCount: 3 },
    { count: 12, idStart: 20, namePrefix: 'Solid Teak Wooden', nameSuffix: ['Storage Shelf', 'Dining Table', 'Console Cabinet', 'Drawer Chest'], category: 'Wooden Furniture', brands: ['National', 'Mango', 'Vermora'], basePrice: 8500, priceIncrement: 450, image: categoryImages['Wooden Furniture'], ratingBase: 4.5, reviewsBase: 42, reviewsIncrement: 3, isNewCount: 2 },
    { count: 10, idStart: 40, namePrefix: 'Luxury Lounge Wooden Sofa', nameSuffix: '-Seater', category: 'Wooden Sofas', brands: ['Mango', 'National', 'Vermora'], basePrice: 18500, priceIncrement: 1200, image: categoryImages['Wooden Sofas'], ratingBase: 4.8, reviewsBase: 89, reviewsIncrement: 0, isNewCount: 2 },
    { count: 8, idStart: 60, namePrefix: 'Modern Designer Chair', category: 'Designer Chairs', brands: ['Cello', 'Nilkamal', 'National'], basePrice: 3200, priceIncrement: 200, image: categoryImages['Designer Chairs'], ratingBase: 4.3, reviewsBase: 18, reviewsIncrement: 4, isNewCount: 2 },
    { count: 8, idStart: 75, namePrefix: 'Commercial Cafe Chair', category: 'Cafe Chairs', brands: ['Vermora', 'Mango', 'Cello'], basePrice: 1800, priceIncrement: 80, image: categoryImages['Cafe Chairs'], ratingBase: 4.1, reviewsBase: 12, reviewsIncrement: 3, isNewCount: 0 },
    { count: 10, idStart: 90, namePrefix: 'Premium Wardrobe', category: 'Wardrobes', brands: ['Nilkamal', 'Mango', 'National'], basePrice: 12000, priceIncrement: 500, image: categoryImages['Wardrobes'], ratingBase: 4.6, reviewsBase: 30, reviewsIncrement: 5, isNewCount: 2 },
    { count: 8, idStart: 105, namePrefix: 'Convertible Sofa Cum Bed', category: 'Sofa Cum Beds', brands: ['Cello', 'Vermora', 'Mango'], basePrice: 15000, priceIncrement: 600, image: categoryImages['Sofa Cum Beds'], ratingBase: 4.4, reviewsBase: 25, reviewsIncrement: 4, isNewCount: 0 },
    { count: 10, idStart: 120, namePrefix: 'Executive Writing Table', category: 'Writing Tables', brands: ['National', 'Nilkamal', 'Cello'], basePrice: 3500, priceIncrement: 180, image: categoryImages['Writing Tables'], ratingBase: 4.2, reviewsBase: 15, reviewsIncrement: 3, isNewCount: 3 }
  ]

  productGenerators.forEach((gen) => {
    for (let i = 0; i < gen.count; i++) {
      const name = gen.nameSuffix ? `${gen.namePrefix} ${gen.nameSuffix[i % gen.nameSuffix.length]}` : `${gen.namePrefix} ${i + 1}`
      products.push({
        id: gen.idStart + i, name, category: gen.category, brand: gen.brands[i % gen.brands.length],
        price: gen.basePrice + i * gen.priceIncrement,
        originalPrice: i % 2 === 0 ? gen.basePrice + i * gen.priceIncrement + 600 : null,
        description: `Premium ${gen.category.toLowerCase()} with superior craftsmanship.`,
        image: gen.image, rating: (gen.ratingBase + (i % 8) * 0.1).toFixed(1),
        reviews: gen.reviewsBase + i * gen.reviewsIncrement, inStock: true, isNew: i < gen.isNewCount,
        colors: ['White', 'Black', 'Teak']
      })
    }
  })
  // Add appliances
  for (let i = 0; i < 10; i++) {
    products.push({
      id: 135 + i,
      name: ['Premium Television', 'Smart AC', 'Refrigerator', 'Air Cooler Pro', 'Designer Fans', 'Mixer', 'Smart Induction', 'Electric Kettle', 'Water Heater', 'Chimney'][i],
      category: 'Appliances', brand: ['Haier', 'Whirlpool', 'Bajaj', 'Havells', 'Crompton'][i % 5],
      price: 5000 + i * 500, originalPrice: i % 2 === 0 ? 6000 + i * 500 : null,
      description: 'Premium home appliance with smart features.', image: categoryImages['Appliances'],
      rating: (4.3 + (i % 5) * 0.1).toFixed(1), reviews: 20 + i * 4, inStock: true, isNew: i < 3,
      colors: ['White', 'Silver', 'Black']
    })
  }
  return products
}

const reviews = [
  { name: 'Rajesh Patel', rating: 5, text: 'Exceptional quality and craftsmanship.', date: '2 weeks ago' },
  { name: 'Sneha Sharma', rating: 5, text: 'Premium products with outstanding service.', date: '1 month ago' },
  { name: 'Vikram Singh', rating: 4, text: 'Beautiful furniture with attention to detail.', date: '2 months ago' },
  { name: 'Priya Desai', rating: 5, text: 'The best furniture store in Nashik.', date: '3 months ago' },
]

// ===== MAIN APP =====
export default function App() {
  // ===== STATE =====
  const [language, setLanguage] = useState(() => { try { return localStorage.getItem('maungiri_language') || 'en' } catch { return 'en' } })
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState(() => { try { const saved = localStorage.getItem('maungiri_cart'); return saved ? JSON.parse(saved) : [] } catch { return [] } })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentStep, setPaymentStep] = useState('select')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [upiCopied, setUpiCopied] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [products, setProducts] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [toastQueue, setToastQueue] = useState([])

  const getText = useCallback((key) => { if (!key) return ''; return translations[language]?.[key] || translations.en?.[key] || key }, [language])

  // ===== TOAST =====
  const showNotification = useCallback((message) => setToastQueue(prev => [...prev, message]), [])
  useEffect(() => { if (toastQueue.length > 0 && !showToast) { setToastMessage(toastQueue[0]); setShowToast(true); setToastQueue(prev => prev.slice(1)) } }, [toastQueue, showToast])
  useEffect(() => { if (showToast) { const timer = setTimeout(() => setShowToast(false), 3000); return () => clearTimeout(timer) } }, [showToast])

  // ===== PERSISTENCE =====
  useEffect(() => { try { localStorage.setItem('maungiri_language', language) } catch (e) { console.error(e) } }, [language])
  useEffect(() => { try { localStorage.setItem('maungiri_cart', JSON.stringify(cart)) } catch (e) { console.error(e) } }, [cart])
  useEffect(() => { if (products.length > 0) { const timeoutId = setTimeout(() => { try { localStorage.setItem('maungiri_products', JSON.stringify(products)) } catch (e) { console.error(e) } }, 500); return () => clearTimeout(timeoutId) } }, [products])

  // ===== INIT =====
  const initialProducts = useMemo(() => generateProducts(), [])
  useEffect(() => {
    setIsLoading(true)
    try {
      const saved = localStorage.getItem('maungiri_products')
      if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length > 0) { setProducts(parsed); setIsLoading(false); return } }
      setProducts(initialProducts)
    } catch (e) { console.error(e); setProducts(initialProducts) }
    setIsLoading(false)
  }, [initialProducts])

  // ===== CATEGORIES =====
  const categories = useMemo(() => {
    const categoryNames = ['Plastic Chairs', 'Wooden Furniture', 'Designer Chairs', 'Cafe Chairs', 'Wooden Sofas', 'Wardrobes', 'Sofa Cum Beds', 'Writing Tables']
    return categoryNames.map(name => ({ name, desc: '', count: products.filter(p => p.category === name).length }))
  }, [products])
  const brands = useMemo(() => ['Nilkamal', 'Cello', 'Vermora', 'National', 'Mango', 'Haier', 'Whirlpool', 'Bajaj', 'Havells', 'Crompton'], [])

  // ===== FILTER =====
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const searchTrimmed = searchTerm.trim().toLowerCase()
      if (searchTrimmed === '') return matchesCategory
      const matchesSearch = (product.name || '').toLowerCase().includes(searchTrimmed) || (product.brand || '').toLowerCase().includes(searchTrimmed) || (product.category || '').toLowerCase().includes(searchTrimmed)
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchTerm])

  // ===== CART =====
  const getTotalPrice = useCallback(() => { if (!cart || cart.length === 0) return 0; return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0) }, [cart])
  const getTotalItems = useCallback(() => { if (!cart || cart.length === 0) return 0; return cart.reduce((total, item) => total + (item.quantity || 0), 0) }, [cart])
  const addToCart = useCallback((product) => { if (!product || !product.id) return; setCart(prev => { const existing = prev.find(item => item.id === product.id); if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item); return [...prev, { ...product, quantity: 1 }] }); showNotification(`${product.name || 'Product'} added to cart!`) }, [showNotification])
  const removeFromCart = useCallback((id) => { setCart(prev => prev.filter(item => item.id !== id)); showNotification('Item removed') }, [showNotification])
  const updateQuantity = useCallback((id, amount) => { setCart(prev => prev.map(item => { if (item.id === id) { const newQty = (item.quantity || 0) + amount; if (newQty <= 0) return null; return { ...item, quantity: newQty } } return item }).filter(Boolean)) }, [])

  // ===== PAYMENT =====
  const generateOrderId = useCallback(() => `MGR${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`, [])
  const getUpiQrImage = useCallback((amount) => `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=INR`)}`, [])
  const handleCopyUpi = useCallback(() => { try { navigator.clipboard.writeText(UPI_ID); setUpiCopied(true); setTimeout(() => setUpiCopied(false), 2000) } catch (e) { showNotification('Could not copy UPI ID') } }, [showNotification])
  const openCheckout = useCallback(() => { if (cart.length === 0) return; setShowCart(false); setPaymentStep('select'); setSelectedPaymentMethod(null); setShowPayment(true) }, [cart])
  const buyNow = useCallback((product) => { if (!product || !product.id) return; setCart(prev => { const existing = prev.find(item => item.id === product.id); if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item); return [...prev, { ...product, quantity: 1 }] }); setShowCart(false); setPaymentStep('select'); setSelectedPaymentMethod(null); setShowPayment(true) }, [])
  const confirmOrder = useCallback((method) => { const orderId = generateOrderId(); const order = { id: orderId, items: cart, total: getTotalPrice(), method, date: new Date().toISOString() }; setLastOrder(order); setSelectedPaymentMethod(method); setPaymentStep('success'); setCart([]); showNotification('Order placed successfully!') }, [cart, getTotalPrice, generateOrderId, showNotification])
  const closePaymentModal = useCallback(() => { setShowPayment(false); setPaymentStep('select'); setSelectedPaymentMethod(null) }, [])

  // ===== ADMIN =====
  const addProduct = useCallback((product) => { if (!product.name || !product.price) { showNotification('Please fill in all required fields'); return false }; if (!product.image) { showNotification('Please upload a product image'); return false }; const newProduct = { ...product, id: Date.now() + Math.floor(Math.random() * 10000), price: parseInt(product.price) || 0, rating: '4.5', reviews: 0, inStock: true }; setProducts(prev => [...prev, newProduct]); showNotification('Product added!'); return true }, [showNotification])
  const removeProduct = useCallback((id) => { if (window.confirm('Are you sure?')) { setProducts(prev => prev.filter(p => p.id !== id)); showNotification('Product removed!') } }, [showNotification])

  // ===== AUTH =====
  const handleLogin = useCallback((e) => { e.preventDefault(); if (loginEmail === 'admin@maungiri.com' && loginPassword === 'admin123') { setIsLoggedIn(true); setIsAdmin(true); setShowLogin(false); setLoginEmail(''); setLoginPassword(''); showNotification('Welcome Admin!') } else if (loginEmail && loginPassword) { setIsLoggedIn(true); setIsAdmin(false); setShowLogin(false); setLoginEmail(''); setLoginPassword(''); showNotification('Login Successful!') } else { showNotification('Please enter email and password') } }, [loginEmail, loginPassword, showNotification])
  const handleLogout = useCallback(() => { setIsLoggedIn(false); setIsAdmin(false); setLoginEmail(''); setLoginPassword(''); showNotification('Logged out') }, [showNotification])

  // ===== LOCK SCROLL =====
  useEffect(() => { document.body.style.overflow = (showCart || showLogin || showMobileMenu || showPayment) ? 'hidden' : 'unset'; return () => { document.body.style.overflow = 'unset' } }, [showCart, showLogin, showMobileMenu, showPayment])

  // ===== TOAST COMPONENT =====
  const Toast = useMemo(() => () => (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} role="alert" aria-live="polite">
      <div className="bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C9A84C]/20 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  ), [showToast, toastMessage])

  // ===== NAVBAR =====
  const Navbar = useMemo(() => () => (
    <nav className="bg-[#0F172A] text-white sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="h-10 w-10 bg-gradient-to-tr from-[#C9A84C] to-[#E6CA78] rounded-lg flex items-center justify-center shadow-lg shadow-[#C9A84c]/20 group-hover:scale-105 transition-transform"><span className="text-[#0F172A] font-extrabold text-xl tracking-wider">M</span></div>
            <div><span className="text-xl font-bold tracking-tight text-white block">MAUNGIRI</span><span className="text-[10px] uppercase font-semibold tracking-widest block text-[#C9A84C] -mt-1">Enterprises</span></div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'products', 'about', 'contact'].map(p => <button key={p} onClick={() => setCurrentPage(p)} className={`text-sm font-medium transition ${currentPage === p ? 'text-[#C9A84C]' : 'text-slate-300 hover:text-white'}`}>{getText(p)}</button>)}
            {isAdmin && <button onClick={() => setCurrentPage('admin')} className="text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1.5 rounded-full hover:bg-[#C9A84C] hover:text-[#0F172A] transition flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> {getText('admin')}</button>}
          </div>
          <div className="hidden md:flex items-center space-x-5 border-l border-slate-800 pl-6">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-800/80 text-xs text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-700 focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"><option value="en">English</option><option value="hi">हिन्दी</option><option value="mr">मराठी</option></select>
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-slate-800/60 px-2.5 py-1.5 rounded-full border border-slate-700/60"><QrCode className="w-3 h-3 text-[#C9A84C]" /> UPI Accepted</div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1ebf59] text-white px-4 py-2 rounded-md transition text-xs font-semibold flex items-center gap-2 shadow-sm"><MessageCircle className="w-4 h-4" /> {getText('whatsapp')}</a>
            <button onClick={() => setShowCart(true)} className="relative p-2 text-slate-300 hover:text-white transition"><ShoppingCart className="w-5 h-5" />{getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#0F172A] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">{getTotalItems()}</span>}</button>
            {isLoggedIn ? <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-red-400 transition"><LogOut className="w-5 h-5" /></button> : <button onClick={() => setShowLogin(true)} className="p-2 text-slate-300 hover:text-white transition"><User className="w-5 h-5" /></button>}
          </div>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-slate-300 hover:text-white">{showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      {showMobileMenu && <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-6 space-y-4">
        {['home', 'products', 'about', 'contact'].map(p => <button key={p} onClick={() => { setCurrentPage(p); setShowMobileMenu(false) }} className="block w-full text-left text-slate-300 font-medium py-2">{getText(p)}</button>)}
        {isAdmin && <button onClick={() => { setCurrentPage('admin'); setShowMobileMenu(false) }} className="block w-full text-left text-[#C9A84C] font-medium py-2">{getText('admin')}</button>}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <button onClick={() => { setShowCart(true); setShowMobileMenu(false) }} className="text-slate-300 font-medium flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> {getText('cart')} ({getTotalItems()})</button>
          {isLoggedIn ? <button onClick={handleLogout} className="text-red-400 font-medium">{getText('logout')}</button> : <button onClick={() => { setShowLogin(true); setShowMobileMenu(false) }} className="text-[#C9A84C] font-medium">{getText('login')}</button>}
        </div>
      </div>}
    </nav>
  ), [language, currentPage, isAdmin, isLoggedIn, getTotalItems, getText, handleLogout, showMobileMenu])

  // ===== LOGIN MODAL =====
  const LoginModal = useMemo(() => () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-slate-900">{isRegistering ? getText('createAccount') : getText('login')}</h2><button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button></div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('email')}</label><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" placeholder="your@email.com" required /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('password')}</label><input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" placeholder="••••••••" required /></div>
            <button type="submit" className="w-full bg-[#0F172A] text-white py-3 rounded-lg hover:bg-slate-800 transition font-bold">{isRegistering ? getText('createAccount') : getText('login')}</button>
          </div>
        </form>
        <p className="text-center text-sm text-slate-500 mt-4">{isRegistering ? getText('alreadyHaveAccount') : getText('dontHaveAccount')}<button onClick={() => setIsRegistering(!isRegistering)} className="text-[#C9A84C] hover:underline ml-1">{isRegistering ? getText('login') : getText('register')}</button></p>
      </div>
    </div>
  ), [isRegistering, loginEmail, loginPassword, getText, handleLogin])

  // ===== CART MODAL =====
  const CartModal = useMemo(() => () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end" onClick={() => setShowCart(false)}>
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-shrink-0"><h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-[#C9A84C]" /> {getText('cart')}</h2><button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button></div>
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100">
          {cart.length === 0 ? <div className="text-center py-20 text-slate-400"><ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" /><p className="font-medium text-slate-600">{getText('emptyCart')}</p></div> : cart.map((item) => (
            <div key={item.id} className="py-4 flex gap-4 items-center">
              <ImageWithFallback src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0" />
              <div className="flex-1 min-w-0"><h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4><p className="text-xs font-bold text-[#C9A84C] mt-0.5">₹{item.price?.toLocaleString('en-IN') || 0}</p></div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200"><Minus className="w-3.5 h-3.5" /></button>
                <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity || 0}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200"><Plus className="w-3.5 h-3.5" /></button>
                <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:text-red-700 ml-1"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3 flex-shrink-0">
          <div className="flex justify-between items-center font-bold text-slate-900 text-base"><span>{getText('total')}:</span><span className="text-[#C9A84C] text-xl">₹{getTotalPrice().toLocaleString('en-IN')}</span></div>
          <button onClick={openCheckout} className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E6CA78] hover:from-[#b8973b] hover:to-[#d4b968] text-[#0F172A] text-center font-bold py-3.5 rounded-lg transition shadow-lg shadow-[#C9A84C]/20 text-sm flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> {getText('proceedToCheckout')}</button>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${getText('orderRequest')}:\n${cart.map(i => `- ${i.name} (${getText('qty')}: ${i.quantity})`).join('\n')}\n${getText('total')}: ₹${getTotalPrice()}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#1ebf59] text-white text-center font-bold py-3 rounded-lg transition shadow text-sm">{getText('orderOnWhatsApp')}</a>
        </div>}
      </div>
    </div>
  ), [cart, getText, getTotalPrice, updateQuantity, removeFromCart, openCheckout])

  // ===== PAYMENT MODAL =====
  const PaymentModal = useMemo(() => () => {
    const total = paymentStep === 'success' ? (lastOrder?.total || 0) : getTotalPrice()
    return (
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
            <div className="flex items-center gap-2">
              {paymentStep !== 'select' && paymentStep !== 'success' && <button onClick={() => setPaymentStep('select')} className="text-slate-400 hover:text-slate-600 mr-1"><ArrowLeft className="w-5 h-5" /></button>}
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">{paymentStep === 'success' ? <><CheckCircle2 className="w-5 h-5 text-green-500" /> {getText('orderConfirmed')}</> : <><Lock className="w-5 h-5 text-[#C9A84C]" /> {getText('checkout')}</>}</h2>
            </div>
            <button onClick={closePaymentModal} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-6 space-y-5">
            {/* SELECT STEP */}
            {paymentStep === 'select' && <>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100"><p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{getText('orderSummary')}</p><div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin">{cart.map(item => <div key={item.id} className="flex justify-between text-sm"><span className="text-slate-600 truncate pr-2">{item.name} × {item.quantity}</span><span className="font-semibold text-slate-800 shrink-0">₹{((item.price || 0) * (item.quantity || 0)).toLocaleString('en-IN')}</span></div>)}</div><div className="flex justify-between items-center font-bold text-slate-900 text-base mt-3 pt-3 border-t border-slate-200"><span>{getText('total')}</span><span className="text-[#C9A84C] text-xl">₹{total.toLocaleString('en-IN')}</span></div></div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{getText('choosePaymentMethod')}</p>
              <div className="space-y-3">
                <button onClick={() => setPaymentStep('upi')} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-[#C9A84C]/40 bg-[#C9A84C]/5 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition text-left"><div className="p-2.5 rounded-lg bg-[#0F172A] text-[#C9A84C] shrink-0"><QrCode className="w-5 h-5" /></div><div className="flex-1 min-w-0"><p className="font-bold text-slate-900 text-sm flex items-center gap-2">{getText('payWithUPI')}</p><p className="text-xs text-slate-500 mt-0.5">{getText('upiApps')}</p></div><ChevronRight className="w-4 h-4 text-slate-400 shrink-0" /></button>
                <button onClick={() => confirmOrder('cod')} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-left"><div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 shrink-0"><Wallet className="w-5 h-5" /></div><div className="flex-1 min-w-0"><p className="font-bold text-slate-900 text-sm">{getText('cashOnDelivery')}</p><p className="text-xs text-slate-500 mt-0.5">{getText('codDescription')}</p></div><ChevronRight className="w-4 h-4 text-slate-400 shrink-0" /></button>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${getText('orderRequest')}:\n${cart.map(i => `- ${i.name} (${getText('qty')}: ${i.quantity})`).join('\n')}\n${getText('total')}: ₹${total}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => confirmOrder('whatsapp')} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition text-left"><div className="p-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] shrink-0"><MessageCircle className="w-5 h-5" /></div><div className="flex-1 min-w-0"><p className="font-bold text-slate-900 text-sm">{getText('payViaWhatsApp')}</p><p className="text-xs text-slate-500 mt-0.5">{getText('whatsappDescription')}</p></div><ChevronRight className="w-4 h-4 text-slate-400 shrink-0" /></a>
              </div>
            </>}
            {/* UPI STEP */}
            {paymentStep === 'upi' && <>
              <div className="text-center"><p className="text-sm text-slate-500">{getText('scanToPay')}</p><p className="text-3xl font-black text-slate-900 mt-1">₹{total.toLocaleString('en-IN')}</p></div>
              <div className="flex justify-center"><div className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm pulse-gold"><img src={getUpiQrImage(total)} alt="UPI QR Code" className="w-56 h-56" loading="lazy" /></div></div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100"><p className="text-xs font-semibold text-slate-500 mb-2">{getText('orPayUsingUPIId')}</p><div className="flex items-center gap-2"><code className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 truncate">{UPI_ID}</code><button onClick={handleCopyUpi} className={`shrink-0 px-3.5 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition ${upiCopied ? 'bg-green-500 text-white' : 'bg-[#0F172A] text-white hover:bg-slate-800'}`}>{upiCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{upiCopied ? getText('copied') : getText('copy')}</button></div></div>
              <button onClick={() => confirmOrder('upi')} className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E6CA78] hover:from-[#b8973b] hover:to-[#d4b968] text-[#0F172A] text-center font-bold py-3.5 rounded-lg transition shadow-lg shadow-[#C9A84C]/20 text-sm flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> {getText('iHavePaid')}</button>
            </>}
            {/* SUCCESS STEP */}
            {paymentStep === 'success' && <div className="text-center py-4 space-y-5">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-12 h-12 text-green-500" /></div>
              <div><h3 className="text-lg font-bold text-slate-900">{getText('orderConfirmed')}</h3><p className="text-sm text-slate-500 mt-1">{getText('orderConfirmedDesc')}</p></div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">{getText('orderId')}</span><span className="font-bold text-slate-900">{lastOrder?.id}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">{getText('paymentMethod')}</span><span className="font-bold text-slate-900 capitalize flex items-center gap-1.5">{selectedPaymentMethod === 'upi' && <QrCode className="w-3.5 h-3.5 text-[#C9A84C]" />}{selectedPaymentMethod === 'upi' ? 'UPI' : selectedPaymentMethod === 'cod' ? getText('cashOnDelivery') : 'WhatsApp'}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200"><span className="text-slate-500">{getText('total')}</span><span className="font-black text-[#C9A84C] text-base">₹{total.toLocaleString('en-IN')}</span></div>
              </div>
              <button onClick={() => { closePaymentModal(); setCurrentPage('products') }} className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-bold py-3 rounded-lg transition text-sm">{getText('continueShopping')}</button>
            </div>}
          </div>
        </div>
      </div>
    )
  }, [paymentStep, cart, getText, getTotalPrice, lastOrder, selectedPaymentMethod, upiCopied, handleCopyUpi, confirmOrder, closePaymentModal, getUpiQrImage])

  // ===== PRODUCT CARD =====
  const ProductCard = useCallback(({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col justify-between" onClick={() => { setSelectedProduct(product); setCurrentPage('product-detail') }}>
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.isNew && <span className="absolute top-3 left-3 bg-[#0F172A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{getText('new')}</span>}
        {product.originalPrice && <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{getText('save')} {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>}
        <span className={`absolute bottom-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
      </div>
      <div className="p-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] block mb-1">{product.brand}</span>
        <h3 className="font-semibold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-[#0F172A] transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1.5 mt-2"><div className="flex items-center text-amber-400"><Star className="w-3.5 h-3.5 fill-current" /></div><span className="text-xs font-bold text-slate-700">{product.rating}</span><span className="text-xs text-slate-400">({product.reviews} {getText('reviews')})</span></div>
        <div className="mt-4 flex items-baseline gap-2"><span className="text-xl font-extrabold text-slate-900">₹{product.price?.toLocaleString('en-IN') || 0}</span>{product.originalPrice && <span className="text-xs text-slate-400 line-through">₹{product.originalPrice?.toLocaleString('en-IN') || 0}</span>}</div>
      </div>
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button onClick={(e) => { e.stopPropagation(); addToCart(product) }} className={`bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm ${!product.inStock && 'opacity-50 cursor-not-allowed'}`} disabled={!product.inStock}><ShoppingCart className="w-3.5 h-3.5" /> {product.inStock ? getText('addToCart') : 'Out of Stock'}</button>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Maungiri, I want to inquire about: ${product.name} (₹${product.price})`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1ebf59] text-white text-xs font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm text-center"><MessageCircle className="w-3.5 h-3.5" /> {getText('inquire')}</a>
      </div>
    </div>
  ), [addToCart, getText])

  // ===== ADMIN DASHBOARD =====
  const AdminDashboard = useMemo(() => () => {
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Plastic Chairs', brand: 'Nilkamal', price: '', description: '', image: '' })
    const handleImageSelect = useCallback((base64Image) => setNewProduct(prev => ({...prev, image: base64Image})), [])
    const handleAddProduct = useCallback((e) => { e.preventDefault(); const success = addProduct(newProduct); if (success) setNewProduct({ name: '', category: 'Plastic Chairs', brand: 'Nilkamal', price: '', description: '', image: '' }) }, [newProduct, addProduct])
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8"><Settings className="w-8 h-8 text-[#C9A84C]" /><h1 className="text-3xl font-extrabold text-slate-900">{getText('adminDashboard')}</h1></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-[#C9A84C]" /> {getText('addNewProduct')}</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('productName')} *</label><input type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" required /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('category')} *</label><select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20">{categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('brand')}</label><select value={newProduct.brand} onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20">{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('price')} (₹) *</label><input type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" required min="1" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">{getText('description')}</label><textarea value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" rows="2" /></div>
                <ImageUpload onImageSelect={handleImageSelect} currentImage={newProduct.image} label="Product Image *" />
                <button type="submit" className="w-full bg-[#0F172A] text-white py-3 rounded-lg hover:bg-slate-800 transition font-bold flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> {getText('addProduct')}</button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm"><h2 className="text-xl font-bold text-slate-900 mb-4">{getText('productStats')}</h2><div className="grid grid-cols-2 gap-4"><div className="bg-slate-50 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-slate-900">{products.length}</p><p className="text-sm text-slate-500">{getText('totalProducts')}</p></div><div className="bg-slate-50 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-slate-900">{categories.length}</p><p className="text-sm text-slate-500">{getText('categories')}</p></div><div className="bg-slate-50 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-slate-900">{brands.length}</p><p className="text-sm text-slate-500">{getText('brands')}</p></div><div className="bg-slate-50 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-slate-900">{cart.length}</p><p className="text-sm text-slate-500">{getText('cartItems')}</p></div></div></div>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-8 shadow-sm overflow-hidden"><h2 className="text-xl font-bold text-slate-900 mb-4">{getText('manageProducts')}</h2><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left">{getText('image')}</th><th className="px-4 py-3 text-left">{getText('name')}</th><th className="px-4 py-3 text-left">{getText('category')}</th><th className="px-4 py-3 text-left">{getText('price')}</th><th className="px-4 py-3 text-left">{getText('action')}</th></tr></thead><tbody>{products.slice(0, 10).map(p => (<tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 transition"><td className="px-4 py-3"><ImageWithFallback src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" /></td><td className="px-4 py-3 font-medium">{p.name}</td><td className="px-4 py-3 text-slate-500">{p.category}</td><td className="px-4 py-3 font-bold text-[#C9A84C]">₹{p.price?.toLocaleString() || 0}</td><td className="px-4 py-3"><button onClick={() => removeProduct(p.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1"><Trash2 className="w-4 h-4" /> {getText('remove')}</button></td></tr>))}</tbody></table></div></div>
        </div>
      </div>
    )
  }, [products, categories, brands, cart, getText, addProduct, removeProduct])

  // ===== HOME PAGE =====
  const HomePage = useMemo(() => () => (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-[#0F172A] text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(#2a3a4a_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold uppercase tracking-wider"><ShieldCheck className="w-4 h-4" /> {getText('trustedSince')}</div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">{getText('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#F3E2B3]">{getText('heroHighlight')}</span></h1>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">{getText('heroDescription')}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => setCurrentPage('products')} className="bg-[#C9A84C] hover:bg-[#b8973b] text-[#0F172A] font-bold px-8 py-3.5 rounded-lg transition shadow-xl flex items-center gap-2">{getText('exploreCatalog')} <ChevronRight className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage('contact')} className="border border-slate-700 hover:border-slate-500 text-white font-medium px-8 py-3.5 rounded-lg transition hover:bg-slate-800/50">{getText('getQuote')}</button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80"><div><p className="text-2xl font-black text-white">10+ {getText('years')}</p><p className="text-xs text-slate-400">{getText('expertise')}</p></div><div><p className="text-2xl font-black text-white">150+ {getText('designs')}</p><p className="text-xs text-slate-400">{getText('catalog')}</p></div><div><p className="text-2xl font-black text-white">4.8 / 5.0</p><p className="text-xs text-slate-400">{getText('rating')}</p></div></div>
            </div>
            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
                <ImageWithFallback src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" alt="Modern Luxury Interior" className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50"><p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">{getText('showroom')}</p><p className="text-sm font-semibold text-white mt-1">Shramik Nagar, Gangapur Road, Nashik</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white border-b border-slate-200/80"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-4 gap-8">{[{ icon: ShieldCheck, text: 'certifiedQuality', sub: 'virginPolymer' }, { icon: Truck, text: 'statewideShipping', sub: 'fastDelivery' }, { icon: SlidersHorizontal, text: 'customManufacturing', sub: 'tailoredDimensions' }, { icon: Clock, text: 'freeMeasurement', sub: 'professionalConsultation' }].map((item, i) => (<div key={i} className="flex items-center gap-4"><div className="p-3 rounded-lg bg-amber-50 text-[#C9A84C]"><item.icon className="w-6 h-6" /></div><div><h4 className="font-bold text-slate-900 text-sm">{getText(item.text)}</h4><p className="text-xs text-slate-500">{getText(item.sub)}</p></div></div>))}</div></div></section>
      <section className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-2xl mx-auto mb-16"><span className="text-[#C9A84C] text-xs font-extrabold uppercase tracking-widest">{getText('catalog')}</span><h2 className="text-3xl font-extrabold text-slate-900 mt-2">{getText('furnitureCategories')}</h2><div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{categories.map((cat) => (<div key={cat.name} onClick={() => { setSelectedCategory(cat.name); setCurrentPage('products') }} className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"><div className="h-44 overflow-hidden relative"><ImageWithFallback src={categoryImages[cat.name]} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div></div><div className="p-5"><h3 className="font-bold text-slate-900 text-base">{cat.name}</h3><p className="text-xs text-slate-500 mt-1">{cat.desc}</p><div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#C9A84C]"><span>{cat.count} {getText('products')}</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div></div></div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-2xl mx-auto mb-16"><span className="text-[#C9A84C] text-xs font-extrabold uppercase tracking-widest">{getText('testimonials')}</span><h2 className="text-3xl font-extrabold text-slate-900 mt-2">{getText('whatCustomersSay')}</h2><div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div></div><div className="grid md:grid-cols-2 gap-6">{reviews.map((review, index) => (<div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="font-bold text-slate-900">{review.name}</span><div className="flex text-[#C9A84C]">{'★'.repeat(review.rating)}</div></div><p className="text-slate-600 text-sm">{review.text}</p><p className="text-xs text-slate-400 mt-2">{review.date}</p></div>))}</div></div></section>
      <section className="py-16 bg-slate-50 border-t border-slate-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{getText('brandPartners')}</p><div className="flex flex-wrap justify-center items-center gap-4">{brands.map((brand) => (<span key={brand} className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-[#C9A84C] hover:shadow-sm transition cursor-default">{brand}</span>))}</div></div></section>
    </div>
  ), [categories, brands, reviews, categoryImages, getText])

  // ===== PRODUCTS PAGE =====
  const ProductsPage = useMemo(() => () => (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div><h1 className="text-3xl font-extrabold text-slate-900">{getText('productCatalog')}</h1><p className="text-slate-500 text-sm mt-1">{getText('showing')} {filteredProducts.length} {getText('products')}</p></div>
          <div className="relative w-full md:w-80"><Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" /><input type="text" placeholder={getText('searchProducts')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" /></div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${selectedCategory === 'All' ? 'bg-[#0F172A] text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>{getText('allProducts')}</button>
          {categories.map((cat) => (<button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${selectedCategory === cat.name ? 'bg-[#0F172A] text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>{cat.name}</button>))}
        </div>
        {isLoading ? <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C9A84C] border-t-transparent"></div></div> : filteredProducts.length === 0 ? <div className="bg-white rounded-xl p-16 text-center border border-slate-200"><Package className="w-12 h-12 text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-bold text-slate-800">{getText('noProductsFound')}</h3><p className="text-slate-500 text-sm mt-1">{getText('adjustSearch')}</p></div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </div>
  ), [filteredProducts, categories, selectedCategory, searchTerm, isLoading, getText, ProductCard])

  // ===== PRODUCT DETAIL =====
  const ProductDetail = useMemo(() => () => {
    if (!selectedProduct) return null
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setCurrentPage('products')} className="text-slate-600 hover:text-slate-900 transition mb-6 flex items-center gap-2">← {getText('backToProducts')}</button>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-slate-50 p-8 flex items-center justify-center"><ImageWithFallback src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-lg" /></div>
              <div className="p-8">
                <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">{selectedProduct.category}</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">{selectedProduct.name}</h1>
                <p className="text-sm text-slate-500 mt-1">{getText('brand')}: {selectedProduct.brand}</p>
                <div className="flex items-center gap-2 mt-2"><Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" /><span className="text-sm text-slate-600">{selectedProduct.rating}</span><span className="text-xs text-slate-400">({selectedProduct.reviews} {getText('reviews')})</span></div>
                <div className="mt-4"><span className="text-3xl font-bold text-[#C9A84C]">₹{selectedProduct.price?.toLocaleString() || 0}</span>{selectedProduct.originalPrice && <span className="text-sm text-slate-400 line-through ml-2">₹{selectedProduct.originalPrice?.toLocaleString() || 0}</span>}</div>
                {selectedProduct.colors && <div className="mt-4"><p className="text-sm font-medium text-slate-700">Available Colors:</p><div className="flex flex-wrap gap-2 mt-2">{selectedProduct.colors.map(color => <span key={color} className="px-3 py-1 bg-slate-100 rounded-full text-xs border border-slate-200">{color}</span>)}</div></div>}
                <p className="text-slate-600 mt-4 leading-relaxed">{selectedProduct.description}</p>
                <div className="mt-6 space-y-3">
                  <button onClick={() => buyNow(selectedProduct)} className="block w-full bg-gradient-to-r from-[#C9A84C] to-[#E6CA78] text-[#0F172A] text-center py-3 rounded-lg hover:from-[#b8973b] hover:to-[#d4b968] transition font-bold shadow-lg shadow-[#C9A84C]/20" disabled={!selectedProduct.inStock}><QrCode className="inline w-4 h-4 mr-2" /> Buy Now with UPI</button>
                  <button onClick={() => addToCart(selectedProduct)} className="block w-full bg-[#0F172A] text-white text-center py-3 rounded-lg hover:bg-slate-800 transition font-bold" disabled={!selectedProduct.inStock}><ShoppingCart className="inline w-4 h-4 mr-2" /> {getText('addToCart')}</button>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Maungiri, I'm interested in: ${selectedProduct.name} (₹${selectedProduct.price})`)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] text-white text-center py-3 rounded-lg hover:bg-[#1ebf59] transition font-bold"><MessageCircle className="inline w-4 h-4 mr-2" /> {getText('inquireOnWhatsApp')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }, [selectedProduct, getText, addToCart, buyNow])

  // ===== ABOUT PAGE =====
  const AboutPage = useMemo(() => () => (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12"><h1 className="text-4xl font-extrabold text-slate-900">{getText('aboutUs')}</h1><div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4"><div className="h-20 w-20 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-lg"><span className="text-white font-extrabold text-3xl">M</span></div><div><h2 className="text-2xl font-bold text-slate-900">Maungiri Enterprises</h2><p className="text-[#C9A84C] font-semibold">{getText('since')} 2014</p></div></div>
          <div className="grid md:grid-cols-3 gap-4"><div className="bg-slate-50 p-4 rounded-lg text-center"><Award className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" /><p className="text-sm font-semibold text-slate-900">10+ {getText('years')}</p><p className="text-xs text-slate-500">{getText('expertise')}</p></div><div className="bg-slate-50 p-4 rounded-lg text-center"><Users className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" /><p className="text-sm font-semibold text-slate-900">150+ {getText('products')}</p><p className="text-xs text-slate-500">{getText('catalog')}</p></div><div className="bg-slate-50 p-4 rounded-lg text-center"><Building2 className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" /><p className="text-sm font-semibold text-slate-900">4.8★ {getText('rating')}</p><p className="text-xs text-slate-500">{getText('satisfaction')}</p></div></div>
          <p className="text-slate-600 leading-relaxed">{getText('aboutDescription1')}</p>
          <p className="text-slate-600 leading-relaxed">{getText('aboutDescription2')}</p>
        </div>
      </div>
    </div>
  ), [getText])

  // ===== CONTACT PAGE =====
  const ContactPage = useMemo(() => () => (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12"><h1 className="text-3xl font-extrabold text-slate-900">{getText('contactUs')}</h1><p className="text-slate-500 text-sm mt-2">{getText('contactDescription')}</p></div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{getText('headOffice')}</h2>
            <div className="flex items-start gap-4"><MapPin className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" /><div><p className="font-semibold text-slate-900 text-sm">{getText('location')}</p><p className="text-slate-600 text-sm mt-0.5">Shramik Nagar, Gangapur Road, Nashik, Maharashtra 422222</p></div></div>
            <div className="flex items-start gap-4"><Phone className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" /><div><p className="font-semibold text-slate-900 text-sm">{getText('phone')}</p><p className="text-slate-600 text-sm mt-0.5">+91 92707 26556</p></div></div>
            <div className="flex items-start gap-4"><Clock className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" /><div><p className="font-semibold text-slate-900 text-sm">{getText('businessHours')}</p><p className="text-slate-600 text-sm mt-0.5">{getText('hoursDetail')}</p><p className="text-slate-400 text-xs">{getText('sundayClosed')}</p></div></div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#1ebf59] text-white text-center font-bold py-3.5 rounded-lg transition shadow-sm text-sm">{getText('startWhatsApp')}</a>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{getText('showroomMap')}</h2>
            <div className="rounded-lg overflow-hidden border border-slate-200 h-72">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5!2d73.7895!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb8d5d1e7c0b%3A0x0!2zMTnCsDU5JzUxLjAiTiA3M8KwNDcnMjIuMiJF!5e0!3m2!1sen!2sin!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Maungiri Enterprises Map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [getText])

  // ===== FOOTER =====
  const Footer = useMemo(() => () => (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div><div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 bg-[#C9A84C] rounded-lg flex items-center justify-center font-extrabold text-[#0F172A]">M</div><span className="text-white font-bold tracking-tight text-lg">MAUNGIRI</span></div><p className="text-xs text-slate-400 leading-relaxed">{getText('footerDescription')}</p></div>
          <div><h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{getText('quickLinks')}</h4><ul className="space-y-2 text-xs"><li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition">{getText('home')}</button></li><li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition">{getText('products')}</button></li><li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition">{getText('contact')}</button></li></ul></div>
          <div><h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{getText('contact')}</h4><p className="text-xs">📞 +91 92707 26556</p><p className="text-xs mt-1">📍 Shramik Nagar, Nashik</p></div>
          <div><h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{getText('hours')}</h4><p className="text-xs">{getText('hoursDetail')}</p><p className="text-xs text-[#C9A84C] mt-1">{getText('sundayClosed')}</p></div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">© 2026 Maungiri Enterprises. {getText('allRightsReserved')}</div>
      </div>
    </footer>
  ), [getText])

  // ===== LOADING =====
  if (isLoading && products.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="text-center"><div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C9A84C] border-t-transparent mx-auto mb-4"></div><p className="text-slate-500 text-sm">Loading...</p></div></div>
  }

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar />
      {showLogin && <LoginModal />}
      {showCart && <CartModal />}
      {showPayment && <PaymentModal />}
      <Toast />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'product-detail' && <ProductDetail />}
      {currentPage === 'admin' && isAdmin && <AdminDashboard />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      <Footer />
    </div>
  )
}