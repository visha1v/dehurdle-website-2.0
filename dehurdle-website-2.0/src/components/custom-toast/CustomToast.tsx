import { CrossIcon } from 'assets';
import { TOAST_PRESET } from 'constant';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';

import { IconButton, Snackbar, Typography } from '@mui/material';

import './customToast-styles.scss';

const CustomToast = observer(() => {
  const { viewStore } = useStore();
  const { toastStore } = viewStore;
  const { closeToast, isToastVisible, preset, toastSubTitle, toastTitle } = toastStore;

  const { Icon, backgroundColor, borderColor } = TOAST_PRESET[preset];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isToastVisible}
      onClose={closeToast}>
      <div className="custom-toast" style={{ backgroundColor, borderColor }}>
        <div className="custom-toast__sub-container">
          <Icon />
          <div className="custom-toast__title-container">
            <Typography className="custom-toast__title">{toastTitle}</Typography>
            <Typography className="custom-toast__message">{toastSubTitle}</Typography>
          </div>
        </div>
        <IconButton onClick={closeToast} disableRipple>
          <CrossIcon color={'#5B717F'} />
        </IconButton>
      </div>
    </Snackbar>
  );
});

export default CustomToast;
