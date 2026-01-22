/**
 * One-time script to initialize the top models cache
 * Run this once to populate the cached-data/top-models document
 *
 * To run: Add a temporary button in your app that calls this function,
 * or run it from browser console after importing
 */

import { updateTopModelsCache } from "../utils/topModels";

export const initializeCache = async () => {
  console.log("Initializing top models cache...");
  try {
    await updateTopModelsCache();
    console.log("✅ Cache initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing cache:", error);
  }
};

// If running in browser console:
// import { initializeCache } from './scripts/initializeCache';
// initializeCache();
