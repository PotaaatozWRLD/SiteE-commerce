import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import AdminLogin from './pages/admin/AdminLogin'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import './App.css'

// Homepage component
function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />

              {/* Customer login */}
              <Route path="/login" element={<Login />} />

              {/* Shopping Cart */}
              <Route path="/cart" element={<Cart />} />

              {/* Product Details */}
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Admin login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected admin routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
