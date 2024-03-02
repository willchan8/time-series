import useStore from '../store/globalStore';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateSection() {
  const { fetchData, beginDate, setBeginDate, isLoading } = useStore((state) => state);

  const handleFetch = () => {
    fetchData(beginDate);
  };

  return (
    <section className="date-section">
      Date:
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
      <Button variant="contained" onClick={handleFetch} disabled={!beginDate || isLoading}>
        Fetch Data
      </Button>
    </section>
  );
}

export default DateSection;
