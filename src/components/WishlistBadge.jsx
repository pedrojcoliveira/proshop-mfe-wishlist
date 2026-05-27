import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import wishlistStore from '../store/wishlistStore';
import authService from 'mfeAuth/AuthService';

const WishlistBadge = ({ onClick }) => {
  const [count, setCount] = useState(() => wishlistStore.getAll().length);
  const [isAuth, setIsAuth] = useState(() => authService.isAuthenticated());

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items) => {
      setCount(items.length);
    });

    const handleUserChanged = (e) => {
      setIsAuth(!!e.detail.userInfo);
    };
    window.addEventListener('userChanged', handleUserChanged);

    return () => {
      unsubscribe();
      window.removeEventListener('userChanged', handleUserChanged);
    };
  }, []);

  if (!isAuth) return null;

  return (
    <span
      onClick={onClick}
      style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}
    >
      <FaHeart />
      Wishlist
      {count > 0 && (
        <Badge pill bg="danger" style={{ marginLeft: '5px' }}>
          {count}
        </Badge>
      )}
    </span>
  );
};

export default WishlistBadge;
