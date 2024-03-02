import { useEffect } from 'react';
import DateSection from './components/DateSection';
import LineGraph from './components/LineGraph';
import DataTable from './components/DataTable';
import useStore from './store/globalStore';

function App() {
  const { data, fetchData, beginDate, isError } = useStore((state) => state);

  // Fetch data on mount so page isn't blank
  useEffect(() => {
    fetchData(beginDate);
  }, []);

  return (
    <main>
      <DateSection />
      {!isError && data.length > 0 && (
        <>
          <LineGraph />
          <DataTable />
        </>
      )}
      {isError && data.length === 0 && (
        <p className="error">There was an error retrieving the data. Please try again.</p>
      )}
    </main>
  );
}

export default App;
