const fetchProducts = async () => {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await result.json();
  return data;
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
