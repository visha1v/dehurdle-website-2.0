import { TAB_PORTRAIT_MAX_WIDTH } from 'constant';

import { useMediaQuery, useTheme } from '@mui/material';

const useViewport = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isTabPortrait = useMediaQuery(`(max-width: ${TAB_PORTRAIT_MAX_WIDTH}px)`);
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  return { isMobile, isTablet, isTabPortrait, isDesktop };
};

export default useViewport;
