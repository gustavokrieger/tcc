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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={clsx(classes.root, props.className)}>
      <IconButton
        disabled={props.disabled}
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
        <div className={classes.menuItems}>
          <FontSizeSetter className={classes.firstMenuItem} />
          <FontFamilySetter />
        </div>
        <Divider />
        {/*todo fazer com que façam algo*/}
        <div className={classes.menuButtons}>
          <Button variant="contained">cancelar</Button>
          <Button variant="contained" color="primary">
            aplicar
          </Button>
        </div>
      </Menu>
    </div>
  );
}
