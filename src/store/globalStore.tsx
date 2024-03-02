import { create } from 'zustand';

interface DataPoint {
  time: string;
  value: number;
}

interface State {
  beginDate: string;
  data: DataPoint[];
  isLoading: boolean;
  isError: boolean;
}

interface Actions {
  setBeginDate: (date: string) => void;
  fetchData: (date: string) => Promise<void>;
}

const useStore = create<State & Actions>((set) => ({
  // Set default date as today
  beginDate: new Date(Date.now()).toLocaleDateString(),
  data: [],
  isLoading: false,
  isError: false,
  setBeginDate: (date) => {
    set(() => ({ beginDate: date }));
  },
  fetchData: async (date) => {
    try {
      set({ isLoading: true, isError: false });

      const beginDateObj = new Date(date);

      const beginUTC = beginDateObj.setUTCHours(0, 0, 0);
      const begin = new Date(beginUTC).toISOString();

      const endUTC = beginDateObj.setUTCHours(23, 59, 59);
      const end = new Date(endUTC).toISOString();

      const response = await fetch(`https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`);
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text);
      }
      const structuredData = text.split('\n').reduce((prev, curr) => {
        // Split each line into [time, value]. Regex [/\s+/] indicates any continuous whitespace.
        const [time, value] = curr.split(/\s+/);

        const floatValue = parseFloat(value);

        if (!time || isNaN(floatValue)) {
          return prev;
        }
        return [...prev, { time, value: floatValue }];
      }, [] as DataPoint[]);
      set({ data: structuredData });
    } catch (error) {
      set({ isError: true });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
