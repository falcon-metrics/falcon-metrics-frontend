import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#0077C8' },
      secondary: { main: '#FFF' },
    },
  }),
);

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];
