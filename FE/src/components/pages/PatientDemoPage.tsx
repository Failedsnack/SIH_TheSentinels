import React from 'react';
import { User, Phone, Mail, Calendar, MapPin, Pill, FileText, Stethoscope, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PatientDemoPage() {
  const patientData = {
    name: "Aman Singh",
    phone: "1234567890",
    email: "aman.singh@nabhasehatmitr.gov.in",
    dob: "1998-03-12",
    gender: "Male",
    address: "Nabha, Punjab",
    emergencyContact: "9812345678"
  };

  const medicines = [
    {
      name: "Metformin 500mg",
      schedule: "Morning",
      daysLeft: 12
    },
    {
      name: "Amlodipine 5mg",
      schedule: "Evening",
      daysLeft: 7
    }
  ];

  const reports = [
    {
      name: "Blood Test Report - March 2025",
      link: "https://example.com/sample-report-r100.pdf"
    }
  ];

  const consultations = [
    {
      date: "2025-07-02",
      doctor: "Dr. Anjali Verma",
      type: "Follow-up",
      condition: "Hypertension"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome back, {patientData.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{patientData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{patientData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-sm">{patientData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{patientData.dob}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{patientData.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-sm">{patientData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-medium">{patientData.emergencyContact}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Medicines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="w-5 h-5" />
                  <span>Current Medicines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicines.map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{medicine.name}</h4>
                        <p className="text-sm text-gray-600">{medicine.schedule}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={medicine.daysLeft <= 7 ? "destructive" : "secondary"}>
                          {medicine.daysLeft} days left
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medical Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Medical Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(report.link, '_blank')}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Consultations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5" />
                  <span>Recent Consultations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((consultation, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{consultation.doctor}</h4>
                        <Badge variant="outline">{consultation.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Stethoscope className="w-4 h-4" />
                          <span>{consultation.condition}</span>
                        </div>
                      </div>
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
                    <span>Book Appointment</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <FileText className="w-5 h-5" />
                    <span>Upload Report</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Pill className="w-5 h-5" />
                    <span>Medicine Reminder</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Phone className="w-5 h-5" />
                    <span>Contact Support</span>
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