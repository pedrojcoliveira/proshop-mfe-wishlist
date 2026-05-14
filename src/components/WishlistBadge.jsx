import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import wishlistStore from '../store/wishlistStore';

const WishlistBadge = ({ onClick }) => {
  const [count, setCount] = useState(() => wishlistStore.getAll().length);

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe((items) => {
      setCount(items.length);
    });
    return unsubscribe;
  }, []);

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
