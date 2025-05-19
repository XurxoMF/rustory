/**
 * If the window is maximized or not.
 */
export const maximized: { value: boolean } = $state({ value: false });

/**
 * Toggles the maximized state.
 */
export const toggleMaximized = () => {
  maximized.value = !maximized.value;
};

/**
 * Sets the maximized state.
 */
export const setMaximized = (state: boolean) => {
  maximized.value = state;
};
