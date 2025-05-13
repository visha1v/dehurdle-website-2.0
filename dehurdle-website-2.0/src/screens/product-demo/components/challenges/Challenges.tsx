import { CHALLENGES } from 'constant';

import { GameCard } from './components';

const Challenges = () => {
  return CHALLENGES.map(challenge => <GameCard key={challenge.id} {...challenge} />);
};

export default Challenges;
