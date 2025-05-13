import { FC, memo } from 'react';

import { CustomAppWrapper } from 'components';

import {
  LeadingOrg,
  HomeLanding,
  Wreckers,
  DehurdleWorking,
  PricingCarousel
} from './components';

// Add error boundary to catch issues
import { ErrorBoundary } from 'react-error-boundary';

const Home: FC = memo(() => {
  return (
    <CustomAppWrapper>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <HomeLanding />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <LeadingOrg />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Wreckers />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <DehurdleWorking />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <PricingCarousel />
      </ErrorBoundary>
    </CustomAppWrapper>
  );
});
Home.displayName = 'Home';

export default Home;
