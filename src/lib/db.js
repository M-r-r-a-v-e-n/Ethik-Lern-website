import { supabase, isOnline } from './supabase.js';

// ── Auth ──────────────────────────────────────────────────
export async function signUp(email, password, displayName) {
  if (!isOnline) throw new Error('offline');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  if (!isOnline) throw new Error('offline');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!isOnline) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!isOnline) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ── User Progress ─────────────────────────────────────────
export async function loadProgress(userId) {
  if (!isOnline) return null;
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function saveProgress(userId, progress) {
  if (!isOnline) return;
  const { error } = await supabase.from('user_progress').upsert({
    user_id: userId,
    ...progress,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) throw error;
}

// ── Sessions ──────────────────────────────────────────────
export async function addSession(userId, session) {
  if (!isOnline) return;
  const { error } = await supabase.from('sessions').insert({
    user_id: userId,
    ...session,
    created_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function loadSessions(userId, limit = 20) {
  if (!isOnline) return [];
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

// ── SR Cards ──────────────────────────────────────────────
export async function loadCards(userId) {
  if (!isOnline) return [];
  const { data, error } = await supabase
    .from('sr_cards')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

export async function upsertCard(userId, card) {
  if (!isOnline) return;
  const { error } = await supabase.from('sr_cards').upsert({
    user_id: userId,
    question_id: card.questionId,
    repetitions: card.repetitions,
    ease_factor: card.easeFactor,
    interval: card.interval,
    next_review: card.nextReview,
    last_review: card.lastReview,
    last_quality: card.lastQuality,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,question_id' });
  if (error) throw error;
}

export async function upsertCards(userId, cards) {
  if (!isOnline || cards.length === 0) return;
  const rows = cards.map((card) => ({
    user_id: userId,
    question_id: card.questionId,
    repetitions: card.repetitions,
    ease_factor: card.easeFactor,
    interval: card.interval,
    next_review: card.nextReview,
    last_review: card.lastReview,
    last_quality: card.lastQuality,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from('sr_cards')
    .upsert(rows, { onConflict: 'user_id,question_id' });
  if (error) throw error;
}

// ── Journal ───────────────────────────────────────────────
export async function loadJournalEntries(userId) {
  if (!isOnline) return [];
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}

export async function addJournalEntry(userId, entry) {
  if (!isOnline) return null;
  const { data, error } = await supabase.from('journal_entries').insert({
    user_id: userId,
    ...entry,
    created_at: new Date().toISOString(),
  }).select().single();
  if (error) throw error;
  return data;
}

export async function deleteJournalEntry(id, userId) {
  if (!isOnline) return;
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
}

// ── Badges ────────────────────────────────────────────────
export async function loadBadges(userId) {
  if (!isOnline) return [];
  const { data, error } = await supabase
    .from('user_badges')
    .select('badge_id, unlocked_at')
    .eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

export async function awardBadges(userId, badgeIds) {
  if (!isOnline || badgeIds.length === 0) return;
  const rows = badgeIds.map((badge_id) => ({
    user_id: userId,
    badge_id,
    unlocked_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from('user_badges')
    .upsert(rows, { onConflict: 'user_id,badge_id', ignoreDuplicates: true });
  if (error) throw error;
}
