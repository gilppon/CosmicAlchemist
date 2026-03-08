/**
 * Cosmic Alchemist — Gesture Constants
 */

export const GESTURE_CONFIG = {
    // Pinch sensitivity
    MIN_DENSITY: 0.5,
    MAX_DENSITY: 5.0,
    DENSITY_STEPS: 0.1,

    // Rotation sensitivity (radians)
    ROTATION_THRESHOLD: Math.PI / 4, // 45 degrees to trigger element change

    // Animation config
    SPRING_CONFIG: {
        damping: 15,
        stiffness: 120,
        mass: 1,
    },

    // Visuals
    DEFAULT_ORB_SIZE: 180,
    GLOW_INTENSITY_MULTIPLIER: 0.4,
};

export const TYPE_COLORS = {
    fire: '#FF6B35',   // Bright Orange
    water: '#00A6FB',  // Azure Blue
    earth: '#8AC926',  // Apple Green
    air: '#FFCA3A',    // Sunglow Yellow
    aether: '#6A4C93', // Royal Purple (Synthesized)
};
