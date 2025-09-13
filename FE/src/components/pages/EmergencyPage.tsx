import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertTriangle, MapPin, Clock, ExternalLink, Heart, Ambulance, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { EmergencyResources } from '@/entities/emergencyresources';

export default function EmergencyPage() {
  const [emergencyResources, setEmergencyResources] = useState<EmergencyResources[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencyResources = async () => {
      try {
        const { items } = await BaseCrudService.getAll<EmergencyResources>('emergencyresources');
        setEmergencyResources(items);
      } catch (error) {
        console.error('Error fetching emergency resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyResources();
  }, []);

  const emergencyNumbers = [
    // Placeholder for future emergency numbers
  ];

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
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
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 mr-4">

            </div>
            <h1 className="font-heading text-5xl font-bold text-foreground">
              Emergency Services
            </h1>
          </div>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Quick access to emergency contacts and resources. In case of emergency, 
            call the appropriate number immediately for immediate assistance.
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div 
          className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
            <div>
              <h3 className="font-heading text-xl font-semibold text-destructive mb-2">
                Emergency Support
              </h3>
              <p className="font-paragraph text-destructive">
                For urgent help, use the nearest hospital or dial local emergency services. 
                For non-urgent support, please use our Contact Us form and we will respond during business hours.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Numbers Placeholder */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
            Emergency Numbers (to be added)
          </h2>
          
          <div className="bg-light-grey/30 border-2 border-dashed border-light-grey rounded-lg p-12 text-center">
            <Phone className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-secondary mb-2">
              Emergency Contact Numbers
            </h3>
            <p className="font-paragraph text-secondary">
              Emergency hotline numbers will be displayed here when available
            </p>
          </div>
        </motion.div>

        {/* Emergency Resources */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
            Emergency Resources & Information
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
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
          ) : emergencyResources.length === 0 ? (
            <div className="text-center py-16">
              <AlertTriangle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                No emergency resources found
              </h3>
              <p className="font-paragraph text-secondary">
                Emergency resources information will be displayed here when available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-light-grey">
                    <CardContent className="p-6">
                      {/* Resource Image */}
                      {resource.resourceImage && (
                        <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-light-grey">
                          <Image
                            src={resource.resourceImage}
                            alt={resource.resourceName || 'Emergency Resource'}
                            width={400}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Resource Info */}
                      <div className="mb-4">
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                          {resource.resourceName}
                        </h3>
                        
                        {resource.description && (
                          <p className="font-paragraph text-secondary mb-3">
                            {resource.description}
                          </p>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3 mb-4">
                        {resource.contactNumber && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                            <a 
                              href={`tel:${resource.contactNumber}`}
                              className="font-paragraph text-sm text-primary hover:underline"
                            >
                              {resource.contactNumber}
                            </a>
                          </div>
                        )}
                        
                        {resource.availabilityInfo && (
                          <div className="flex items-start space-x-2">
                            <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            <p className="font-paragraph text-sm text-secondary">
                              {resource.availabilityInfo}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {resource.contactNumber && (
                          <Button 
                            className="w-full"
                            onClick={() => handleEmergencyCall(resource.contactNumber!)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Resource
                          </Button>
                        )}
                        
                        {resource.websiteUrl && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.open(resource.websiteUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Emergency Tips */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-light-grey p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6 text-center">
            Emergency Preparedness Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Before an Emergency
              </h3>
              <ul className="space-y-2 font-paragraph text-secondary">
                <li>• Keep emergency contact numbers easily accessible</li>
                <li>• Maintain a first aid kit at home and in your car</li>
                <li>• Know the location of nearest hospitals and clinics</li>
                <li>• Keep important medical information and medications handy</li>
                <li>• Ensure your phone is always charged</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                During an Emergency
              </h3>
              <ul className="space-y-2 font-paragraph text-secondary">
                <li>• Stay calm and assess the situation</li>
                <li>• Call the appropriate emergency number immediately</li>
                <li>• Provide clear location and nature of emergency</li>
                <li>• Follow instructions from emergency operators</li>
                <li>• Do not hang up until told to do so</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}