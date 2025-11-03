
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyQuote } from '@/data/motivationalQuotes';

const QUOTE_STORAGE_KEY = '@daily_quote';
const DATE_STORAGE_KEY = '@quote_date';

export function useDailyQuote() {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyQuote();
  }, []);

  const loadDailyQuote = async () => {
    try {
      const today = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem(DATE_STORAGE_KEY);
      const storedQuote = await AsyncStorage.getItem(QUOTE_STORAGE_KEY);

      // If it's a new day or no quote stored, get a new quote
      if (storedDate !== today || !storedQuote) {
        const newQuote = getDailyQuote();
        await AsyncStorage.setItem(QUOTE_STORAGE_KEY, newQuote);
        await AsyncStorage.setItem(DATE_STORAGE_KEY, today);
        setQuote(newQuote);
      } else {
        setQuote(storedQuote);
      }
    } catch (error) {
      console.log('Error loading daily quote:', error);
      // Fallback to getting a quote without storage
      setQuote(getDailyQuote());
    } finally {
      setLoading(false);
    }
  };

  return { quote, loading };
}
