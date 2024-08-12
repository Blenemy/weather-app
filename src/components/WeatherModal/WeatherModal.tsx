import { Box, Modal } from "@mui/material";
import { ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "0",
  right: "0",
  width: "30%",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  px: 3,
  py: 2,
  height: "100%",
  backgroundColor: "#3333331d",
  backdropFilter: "blur(5px)",
  color: "#fff",
};

interface WeatherModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const WeatherModal: React.FC<WeatherModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      component="div"
      sx={{
        blur: "10px",
      }}
      slotProps={{ backdrop: { sx: { backgroundColor: "transparent" } } }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default WeatherModal;
