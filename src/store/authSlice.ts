import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import  { type User } from '../types/types'

const loadFromStorage = <T>(key: string, fallback: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? (JSON.parse(stored) as T) : fallback;
    } catch {
        return fallback;
    }
};

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = loadFromStorage<AuthState>("auth", {user: null, isLoggedIn: false});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Omit<User, "isLoggedIn">>) => {
            state.user = {...action.payload, isLoggedIn: true};
            state.isLoggedIn = true;
            localStorage.setItem(
                "auth",
                JSON.stringify({user: state.user, isLoggedIn: true})
            );
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("auth");
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;