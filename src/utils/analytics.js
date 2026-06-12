/**
 * Analytics – Matomo + local event logging
 * 
 * Matomo wird automatisch verwendet wenn window._paq existiert.
 * Für lokale Analytics werden Events auch in localStorage geloggt.
 */

const LOCAL_KEY = 'ethik_analytics';
const MAX_LOCAL_EVENTS = 200;

function getLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]'); } catch { return []; }
}
function saveLocal(events) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(events.slice(-MAX_LOCAL_EVENTS))); } catch {}
}

/**
 * Track a custom event
 * @param {string} category  e.g. 'Quiz', 'Lesson', 'Auth'
 * @param {string} action    e.g. 'completed', 'started', 'failed'
 * @param {string} [name]    e.g. topic name, question id
 * @param {number} [value]   e.g. score percentage
 */
export function trackEvent(category, action, name = '', value = undefined) {
  // Matomo
  if (typeof window !== 'undefined' && window._paq) {
    const payload = ['trackEvent', category, action];
    if (name) payload.push(name);
    if (value !== undefined) payload.push(value);
    window._paq.push(payload);
  }

  // Local log
  const event = {
    category,
    action,
    name: name || undefined,
    value,
    ts: new Date().toISOString(),
  };
  const events = getLocal();
  events.push(event);
  saveLocal(events);
}

/**
 * Track a page view
 */
export function trackPageView(pageName) {
  if (typeof window !== 'undefined' && window._paq) {
    window._paq.push(['setDocumentTitle', pageName]);
    window._paq.push(['trackPageView']);
  }
  trackEvent('Navigation', 'pageview', pageName);
}

/**
 * Pre-defined event helpers (match the spec)
 */
export const Analytics = {
  lessonCompleted: (topicId, durationSeconds) =>
    trackEvent('Lesson', 'lesson_completed', topicId, durationSeconds),

  lessonStarted: (topicId) =>
    trackEvent('Lesson', 'lesson_started', topicId),

  quizCompleted: (mode, pct, questionCount) =>
    trackEvent('Quiz', 'quiz_completed', mode, pct),

  quizStarted: (mode) =>
    trackEvent('Quiz', 'quiz_started', mode),

  cardReviewed: (questionId, quality) =>
    trackEvent('SR', 'card_reviewed', questionId, quality),

  badgeUnlocked: (badgeId) =>
    trackEvent('Badge', 'badge_unlocked', badgeId),

  scenarioCompleted: (scenarioId, consequence) =>
    trackEvent('Scenario', 'scenario_completed', scenarioId),

  journalAdded: () =>
    trackEvent('Journal', 'entry_added'),

  authLogin: () =>
    trackEvent('Auth', 'login'),

  authRegister: () =>
    trackEvent('Auth', 'register'),
};

/**
 * Get local analytics summary
 */
export function getLocalAnalytics() {
  const events = getLocal();
  const byCategory = {};
  for (const e of events) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + 1;
  }
  return {
    total: events.length,
    byCategory,
    recent: events.slice(-10).reverse(),
  };
}

/**
 * Initialize Matomo (call once on app start)
 * matomoUrl: 'https://your-matomo.example.com/'
 * siteId: '1'
 */
export function initMatomo(matomoUrl, siteId) {
  if (!matomoUrl || !siteId || typeof window === 'undefined') return;
  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = `${matomoUrl}matomo.js`;
  s.parentNode.insertBefore(g, s);
  window._paq.push(['setTrackerUrl', `${matomoUrl}matomo.php`]);
  window._paq.push(['setSiteId', String(siteId)]);
}
