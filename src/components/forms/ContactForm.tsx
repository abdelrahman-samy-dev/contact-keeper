import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addContact, updateContact, clearError } from '../../store/slices/contactsSlice';
import type { ContactFormData, Contact } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Swal from 'sweetalert2';

interface ContactFormProps {
    contact?: Contact | null;
    onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSuccess }) => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.contacts);
    const { user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState<ContactFormData>({
        name: contact?.name || '',
        phoneNumber: contact?.phoneNumber || '',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name,
                phoneNumber: contact.phoneNumber,
            });
        }
    }, [contact]);

    useEffect(() => {
        if (error) {
            setFormErrors({ general: error });
        }
    }, [error]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field-specific error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        // Clear previous errors
        setFormErrors({});
        dispatch(clearError());

        // Basic validation
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
            errors.phoneNumber = 'Please enter a valid phone number';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            if (contact) {
                // Update existing contact
                await dispatch(updateContact({
                    contactId: contact.id,
                    contactData: formData
                })).unwrap();
                Swal.fire({
                    title: 'Updated!',
                    text: 'Contact has been updated successfully.',
                    icon: 'success',
                    confirmButtonColor: '#10b981'
                });
            } else {
                // Add new contact
                await dispatch(addContact({
                    userId: user.id,
                    contactData: formData
                })).unwrap();
                Swal.fire({
                    title: 'Added!',
                    text: 'Contact has been added successfully.',
                    icon: 'success',
                    confirmButtonColor: '#10b981'
                });
            }

            onSuccess?.();
        } catch (error) {
            // Error is handled by Redux
        }
    };

    return (
        <div className="space-y-6 relative z-40">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                    {contact ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <p className="text-slate-600">
                    {contact ? 'Update contact information' : 'Fill in the details to add a new contact'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {formErrors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center space-x-2">
                        <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{formErrors.general}</span>
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter contact name"
                        error={formErrors.name}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                        size="lg"
                        required
                    />

                    <Input
                        label="Phone Number"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number (e.g., +201234567890)"
                        error={formErrors.phoneNumber}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        }
                        size="lg"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onSuccess}
                        size="lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                        size="lg"
                        leftIcon={
                            contact ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            )
                        }
                    >
                        {contact ? 'Update Contact' : 'Add Contact'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
