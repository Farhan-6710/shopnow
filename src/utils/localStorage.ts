"use client"

// utils/localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) return { cartItems: [], currency: "USD" }; // 👈 fallback state
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state: Record<string, unknown>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.warn("Could not save state to localStorage", err);
  }
};

// utils/localStorage.js
