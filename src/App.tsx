import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Prescriptions from "./pages/Prescriptions";
import History from "./pages/History";
import Chat from "./pages/Chat";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import DoctorSignup from "./pages/DoctorSignup";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSettings from "./pages/doctor/doctorsettings"; 
import DoctorProfileSetup from "./pages/DoctorProfileSetup";
import DoctorPendingApproval from "./pages/DoctorPendingApproval";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorAvailability from "./pages/doctor/DoctorAvailability";
import DoctorChat from "./pages/doctor/DoctorChat";
import DoctorPrescriptions from "./pages/doctor/doctorprescriptions";
import PatientProfile from "./pages/doctor/PatientProfile";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointmentList from './pages/admin/AdminAppointmentList';
import AdminAppointmentDetail from './pages/admin/AdminAppointmentDetail';
import AdminPatients from './pages/admin/AdminPatients';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminVerifyDoctors from './pages/admin/AdminVerifyDoctors';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';
import VideoConsultation from './pages/videoConsultation';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/history" element={<History />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
              
              <Route path="/doctor/signup" element={<DoctorSignup />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/doctor/profile-setup" element={<DoctorProfileSetup />} />
              <Route path="/doctor/pending-approval" element={<DoctorPendingApproval />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/patients" element={<DoctorPatients />} />
              <Route path="/doctor/patient/:id" element={<PatientProfile />} />
              <Route path="/doctor/availability" element={<DoctorAvailability />} />
              <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />

              <Route path="/doctor/chat" element={<DoctorChat />} />
              <Route path="/doctor/settings" element={<DoctorSettings />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/appointments" element={<AdminAppointmentList />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/appointment-list" element={<AdminAppointmentList />} />
              <Route path="/admin/appointment-detail/:id" element={<AdminAppointmentDetail />} />
              <Route path="/admin/patients" element={<AdminPatients />} />
              <Route path="/admin/doctors" element={<AdminDoctors />} />
              <Route path="/admin/verify-doctors" element={<AdminVerifyDoctors />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/video-consultation" element={<VideoConsultation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
