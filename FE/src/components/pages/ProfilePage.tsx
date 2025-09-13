import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit, Save, X, Camera, Shield, Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    nickname: member?.profile?.nickname || '',
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
    phone: member?.contact?.phones?.[0] || '',
    title: member?.profile?.title || ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    healthTips: true,
    language: 'en'
  });

  const handleSave = async () => {
    // TODO: Implement profile update functionality
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      nickname: member?.profile?.nickname || '',
      firstName: member?.contact?.firstName || '',
      lastName: member?.contact?.lastName || '',
      phone: member?.contact?.phones?.[0] || '',
      title: member?.profile?.title || ''
    });
    setIsEditing(false);
  };

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // TODO: Save preferences to backend
  };

  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access your profile">
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-[120rem] mx-auto px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
              My Profile
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Manage your personal information, preferences, and account settings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-light-grey">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-heading text-2xl font-bold text-foreground">
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCancel}
                        className="flex items-center space-x-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Cancel</span>
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center space-x-1"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save</span>
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-light-grey">
                        {member?.profile?.photo?.url ? (
                          <Image src={member.profile.photo.url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary flex items-center justify-center">
                            <User className="w-8 h-8 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4 text-primary-foreground" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                      </h3>
                      <p className="font-paragraph text-secondary">
                        {member?.profile?.title || 'NabhaSehatMitr User'}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {member?.status || 'Active'}
                      </Badge>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.firstName}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="Enter first name"
                        />
                      ) : (
                        <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md">
                          {member?.contact?.firstName || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.lastName}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Enter last name"
                        />
                      ) : (
                        <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md">
                          {member?.contact?.lastName || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Nickname */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Display Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.nickname}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, nickname: e.target.value }))}
                          placeholder="Enter display name"
                        />
                      ) : (
                        <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md">
                          {member?.profile?.nickname || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Title/Profession
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.title}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter title or profession"
                        />
                      ) : (
                        <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md">
                          {member?.profile?.title || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-secondary" />
                        <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md flex-1">
                          {member?.loginEmail || 'Not provided'}
                        </p>
                        {member?.loginEmailVerified && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2">
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-secondary" />
                          <Input
                            value={editedProfile.phone}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter phone number"
                            className="flex-1"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-secondary" />
                          <p className="font-paragraph text-foreground py-2 px-3 bg-light-grey/30 rounded-md flex-1">
                            {member?.contact?.phones?.[0] || 'Not provided'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="border-t border-light-grey pt-6">
                    <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
                      Account Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="font-paragraph text-sm font-medium text-foreground">Member Since</p>
                          <p className="font-paragraph text-sm text-secondary">
                            {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Unknown'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="font-paragraph text-sm font-medium text-foreground">Last Login</p>
                          <p className="font-paragraph text-sm text-secondary">
                            {member?.lastLoginDate ? new Date(member.lastLoginDate).toLocaleDateString() : 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Preferences */}
              <Card className="border-light-grey">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold text-foreground flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Language */}
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                      Language
                    </label>
                    <Select 
                      value={preferences.language} 
                      onValueChange={(value) => handlePreferenceChange('language', value)}
                    >
                      <SelectTrigger>
                        <Globe className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                        <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-3">
                    <h5 className="font-paragraph text-sm font-medium text-foreground">Notifications</h5>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary">Email Notifications</span>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary">SMS Notifications</span>
                      <Switch
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary">Appointment Reminders</span>
                      <Switch
                        checked={preferences.appointmentReminders}
                        onCheckedChange={(checked) => handlePreferenceChange('appointmentReminders', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary">Health Tips</span>
                      <Switch
                        checked={preferences.healthTips}
                        onCheckedChange={(checked) => handlePreferenceChange('healthTips', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="border-light-grey">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold text-foreground flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="border-light-grey">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold text-foreground">
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Delete Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={actions.logout}
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MemberProtectedRoute>
  );
}