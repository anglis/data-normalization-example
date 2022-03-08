import { Provider } from 'react-redux'
import { store } from './store'
import Unoptimized from './unoptimized'
import Optimized from './optimized'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h3>Active users</h3>
        {/* <Unoptimized /> */}
        <Optimized />
      </div>
    </Provider>
  );
}

export default App;
