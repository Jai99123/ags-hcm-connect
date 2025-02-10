
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap, MessageSquare, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const stats = [
  {
    title: "Total Employees",
    value: "234",
    icon: Users,
    trend: "+14% from last month",
  },
  {
    title: "Open Positions",
    value: "12",
    icon: Briefcase,
    trend: "4 in final stage",
  },
  {
    title: "Active Learners",
    value: "89",
    icon: GraduationCap,
    trend: "32% completion rate",
  },
  {
    title: "HR Queries",
    value: "18",
    icon: MessageSquare,
    trend: "90% resolution rate",
  },
];

const Index = () => {
  const { data: recentIdeas } = useQuery({
    queryKey: ['recent-ideas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

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
              <Card key={stat.title} className="overflow-hidden">
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
                        <p className="text-sm text-gray-500 mt-1">{idea.department}</p>
                        <p className="mt-2 text-sm">{idea.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(idea.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
