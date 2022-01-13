// UI ACTIONS

// Pass Splash
export const PASS_SPLASH = 'PASS_SPLASH';
export const passSplash = () => ({
  type: PASS_SPLASH,
});

// Toggle Action
export const TOGGLE_ACTION = 'TOGGLE_ACTION';
export const toggleAction = (toggleName) => ({
  type: TOGGLE_ACTION,
  toggleName,
});

// Modal
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

// Glitch
export const TOGGLE_GLITCH = 'TOGGLE_GLITCH';
export const toggleGlitch = () => ({
  type: TOGGLE_GLITCH,
});
