import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface ClientCardProps {
  client: {
    _id: string;
    name: string;
    description: string;
    designation: string;
    image: string;
  };
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
      <Card className="group p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-0 shadow-md relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

        <CardContent className="p-0 text-center relative z-10">
          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Profile image with modern styling */}
          <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full relative shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <img
                src={client.image}
                alt={client.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Ring effect */}
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-md" />
          </div>

          {/* Testimonial text with better typography */}
          <div className="mb-6 relative">
            <p className="text-slate-700 mb-4 italic text-lg leading-relaxed px-4">
              {`"${client.description}"`}
            </p>
            {/* Decorative line */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </div>

          {/* Client info with modern styling */}
          <div className="space-y-2">
            <h4 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
              {client.name}
            </h4>
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <p className="text-blue-700 text-sm font-medium">
                {client.designation}
              </p>
            </div>
          </div>
        </CardContent>
    </Card>
  );
};

export default ClientCard;