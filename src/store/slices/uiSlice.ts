import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
    modals: {
        addContact: false,
        editContact: false,
    },
    formStates: {
        isSubmitting: false,
        errors: {},
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // Modal actions
        openAddContactModal: (state) => {
            state.modals.addContact = true;
            state.modals.editContact = false;
        },
        openEditContactModal: (state) => {
            state.modals.editContact = true;
            state.modals.addContact = false;
        },
        closeAddContactModal: (state) => {
            state.modals.addContact = false;
        },
        closeEditContactModal: (state) => {
            state.modals.editContact = false;
        },
        closeAllModals: (state) => {
            state.modals.addContact = false;
            state.modals.editContact = false;
        },

        // Form state actions
        setFormSubmitting: (state, action: PayloadAction<boolean>) => {
            state.formStates.isSubmitting = action.payload;
        },
        setFormError: (state, action: PayloadAction<{ field: string; message: string }>) => {
            state.formStates.errors[action.payload.field] = action.payload.message;
        },
        clearFormError: (state, action: PayloadAction<string>) => {
            delete state.formStates.errors[action.payload];
        },
        clearAllFormErrors: (state) => {
            state.formStates.errors = {};
        },
        setFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
            state.formStates.errors = action.payload;
        },
    },
});

export const {
    openAddContactModal,
    openEditContactModal,
    closeAddContactModal,
    closeEditContactModal,
    closeAllModals,
    setFormSubmitting,
    setFormError,
    clearFormError,
    clearAllFormErrors,
    setFormErrors,
} = uiSlice.actions;

export default uiSlice.reducer;
