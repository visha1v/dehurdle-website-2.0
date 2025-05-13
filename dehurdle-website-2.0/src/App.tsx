import { CustomToast } from 'components';
import { observer } from 'mobx-react-lite';
import { MSTStoreProvider } from 'models';
import Router from 'routes';

import './App.scss';

const App = observer(() => {
  return (
    <MSTStoreProvider>
      <div className="container">
        <Router />
        <CustomToast />
      </div>
    </MSTStoreProvider>
  );
});

export default App;
