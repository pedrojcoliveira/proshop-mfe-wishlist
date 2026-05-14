import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import wishlistStore from '../store/wishlistStore';

const WishlistButton = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(() => wishlistStore.has(product._id));
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) return null;

  useEffect(() => {
    // Subscreve o store — atualiza o botão quando outro MFE altera a wishlist
    const unsubscribe = wishlistStore.subscribe((items) => {
      setInWishlist(items.some((item) => item._id === product._id));
    });
    return unsubscribe;
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      wishlistStore.remove(product._id);
    } else {
      wishlistStore.add(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      style={{
        background: 'rgba(255,255,255,0.85)',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      {inWishlist
        ? <FaHeart style={{ color: 'red', fontSize: '0.9rem' }} />
        : <FaRegHeart style={{ color: '#888', fontSize: '0.9rem' }} />
      }
    </button>
  );
};

export default WishlistButton;
