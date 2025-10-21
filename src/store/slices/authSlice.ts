import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, User, LoginFormData, RegisterFormData } from '../../types';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    rememberCredentials: false,
};

// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterFormData, { rejectWithValue }) => {
        try {
            // Create new user
            const newUser: User = {
                id: Date.now().toString(),
                name: userData.name.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
            };

            // Save user to localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Save current user session
            saveToLocalStorage('currentUser', newUser);
            saveToLocalStorage('isAuthenticated', true);

            return newUser;
        } catch {
            return rejectWithValue('Registration failed. Please try again.');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: LoginFormData, { rejectWithValue }) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(
                (u: User) => u.email === loginData.email && u.password === loginData.password
            );

            if (!user) {
                return rejectWithValue('Invalid email or password');
            }

            // Save current user session
            saveToLocalStorage('currentUser', user);
            saveToLocalStorage('isAuthenticated', true);

            // Handle remember credentials
            if (loginData.rememberCredentials) {
                saveToLocalStorage('rememberedEmail', loginData.email);
                saveToLocalStorage('rememberedPassword', loginData.password);
                saveToLocalStorage('rememberCredentials', true);
            } else {
                removeFromLocalStorage('rememberedEmail');
                removeFromLocalStorage('rememberedPassword');
                removeFromLocalStorage('rememberCredentials');
            }

            return user;
        } catch {
            return rejectWithValue('Login failed. Please try again.');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        // Clear user data from localStorage
        removeFromLocalStorage('currentUser');
        removeFromLocalStorage('isAuthenticated');
        // Keep remembered credentials if user chose to remember them
    }
);

export const checkAuthStatus = createAsyncThunk(
    'auth/checkAuthStatus',
    async () => {
        const isAuthenticated = getFromLocalStorage('isAuthenticated');
        const currentUser = getFromLocalStorage('currentUser');
        const rememberCredentials = getFromLocalStorage('rememberCredentials');

        if (isAuthenticated && currentUser) {
            return { user: currentUser, rememberCredentials: rememberCredentials || false };
        }

        return null;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
                // rememberCredentials will be set in the thunk logic
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout User
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            })
            // Check Auth Status
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.rememberCredentials = action.payload.rememberCredentials;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                    state.rememberCredentials = false;
                }
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.rememberCredentials = false;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;