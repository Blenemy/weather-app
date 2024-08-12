import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

import { WeatherForecastResponse } from "../../types/weatherForecastResponse";
import { formattedDate } from "../../utils/formattedDate";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          color: "black",
        }}
      >
        <Typography>{`Time: ${label}`}</Typography>
        <Typography>{`Temperature: ${payload[0].value}°C`}</Typography>
      </Box>
    );
  }

  return null;
};

interface WeatherChartProps {
  hourlyData: WeatherForecastResponse;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
  const formattedData = formattedDate(hourlyData);

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        3 hour interval forecast report
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherChart;
