const fetchItem = async (item) => {
  // seu código aqui
  const result = await fetch(`https://api.mercadolibre.com/items/${item}`);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
