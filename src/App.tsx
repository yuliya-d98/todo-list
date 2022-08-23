import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/errorPage';
import PageContainer from './pages/PageContainer';
import TodosPage from './pages/todosPage';
import WelcomePage from './pages/welcomePage';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<PageContainer />}>
            <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="todos" element={<TodosPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Route>
        </Routes>
        {/* </BrowserRouter> */}
      </HashRouter>
    </Provider>
  );
};

export default App;
