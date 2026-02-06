import { useState, useEffect } from "react";
import { getApiUrl } from "@/config/api";

export function useHomepageData() {
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(getApiUrl("homepage"));

        if (!response.ok) {
          throw new Error(`Failed to fetch homepage data: ${response.status}`);
        }

        const result = await response.json();

        if (result.isSuccess && result.data) {
          setHomepageData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch homepage data");
        }
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError(err.message);
        setHomepageData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return { homepageData, loading, error };
}
