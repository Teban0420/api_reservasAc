import React, {Fragment, useContext} from 'react'
import { ApiProvider, ApiContext } from './context/ApiContext';
import { AppRouter } from './router/AppRouter';


function App() {

  const [ auth, guardarAuth ] = useContext(ApiContext);
  
  return (
    <>
      <Fragment>
        <ApiProvider value={[auth, guardarAuth]}>
          <AppRouter />
        </ApiProvider>
      </Fragment>
    </>
    
  );
}

export default App;
