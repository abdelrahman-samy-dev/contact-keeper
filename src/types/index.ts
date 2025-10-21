export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Contact {
    id: string;
    userId: string;
    name: string;
    phoneNumber: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    rememberCredentials: boolean;
}

export interface ContactsState {
    contacts: Contact[];
    currentContact: Contact | null;
    loading: boolean;
    error: string | null;
}

export interface UIState {
    modals: {
        addContact: boolean;
        editContact: boolean;
    };
    formStates: {
        isSubmitting: boolean;
        errors: Record<string, string>;
    };
}

export interface RootState {
    auth: AuthState;
    contacts: ContactsState;
    ui: UIState;
}

export interface LoginFormData {
    email: string;
    password: string;
    rememberCredentials?: boolean;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface ContactFormData {
    name: string;
    phoneNumber: string;
}

export interface ValidationError {
    field: string;
    message: string;
}
