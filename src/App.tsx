import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageReveal } from '@/components/shared/PageReveal';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { Toaster } from 'sonner';

// Lazy loaded pages
const Home = lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })));
const Shop = lazy(() => import('@/pages/Shop').then(module => ({ default: module.Shop })));
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage').then(module => ({ default: module.CollectionsPage })));
const About = lazy(() => import('@/pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('@/pages/Contact').then(module => ({ default: module.Contact })));
const ProductDetails = lazy(() => import('@/pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  return (
    <>
      <ScrollToTop />
      <PageReveal />
      <Navbar />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
