import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, Clock, Phone, Mail, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities/doctors';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Doctors>('doctors');
        
        // Filter out all doctors - empty array until real backend integration
        const filteredItems: Doctors[] = [];
        
        setDoctors(filteredItems);
        setFilteredDoctors(filteredItems);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.clinicAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialty filter
    if (specialtyFilter !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialty === specialtyFilter);
    }

    // Experience filter
    if (experienceFilter !== 'all') {
      const [min, max] = experienceFilter.split('-').map(Number);
      filtered = filtered.filter(doctor => {
        const experience = doctor.yearsOfExperience || 0;
        if (max) {
          return experience >= min && experience <= max;
        }
        return experience >= min;
      });
    }

    // Availability filter
    if (availabilityFilter === 'accepting') {
      filtered = filtered.filter(doctor => doctor.isAcceptingNewPatients);
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, specialtyFilter, experienceFilter, availabilityFilter]);

  // Predefined specialties list
  const predefinedSpecialties = [
    'Dermatologist',
    'Orthopedic Surgeon',
    'Gynecologist',
    'Cardiologist',
    'Ophthalmologist',
    'Neurologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Psychiatrist',
    'Pulmonologist'
  ];

  // Combine predefined specialties with any additional ones from doctors data
  const doctorSpecialties = [...new Set(doctors.map(doctor => doctor.specialty).filter(Boolean))];
  const allSpecialties = [...new Set([...predefinedSpecialties, ...doctorSpecialties])].sort();

  const handleBookAppointment = (doctorId: string) => {
    // TODO: Implement appointment booking functionality
    console.log('Booking appointment with doctor:', doctorId);
  };

  return (
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
            Find Doctors
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Connect with qualified healthcare professionals in your area. 
            Search by specialty, location, or doctor name to find the right care for you.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-light-grey p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <Input
                  placeholder="Search doctors, specialties, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {allSpecialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Experience Filter */}
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Experience</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10-20">10-20 years</SelectItem>
                <SelectItem value="20">20+ years</SelectItem>
              </SelectContent>
            </Select>

            {/* Availability Filter */}
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="accepting">Accepting New Patients</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-paragraph text-secondary">
            {loading ? 'Loading...' : `${filteredDoctors.length} doctors found`}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-light-grey rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-light-grey rounded mb-2"></div>
                  <div className="h-3 bg-light-grey rounded mb-4"></div>
                  <div className="h-3 bg-light-grey rounded mb-4"></div>
                  <div className="h-10 bg-light-grey rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Stethoscope className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
              No doctors found
            </h3>
            <p className="font-paragraph text-secondary">
              Try adjusting your search criteria or filters to find more results.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-light-grey">
                  <CardContent className="p-6">
                    {/* Doctor Photo */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-light-grey">
                      {doctor.profilePicture ? (
                        <Image
                          src={doctor.profilePicture}
                          alt={`Dr. ${doctor.fullName}`}
                          width={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Doctor Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        Dr. {doctor.fullName}
                      </h3>
                      <Badge variant="secondary" className="mb-2">
                        {doctor.specialty}
                      </Badge>
                      <p className="font-paragraph text-sm text-secondary mb-2">
                        {doctor.yearsOfExperience} years experience
                      </p>
                      {doctor.qualifications && (
                        <p className="font-paragraph text-xs text-secondary mb-2">
                          {doctor.qualifications}
                        </p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {doctor.clinicAddress && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <p className="font-paragraph text-sm text-secondary">
                            {doctor.clinicAddress}
                          </p>
                        </div>
                      )}
                      {doctor.contactEmail && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                          <p className="font-paragraph text-sm text-secondary">
                            {doctor.contactEmail}
                          </p>
                        </div>
                      )}
                      {doctor.consultationFee && (
                        <div className="flex items-center space-x-2">
                          <span className="font-paragraph text-sm font-semibold text-foreground">
                            Consultation Fee: ₹{doctor.consultationFee}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Availability Status */}
                    <div className="mb-4">
                      {doctor.isAcceptingNewPatients ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Accepting New Patients
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Not Accepting New Patients
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => handleBookAppointment(doctor._id)}
                        disabled={!doctor.isAcceptingNewPatients}
                      >
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}