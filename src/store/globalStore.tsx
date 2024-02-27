import { create } from 'zustand';

// interface TimeSeriesData {
//   times: string[];
//   values: number[];
// }

interface TimeSeriesData {
  time: string;
  value: number;
}

interface State {
  beginDate: string;
  data: TimeSeriesData[];
  // data: TimeSeriesData;
}

interface Actions {
  setBeginDate: (date: string) => void;
  fetchData: (beginDate: string, end: string) => Promise<void>;
}

const useStore = create<State & Actions>((set) => ({
  beginDate: new Date(Date.now()).toLocaleDateString(),
  // data: { times: [], values: [] },
  data: [],
  setBeginDate: (date) => {
    set(() => ({ beginDate: date }));
  },
  fetchData: async (begin, end) => {
    try {
      const response = await fetch(`https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`);
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text);
      }
      // const structuredData = text.split('\n').reduce(
      //   (prev, curr) => {
      //     if (curr) {
      //       // Split the line into time and value. Regex [/\s+/] indicates whitespace of all lengths.
      //       const [time, value] = curr.split(/\s+/);
      //       if (!time || isNaN(parseFloat(value))) {
      //         return prev;
      //       }
      //       return { times: [...prev.times, time], values: [...prev.values, parseFloat(value)] };
      //     } else {
      //       return prev;
      //     }
      //   },
      //   { times: [], values: [] } as TimeSeriesData
      // );
      const structuredData = text.split('\n').reduce((prev, curr) => {
        // Split the line into time and value. Regex [/\s+/] indicates whitespace of all lengths.
        const [time, value] = curr.split(/\s+/);
        if (!time || isNaN(parseFloat(value))) {
          return prev;
        }
        return [...prev, { time, value: parseFloat(value) }];
      }, [] as TimeSeriesData[]);
      set({ data: structuredData });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;
