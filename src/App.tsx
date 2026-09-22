import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { CanvasBackground } from './components/CanvasBackground';
import { AdminRoute } from './components/AdminRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminUsers } from './pages/AdminUsers';

export default function App() {
  return (
    <ParallaxProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <CanvasBackground />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminProducts />} />
                  <Route path="produtos" element={<AdminProducts />} />
                  <Route path="usuarios" element={<AdminUsers />} />
                </Route>
              </Routes>
            </Layout>
            <Toaster
              position="top-right"
              richColors
              theme="dark"
              toastOptions={{
                style: { background: '#111a16', border: '1px solid rgba(34,197,94,0.3)' },
              }}
            />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ParallaxProvider>
  );
}

import { AdminOrders } from './pages/AdminOrders';

// ...
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
>
  <Route index element={<AdminProducts />} />
  <Route path="produtos" element={<AdminProducts />} />
  <Route path="usuarios" element={<AdminUsers />} />
  <Route path="pedidos" element={<AdminOrders />} />   {/* NOVO */}
</Route>
