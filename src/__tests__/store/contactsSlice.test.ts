import contactsReducer, {
    addContact,
    updateContact,
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
    // fetchContacts
} from '../../store/slices/contactsSlice';
import type { Contact, ContactFormData } from '../../types';

describe('contactsSlice', () => {
    const mockContact: Contact = {
        id: '1',
        name: 'John Doe',
        phoneNumber: '+1234567890',
        userId: 'user1'
    };

    const mockContactData: ContactFormData = {
        name: 'Jane Doe',
        phoneNumber: '+0987654321'
    };

    const initialState = {
        contacts: [],
        currentContact: null,
        loading: false,
        error: null,
    };

    it('should return initial state', () => {
        expect(contactsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addContact.pending', () => {
        const action = addContact.pending('', { userId: 'user1', contactData: mockContactData });
        const state = contactsReducer(initialState, action);
        expect(state.loading).toBe(true);
    });

    it('should handle addContact.fulfilled', () => {
        const action = addContact.fulfilled(mockContact, '', { userId: 'user1', contactData: mockContactData });
        const state = contactsReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.contacts).toContain(mockContact);
    });

    it('should handle addContact.rejected', () => {
        const action = addContact.rejected(new Error('Failed'), '', { userId: 'user1', contactData: mockContactData });
        const state = contactsReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed');
    });

    it('should handle updateContact.fulfilled', () => {
        const initialStateWithContact = {
            ...initialState,
            contacts: [mockContact]
        };

        const updatedContact = { ...mockContact, name: 'Updated Name' };
        const action = updateContact.fulfilled(updatedContact, '', { contactId: '1', contactData: mockContactData });
        const state = contactsReducer(initialStateWithContact, action);

        expect(state.contacts[0].name).toBe('Updated Name');
    });

    it('should handle deleteContact.fulfilled', () => {
        const initialStateWithContact = {
            ...initialState,
            contacts: [mockContact]
        };

        const action = deleteContact.fulfilled('1', '', '1');
        const state = contactsReducer(initialStateWithContact, action);

        expect(state.contacts).toHaveLength(0);
    });

    it('should handle setCurrentContact', () => {
        const action = setCurrentContact(mockContact);
        const state = contactsReducer(initialState, action);
        expect(state.currentContact).toEqual(mockContact);
    });

    it('should handle clearCurrentContact', () => {
        const initialStateWithCurrent = {
            ...initialState,
            currentContact: mockContact
        };

        const action = clearCurrentContact();
        const state = contactsReducer(initialStateWithCurrent, action);
        expect(state.currentContact).toBeNull();
    });
});
