import { lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

// تقسيم الكود لتسريع التحميل الأولي
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Fallback = () => (
  <div className="min-h-screen bg-paper flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <div className="App" dir="rtl">
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<LegalPage slug="privacy" />} />
            <Route path="/terms" element={<LegalPage slug="terms" />} />
            <Route path="/disclaimer" element={<LegalPage slug="disclaimer" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
