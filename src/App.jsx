import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import StudentsPage from './pages/Students/StudentsPage';
import Feed from './pages/Feed/Feed';
import PostPage from './pages/PostPage/PostPage';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import ProductCard from './pages/Store/ProductCard';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import './App.module.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/:postId" element={<PostPage />} />
        <Route path="login" element={<Login />} />
        <Route path="store" element={<ProductCard />} />

        {/* Захищений маршрут */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile/*" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
