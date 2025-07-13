import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react"

interface Contact {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    createdAt: string;
}

export default function Contact() {
    const [contacts, setContact] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const response = await fetch('/api/contacts');
            const data = await response.json();
            setContact(data);
        } catch (error) {
            console.error('Error fetching contact:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-xl">Loading Contact...</div>
            </div>
        );
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <Card className="max-w-6xl mx-auto p-6 space-y-6">
            <CardHeader>
                <CardTitle>Contact Submissions ({contacts.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mobile
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                City
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date Added
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {contacts.map((contact, index) => (
                            <tr
                                key={contact._id}
                                className={`hover:bg-gray-50 transition-colors duration-150 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                                                {getInitials(contact.fullName)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {contact.fullName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="text-sm text-gray-900 hover:text-blue-600 transition-colors"
                                        >
                                            {contact.email}
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <a
                                            href={`tel:${contact.mobile}`}
                                            className="text-sm text-gray-900 hover:text-blue-600 transition-colors"
                                        >
                                            {contact.mobile}
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 capitalize">
                                        {contact.city}
                                    </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-500">
                                        {formatDate(contact.createdAt)}
                                    </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {contacts.length === 0 && (
                        <div className="text-center py-12">
                            <User className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by adding your first contact.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}