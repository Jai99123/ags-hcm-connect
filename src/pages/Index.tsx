
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap, MessageSquare, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Fetch employee count
  const { data: employeeCount } = useQuery({
    queryKey: ['employee-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('employee_profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Fetch open positions
  const { data: openPositions } = useQuery({
    queryKey: ['open-positions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_positions')
        .select('*')
        .eq('status', 'open');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch active learners
  const { data: activeLearners } = useQuery({
    queryKey: ['active-learners'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('learning_materials')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Fetch HR queries (leave requests pending)
  const { data: hrQueries } = useQuery({
    queryKey: ['hr-queries'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Fetch recent ideas from authenticated employees
  const { data: recentIdeas } = useQuery({
    queryKey: ['recent-ideas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ideas')
        .select(`
          *,
          employee_profiles (
            first_name,
            last_name,
            department_id
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  const stats = [
    {
      title: "Total Employees",
      value: employeeCount?.toString() || "0",
      icon: Users,
      trend: "Updated in real-time",
      onClick: () => navigate("/employees")
    },
    {
      title: "Open Positions",
      value: openPositions?.length.toString() || "0",
      icon: Briefcase,
      trend: "Click to view details",
      onClick: () => navigate("/careers")
    },
    {
      title: "Active Learners",
      value: activeLearners?.toString() || "0",
      icon: GraduationCap,
      trend: "Enrolled in courses",
      onClick: () => navigate("/lms")
    },
    {
      title: "HR Queries",
      value: hrQueries?.toString() || "0",
      icon: MessageSquare,
      trend: "Pending requests",
      onClick: () => navigate("/time-tracking")
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 animate-fadeIn">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to AGS HCM
            </h1>
            <p className="text-muted-foreground">
              Your comprehensive HR management dashboard
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card 
                key={stat.title} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={stat.onClick}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recent Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIdeas?.map((idea) => (
                  <div key={idea.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{idea.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          By {idea.employee_profiles?.first_name} {idea.employee_profiles?.last_name}
                        </p>
                        <p className="mt-2 text-sm">{idea.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(idea.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate("/lms")}
              >
                View All Ideas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
