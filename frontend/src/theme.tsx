import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fefefe',
    },
  },
  typography: {
    fontSize: Number(localStorage.getItem('fontSize')) || 14,
  },
});

export default theme;
