import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    username: string;
    password?: string; // password for authentication
    role: 'admin' | 'user';
}

interface AuthState {
    user: User | null;
    registeredUsers: User[];
    login: (user: User) => void;
    logout: () => void;
    registerUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            // default admin user
            registeredUsers: [{ username: 'admin', password: '123', role: 'admin' }],
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
            registerUser: (user) =>
                set((state) => ({
                    registeredUsers: [...state.registeredUsers, user],
                })),
        }),
        { name: 'auth-storage' } // key in localStorage
    )
);
