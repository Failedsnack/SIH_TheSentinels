import React from 'react';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-[120rem] mx-auto px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
              About NabhaSehatMitr
            </h1>
            <div className="w-32 h-0.5 bg-green-600 mx-auto"></div>
          </div>
        </div>

        {/* Content Lines */}
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <p className="font-paragraph text-2xl text-foreground leading-relaxed">
            <span className="font-bold">Our vision:</span> Make quality primary healthcare accessible to every village and household.
          </p>
          
          <p className="font-paragraph text-2xl text-foreground leading-relaxed">
            <span className="font-bold">The problem:</span> Rural communities face delays and gaps in timely medical access and records.
          </p>
          
          <p className="font-paragraph text-2xl text-foreground leading-relaxed">
            <span className="font-bold">What we do:</span> Provide a simple, low-bandwidth telemedicine service with verified doctors, medicine tracking, and secure medical records.
          </p>
          
          <p className="font-paragraph text-2xl text-foreground leading-relaxed">
            <span className="font-bold">Who we serve:</span> Elderly users, people in remote villages, and anyone who needs quick, trustworthy medical help.
          </p>
          
          <p className="font-paragraph text-2xl text-foreground leading-relaxed">
            <span className="font-bold">Privacy & trust:</span> We store records securely and show only necessary details to doctors.
          </p>
          
          <p className="font-paragraph text-2xl text-foreground leading-relaxed font-bold mt-12">
            Made with love by The Sentinels ❤️
          </p>
          
          {/* The Sentinels Logo at Bottom */}
          <div className="w-16 h-16 mx-auto mt-6">
            <Image
              src="https://static.wixstatic.com/media/08e0c6_b5ee17dc3b7a4b0a9464fa2219471798~mv2.png"
              alt="The Sentinels logo"
              width={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}