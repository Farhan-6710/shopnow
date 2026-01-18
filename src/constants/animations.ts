export const WINDOW_OPENER_ANIMATION = {
  MOUNT_CONTENT_DELAY_MS: 1000,
  CLEANUP_DELAY_MS: 2500,

  SHUTTER: {
    DURATION: 0.8,
    DELAY: 1.0,
    EASE: [0.76, 0, 0.24, 1] as const,
  },

  LINE: {
    WIDTH_DELAY: 0.35,
    DURATION: 0.5,
    OPACITY_DELAY: 1.0,
  },

  LOGO: {
    SCALE_DURATION: 0.5,
    EXIT_DELAY: 1.0,
    EXIT_DURATION: 0.3,
  },
};

export const NAVIGATION_WINDOW_ANIMATION = {
  // Opening sequence
  SHUTTER_OPEN_DELAY_MS: 600,
  CLEANUP_DELAY_MS: 2000,

  // Navigation trigger
  ROUTER_PUSH_DELAY_MS: 300, // Matches shutter duration + buffer (Was 550)

  SHUTTER: {
    DURATION: 0.4,
    EASE: [0.76, 0, 0.24, 1] as const,
  },

  LINE: {
    WIDTH_DELAY: 0.3,
    DURATION: 0.2,
    OPACITY_DELAY: 0.5,
  },

  LOGO: {
    ENTER_DURATION: 0.5,
    EXIT_DELAY: 0.5,
    EXIT_DURATION: 0.3,
  },
};
