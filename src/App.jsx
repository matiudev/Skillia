import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courseDetail/CourseDetail";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courseDetail/:id" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
