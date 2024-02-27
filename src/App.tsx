// import './styles/tailwind.css';
import './index.css';
import LineGraph from './components/LineGraph';
import DataTable from './components/DataTable';
import useStore from './store/globalStore';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function App() {
  const fetchData = useStore((state) => state.fetchData);
  const beginDate = useStore((state) => state.beginDate);
  const setBeginDate = useStore((state) => state.setBeginDate);

  const handleFetch = () => {
    const beginDateObj = new Date(beginDate);
    const formattedBeginDate = beginDateObj.toISOString();

    const end = beginDateObj.setUTCHours(23, 59, 59);
    const formattedEndDate = new Date(end).toISOString();

    fetchData(formattedBeginDate, formattedEndDate);
  };

  return (
    <main>
      <section className="date-section">
        Select Date:
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(beginDate)}
            onChange={(date) => {
              if (date) {
                setBeginDate(date.format('YYYY-MM-DD'));
              }
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={handleFetch} disabled={!beginDate}>
          Fetch Data
        </Button>
      </section>
      <LineGraph />
      <DataTable />
    </main>
  );
}

export default App;
