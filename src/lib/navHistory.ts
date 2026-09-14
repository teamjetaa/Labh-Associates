/*
 * In-app navigation depth tracker.
 *
 * React Router stores its history index on window.history.state, but that
 * value is not always present/available (embedded & preview contexts, etc.).
 * When it is missing the Back button used to fall back to the homepage,
 * which made back always jump home instead of one page back.
 *
 * We keep our own counter instead: every PUSH adds a step, every POP
 * (browser back/forward) removes one. This lets the Back button know
 * whether there is real in-app history to return to.
 */

let inAppDepth = 0;

export function recordNavigation(type: 'PUSH' | 'POP' | 'REPLACE') {
  if (type === 'PUSH') {
    inAppDepth += 1;
  } else if (type === 'POP') {
    inAppDepth = Math.max(0, inAppDepth - 1);
  }
}

export function getInAppDepth() {
  return inAppDepth;
}