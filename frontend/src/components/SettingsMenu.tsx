import React from 'react';
import Menu from '@material-ui/core/Menu';
import {IconButton} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FontSizeSetter from './font_size_setter/FontSizeSetter';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstMenuItem: {
      padding: theme.spacing(2),
    },
  })
);

export default function SettingsMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        <div className={classes.firstMenuItem}>
          <FontSizeSetter />
        </div>
      </Menu>
    </div>
  );
}
