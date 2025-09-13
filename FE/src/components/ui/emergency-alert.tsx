import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmergencyAlertProps {
  emergencyKeywords: string[];
  onCallEmergency: () => void;
}

export function EmergencyAlert({ emergencyKeywords, onCallEmergency }: EmergencyAlertProps) {
  return (
    <Card className="border-destructive bg-destructive/5 animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 animate-bounce" />
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold text-destructive mb-2">
              🚨 MEDICAL EMERGENCY DETECTED
            </h3>
            <p className="font-paragraph text-destructive mb-4">
              Your symptoms indicate a potential medical emergency. Immediate medical attention is required.
            </p>
            <div className="mb-4">
              <p className="font-paragraph text-sm text-destructive mb-2">
                Emergency indicators detected:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {emergencyKeywords.map((keyword, index) => (
                  <li key={index} className="font-paragraph text-sm text-destructive font-semibold">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onCallEmergency}
                className="bg-destructive hover:bg-destructive/90 text-white font-bold"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                CALL 108 NOW
              </Button>
              <Button 
                onClick={() => window.open('tel:112', '_self')}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                CALL 112 NOW
              </Button>
            </div>
            <div className="mt-4 p-3 bg-destructive/10 rounded-md">
              <p className="font-paragraph text-xs text-destructive">
                <strong>DO NOT DELAY:</strong> Call emergency services immediately. Do not drive yourself to the hospital. 
                Stay calm and follow the emergency operator's instructions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}