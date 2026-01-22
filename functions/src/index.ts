import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();

interface ModelCount {
  name: string;
  count: number;
}

/**
 * Cloud Function triggered whenever a document is created, updated, or deleted
 * in the xpoz-landing collection. It recalculates the top 3 models and updates
 * the cached-data/top-models document.
 */
export const updateTopModelsCache = functions.firestore
  .document("xpoz-landing/{docId}")
  .onWrite(async (change, context) => {
    try {
      console.log("Triggered updateTopModelsCache for document:", context.params.docId);

      // Get all documents from xpoz-landing collection
      const snapshot = await admin.firestore()
        .collection("xpoz-landing")
        .get();

      // Count model occurrences
      const modelCounts: { [key: string]: number } = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const modelName = data.model?.toLowerCase().trim();

        if (modelName) {
          modelCounts[modelName] = (modelCounts[modelName] || 0) + 1;
        }
      });

      // Convert to array and sort by count
      const sortedModels: ModelCount[] = Object.entries(modelCounts)
        .map(([name, count]) => ({name, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3); // Get top 3

      console.log("Top 3 models calculated:", sortedModels);

      // Update the cached document
      await admin.firestore()
        .collection("cached-data")
        .doc("top-models")
        .set({
          models: sortedModels,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
          totalSubmissions: snapshot.size,
        }, {merge: true});

      console.log("Top models cache updated successfully");

      return {
        success: true,
        topModels: sortedModels,
      };
    } catch (error) {
      console.error("Error updating top models cache:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update top models cache"
      );
    }
  });

/**
 * HTTP callable function to manually trigger cache update
 * Useful for initial setup or manual refresh
 */
export const refreshTopModelsCache = functions.https.onCall(async (data, context) => {
  try {
    console.log("Manual refresh of top models cache triggered");

    // Get all documents from xpoz-landing collection
    const snapshot = await admin.firestore()
      .collection("xpoz-landing")
      .get();

    // Count model occurrences
    const modelCounts: { [key: string]: number } = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const modelName = data.model?.toLowerCase().trim();

      if (modelName) {
        modelCounts[modelName] = (modelCounts[modelName] || 0) + 1;
      }
    });

    // Convert to array and sort by count
    const sortedModels: ModelCount[] = Object.entries(modelCounts)
      .map(([name, count]) => ({name, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Get top 3

    console.log("Top 3 models calculated:", sortedModels);

    // Update the cached document
    await admin.firestore()
      .collection("cached-data")
      .doc("top-models")
      .set({
        models: sortedModels,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        totalSubmissions: snapshot.size,
      }, {merge: true});

    console.log("Top models cache refreshed successfully");

    return {
      success: true,
      topModels: sortedModels,
      totalSubmissions: snapshot.size,
    };
  } catch (error) {
    console.error("Error refreshing top models cache:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to refresh top models cache"
    );
  }
});
