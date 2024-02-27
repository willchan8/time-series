import { LineChart } from '@mui/x-charts/LineChart';
import Paper from '@mui/material/Paper';
import useStore from '../store/globalStore';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// TODO: Fix the hover label to show UTC time
export default function LineGraph() {
  // const { times, values } = useStore((state) => state.data);
  const data = useStore((state) => state.data);

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <LineChart
        series={[{ data: data?.map((item) => item.value), type: 'line', showMark: false }]}
        xAxis={[
          {
            data: data?.map((item) => item.time).map((time) => new Date(time)),
            scaleType: 'time',
            label: 'Time (UTC)',
            valueFormatter: (date) => dayjs(date).utc().format('LTS'),
          },
        ]}
        yAxis={[
          {
            scaleType: 'linear',
            label: 'Value',
          },
        ]}
      />
    </Paper>
  );
}
