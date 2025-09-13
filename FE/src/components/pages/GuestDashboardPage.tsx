import React from 'react';
import { FileText, Stethoscope, Phone, AlertCircle, Upload, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function GuestDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Guest Dashboard</h1>
          <p className="text-gray-600">Your account is being processed</p>
        </div>

        {/* Status Alert */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Account created — pending verification</strong>
            <br />
            Your account is currently under review. You'll receive an email notification once verification is complete.
          </AlertDescription>
        </Alert>

        {/* Available Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Report */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Upload Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Upload your medical reports and test results for future reference.
              </p>
              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </CardContent>
          </Card>

          {/* Find a Doctor */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-green-600" />
                <span>Find a Doctor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Search for qualified doctors and healthcare professionals in your area.
              </p>
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Doctors
              </Button>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-purple-600" />
                <span>Contact Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get help with your account or ask questions about our services.
              </p>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>What happens next?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Account Verification</h4>
                  <p className="text-gray-600 text-sm">
                    Our team will review your submitted information and verify your identity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email Notification</h4>
                  <p className="text-gray-600 text-sm">
                    You'll receive an email confirmation once your account is approved.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Full Access</h4>
                  <p className="text-gray-600 text-sm">
                    Access all features including appointment booking, medical records, and more.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Emergency Contact</h4>
                <p className="text-gray-600 text-sm mb-2">
                  For urgent medical assistance:
                </p>
                <div className="space-y-1 text-sm">
                  <p>Amritanshu Aditya: <span className="font-medium">8797760111</span></p>
                  <p>Dhruv Pratap Singh: <span className="font-medium">9513731600</span></p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">General Support</h4>
                <p className="text-gray-600 text-sm mb-2">
                  For account and technical support:
                </p>
                <p className="text-sm">
                  Email: <span className="font-medium">nabhasehatmitr@gmail.com</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}