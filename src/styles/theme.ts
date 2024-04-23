import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#0077C8' },
      secondary: { main: '#FFF' },
    },
  }),
);

export const DATE_STYLE = {
  dateStyle: 'medium',
} as const;

export default theme;
