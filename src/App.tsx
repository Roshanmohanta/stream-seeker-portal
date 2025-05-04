
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseDetail from "./pages/CourseDetail";
import CollegeDetail from "./pages/CollegeDetail";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Colleges from "./pages/Colleges";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminCourses from "./pages/Admin/AdminCourses";
import { User } from "./lib/types";

const queryClient = new QueryClient();

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
            
            <div className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/college/:id" element={<CollegeDetail />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
                <Route path="/register" element={<Register />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard currentUser={currentUser} />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="courses" element={<AdminCourses />} />
                  {/* Other admin routes will be added here */}
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
