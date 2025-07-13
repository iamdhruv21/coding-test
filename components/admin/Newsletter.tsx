import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Calendar, Newspaper, Users } from "lucide-react"

interface Newsletter {
    _id: string;
    email: string;
    createdAt: string;
}

export default function Newsletter() {
    const [newsletters, setNewsletter] = useState<Newsletter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewsletter();
    }, []);

    const fetchNewsletter = async () => {
        try {
            const response = await fetch('/api/newsletter');
            const data = await response.json();
            setNewsletter(data);
        } catch (error) {
            console.error('Error fetching Newsletter:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEmailInitials = (email: string) => {
        return email.charAt(0).toUpperCase()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-xl">Loading Newsletter...</div>
            </div>
        );
    }

    return (
        <Card className="max-w-6xl mx-auto p-6 space-y-6">
            <CardHeader>
                <CardTitle>Newsletter Subscriptions ({newsletters.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <span>Email Subscriber</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Subscribed Date</span>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {newsletters.map((newsletter, index) => (
                            <tr
                                key={newsletter._id}
                                className={`hover:bg-gray-50 transition-colors duration-150 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                                                {getEmailInitials(newsletter.email)}
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <a
                                                href={`mailto:${newsletter.email}`}
                                                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                            >
                                                {newsletter.email}
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatDate(newsletter.createdAt)}
                                        </span>
                                            <span className="text-xs text-gray-500">
                                            {new Date(newsletter.createdAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {newsletters.length === 0 && (
                        <div className="text-center py-12">
                            <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers yet</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Your newsletter subscribers will appear here once they sign up.
                            </p>
                        </div>
                    )}

                    {newsletters.length > 0 && (
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {newsletters.length} {newsletters.length === 1 ? 'subscriber' : 'subscribers'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}