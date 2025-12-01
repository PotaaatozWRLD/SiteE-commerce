import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
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
import AdminCustomers from './pages/admin/Customers'
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import LegalNotice from './pages/legal/LegalNotice'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import Shipping from './pages/Shipping'
import AccountLayout from './components/account/AccountLayout'
import AccountOverview from './pages/account/Overview'
import AccountOrders from './pages/account/Orders'
import AccountSettings from './pages/account/Settings'
import AccountAddresses from './pages/account/Addresses'

// ... existing imports ...

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
          <Route path="/register" element={<Register />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Account routes */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="addresses" element={<AccountAddresses />} />
          </Route>

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
              <Route path="customers" element={<AdminCustomers />} />
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
