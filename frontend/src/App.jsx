import React, { useState, useEffect } from 'react'
import { translations } from './translations'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  LogOut,
  Settings,
  Package,
  Search,
  X,
  Menu,
  Star,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  Award,
  Users,
  Building2,
  Mail
} from 'lucide-react'

// ===== IMAGE FALLBACK COMPONENT =====
const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800')
      }}
    />
  )
}

// ===== MAIN APP =====
export default function App() {
  // ===== STATE MANAGEMENT =====
  const [language, setLanguage] = useState('en')
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [products, setProducts] = useState([])

  const t = translations[language] || translations.en

  // ===== CATEGORY IMAGES =====
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

  // ===== INITIAL PRODUCTS =====
  const initialProducts = [
    ...Array(12).fill().map((_, i) => ({
      id: i + 1,
      name: `Ergonomic Executive Plastic Chair ${i + 1}`,
      category: 'Plastic Chairs',
      brand: ['Nilkamal', 'Cello', 'Vermora'][i % 3],
      price: 1200 + i * 150,
      originalPrice: i % 2 === 0 ? 1800 + i * 150 : null,
      description: 'Durable, heavy-duty ergonomic plastic chair engineered with UV-stabilized virgin polymer.',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600',
      rating: (4.2 + (i % 8) * 0.1).toFixed(1),
      reviews: 24 + i * 5,
      inStock: true,
      isNew: i < 3,
      colors: ['Charcoal Gray', 'Matte Black', 'Royal Blue']
    })),
    ...Array(12).fill().map((_, i) => ({
      id: i + 20,
      name: `Solid Teak Wooden ${['Storage Shelf', 'Dining Table', 'Console Cabinet', 'Drawer Chest'][i % 4]}`,
      category: 'Wooden Furniture',
      brand: ['National', 'Mango', 'Vermora'][i % 3],
      price: 8500 + i * 450,
      originalPrice: i % 3 === 0 ? 11000 + i * 450 : null,
      description: 'Handcrafted premium teak wood furniture with anti-termite sealant finish.',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
      rating: (4.5 + (i % 4) * 0.1).toFixed(1),
      reviews: 42 + i * 3,
      inStock: true,
      isNew: i < 2,
      colors: ['Honey Oak', 'Walnut Finish', 'Natural Teak']
    })),
    ...Array(10).fill().map((_, i) => ({
      id: i + 40,
      name: `Luxury Lounge Wooden Sofa ${i + 1}-Seater`,
      category: 'Wooden Sofas',
      brand: ['Mango', 'National', 'Vermora'][i % 3],
      price: 18500 + i * 1200,
      originalPrice: 22000 + i * 1200,
      description: 'High-density foam cushioned sofa with reinforced hardwood frame.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
      rating: '4.8',
      reviews: 89,
      inStock: true,
      isNew: i < 2,
      colors: ['Slate Gray', 'Warm Olive', 'Beige Linen']
    })),
    ...Array(8).fill().map((_, i) => ({
      id: i + 60,
      name: `Modern Designer Chair ${i + 1}`,
      category: 'Designer Chairs',
      brand: ['Cello', 'Nilkamal', 'National'][i % 3],
      price: 3200 + i * 200,
      originalPrice: i % 2 === 0 ? 3800 + i * 200 : null,
      description: 'Contemporary designer chair with premium upholstery and chrome finish.',
      image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&q=80&w=600',
      rating: (4.3 + (i % 5) * 0.1).toFixed(1),
      reviews: 18 + i * 4,
      inStock: true,
      isNew: i < 2,
      colors: ['Black', 'White', 'Beige', 'Gray']
    })),
    ...Array(8).fill().map((_, i) => ({
      id: i + 75,
      name: `Commercial Cafe Chair ${i + 1}`,
      category: 'Cafe Chairs',
      brand: ['Vermora', 'Mango', 'Cello'][i % 3],
      price: 1800 + i * 80,
      originalPrice: i % 2 === 0 ? 2200 + i * 80 : null,
      description: 'Commercial-grade cafe chair with stackable design and powder-coated finish.',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
      rating: (4.1 + (i % 6) * 0.1).toFixed(1),
      reviews: 12 + i * 3,
      inStock: true,
      isNew: false,
      colors: ['Black', 'White', 'Red']
    })),
    ...Array(10).fill().map((_, i) => ({
      id: i + 90,
      name: `Premium Wardrobe ${i + 1}`,
      category: 'Wardrobes',
      brand: ['Nilkamal', 'Mango', 'National'][i % 3],
      price: 12000 + i * 500,
      originalPrice: i % 2 === 0 ? 14000 + i * 500 : null,
      description: 'Spacious wardrobe with soft-close hinges and anti-bacterial coating.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600',
      rating: (4.6 + (i % 3) * 0.1).toFixed(1),
      reviews: 30 + i * 5,
      inStock: true,
      isNew: i < 2,
      colors: ['Teak', 'White', 'Walnut']
    })),
    ...Array(8).fill().map((_, i) => ({
      id: i + 105,
      name: `Convertible Sofa Cum Bed ${i + 1}`,
      category: 'Sofa Cum Beds',
      brand: ['Cello', 'Vermora', 'Mango'][i % 3],
      price: 15000 + i * 600,
      originalPrice: i % 2 === 0 ? 17000 + i * 600 : null,
      description: 'Versatile sofa cum bed with memory foam mattress and durable frame.',
      image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&q=80&w=600',
      rating: (4.4 + (i % 4) * 0.1).toFixed(1),
      reviews: 25 + i * 4,
      inStock: true,
      isNew: false,
      colors: ['Gray', 'Beige', 'Blue']
    })),
    ...Array(10).fill().map((_, i) => ({
      id: i + 120,
      name: `Executive Writing Table ${i + 1}`,
      category: 'Writing Tables',
      brand: ['National', 'Nilkamal', 'Cello'][i % 3],
      price: 3500 + i * 180,
      originalPrice: i % 3 === 0 ? 4000 + i * 180 : null,
      description: 'Ergonomic writing table with height adjustment and cable management.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600',
      rating: (4.2 + (i % 5) * 0.1).toFixed(1),
      reviews: 15 + i * 3,
      inStock: true,
      isNew: i < 3,
      colors: ['Teak', 'White', 'Black']
    })),
    ...Array(10).fill().map((_, i) => ({
      id: i + 135,
      name: ['Premium Television', 'Smart AC', 'Advanced Refrigerator', 'Air Cooler Pro', 'Designer Fans', 'Professional Mixer', 'Smart Induction', 'Electric Kettle', 'Water Heater', 'Chimney'][i],
      category: 'Appliances',
      brand: ['Haier', 'Whirlpool', 'Bajaj', 'Havells', 'Crompton'][i % 5],
      price: 5000 + i * 500,
      originalPrice: i % 2 === 0 ? 6000 + i * 500 : null,
      description: 'Premium home appliance with smart features and energy efficiency.',
      image: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600', 
              'https://images.unsplash.com/photo-1633886036456-1efc7b9c2d7d?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1633886036456-1efc7b9c2d7d?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1633886036456-1efc7b9c2d7d?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1633886036456-1efc7b9c2d7d?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1633886036456-1efc7b9c2d7d?auto=format&fit=crop&q=80&w=600'][i],
      rating: (4.3 + (i % 5) * 0.1).toFixed(1),
      reviews: 20 + i * 4,
      inStock: true,
      isNew: i < 3,
      colors: ['White', 'Silver', 'Black']
    }))
  ]

  // ===== INITIALIZE PRODUCTS =====
  useEffect(() => {
    const savedProducts = localStorage.getItem('maungiri_products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(initialProducts)
      localStorage.setItem('maungiri_products', JSON.stringify(initialProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('maungiri_products', JSON.stringify(products))
    }
  }, [products])

  // ===== CATEGORIES =====
  const categories = [
    { name: 'Plastic Chairs', desc: 'Ergonomic & UV Resistant', count: products.filter(p => p.category === 'Plastic Chairs').length },
    { name: 'Wooden Furniture', desc: 'Solid Teak & Sheesham', count: products.filter(p => p.category === 'Wooden Furniture').length },
    { name: 'Designer Chairs', desc: 'Modern Architectural Styles', count: products.filter(p => p.category === 'Designer Chairs').length },
    { name: 'Cafe Chairs', desc: 'Commercial Heavy-Duty', count: products.filter(p => p.category === 'Cafe Chairs').length },
    { name: 'Wooden Sofas', desc: 'Plush High-Density Cushioning', count: products.filter(p => p.category === 'Wooden Sofas').length },
    { name: 'Wardrobes', desc: 'Modular & Space Optimized', count: products.filter(p => p.category === 'Wardrobes').length },
    { name: 'Sofa Cum Beds', desc: 'Dual Purpose Convertible', count: products.filter(p => p.category === 'Sofa Cum Beds').length },
    { name: 'Writing Tables', desc: 'Ergonomic Workstations', count: products.filter(p => p.category === 'Writing Tables').length },
  ]

  const brands = ['Nilkamal', 'Cello', 'Vermora', 'National', 'Mango', 'Haier', 'Whirlpool', 'Bajaj', 'Havells', 'Crompton']

  // ===== REVIEWS =====
  const reviews = [
    { name: 'Rajesh Patel', rating: 5, text: 'Exceptional quality and craftsmanship. The wooden sofa is a masterpiece.', date: '2 weeks ago' },
    { name: 'Sneha Sharma', rating: 5, text: 'Premium products with outstanding service. Highly recommended.', date: '1 month ago' },
    { name: 'Vikram Singh', rating: 4, text: 'Beautiful furniture with attention to detail. Custom order was perfect.', date: '2 months ago' },
    { name: 'Priya Desai', rating: 5, text: 'The best furniture store in Nashik. Professional and elegant.', date: '3 months ago' },
  ]

  // ===== FAQ =====
  const faqs = [
    { q: 'What are your business hours?', a: 'Monday to Saturday, 9:30 AM to 9:00 PM. Closed on Sundays.' },
    { q: 'Do you offer custom furniture?', a: 'Yes! We specialize in bespoke furniture design and manufacturing.' },
    { q: 'Do you provide delivery?', a: 'Yes, we deliver across Maharashtra with professional installation.' },
    { q: 'Do you offer home measurement?', a: 'Yes, we provide complimentary home measurement service.' },
    { q: 'What payment methods do you accept?', a: 'Cash, UPI, Credit/Debit cards, and bank transfers.' },
  ]

  // ===== FILTER PRODUCTS =====
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // ===== CART FUNCTIONS =====
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id))

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const qty = item.quantity + amount
        return qty > 0 ? { ...item, quantity: qty } : null
      }
      return item
    }).filter(Boolean))
  }

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)

  // ===== ADMIN FUNCTIONS =====
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id)) + 1,
      rating: '4.5',
      reviews: 0,
      inStock: true
    }
    setProducts([...products, newProduct])
  }

  const removeProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  // ===== LOGIN FUNCTIONS =====
  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail === 'admin@maungiri.com' && loginPassword === 'admin123') {
      setIsLoggedIn(true)
      setIsAdmin(true)
      setShowLogin(false)
      setLoginEmail('')
      setLoginPassword('')
    } else if (loginEmail && loginPassword) {
      setIsLoggedIn(true)
      setIsAdmin(false)
      setShowLogin(false)
      setLoginEmail('')
      setLoginPassword('')
    } else {
      alert('Please enter email and password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setLoginEmail('')
    setLoginPassword('')
  }

  // ===== NAVBAR =====
  const Navbar = () => (
    <nav className="bg-[#0F172A] text-white sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="h-10 w-10 bg-gradient-to-tr from-[#C9A84C] to-[#E6CA78] rounded-lg flex items-center justify-center shadow-lg shadow-[#C9A84c]/20 group-hover:scale-105 transition-transform">
              <span className="text-[#0F172A] font-extrabold text-xl tracking-wider">M</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">MAUNGIRI</span>
              <span className="text-[10px] uppercase font-semibold tracking-widest block text-[#C9A84C] -mt-1">Enterprises</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className={`text-sm font-medium transition ${currentPage === 'home' ? 'text-[#C9A84C]' : 'text-slate-300 hover:text-white'}`}>Home</button>
            <button onClick={() => setCurrentPage('products')} className={`text-sm font-medium transition ${currentPage === 'products' ? 'text-[#C9A84C]' : 'text-slate-300 hover:text-white'}`}>Products</button>
            <button onClick={() => setCurrentPage('about')} className={`text-sm font-medium transition ${currentPage === 'about' ? 'text-[#C9A84C]' : 'text-slate-300 hover:text-white'}`}>About</button>
            <button onClick={() => setCurrentPage('contact')} className={`text-sm font-medium transition ${currentPage === 'contact' ? 'text-[#C9A84C]' : 'text-slate-300 hover:text-white'}`}>Contact</button>
            {isAdmin && (
              <button onClick={() => setCurrentPage('admin')} className="text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1.5 rounded-full hover:bg-[#C9A84C] hover:text-[#0F172A] transition flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Admin
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-5 border-l border-slate-800 pl-6">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800/80 text-xs text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-700 focus:border-[#C9A84C] focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>

            <a 
              href="https://wa.me/919270726556" 
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebf59] text-white px-4 py-2 rounded-md transition text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>

            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-slate-300 hover:text-white transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#0F172A] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-red-400 transition">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="p-2 text-slate-300 hover:text-white transition">
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-slate-300 hover:text-white">
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-6 space-y-4">
          <button onClick={() => { setCurrentPage('home'); setShowMobileMenu(false) }} className="block w-full text-left text-slate-300 font-medium py-2">Home</button>
          <button onClick={() => { setCurrentPage('products'); setShowMobileMenu(false) }} className="block w-full text-left text-slate-300 font-medium py-2">Products</button>
          <button onClick={() => { setCurrentPage('about'); setShowMobileMenu(false) }} className="block w-full text-left text-slate-300 font-medium py-2">About</button>
          <button onClick={() => { setCurrentPage('contact'); setShowMobileMenu(false) }} className="block w-full text-left text-slate-300 font-medium py-2">Contact</button>
          {isAdmin && (
            <button onClick={() => { setCurrentPage('admin'); setShowMobileMenu(false) }} className="block w-full text-left text-[#C9A84C] font-medium py-2">Admin</button>
          )}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <button onClick={() => { setShowCart(true); setShowMobileMenu(false) }} className="text-slate-300 font-medium flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Cart ({getTotalItems()})
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-red-400 font-medium">Logout</button>
            ) : (
              <button onClick={() => { setShowLogin(true); setShowMobileMenu(false) }} className="text-[#C9A84C] font-medium">Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )

  // ===== LOGIN MODAL =====
  const LoginModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{isRegistering ? 'Create Account' : 'Login'}</h2>
          <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#0F172A] text-white py-3 rounded-lg hover:bg-slate-800 transition font-bold">
              {isRegistering ? 'Create Account' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-slate-500 mt-4">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[#C9A84C] hover:underline ml-1"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
        <p className="text-center text-xs text-slate-400 mt-4 bg-slate-50 p-2 rounded-lg">
          Demo: admin@maungiri.com / admin123
        </p>
      </div>
    </div>
  )

  // ===== CART MODAL =====
  const CartModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#C9A84C]" /> Your Cart
          </h2>
          <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-slate-600">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-center">
                <ImageWithFallback src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                  <p className="text-xs font-bold text-[#C9A84C] mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:text-red-700 ml-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center font-bold text-slate-900 text-base">
              <span>Total:</span>
              <span className="text-[#C9A84C] text-xl">₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
            <a 
              href={`https://wa.me/919270726556?text=${encodeURIComponent(`Order Request:\n${cart.map(i => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}\nTotal: ₹${getTotalPrice()}`)}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#1ebf59] text-white text-center font-bold py-3.5 rounded-lg transition shadow text-sm"
            >
              Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  )

  // ===== PRODUCT CARD =====
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col justify-between">
      <div className="cursor-pointer" onClick={() => { setSelectedProduct(product); setCurrentPage('product-detail') }}>
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
          <ImageWithFallback 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#0F172A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">New</span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        <div className="p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] block mb-1">{product.brand}</span>
          <h3 className="font-semibold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-[#0F172A] transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button 
          onClick={() => addToCart(product)}
          className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
        <a 
          href={`https://wa.me/919270726556?text=${encodeURIComponent(`Hi Maungiri, I want to inquire about: ${product.name} (₹${product.price})`)}`}
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] hover:bg-[#1ebf59] text-white text-xs font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Inquire
        </a>
      </div>
    </div>
  )

  // ===== ADMIN DASHBOARD =====
  const AdminDashboard = () => {
    const [newProduct, setNewProduct] = useState({
      name: '',
      category: 'Plastic Chairs',
      brand: 'Nilkamal',
      price: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600',
    })

    const handleAddProduct = (e) => {
      e.preventDefault()
      if (!newProduct.name || !newProduct.price) {
        alert('Please fill in all required fields')
        return
      }
      addProduct({
        ...newProduct,
        price: parseInt(newProduct.price),
        rating: '4.5',
        reviews: 0,
        inStock: true
      })
      setNewProduct({
        name: '',
        category: 'Plastic Chairs',
        brand: 'Nilkamal',
        price: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600',
      })
      alert('Product added successfully!')
    }

    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-8 h-8 text-[#C9A84C]" />
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#C9A84C]" /> Add New Product
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  >
                    {brands.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <button type="submit" className="w-full bg-[#0F172A] text-white py-3 rounded-lg hover:bg-slate-800 transition font-bold flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Product Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900">{products.length}</p>
                    <p className="text-sm text-slate-500">Total Products</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                    <p className="text-sm text-slate-500">Categories</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900">{brands.length}</p>
                    <p className="text-sm text-slate-500">Brands</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900">{cart.length}</p>
                    <p className="text-sm text-slate-500">Cart Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Manage Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 10).map(p => (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-4 py-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                      </td>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-slate-500">{p.category}</td>
                      <td className="px-4 py-3 font-bold text-[#C9A84C]">₹{p.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => removeProduct(p.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length > 10 && (
                <p className="text-center text-slate-500 text-sm mt-4">Showing 10 of {products.length} products</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== ABOUT PAGE =====
  const AboutPage = () => (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">About Maungiri Enterprises</h1>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-3xl">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Maungiri Enterprises</h2>
              <p className="text-[#C9A84C] font-semibold">Since 2014</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <Award className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">10+ Years</p>
              <p className="text-xs text-slate-500">Industry Expertise</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <Users className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">150+ Products</p>
              <p className="text-xs text-slate-500">Furniture Catalog</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <Building2 className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">4.8★ Rating</p>
              <p className="text-xs text-slate-500">Customer Satisfaction</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Established in 2014, Maungiri Enterprises has been a trusted name in furniture manufacturing, 
            interior design, and premium home appliances in Nashik, Maharashtra.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We take pride in offering high-quality products ranging from durable plastic chairs, 
            elegant wooden furniture, designer chairs, cafe chairs, wooden sofas, wardrobes, 
            sofa cum beds, writing tables, and a wide range of home appliances.
          </p>
        </div>
      </div>
    </div>
  )

  // ===== CONTACT PAGE =====
  const ContactPage = () => (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900">Contact & Showroom</h1>
          <p className="text-slate-500 text-sm mt-2">Visit our flagship showroom or contact our design team directly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Head Office</h2>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Location</p>
                <p className="text-slate-600 text-sm mt-0.5">Shramik Nagar, Gangapur Road, Nashik, Maharashtra 422222</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Phone</p>
                <p className="text-slate-600 text-sm mt-0.5">+91 92707 26556</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#C9A84C] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Business Hours</p>
                <p className="text-slate-600 text-sm mt-0.5">Monday – Saturday: 9:30 AM – 9:00 PM</p>
                <p className="text-slate-400 text-xs">Sunday Closed</p>
              </div>
            </div>

            <a 
              href="https://wa.me/919270726556" 
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#1ebf59] text-white text-center font-bold py-3.5 rounded-lg transition shadow-sm text-sm"
            >
              Start WhatsApp Inquiry
            </a>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Showroom Map</h2>
            <div className="rounded-lg overflow-hidden border border-slate-200 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5!2d73.7895!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb8d5d1e7c0b%3A0x0!2zMTnCsDU5JzUxLjAiTiA3M8KwNDcnMjIuMiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Maungiri Enterprises Map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ===== HOME PAGE =====
  const HomePage = () => (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(#2a3a4a_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Trusted Since 2014
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Premium Furniture & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#F3E2B3]">Home Solutions</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
                Transform your living spaces with engineered durability. Discover custom furniture manufacturing, premium seating, and official brand appliances in Nashik.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="bg-[#C9A84C] hover:bg-[#b8973b] text-[#0F172A] font-bold px-8 py-3.5 rounded-lg transition shadow-xl flex items-center gap-2"
                >
                  Explore Catalog <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="border border-slate-700 hover:border-slate-500 text-white font-medium px-8 py-3.5 rounded-lg transition hover:bg-slate-800/50"
                >
                  Get Quote
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
                <div><p className="text-2xl font-black text-white">10+ Years</p><p className="text-xs text-slate-400">Expertise</p></div>
                <div><p className="text-2xl font-black text-white">150+ Designs</p><p className="text-xs text-slate-400">Catalog</p></div>
                <div><p className="text-2xl font-black text-white">4.8 / 5.0</p><p className="text-xs text-slate-400">Rating</p></div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Luxury Interior"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50">
                  <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">Showroom</p>
                  <p className="text-sm font-semibold text-white mt-1">Shramik Nagar, Gangapur Road, Nashik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, text: 'Certified Quality', sub: 'Virgin polymer & teak wood' },
              { icon: Truck, text: 'Statewide Shipping', sub: 'Fast delivery across Maharashtra' },
              { icon: SlidersHorizontal, text: 'Custom Manufacturing', sub: 'Tailored to exact dimensions' },
              { icon: Clock, text: 'Free Measurement', sub: 'Professional consultation' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-50 text-[#C9A84C]">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.text}</h4>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C9A84C] text-xs font-extrabold uppercase tracking-widest">Catalog</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Furniture Categories</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                onClick={() => { setSelectedCategory(cat.name); setCurrentPage('products') }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <ImageWithFallback 
                    src={categoryImages[cat.name]} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#C9A84C]">
                    <span>{cat.count} Products</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C9A84C] text-xs font-extrabold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">What Our Customers Say</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900">{review.name}</span>
                  <div className="flex text-[#C9A84C]">{'★'.repeat(review.rating)}</div>
                </div>
                <p className="text-slate-600 text-sm">{review.text}</p>
                <p className="text-xs text-slate-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Authorized Brand Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {brands.map((brand) => (
              <span key={brand} className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-[#C9A84C] hover:shadow-sm transition cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C9A84C] text-xs font-extrabold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:shadow-sm transition">
                <p className="font-bold text-slate-900">{faq.q}</p>
                <p className="text-slate-600 text-sm mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  // ===== PRODUCTS PAGE =====
  const ProductsPage = () => (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Product Catalog</h1>
            <p className="text-slate-500 text-sm mt-1">Showing {filteredProducts.length} products</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${selectedCategory === 'All' ? 'bg-[#0F172A] text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${selectedCategory === cat.name ? 'bg-[#0F172A] text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-slate-200">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // ===== PRODUCT DETAIL =====
  const ProductDetail = () => {
    if (!selectedProduct) return null
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setCurrentPage('products')}
            className="text-slate-600 hover:text-slate-900 transition mb-6 flex items-center gap-2"
          >
            ← Back to Products
          </button>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-slate-50 p-8 flex items-center justify-center">
                <ImageWithFallback 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-80 object-cover rounded-lg" 
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">{selectedProduct.category}</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">{selectedProduct.name}</h1>
                <p className="text-sm text-slate-500 mt-1">Brand: {selectedProduct.brand}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                  <span className="text-sm text-slate-600">{selectedProduct.rating}</span>
                  <span className="text-xs text-slate-400">({selectedProduct.reviews} reviews)</span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-[#C9A84C]">₹{selectedProduct.price.toLocaleString()}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through ml-2">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-slate-600 mt-4 leading-relaxed">{selectedProduct.description}</p>
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="block w-full bg-[#0F172A] text-white text-center py-3 rounded-lg hover:bg-slate-800 transition font-bold"
                  >
                    <ShoppingCart className="inline w-4 h-4 mr-2" /> Add to Cart
                  </button>
                  <a 
                    href={`https://wa.me/919270726556?text=${encodeURIComponent(`Hi Maungiri, I'm interested in: ${selectedProduct.name} (₹${selectedProduct.price})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-[#25D366] text-white text-center py-3 rounded-lg hover:bg-[#1ebf59] transition font-bold"
                  >
                    <MessageCircle className="inline w-4 h-4 mr-2" /> Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== FOOTER =====
  const Footer = () => (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-[#C9A84C] rounded-lg flex items-center justify-center font-extrabold text-[#0F172A]">M</div>
              <span className="text-white font-bold tracking-tight text-lg">MAUNGIRI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium furniture manufacturing, interior customization, and commercial home appliances in Nashik.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Products</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-xs">📞 +91 92707 26556</p>
            <p className="text-xs mt-1">📍 Shramik Nagar, Nashik</p>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Hours</h4>
            <p className="text-xs">Mon – Sat: 9:30 AM – 9:00 PM</p>
            <p className="text-xs text-[#C9A84C] mt-1">Sunday Closed</p>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 Maungiri Enterprises. All Rights Reserved.
        </div>
      </div>
    </footer>
  )

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar />
      {showLogin && <LoginModal />}
      {showCart && <CartModal />}
      
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