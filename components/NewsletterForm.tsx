'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Stay updated with our latest projects and insights. Join our newsletter for exclusive content.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isSubmitting} variant="secondary">
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${message.includes('Thank you') ? 'text-green-200' : 'text-red-200'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;