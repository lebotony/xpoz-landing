import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { doc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

// Toggle this to switch between cache and direct reading
const USE_CACHE = true; // Cloud Functions are now deployed!

const ChartContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradient.glass};
  backdrop-filter: blur(30px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ChartTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: ${({ theme }) => theme.colors.gradient.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-align: center;
`;

const ModelList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const ModelItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RankNumber = styled.span<{ rank: number }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  background: ${({ rank }) => {
    if (rank === 1) return "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
    if (rank === 2) return "linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)";
    return "linear-gradient(135deg, #CD7F32 0%, #B87333 100%)";
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: ${({ rank }) => {
    if (rank === 1) return "0 2px 10px rgba(255, 215, 0, 0.3)";
    if (rank === 2) return "0 2px 10px rgba(192, 192, 192, 0.3)";
    return "0 2px 10px rgba(205, 127, 50, 0.3)";
  }};
`;

const ModelName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const EmptyState = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface TopModel {
  name: string;
  count: number;
}

export const TopModelsChart = () => {
  const [topModels, setTopModels] = useState<TopModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_CACHE) {
      // Production mode: Read from cache (requires Cloud Functions deployed)
      console.log("Setting up real-time listener for top models cache...");
      const cacheDocRef = doc(db, "cached-data", "top-models");

      const unsubscribe = onSnapshot(
        cacheDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const models = data.models || [];
            console.log("Top models updated from cache:", models);

            // Safely handle lastUpdated timestamp
            if (data.lastUpdated) {
              try {
                console.log("Last updated:", data.lastUpdated.toDate?.() || data.lastUpdated);
              } catch (e) {
                console.log("Last updated: (timestamp parsing error)");
              }
            }

            console.log("Total submissions:", data.totalSubmissions);
            setTopModels(models);
          } else {
            console.log("No cached top models found - Cloud Function will create it on first submission");
            setTopModels([]);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error listening to top models cache:", error);
          setTopModels([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      // Development mode: Read directly from collection
      console.log("Setting up real-time listener for xpoz-landing collection (direct mode)...");
      const collectionRef = collection(db, "xpoz-landing");
      const q = query(collectionRef);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
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
          const sortedModels = Object.entries(modelCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3); // Get top 3

          console.log("Top models calculated in real-time:", sortedModels);
          setTopModels(sortedModels);
          setLoading(false);
        },
        (error) => {
          console.error("Error listening to xpoz-landing collection:", error);
          setTopModels([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  if (loading) {
    return (
      <ChartContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ChartTitle>Top 3 Models 🔥</ChartTitle>
        <EmptyState>Loading...</EmptyState>
      </ChartContainer>
    );
  }

  if (topModels.length === 0) {
    return (
      <ChartContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ChartTitle>Top 3 Models 🔥</ChartTitle>
        <EmptyState>No models submitted yet. Be the first!</EmptyState>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ChartTitle>Top 3 Models 🔥</ChartTitle>
      <ModelList>
        {topModels.map((model, index) => (
          <ModelItem
            key={model.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <RankNumber rank={index + 1}>{index + 1}.</RankNumber>
            <ModelName>{model.name}</ModelName>
          </ModelItem>
        ))}
      </ModelList>
    </ChartContainer>
  );
};
