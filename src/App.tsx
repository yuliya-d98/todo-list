import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/errorPage';
import PageContainer from './pages/PageContainer';
import TodoPage from './pages/todoPage';
import TodosPage from './pages/todosPage';
import WelcomePage from './pages/welcomePage';
import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageContainer />}>
            <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="todos">
              <Route index element={<TodosPage />} />
              <Route path=":todoId" element={<TodoPage />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
