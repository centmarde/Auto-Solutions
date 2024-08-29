import { defineStore } from 'pinia';
import { supabase } from '../lib/supaBase'; // Import your Supabase client instance

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authErrors: [],
        authProcess: false,
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        processing: (state) => state.authProcess,
    },
    actions: {
        async getUser() {
            // Get the current user session from Supabase
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                this.authErrors = [error.message];
                this.authUser = null;
            } else {
                this.authUser = user;
            }
        },
        async handleLogin(data) {
            this.authErrors = [];
            this.authProcess = true;

            try {
                // Authenticate with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });

                if (error) {
                    this.authErrors = [error.message];
                } else {
                    sessionStorage.setItem('token', data.session.access_token);
                    this.authUser = data.user;
                    this.router.push('/dashboard'); // Redirect to dashboard
                }
            } catch (e) {
                this.authErrors = [e.message];
            } finally {
                this.authProcess = false;
            }
        },
        async handleRegister(data) {
            this.authErrors = [];
            this.authProcess = true;

            try {
                // Register with Supabase
                const { data: userData, error } = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                });

                if (error) {
                    this.authErrors = [error.message];
                } else {
                    sessionStorage.setItem('token', userData.session.access_token);
                    this.authUser = userData.user;
                    this.router.push('/dashboard'); // Redirect to dashboard
                }
            } catch (e) {
                this.authErrors = [e.message];
            } finally {
                this.authProcess = false;
            }
        },
        async handleLogout() {
            this.authProcess = true;

            try {
                // Logout with Supabase
                await supabase.auth.signOut();
                sessionStorage.clear();
                this.authUser = null;
                this.router.push('/'); // Redirect to login page
            } catch (e) {
                this.authErrors = [e.message];
            } finally {
                this.authProcess = false;
            }
        },
    },
});
