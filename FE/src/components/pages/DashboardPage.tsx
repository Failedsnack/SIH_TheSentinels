import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Stethoscope, Clock, TrendingUp, Heart, Activity, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useMember } from '@/integrations';
import { Link } from 'react-router-dom';

// TODO: Create dashboard entities and implement backend integration
interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  totalReports: number;
  lastCheckup: string | null;
}

interface RecentActivity {
  id: string;
  type: 'appointment' | 'report' | 'consultation' | 'prescription';
  title: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface UpcomingAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'check-up';
}

export default function DashboardPage() {
  const { member } = useMember();
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalReports: 0,
    lastCheckup: null
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Implement actual API calls to fetch dashboard data
        // const [statsData, activityData, appointmentsData] = await Promise.all([
        //   BaseCrudService.getAll('user-stats'),
        //   BaseCrudService.getAll('recent-activity'),
        //   BaseCrudService.getAll('upcoming-appointments')
        // ]);
        
        // Simulated API call - replace with actual backend integration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // TODO: Replace with actual API responses
        setStats({
          totalAppointments: 0,
          upcomingAppointments: 0,
          totalReports: 0,
          lastCheckup: null
        });
        setRecentActivity([]);
        setUpcomingAppointments([]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [member]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4" />;
      case 'report':
        return <FileText className="w-4 h-4" />;
      case 'consultation':
        return <Stethoscope className="w-4 h-4" />;
      case 'prescription':
        return <Heart className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access your dashboard">
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-[120rem] mx-auto px-8">
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
              Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'User'}!
            </h1>
            <p className="font-paragraph text-lg text-secondary">
              Here's an overview of your health information and recent activity.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-light-grey">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary">Total Appointments</p>
                    <p className="font-heading text-3xl font-bold text-foreground">
                      {loading ? '...' : stats.totalAppointments}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-light-grey">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary">Upcoming</p>
                    <p className="font-heading text-3xl font-bold text-foreground">
                      {loading ? '...' : stats.upcomingAppointments}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-soft-gold/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-soft-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-light-grey">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary">Medical Reports</p>
                    <p className="font-heading text-3xl font-bold text-foreground">
                      {loading ? '...' : stats.totalReports}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-light-grey">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary">Last Checkup</p>
                    <p className="font-heading text-lg font-bold text-foreground">
                      {loading ? '...' : stats.lastCheckup || 'None'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-light-grey">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-heading text-xl font-bold text-foreground">
                    Upcoming Appointments
                  </CardTitle>
                  <Link to="/doctors">
                    <Button variant="outline" size="sm">
                      Book New
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="h-4 bg-light-grey rounded mb-2"></div>
                          <div className="h-3 bg-light-grey rounded mb-4"></div>
                        </div>
                      ))}
                    </div>
                  ) : upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-secondary mx-auto mb-4" />
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        No Upcoming Appointments
                      </h3>
                      <p className="font-paragraph text-secondary mb-4">
                        Schedule your next appointment with a healthcare professional.
                      </p>
                      <Link to="/doctors">
                        <Button>Find Doctors</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border border-light-grey rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-paragraph font-semibold text-foreground">
                              Dr. {appointment.doctorName}
                            </h4>
                            <Badge variant="secondary">
                              {appointment.type}
                            </Badge>
                          </div>
                          <p className="font-paragraph text-sm text-secondary mb-2">
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-secondary">
                            <span>{appointment.date}</span>
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-light-grey">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-bold text-foreground">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="h-4 bg-light-grey rounded mb-2"></div>
                          <div className="h-3 bg-light-grey rounded mb-4"></div>
                        </div>
                      ))}
                    </div>
                  ) : recentActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 text-secondary mx-auto mb-4" />
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        No Recent Activity
                      </h3>
                      <p className="font-paragraph text-secondary">
                        Your recent health activities will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-paragraph font-medium text-foreground">
                                {activity.title}
                              </h4>
                              <Badge className={getStatusColor(activity.status)}>
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="font-paragraph text-sm text-secondary">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-light-grey">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/doctors">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2">
                      <Stethoscope className="w-6 h-6" />
                      <span>Find Doctors</span>
                    </Button>
                  </Link>
                  
                  <Link to="/reports">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span>View Reports</span>
                    </Button>
                  </Link>
                  
                  <Link to="/pharmacies">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2">
                      <Heart className="w-6 h-6" />
                      <span>Find Pharmacies</span>
                    </Button>
                  </Link>
                  

                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Tips */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-light-grey bg-gradient-to-r from-primary/5 to-soft-gold/5">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-foreground flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Health Tip of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-foreground">
                  Stay hydrated by drinking at least 8 glasses of water daily. Proper hydration helps maintain 
                  body temperature, lubricates joints, and supports overall health. Consider setting reminders 
                  to drink water throughout the day.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MemberProtectedRoute>
  );
}