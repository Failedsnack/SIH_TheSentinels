import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Calendar, MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null);
  const [otp, setOtp] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    emergencyContact: '',
    department: '',
    hospital: '',
    licenseNumber: '',
    licenseFile: null as File | null
  });

  const handleGetOtp = () => {
    if (phoneNumber.length === 10) {
      // Check for demo accounts
      if (phoneNumber === '1234567890') {
        // Patient demo account - redirect directly to patient dashboard
        navigate('/patient-demo');
        return;
      }
      if (phoneNumber === '0000000000') {
        // Doctor demo account - redirect directly to doctor dashboard
        navigate('/doctor-demo');
        return;
      }
      setShowOtpDialog(true);
    }
  };

  const handleVerifyOtp = () => {
    setShowOtpDialog(false);
    setShowRoleDialog(true);
  };

  const handleRoleSelection = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    setShowRoleDialog(false);
    setShowRegistrationDialog(true);
  };

  const handleRegistrationSubmit = () => {
    setShowRegistrationDialog(false);
    navigate('/guest-dashboard');
  };

  const handleDemoLogin = (type: 'patient' | 'doctor') => {
    if (type === 'patient') {
      navigate('/patient-demo');
    } else {
      navigate('/doctor-demo');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-[520px]">
        {/* Main Login Card */}
        <Card className="bg-white rounded-xl shadow-lg border border-light-grey">
          <CardContent className="p-8">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="https://static.wixstatic.com/media/08e0c6_604e4019c62a49b6a1be00eb019cbdb1~mv2.jpeg"
                  alt="NABHASEHATMITR Logo"
                  width={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                Welcome to <span style={{ color: '#14213D' }}>Nabha</span><span style={{ color: '#2CA02C' }}>Sehat</span><span style={{ color: '#C62828' }}>Mitr</span>
              </h1>
              <p className="font-paragraph text-secondary">
                Enter your phone number to continue
              </p>
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 bg-light-grey/30 border border-r-0 border-light-grey rounded-l-lg">
                  <span className="font-paragraph text-sm text-foreground">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-l-none border-l-0 min-h-[44px]"
                />
              </div>
            </div>

            {/* Get OTP Button */}
            <Button 
              onClick={handleGetOtp}
              disabled={phoneNumber.length !== 10}
              className="w-full mb-6 min-h-[44px] bg-[#14213D] hover:bg-[#14213D]/90"
            >
              Get OTP
            </Button>

            {/* Demo Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline"
                onClick={() => handleDemoLogin('patient')}
                className="w-full min-h-[44px] text-sm"
              >
                Demo: Login as Patient (1234567890)
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleDemoLogin('doctor')}
                className="w-full min-h-[44px] text-sm"
              >
                Demo: Login as Doctor (0000000000)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* OTP Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Verify OTP</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Enter 6-digit OTP
                </label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest min-h-[44px]"
                />
                <p className="text-xs text-secondary mt-1">Demo: any OTP works</p>
              </div>
              <Button 
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="w-full min-h-[44px] bg-[#14213D] hover:bg-[#14213D]/90"
              >
                Verify
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Role Selection Dialog */}
        <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Select Your Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Button 
                onClick={() => handleRoleSelection('patient')}
                className="w-full min-h-[44px] bg-[#2CA02C] hover:bg-[#2CA02C]/90"
              >
                I am a Patient
              </Button>
              <Button 
                onClick={() => handleRoleSelection('doctor')}
                className="w-full min-h-[44px] bg-[#14213D] hover:bg-[#14213D]/90"
              >
                I am a Doctor
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Registration Dialog */}
        <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                {selectedRole === 'patient' ? 'Patient Registration' : 'Doctor Registration'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Common Fields */}
              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  placeholder="Enter your full name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Date of Birth *
                </label>
                <Input
                  type="date"
                  value={registrationData.dob}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, dob: e.target.value }))}
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Gender *
                </label>
                <Select value={registrationData.gender} onValueChange={(value) => setRegistrationData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Address *
                </label>
                <Input
                  placeholder="Enter your address"
                  value={registrationData.address}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, address: e.target.value }))}
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Emergency Contact (Optional)
                </label>
                <Input
                  placeholder="Emergency contact number"
                  value={registrationData.emergencyContact}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  className="min-h-[44px]"
                />
              </div>

              {/* Doctor-specific Fields */}
              {selectedRole === 'doctor' && (
                <>
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                      Department *
                    </label>
                    <Input
                      placeholder="Medical department"
                      value={registrationData.department}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, department: e.target.value }))}
                      className="min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                      Hospital *
                    </label>
                    <Input
                      placeholder="Hospital name"
                      value={registrationData.hospital}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, hospital: e.target.value }))}
                      className="min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                      License Number *
                    </label>
                    <Input
                      placeholder="Medical license number"
                      value={registrationData.licenseNumber}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      className="min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                      Upload License File *
                    </label>
                    <div className="border-2 border-dashed border-light-grey rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="text-sm text-secondary">Click to upload license file</p>
                    </div>
                  </div>
                </>
              )}

              <Button 
                onClick={handleRegistrationSubmit}
                className="w-full min-h-[44px] bg-[#2CA02C] hover:bg-[#2CA02C]/90"
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}