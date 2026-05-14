const wishlistStore = (() => {
  // Estado interno — re-hidrata do localStorage no arranque
  let items = JSON.parse(localStorage.getItem('wishlist') || '[]');
  let subscribers = [];

  // Notifica todos os subscritores com o estado atual
  const notify = () => {
    subscribers.forEach((cb) => cb([...items]));
  };

  // Persiste no localStorage após cada alteração
  const persist = () => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  };

  return {
    // Lê o estado atual
    getAll: () => [...items],

    // Verifica se um produto está na wishlist
    has: (productId) => items.some((item) => item._id === productId),

    // Adiciona um produto
    add: (product) => {
      if (!items.some((item) => item._id === product._id)) {
        items = [...items, product];
        persist();
        notify();
      }
    },

    // Remove um produto
    remove: (productId) => {
      items = items.filter((item) => item._id !== productId);
      persist();
      notify();
    },

    // Subscreve alterações — retorna função de cancelamento
    subscribe: (callback) => {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
      };
    },
  };
})();

export default wishlistStore;
