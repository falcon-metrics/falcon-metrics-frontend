import { MouseEvent, useCallback, useState } from 'react';

import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import { ReactComponent as CogwhellIcon } from 'assets/icons/cogwheel.svg';
import useSharedState from 'hooks/useSharedState';

import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';

import MenuItem from './components/MenuItem/MenuItem';

export type Props = {
  shouldShowProductTourOption: boolean;
};

const SettingsMenu = ({ shouldShowProductTourOption }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [, setTourIsOpen] = useSharedState('PRODUCT_TOUR_IS_OPEN');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProductTourClick = useCallback(() => {
    setTourIsOpen(true);
    handleClose();
  }, [setTourIsOpen]);

  return (
    <div
      style={{ width: 38, height: 38, marginLeft: 2 }}
      data-tour="connect-your-data"
    >
      <Tooltip
        title="Manage Data Sources"
        arrow
        placement="top"
        data-cy="manage-datasources-button"
      >
        <Fab
          size="small"
          color="primary"
          aria-label="settings"
          onClick={handleClick}
          style={{
            boxShadow: 'none',
            position: 'relative',
            width: 38,
            height: 38,
          }}
        >
          <Circle
            style={{
              color: '#0077c8',
              position: 'absolute',
              top: 15,
              width: 8,
              height: 8,
            }}
          />
          <CogwhellIcon
            style={{
              color: '#0077c8',
              position: 'absolute',
              width: 38,
              height: 38,
            }}
          />
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem path="/datasources" text="Manage Data Sources" />
        <MenuItem path="/organization-settings" text="Organisation Settings" />
        <MenuItem path="/profile" text="My Profile" />
        <MenuItem
          onClick={onProductTourClick}
          text="Show Product Tour"
          shouldBeHidden={!shouldShowProductTourOption}
        />
      </Menu>
    </div>
  );
};

export default SettingsMenu;
