// داخل theme/index.jsx
import { createTheme } from "@mui/material";

const getAppTheme = (mode) =>
  createTheme({
    typography: {
      button: {
        fontSize: '20px',
      },
    },
    palette: {
      mode: mode,
    },
  });

export default getAppTheme;
