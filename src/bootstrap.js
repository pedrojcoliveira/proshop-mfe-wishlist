import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import WishlistApp from './WishlistApp';
import mockWishlist from './mocks/mockWishlist';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dev-only: seed mock wishlist items for standalone testing
if (!localStorage.getItem('wishlist')) {
  localStorage.setItem('wishlist', JSON.stringify(mockWishlist));
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <main className='py-3' style={{ minHeight: '100vh' }}>
        <Container>
          <WishlistApp />
        </Container>
      </main>
    </BrowserRouter>
  </StrictMode>
);
