import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { ContactsState, Contact, ContactFormData } from '../../types';

const initialState: ContactsState = {
    contacts: [],
    currentContact: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (userId: string, { rejectWithValue }) => {
        try {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const userContacts = contacts.filter((contact: Contact) => contact.userId === userId);
            return userContacts;
        } catch {
            return rejectWithValue('Failed to fetch contacts');
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ userId, contactData }: { userId: string; contactData: ContactFormData }, { rejectWithValue }) => {
        try {
            const newContact: Contact = {
                id: Date.now().toString(),
                userId,
                name: contactData.name.trim(),
                phoneNumber: contactData.phoneNumber.trim(),
            };

            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(newContact);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            return newContact;
        } catch {
            return rejectWithValue('Failed to add contact');
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ contactId, contactData }: { contactId: string; contactData: ContactFormData }, { rejectWithValue }) => {
        try {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const contactIndex = contacts.findIndex((contact: Contact) => contact.id === contactId);

            if (contactIndex === -1) {
                return rejectWithValue('Contact not found');
            }

            const updatedContact = {
                ...contacts[contactIndex],
                name: contactData.name.trim(),
                phoneNumber: contactData.phoneNumber.trim(),
            };

            contacts[contactIndex] = updatedContact;
            localStorage.setItem('contacts', JSON.stringify(contacts));

            return updatedContact;
        } catch {
            return rejectWithValue('Failed to update contact');
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId: string, { rejectWithValue }) => {
        try {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const filteredContacts = contacts.filter((contact: Contact) => contact.id !== contactId);
            localStorage.setItem('contacts', JSON.stringify(filteredContacts));

            return contactId;
        } catch {
            return rejectWithValue('Failed to delete contact');
        }
    }
);

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setCurrentContact: (state, action: PayloadAction<Contact | null>) => {
            state.currentContact = action.payload;
        },
        clearCurrentContact: (state) => {
            state.currentContact = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Contacts
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
                state.error = null;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add Contact
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
                state.error = null;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Contact
            .addCase(updateContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete Contact
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentContact, clearCurrentContact, clearError } = contactsSlice.actions;
export default contactsSlice.reducer;