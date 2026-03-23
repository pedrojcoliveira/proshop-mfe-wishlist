import { useState, useEffect } from 'react';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist') || '[]')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    };
    window.addEventListener('wishlistUpdated', handleUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleUpdate);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <p>
          Your wishlist is empty.{' '}
          <Link to='/catalog'>Browse products</Link>
        </p>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className='my-3 p-3 rounded'>
                <Link to={`/catalog/product/${product._id}`}>
                  <Card.Img src={product.image} variant='top' />
                </Link>
                <Card.Body>
                  <Link to={`/catalog/product/${product._id}`}>
                    <Card.Title>
                      <strong>{product.name}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as='h3'>${product.price}</Card.Text>
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <FaTrash /> Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default WishlistPage;
