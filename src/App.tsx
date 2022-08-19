import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageContainer from './pages/PageContainer';
import WelcomePage from './pages/welcomePage';
import TodosPage from './pages/todosPage';
import TodoPage from './pages/todoPage';
import ErrorPage from './pages/errorPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageContainer />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="todos">
            <Route index element={<TodosPage />} />
            <Route path=":todoId" element={<TodoPage />} />
          </Route>
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
