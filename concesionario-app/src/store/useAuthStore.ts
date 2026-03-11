import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'admin' | 'engineer' | 'pilot' | 'rookie';

export interface ContactInfo { id: number; type: string; value: string; }

export interface User {
    username: string;
    role: Role;
    password?: string;
    avatar?: string;
    contactInfo?: ContactInfo[];
    registrationDate?: string;
    isOnline?: boolean; // <--- NUEVO INDICADOR DE ESTADO
}

interface AuthState {
    user: User | null;
    registeredUsers: User[];
    login: (user: User) => void;
    logout: () => void;
    registerUser: (newUser: User) => void;
    removeUser: (username: string) => void;
    updateUserRole: (targetUsername: string, newRole: Role) => void;
    updateUserAvatar: (avatar: string) => void;
    updateUserContactInfo: (contactInfo: ContactInfo[]) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            registeredUsers: [],

            // AL ENTRAR: Encendemos el interruptor de conexión
            login: (user) => set((state) => {
                const updatedList = state.registeredUsers.map(u =>
                    u.username === user.username ? { ...u, isOnline: true } : u
                );
                return {
                    user: { ...user, isOnline: true },
                    registeredUsers: updatedList
                };
            }),

            // AL SALIR: Apagamos el interruptor de conexión
            logout: () => set((state) => {
                if (!state.user) return { user: null };
                const updatedList = state.registeredUsers.map(u =>
                    u.username === state.user!.username ? { ...u, isOnline: false } : u
                );
                return { user: null, registeredUsers: updatedList };
            }),

            registerUser: (newUser) => set((state) => ({
                registeredUsers: [...state.registeredUsers, {
                    ...newUser,
                    contactInfo: newUser.contactInfo || [],
                    registrationDate: newUser.registrationDate || new Date().toISOString(),
                    isOnline: false // Por defecto al registrarse están offline hasta que entran
                }]
            })),

            removeUser: (target) => set((state) => ({
                registeredUsers: state.registeredUsers.filter((u) => u.username !== target)
            })),

            updateUserRole: (target, newRole) => set((state) => {
                const updatedList = state.registeredUsers.map(u =>
                    u.username === target ? { ...u, role: newRole } : u
                );
                const isMe = state.user?.username === target;
                return { registeredUsers: updatedList, user: isMe ? { ...state.user!, role: newRole } : state.user };
            }),

            updateUserAvatar: (avatar) => set((state) => {
                if (!state.user) return state;
                const updatedMe = { ...state.user, avatar };
                const updatedList = state.registeredUsers.map(u =>
                    u.username.toLowerCase() === state.user!.username.toLowerCase() ? updatedMe : u
                );
                return { user: updatedMe, registeredUsers: updatedList };
            }),

            updateUserContactInfo: (contactInfo) => set((state) => {
                if (!state.user) return state;
                const updatedMe = { ...state.user, contactInfo };
                const updatedList = state.registeredUsers.map(u =>
                    u.username.toLowerCase() === state.user!.username.toLowerCase() ? updatedMe : u
                );
                return { user: updatedMe, registeredUsers: updatedList };
            }),
        }),
        { name: 'motorsport-storage' }
    )
);