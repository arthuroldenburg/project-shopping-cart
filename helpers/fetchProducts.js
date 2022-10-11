const fetchProducts = async (productName) => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

const requestComputer = async () => {
  const data = await fetchProducts('computador');
  return data;
};

requestComputer();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
