const saveCartItems = (list) => {
  if (!list) throw new Error('Um argumento deve ser passado');
  localStorage.setItem('cartItems', list);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
