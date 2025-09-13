import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Pharmacies } from '@/entities/pharmacies';

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacies[]>([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacies[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Pharmacies>('pharmacies');
        
        // List of pharmacies to exclude
        const excludedPharmacies = [
          'Apollo Pharmacy',
          'MedPlus Pharmacy', 
          'Wellness Forever',
          'Netmeds Store',
          'Generic Aadhaar',
          'Sanjeevani Pharmacy',
          'City Medicos',
          'Care Pharmacy',
          'Health Plus Pharmacy',
          'LifeCare Pharmacy',
          'Trust Pharmacy',
          'Jan Aushadhi Kendra',
          'Global Meds',
          'Shri Ram Pharmacy',
          'Punjab Chemists',
          'Bassi Specilitiy Dental Clinic',
          'Bassi Specialty Dental Clinic',
          'City Chemists',
          'Satkartar Medical Hall',
          'Vohra Medicos'
        ];
        
        // Filter out excluded pharmacies
        const filteredItems = items.filter(pharmacy => 
          !excludedPharmacies.includes(pharmacy.name || '')
        );
        
        setPharmacies(filteredItems);
        setFilteredPharmacies(filteredItems);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pharmacies.filter(pharmacy =>
        pharmacy.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPharmacies(filtered);
    } else {
      setFilteredPharmacies(pharmacies);
    }
  }, [pharmacies, searchTerm]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError('');
        // Sort pharmacies by distance
        sortPharmaciesByDistance(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocationError('Unable to retrieve your location. Please enable location services.');
        console.error('Geolocation error:', error);
      }
    );
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const sortPharmaciesByDistance = (userLat: number, userLng: number) => {
    const sorted = [...filteredPharmacies].sort((a, b) => {
      if (!a.latitude || !a.longitude || !b.latitude || !b.longitude) return 0;
      
      const distanceA = calculateDistance(userLat, userLng, a.latitude, a.longitude);
      const distanceB = calculateDistance(userLat, userLng, b.latitude, b.longitude);
      
      return distanceA - distanceB;
    });
    setFilteredPharmacies(sorted);
  };

  const getDirections = (pharmacy: Pharmacies) => {
    if (pharmacy.latitude && pharmacy.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
      window.open(url, '_blank');
    }
  };

  const getDistance = (pharmacy: Pharmacies): string => {
    if (!userLocation || !pharmacy.latitude || !pharmacy.longitude) return '';
    
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      pharmacy.latitude, 
      pharmacy.longitude
    );
    
    return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`;
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
            Find Pharmacies
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Locate nearby pharmacies and get directions. Find the medications you need 
            with real-time availability and contact information.
          </p>
        </motion.div>

        {/* Search and Location */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-light-grey p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <Input
                  placeholder="Search pharmacies by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location Button */}
            <Button 
              onClick={getCurrentLocation}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Use My Location</span>
            </Button>
          </div>

          {/* Location Status */}
          {locationError && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="font-paragraph text-sm text-destructive">{locationError}</p>
            </div>
          )}
          
          {userLocation && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="font-paragraph text-sm text-green-800">
                Location detected. Pharmacies are sorted by distance.
              </p>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-paragraph text-secondary">
            {loading ? 'Loading...' : `${filteredPharmacies.length} pharmacies found`}
          </p>
        </motion.div>

        {/* Pharmacies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-light-grey rounded mb-4"></div>
                  <div className="h-4 bg-light-grey rounded mb-2"></div>
                  <div className="h-3 bg-light-grey rounded mb-4"></div>
                  <div className="h-10 bg-light-grey rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPharmacies.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
              No pharmacies found
            </h3>
            <p className="font-paragraph text-secondary">
              Try adjusting your search criteria to find more results.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPharmacies.map((pharmacy, index) => (
              <motion.div
                key={pharmacy._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-light-grey">
                  <CardContent className="p-6">
                    {/* Pharmacy Image */}
                    {/* Pharmacy Info */}
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-light-grey">

                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-xl font-semibold text-foreground">
                          {pharmacy.name}
                        </h3>
                        {userLocation && (
                          <Badge variant="secondary" className="text-xs">
                            {getDistance(pharmacy)}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-4">
                      {pharmacy.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <p className="font-paragraph text-sm text-secondary">
                            {pharmacy.address}
                          </p>
                        </div>
                      )}
                      
                      {pharmacy.phoneNumber && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                          <a 
                            href={`tel:${pharmacy.phoneNumber}`}
                            className="font-paragraph text-sm text-primary hover:underline"
                          >
                            {pharmacy.phoneNumber}
                          </a>
                        </div>
                      )}
                      
                      {pharmacy.openingHours && (
                        <div className="flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <p className="font-paragraph text-sm text-secondary">
                            {pharmacy.openingHours}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => getDirections(pharmacy)}
                        disabled={!pharmacy.latitude || !pharmacy.longitude}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      
                      {pharmacy.phoneNumber && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(`tel:${pharmacy.phoneNumber}`, '_self')}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Pharmacy
                        </Button>
                      )}
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