'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ClientCard from '@/components/ClientCard';
import ContactForm from '@/components/ContactForm';
import NewsletterForm from '@/components/NewsletterForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from "next/image";
import AboutUs from "./pexels-andres-ayrton-6578391.svg"
import Hero from "./young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg"

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, clientsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/clients'),
        ]);

        const projectsData = await projectsRes.json();
        const clientsData = await clientsRes.json();

        setProjects(projectsData.slice(0, 3));
        setClients(clientsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
    );
  }

  return (
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">Portfolio</h1>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
                <a href="#projects" className="text-gray-700 hover:text-blue-600">Projects</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
              </div>
              <div className="flex space-x-4">
                <Link href="/admin">
                  <Button size="sm">Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white py-32 mt-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  Create Amazing
                  <span className="text-yellow-300"> Digital</span>
                  <br />
                  Experiences
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  We specialize in creating exceptional digital solutions that drive results.
                  From web development to design, we bring your vision to life with cutting-edge technology.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    View Our Work
                  </Button>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Start Project
                  </Button>
                </div>
                <div className="mt-12 flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">100+</div>
                    <div className="text-blue-200">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-blue-200">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">5+</div>
                    <div className="text-blue-200">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Image src={Hero} alt="Hero Section Image" className="object-fill h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of digital services to help your business grow and succeed in the digital landscape.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <p className="text-gray-600">Custom web applications built with modern technologies and best practices.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">UI/UX Design</h3>
                <p className="text-gray-600">Beautiful and intuitive designs that enhance user experience and engagement.</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Mobile Apps</h3>
                <p className="text-gray-600">Native and cross-platform mobile applications for iOS and Android.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Digital Marketing</h3>
                <p className="text-gray-600">Comprehensive digital marketing strategies to boost your online presence.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
                <p className="text-gray-600">Optimize your applications for speed, scalability, and better user experience.</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Maintenance & Support</h3>
                <p className="text-gray-600">Ongoing support and maintenance to keep your applications running smoothly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
                <p className="text-gray-600 mb-8">
                  We combine creativity with technical expertise to deliver exceptional results that exceed expectations.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Expert Team</h3>
                      <p className="text-gray-600">Our team consists of skilled professionals with years of experience in their respective fields.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quality Assurance</h3>
                      <p className="text-gray-600">We maintain the highest standards of quality in every project we undertake.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Timely Delivery</h3>
                      <p className="text-gray-600">We understand the importance of deadlines and always deliver projects on time.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">24/7 Support</h3>
                      <p className="text-gray-600">Our support team is available round the clock to assist you with any queries.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Projects Section */}
        <section id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Projects</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take a look at some of our recent work and see how we&#39;ve helped businesses achieve their goals.
              </p>
            </div>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {projects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
            ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-gray-400">📁</span>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">No projects available yet.</p>
                  <p className="text-gray-500">Check back soon for our latest work!</p>
                </div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We follow a proven process to ensure every project is delivered with excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Discovery</h3>
                <p className="text-gray-600">We start by understanding your business goals and requirements.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Planning</h3>
                <p className="text-gray-600">We create a detailed plan and strategy for your project.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Development</h3>
                <p className="text-gray-600">Our team brings your vision to life with cutting-edge technology.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Launch</h3>
                <p className="text-gray-600">We deploy your project and provide ongoing support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">About Us</h2>
                <p className="text-gray-600 mb-6">
                  We are a passionate team of designers, developers, and digital strategists who believe in the power of great design and technology to transform businesses.
                </p>
                <p className="text-gray-600 mb-8">
                  With over 5 years of experience in the industry, we have helped numerous businesses achieve their digital goals through innovative solutions and exceptional service.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600 text-sm">To help businesses succeed in the digital world through innovative solutions.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600 text-sm">To be the leading digital agency known for excellence and innovation.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Image src={AboutUs} alt="About Us" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Happy Clients Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Happy Clients</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don&#39;t just take our word for it. Here&#39;s what our clients have to say about working with us.
              </p>
            </div>
            {clients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {clients.map((client) => (
                      <ClientCard key={client._id} client={client} />
                  ))}
                </div>
            ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-gray-400">💬</span>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">No client testimonials available yet.</p>
                  <p className="text-gray-500">We&#39;re working hard to gather feedback from our amazing clients!</p>
                </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let&#39;s work together to bring your vision to life. Contact us today to get started on your next digital project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Now
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                View Our Work
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a project in mind? We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as possible.
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Let&#39;s Work Together</h3>
                <p className="text-gray-600 mb-8">
                  Whether you need a new website, mobile app, or digital marketing strategy, we&#39;re here to help you achieve your goals.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">hello@company.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-gray-600">123 Business Street, City, State 12345</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white">📘</span>
                    </div>
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white">🐦</span>
                    </div>
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white">💼</span>
                    </div>
                    <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white">📷</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-8 py-4 rounded-2xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gray-50">
          <NewsletterForm />
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
                <p className="text-gray-400 mb-4">
                  Creating exceptional digital experiences that drive results for businesses worldwide.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📘</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🐦</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💼</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Web Development</a></li>
                  <li><a href="#" className="hover:text-white">UI/UX Design</a></li>
                  <li><a href="#" className="hover:text-white">Mobile Apps</a></li>
                  <li><a href="#" className="hover:text-white">Digital Marketing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Our Team</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}