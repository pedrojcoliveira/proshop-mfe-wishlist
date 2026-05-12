import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) return null;

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setInWishlist(wishlist.some((item) => item._id === product._id));
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let updated;

    if (inWishlist) {
      updated = wishlist.filter((item) => item._id !== product._id);
    } else {
      updated = [...wishlist, product];
    }

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setInWishlist(!inWishlist);
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { count: updated.length } }));
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
