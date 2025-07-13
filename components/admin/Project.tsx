'use client';

import React, { useEffect, useState } from 'react';
import ImageCropper from '@/components/ImageCropper';
import { Trash2, Plus, Upload, X, Loader2, Calendar, Eye } from 'lucide-react';

interface Project {
    _id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}

export default function Project() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [projectForm, setProjectForm] = useState({ name: '', description: '', image: '' });

    // Image cropping states
    const [cropperOpen, setCropperOpen] = useState(false);
    const [imageForCrop, setImageForCrop] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
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
        setProjectForm({ ...projectForm, image: croppedImage });
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectForm),
            });

            if (response.ok) {
                setProjectForm({ name: '', description: '', image: '' });
                await fetchProjects();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        setDeletingId(id);
        try {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            await fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProjectForm({ name: '', description: '', image: '' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-xl">Loading projects...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-600 mt-1">Manage your project portfolio</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    Add New Project
                </button>
            </div>

            {/* Projects Grid */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        All Projects ({projects.length})
                    </h2>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                        <p className="text-gray-600 mb-4">Get started by creating your first project</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Create Project
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                                <div className="relative">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Eye className="h-4 w-4 text-gray-700" />
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {project.name}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </div>

                                        <button
                                            onClick={() => deleteProject(project._id)}
                                            disabled={deletingId === project._id}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingId === project._id ? (
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
                                Add New Project
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter project name"
                                    value={projectForm.name}
                                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Enter project description"
                                    value={projectForm.description}
                                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Image
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="imageUpload"
                                        />
                                        <label
                                            htmlFor="imageUpload"
                                            className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Choose Image
                                        </label>
                                    </div>

                                    {projectForm.image && (
                                        <div className="relative">
                                            <img
                                                src={projectForm.image}
                                                alt="Preview"
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setProjectForm({ ...projectForm, image: '' })}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
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
                                    disabled={!projectForm.image || isLoading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Add Project'
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
                aspectRatio={450 / 350}
            />
        </div>
    );
}