'use client';

import React, { useEffect, useState } from 'react';
import ImageCropper from '@/components/ImageCropper';
import { Trash2, Plus, Upload, X, Loader2, Calendar, Eye, User } from 'lucide-react';

interface Client {
    _id: string;
    name: string;
    description: string;
    designation: string;
    image: string;
    createdAt: string;
}

export default function Client() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [clientForm, setClientForm] = useState({ name: '', description: '', designation: '', image: '' });

    // Image cropping states
    const [cropperOpen, setCropperOpen] = useState(false);
    const [imageForCrop, setImageForCrop] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('/api/clients');
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageForCrop(reader.result as string);
                setCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedImage: string) => {
        setClientForm({ ...clientForm, image: croppedImage });
    };

    const handleClientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientForm),
            });

            if (response.ok) {
                setClientForm({ name: '', description: '', designation: '', image: '' });
                await fetchClients();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error creating client:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteClient = async (id: string) => {
        setDeletingId(id);
        try {
            await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            await fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setClientForm({ name: '', description: '', designation: '', image: '' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-xl">Loading clients...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                    <p className="text-gray-600 mt-1">Manage your client testimonials</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    Add New Client
                </button>
            </div>

            {/* Clients Grid */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        All Clients ({clients.length})
                    </h2>
                </div>

                {clients.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                        <p className="text-gray-600 mb-4">Get started by adding your first client testimonial</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Add Client
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client) => (
                            <div key={client._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative">
                                            <img
                                                src={client.image}
                                                alt={client.name}
                                                className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200"
                                            />
                                            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <Eye className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {client.name}
                                            </h3>
                                            <p className="text-sm text-blue-600 font-medium">
                                                {client.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-600 text-sm italic line-clamp-4">
                                            {`"${client.description}"`}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(client.createdAt).toLocaleDateString()}
                                        </div>

                                        <button
                                            onClick={() => deleteClient(client._id)}
                                            disabled={deletingId === client._id}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingId === client._id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Add New Client
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleClientSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter client name"
                                    value={clientForm.name}
                                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter client designation"
                                    value={clientForm.designation}
                                    onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Testimonial
                                </label>
                                <textarea
                                    placeholder="Enter client testimonial"
                                    value={clientForm.description}
                                    onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Photo
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="clientImageUpload"
                                        />
                                        <label
                                            htmlFor="clientImageUpload"
                                            className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Choose Photo
                                        </label>
                                    </div>

                                    {clientForm.image && (
                                        <div className="relative">
                                            <img
                                                src={clientForm.image}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-full border border-gray-200 mx-auto"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setClientForm({ ...clientForm, image: '' })}
                                                className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!clientForm.image || isLoading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Add Client'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ImageCropper
                image={imageForCrop}
                isOpen={cropperOpen}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
                aspectRatio={1}
            />
        </div>
    );
}