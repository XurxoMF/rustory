/*
This file contains all the data bout the APP like info, state and so on.
*/

// MXIMIZED STATE

/**
 * If the window is maximized or not.
 */
export const appMaximized: { value: boolean } = $state({ value: false });

/**
 * Toggles the maximized state.
 */
export const toggleAppMaximized = () => (appMaximized.value = !appMaximized.value);

/**
 * Sets the maximized state.
 *
 * @param state - If it's open or closed.
 */
export const setAppMaximized = (state: boolean) => (appMaximized.value = state);

// NAME

/**
 * The name of the APP.
 */
export const appName = "Rustory";

// VERSION

/**
 * The current version of the APP.
 */
export const appVersion: { value: string } = $state({ value: "X.X.X" });

/**
 * Sets the current version of the APP.
 *
 * @param version
 */
export const setAppVersion = (version: string) => (appVersion.value = version);
