import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import ProductForm from './pages/admin/ProductForm'
import AdminOrders from './pages/admin/Orders'
import AdminOrderDetails from './pages/admin/OrderDetails'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import './App.css'

// Homepage component
function Homepage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

// Layout wrapper to conditionally render Navigation and Footer
function Layout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Admin login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetails />} />
            </Route>
          </Route>
        </Routes>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
