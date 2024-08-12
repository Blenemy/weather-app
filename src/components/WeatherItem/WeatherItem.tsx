import { Box, Typography } from "@mui/material";

interface WeatherItemProps {
  description: string;
  value: string;
  icon: string;
}

const WeatherItem: React.FC<WeatherItemProps> = ({
  description,
  value,
  icon,
}) => {
  return (
    <Box
      component={"article"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">{description}</Typography>
      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        <Typography variant="body1">{value}</Typography>
        <img src={icon} alt="Weather item icon" />
      </Box>
    </Box>
  );
};

export default WeatherItem;
