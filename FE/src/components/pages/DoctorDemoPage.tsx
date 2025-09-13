import React from 'react';
import { User, Phone, Mail, Building, FileText, Clock, Calendar, Stethoscope, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DoctorDemoPage() {
  const doctorData = {
    name: "Dr. Meera Sharma",
    phone: "0000000000",
    email: "meera.sharma@nabhasehatmitr.gov.in",
    dob: "1985-07-05",
    gender: "Female",
    qualifications: "MBBS, MD (General Medicine)",
    licenseNumber: "DOC12345",
    hospital: "Nabha Civil Hospital",
    department: "General Medicine",
    timeSlots: ["09:00-11:00", "17:00-19:00"]
  };

  const upcomingAppointments = [
    {
      date: "2025-09-20",
      time: "09:30",
      patient: "Sukhwinder Kaur",
      status: "confirmed",
      type: "Follow-up"
    }
  ];

  const todaySchedule = [
    { time: "09:00", patient: "Available", type: "slot" },
    { time: "09:30", patient: "Sukhwinder Kaur", type: "appointment" },
    { time: "10:00", patient: "Available", type: "slot" },
    { time: "10:30", patient: "Available", type: "slot" },
    { time: "17:00", patient: "Available", type: "slot" },
    { time: "17:30", patient: "Available", type: "slot" },
    { time: "18:00", patient: "Available", type: "slot" },
    { time: "18:30", patient: "Available", type: "slot" }
  ];

  const stats = {
    todayAppointments: 1,
    totalPatients: 45,
    pendingReports: 3,
    availableSlots: 7
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome, {doctorData.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today's Appointments</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.todayAppointments}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalPatients}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Reports</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingReports}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Available Slots</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.availableSlots}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Doctor Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{doctorData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{doctorData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-sm">{doctorData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Qualifications</p>
                  <p className="font-medium">{doctorData.qualifications}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{doctorData.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="font-medium">{doctorData.hospital}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{doctorData.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Slots</p>
                  <div className="space-y-1">
                    {doctorData.timeSlots.map((slot, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {slot}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{appointment.patient}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{appointment.date}</span>
                          <span>{appointment.time}</span>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {todaySchedule.map((slot, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        slot.type === 'appointment' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{slot.time}</span>
                        {slot.type === 'appointment' && (
                          <Badge variant="default" className="text-xs">
                            Booked
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        slot.type === 'appointment' ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {slot.patient}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16 flex flex-col items-center space-y-2">
                    <Calendar className="w-5 h-5" />
                    <span>View All Appointments</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Users className="w-5 h-5" />
                    <span>Patient Records</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <FileText className="w-5 h-5" />
                    <span>Write Prescription</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Clock className="w-5 h-5" />
                    <span>Update Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}