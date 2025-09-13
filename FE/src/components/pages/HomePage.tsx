import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Stethoscope, Pill, FileText, Clock, ArrowRight, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities/doctors';
import { Medicines } from '@/entities/medicines';
import { useMember } from '@/integrations';

interface UserMedicine {
  id: string;
  name: string;
  slot: string;
  daysLeft: number;
}

export default function HomePage() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [medicines, setMedicines] = useState<Medicines[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMedicineDialog, setShowAddMedicineDialog] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    slot: '',
    timeline: ''
  });
  const [userMedicines, setUserMedicines] = useState<UserMedicine[]>([
    { id: '1', name: 'Paracetamol', slot: 'Morning', daysLeft: 7 },
    { id: '2', name: 'Amoxicillin', slot: 'Evening', daysLeft: 3 },
    { id: '3', name: 'Vitamin D', slot: 'Afternoon', daysLeft: 14 }
  ]);
  const { member, isAuthenticated } = useMember();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsData, medicinesData] = await Promise.all([
          BaseCrudService.getAll<Doctors>('doctors'),
          BaseCrudService.getAll<Medicines>('medicines')
        ]);
        
        // Filter out all doctors - empty array until real backend integration
        setDoctors([]); // No doctors to display
        setMedicines(medicinesData.items.slice(0, 8)); // Show first 8 medicines
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 }
    }
  } as const;

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.slot || !newMedicine.timeline) {
      return;
    }

    const medicine: UserMedicine = {
      id: Date.now().toString(),
      name: newMedicine.name,
      slot: newMedicine.slot,
      daysLeft: parseInt(newMedicine.timeline)
    };

    setUserMedicines(prev => [...prev, medicine]);
    setNewMedicine({ name: '', slot: '', timeline: '' });
    setShowAddMedicineDialog(false);
  };

  const handleDeleteMedicine = (id: string) => {
    setUserMedicines(prev => prev.filter(medicine => medicine.id !== id));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen grid place-items-center bg-background relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-7xl font-bold text-foreground leading-tight">
              <span style={{ color: '#14213D' }}>Nabha</span>
              <span style={{ color: '#2CA02C' }}>Sehat</span>
              <span style={{ color: '#C62828' }}>Mitr</span>
            </h1>
            <h2 className="font-heading text-4xl text-primary">{"Your Health, Our Priority"}</h2>
            <p className="font-paragraph text-lg text-secondary mt-4 leading-relaxed max-w-2xl">
              Access comprehensive healthcare services, connect with qualified doctors, 
              find nearby pharmacies, and manage your health records - all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/doctors" className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5" />
                  <span>Find Doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/emergency" className="flex items-center space-x-2">
                  <span>Emergency Services</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-96 h-96">
              <Image
                src="https://static.wixstatic.com/media/08e0c6_084abc097e4543d3987472beb060048e~mv2.jpg#originWidth=1056&originHeight=992"
                alt="NabhaSehatMitr Logo"
                width={384}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Quick Access Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Quick Access to Healthcare
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Get instant access to essential healthcare services and information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Find Doctors',
                description: 'Search and book appointments with qualified healthcare professionals',
                icon: Stethoscope,
                href: '/doctors',
                color: 'bg-primary'
              },
              {
                title: 'Nearby Pharmacies',
                description: 'Locate pharmacies near you with real-time availability',
                icon: Pill,
                href: '/pharmacies',
                color: 'bg-soft-gold'
              },
              {
                title: 'Emergency Services',
                description: '24/7 emergency contact and immediate assistance',
                icon: () => (
                  <Image
                    src="https://static.wixstatic.com/media/08e0c6_db220d55d54a4811856272edb67265d5~mv2.jpg"
                    alt="Emergency Siren"
                    width={32}
                    className="w-8 h-8 object-contain"
                  />
                ),
                href: '/emergency',
                color: 'bg-destructive'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={service.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-light-grey">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <p className="font-paragraph text-secondary">
                        {service.description}
                      </p>
                      <Button variant="ghost" className="mt-4">
                        Learn More <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Doctors Section */}
      <section className="py-16 bg-light-grey/30">
        <div className="max-w-[120rem] mx-auto px-8">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Featured Doctors
              </h2>
              <p className="font-paragraph text-lg text-secondary">
                Connect with experienced healthcare professionals
              </p>
            </div>
            <Link to="/doctors">
              <Button variant="outline">
                View All Doctors <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-light-grey rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-light-grey rounded mb-2"></div>
                    <div className="h-3 bg-light-grey rounded mb-4"></div>
                    <div className="h-3 bg-light-grey rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-16">
              <Stethoscope className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                No doctors available
              </h3>
              <p className="font-paragraph text-secondary">
                Doctor profiles will be available once the backend integration is complete.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor._id}
                    className="flex-shrink-0 w-80"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Dr. {doctor.fullName}
                        </h3>
                        <p className="font-paragraph text-primary mb-2">
                          {doctor.specialty}
                        </p>
                        <p className="font-paragraph text-sm text-secondary mb-4">
                          {doctor.yearsOfExperience} years experience
                        </p>
                        <Button size="sm" className="w-full">
                          Book Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Your Medicines Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-8">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-blue-600">
              Your Medicines
            </h2>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowAddMedicineDialog(true)}
            >
              + Add Medicine
            </Button>
          </motion.div>

          {/* Medicine Cards */}
          {userMedicines.length === 0 ? (
            <div className="text-center py-16">
              <Pill className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                No medicine added
              </h3>
              <p className="font-paragraph text-secondary">
                Add your medicines to track your medication schedule.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:space-x-0 md:gap-4" style={{ width: 'max-content' }}>
                {userMedicines.map((medicine, index) => (
                  <motion.div
                    key={medicine.id}
                    className="flex-shrink-0 w-72 md:w-auto"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-shadow duration-300 rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            {medicine.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteMedicine(medicine.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-paragraph text-sm text-blue-700 font-medium">
                              {medicine.slot}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="font-paragraph text-sm text-green-700">
                              {medicine.daysLeft} days left
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* User Dashboard Preview */}
      {isAuthenticated && (
        <section className="py-16 bg-light-grey/30">
          <div className="max-w-[120rem] mx-auto px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Welcome back, {member?.profile?.nickname || member?.contact?.firstName}!
              </h2>
              <p className="font-paragraph text-lg text-secondary">
                Quick access to your health information and services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/dashboard">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        My Dashboard
                      </h3>
                      <p className="font-paragraph text-secondary">
                        View your health overview and recent activity
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Link to="/reports">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-soft-gold mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        My Reports
                      </h3>
                      <p className="font-paragraph text-secondary">
                        Access your medical reports and test results
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link to="/appointments">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        Appointments
                      </h3>
                      <p className="font-paragraph text-secondary">
                        Manage your upcoming appointments
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      {/* Add Medicine Dialog */}
      <Dialog open={showAddMedicineDialog} onOpenChange={setShowAddMedicineDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-blue-600">Add New Medicine</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name *
              </label>
              <Input
                placeholder="Enter medicine name"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slot *
              </label>
              <Select value={newMedicine.slot} onValueChange={(value) => setNewMedicine(prev => ({ ...prev, slot: value }))}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline (Days) *
              </label>
              <Input
                type="number"
                placeholder="Enter number of days"
                value={newMedicine.timeline}
                onChange={(e) => setNewMedicine(prev => ({ ...prev, timeline: e.target.value }))}
                className="rounded-lg"
                min="1"
              />
            </div>

            <Button
              onClick={handleAddMedicine}
              disabled={!newMedicine.name || !newMedicine.slot || !newMedicine.timeline}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl"
            >
              Save Medicine
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}