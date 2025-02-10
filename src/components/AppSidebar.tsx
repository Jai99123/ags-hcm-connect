
import {
  Home,
  UserPlus,
  Users,
  Clock,
  CreditCard,
  GraduationCap,
  Briefcase,
  MessageSquareMore,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Hiring & Onboarding", icon: UserPlus, path: "/hiring-onboarding" },
  { title: "Employee Information", icon: Users, path: "/employees" },
  { title: "Time Tracking", icon: Clock, path: "/time-tracking" },
  { title: "Payroll", icon: CreditCard, path: "/payroll" },
  { title: "LMS", icon: GraduationCap, path: "/lms" },
  { title: "AGS Careers", icon: Briefcase, path: "/careers" },
  { title: "HR Bot", icon: MessageSquareMore, path: "/hr-bot" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AGS HCM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

