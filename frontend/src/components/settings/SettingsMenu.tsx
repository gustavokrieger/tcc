import React from 'react';
import Menu from '@material-ui/core/Menu';
import {IconButton} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FontSizeSetter from './FontSizeSetter';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import FontFamilySetter from './FontFamilySetter';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {FontSize} from '../../storage_items/FontSize';
import StorageItemCreator from '../../storage_items/StorageItemCreator';
import {useHistory} from 'react-router-dom';
import {FontFamily} from '../../storage_items/FontFamily';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      marginTop: theme.spacing(1.6),
      marginRight: theme.spacing(3),
      right: 0,
    },
    menuItems: {
      display: 'flex',
      margin: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    firstMenuItem: {
      marginRight: theme.spacing(2.5),
    },
    menuButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(0.5),
      marginRight: theme.spacing(2.5),
      marginLeft: theme.spacing(2.5),
    },
  })
);

type Props = {
  className?: string;
  disabled?: boolean;
};

export default function SettingsMenu(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const storageFontSize = StorageItemCreator.createFontSize();
  const storageFontFamily = StorageItemCreator.createFontFamily();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fontSize, setFontSize] = React.useState<FontSize>(
    storageFontSize.getCurrentOrDefault()
  );
  const [fontFamily, setFontFamily] = React.useState<FontFamily>(
    storageFontFamily.getCurrentOrDefault()
  );

  function handleClickOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClickApply() {
    storageFontSize.setValue(fontSize);
    storageFontFamily.setValue(fontFamily);
    reloadPage();
  }

  function reloadPage() {
    history.go(0);
  }

  function handleClickCancel() {
    const newFontSize = storageFontSize.getCurrentOrDefault();
    setFontSize(newFontSize);
    const newFontFamily = storageFontFamily.getCurrentOrDefault();
    setFontFamily(newFontFamily);
    handleClose();
  }

  function handleChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const newFontSize = (event.target as HTMLInputElement).value as FontSize;
    setFontSize(newFontSize);
  }

  function handleChangeFontFamily(event: React.ChangeEvent<HTMLInputElement>) {
    const newFontFamily = (event.target as HTMLInputElement)
      .value as FontFamily;
    setFontFamily(newFontFamily);
  }

  return (
    <div className={clsx(classes.root, props.className)}>
      <IconButton
        disabled={props.disabled}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickOpen}
      >
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Menu
        variant="menu"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.menuItems}>
          <FontSizeSetter
            className={classes.firstMenuItem}
            value={fontSize}
            handleChange={handleChangeFontSize}
          />
          <FontFamilySetter
            value={fontFamily}
            handleChange={handleChangeFontFamily}
          />
        </div>
        <Divider />
        <div className={classes.menuButtons}>
          <Button variant="contained" onClick={handleClickCancel}>
            cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickApply}
          >
            ok
          </Button>
        </div>
      </Menu>
    </div>
  );
}
