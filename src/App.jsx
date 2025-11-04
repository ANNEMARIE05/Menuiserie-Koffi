import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Devis from './pages/Devis';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import DashboardDevis from './pages/DashboardDevis';
import ViewProduct from './pages/ViewProduct';
import EditProduct from './pages/EditProduct';
import ViewDevis from './pages/ViewDevis';
import EditDevis from './pages/EditDevis';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname.startsWith('/dashboard');
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAuthPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/ajouter" element={<AddProduct />} />
          <Route path="/dashboard/liste-produits" element={<ProductList />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/devis" element={<DashboardDevis />} />
          <Route path="/dashboard/produit/:id" element={<ViewProduct />} />
          <Route path="/dashboard/produit/:id/modifier" element={<EditProduct />} />
          <Route path="/dashboard/devis/:id" element={<ViewDevis />} />
          <Route path="/dashboard/devis/:id/modifier" element={<EditDevis />} />
          <Route path="/dashboard/profil" element={<Profile />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

