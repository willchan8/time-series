import { LineChart } from '@mui/x-charts/LineChart';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import useStore from '../store/globalStore';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function LineGraph() {
  const { data, isLoading } = useStore((state) => state);

  return (
    <Paper sx={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? <CircularProgress disableShrink /> : null}
      {!isLoading && data.length > 0 && (
        <LineChart
          series={[{ data: data?.map((item) => item.value), type: 'line', showMark: false }]}
          xAxis={[
            {
              data: data?.map((item) => item.time).map((time) => new Date(time)),
              scaleType: 'time',
              label: 'Time (UTC)',
              valueFormatter: (time) => dayjs(time).utc().format('LTS'),
            },
          ]}
          yAxis={[
            {
              scaleType: 'linear',
              label: 'Value',
            },
          ]}
        />
      )}
    </Paper>
  );
}
