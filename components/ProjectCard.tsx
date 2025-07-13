import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id: string;
    name: string;
    description: string;
    image: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
      <Card className="group overflow-hidden bg-gradient-to-br from-white to-slate-50 border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative">
          {/* Gradient overlay for modern look */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <CardHeader className="p-0 relative overflow-hidden">
              <div className="h-56 overflow-hidden relative">
                  <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Modern gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
          </CardHeader>

          <CardContent className="p-8 relative z-20">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                  {project.name}
              </h3>
              <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {project.description}
              </p>

              {/* Modern accent line */}
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
          </CardContent>

          <CardFooter className="p-8 pt-0 relative z-20">
              <Button
                  variant="outline"
                  className="w-full group/btn border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 py-6 text-lg font-semibold"
              >
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
          </CardFooter>
      </Card>
  );
};

export default ProjectCard;