import {createMuiTheme} from '@material-ui/core/styles';
import StorageFontSize from './components/font_size_setter/StorageFontSize';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fefefe',
    },
  },
  typography: {
    fontSize: StorageFontSize.getCurrentOrDefault(),
  },
});

export default theme;
