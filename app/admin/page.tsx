'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Project from '@/components/admin/Project';
import Client from '@/components/admin/Client';
import Contact from '@/components/admin/Contact';
import Newsletter from '@/components/admin/Newsletter';

export default function AdminPanel() {
  return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">Manage your projects, clients, and view submissions</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="projects" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 max-w-6xl mx-auto">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <Project />
            </TabsContent>

            <TabsContent value="clients">
              <Client />
            </TabsContent>

            <TabsContent value="contacts">
              <Contact />
            </TabsContent>

            <TabsContent value="newsletter">
              <Newsletter />
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}