import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./feature/auth/Login";
import Register from "./feature/auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";
import { useAuthStore } from "./feature/auth/store/useAuthStore";
import { supabase } from "./lib/supabase";
import CoursePlayer from "./pages/CoursePlayer";
import NotFound from "./pages/NotFound";

function App() {
  const getSession = useAuthStore((state) => state.getSession);

  useEffect(() => {
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        useAuthStore.setState({
          session,
          user: session?.user ?? null,
          loading: false,
        });
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/courseDetail/:id" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coursePlayer/:id"
          element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
