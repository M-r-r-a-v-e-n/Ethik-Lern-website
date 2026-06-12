import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import styles from './AuthScreen.module.css';

export function AuthScreen() {
  const { signIn, signUp, isOnline } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setInfo('');
    if (!email || !password) { setError('E-Mail und Passwort sind Pflichtfelder.'); return; }
    if (mode === 'register' && !name) { setError('Bitte gib deinen Namen ein.'); return; }
    if (password.length < 6) { setError('Passwort muss mindestens 6 Zeichen haben.'); return; }

    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
        setInfo('Fast fertig! Bitte bestätige deine E-Mail-Adresse und komme dann zurück.');
      }
    } catch (err) {
      const msg = err.message ?? String(err);
      if (msg.includes('Invalid login')) setError('E-Mail oder Passwort falsch.');
      else if (msg.includes('already registered')) setError('Diese E-Mail ist bereits registriert. Bitte einloggen.');
      else setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.logo}>📚</div>
        <h1 className={styles.title}>Ethik Lernapp</h1>
        <p className={styles.sub}>Quali-Vorbereitung · Spaced Repetition · For You</p>

        {!isOnline && (
          <div className={styles.offlineBanner}>
            ⚠️ Kein Supabase konfiguriert – App läuft im <strong>Offline-Modus</strong>.
            Fortschritt wird lokal gespeichert.
          </div>
        )}

        <div className={styles.tabs}>
          <button type="button" className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`} onClick={() => { setMode('login'); setError(''); setInfo(''); }}>Einloggen</button>
          <button type="button" className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`} onClick={() => { setMode('register'); setError(''); setInfo(''); }}>Registrieren</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'register' && (
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input className={styles.input} type="text" placeholder="Dein Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
          )}
          <div className={styles.field}>
            <label className={styles.label}>E-Mail</label>
            <input className={styles.input} type="email" placeholder="deine@email.de" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Passwort</label>
            <input className={styles.input} type="password" placeholder="Mindestens 6 Zeichen" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {info && <p className={styles.info}>{info}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Bitte warten...' : mode === 'login' ? 'Einloggen' : 'Registrieren'}
          </button>
        </form>

        <div className={styles.divider}><span>oder</span></div>

        <button
          type="button"
          className={styles.guestBtn}
          onClick={() => {
            // Trigger offline guest mode by reloading with flag
            window.__ethik_guest = true;
            window.location.reload();
          }}
        >
          Ohne Account weitermachen (Fortschritt nur lokal)
        </button>
      </div>
    </div>
  );
}
