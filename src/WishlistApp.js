import { Routes, Route } from 'react-router-dom';
import WishlistPage from './components/WishlistPage';

const WishlistApp = () => {
  return (
    <Routes>
      <Route path='/' element={<WishlistPage />} />
    </Routes>
  );
};

export default WishlistApp;
