import {createMuiTheme} from '@material-ui/core/styles';
import StorageItemCreator from './storage_items/StorageItemCreator';

const storageFontFamily = StorageItemCreator.createFontFamily();
const storageFontSize = StorageItemCreator.createFontSize();

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fefefe',
    },
  },
  typography: {
    fontFamily: storageFontFamily.getCurrentOrDefault(),
    fontSize: Number(storageFontSize.getCurrentOrDefault()),
  },
});

export default theme;
