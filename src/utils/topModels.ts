import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface TopModel {
  name: string;
  count: number;
}

/**
 * Updates the cached top 3 models in Firestore
 * This should be called after each submission to keep the cache fresh
 */
export const updateTopModelsCache = async (): Promise<void> => {
  try {
    // Fetch all submissions
    const q = query(collection(db, "xpoz-landing"));
    const querySnapshot = await getDocs(q);

    // Count model occurrences
    const modelCounts: { [key: string]: number } = {};

    querySnapshot.forEach((document) => {
      const data = document.data();
      const modelName = data.model?.trim().toLowerCase();

      if (modelName) {
        modelCounts[modelName] = (modelCounts[modelName] || 0) + 1;
      }
    });

    // Convert to array and sort by count
    const sortedModels: TopModel[] = Object.entries(modelCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Get top 3

    // Store in a dedicated collection for quick access
    const cacheDocRef = doc(db, "cached-data", "top-models");
    await setDoc(cacheDocRef, {
      models: sortedModels,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    // Don't throw - we don't want to block submissions if cache update fails
  }
};
