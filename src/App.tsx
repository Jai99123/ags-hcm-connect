
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import HiringOnboarding from "./pages/HiringOnboarding";
import Employees from "./pages/Employees";
import TimeTracking from "./pages/TimeTracking";
import Payroll from "./pages/Payroll";
import LMS from "./pages/LMS";
import HRBot from "./pages/HRBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <TooltipProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/hiring-onboarding" element={<HiringOnboarding />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/time-tracking" element={<TimeTracking />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/lms" element={<LMS />} />
                <Route path="/hr-bot" element={<HRBot />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </SidebarProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
