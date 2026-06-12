import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isOnline } from '../lib/supabase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOnline) {
      // Offline mode – use localStorage guest
      const guest = { id: 'guest', email: 'local@offline', isGuest: true };
      setUser(guest);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isOnline) throw new Error('Offline-Modus: Kein Login möglich. Bitte Supabase konfigurieren.');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signUp = useCallback(async (email, password, displayName) => {
    if (!isOnline) throw new Error('Offline-Modus: Kein Login möglich. Bitte Supabase konfigurieren.');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    if (!isOnline) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const displayName = user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Lernender';

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, displayName, isOnline }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
