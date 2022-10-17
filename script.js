// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// commitao da massa
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

 const getItems = document.querySelector('.cart__items');

 const loading = document.querySelector('.carregando');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

 const load = () => {
  const generateSpan = document.createElement('span');
  generateSpan.className = 'loading';
  generateSpan.innerText = 'carregando...';
  loading.appendChild(generateSpan);
};

const removeLoading = () => {
  loading.innerHTML = '';
};

 const getSum = () => {
  const sum = document.querySelector('.total-price');
  const getCollection = getItems.children;
  const transformaArray = Array.from(getCollection);
  const keepValues = [];
  transformaArray.forEach((item) => keepValues.push(item.innerHTML.split('$')[1]));

  const total = keepValues.reduce((accumulator, value) => accumulator + Number(value), 0);
  sum.innerHTML = total;
};

const cartItemClickListener = ({ target }) => {
  target.remove();
  getSum();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const listCart = async ({ target }) => {
  load();
  const getIds = target.parentNode.firstChild.innerText;
  const getAllIds = await fetchItem(getIds);
  const { id, title, price } = getAllIds;
  const obj = {
    id, 
    title, 
    price,
  };
  getItems.appendChild(createCartItemElement(obj));
  const getHtml = getItems.innerHTML;
  saveCartItems(getHtml);
  getSum();
  removeLoading();
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const getBtn = document.querySelectorAll('.item__add');
  getBtn.forEach((e) => e.addEventListener('click', listCart));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

 const list = async () => {
  const roster = await fetchProducts();
  const items = document.querySelector('.items');
  roster.forEach(({ id, title, price }) => {
    const makePriceObj = createProductItemElement({ id, title, price });
    items.append(makePriceObj);
  });
  removeLoading();
};

const removeItens = () => {
  const getButtonnClear = document.querySelector('.empty-cart');
  getButtonnClear.addEventListener('click', () => {
    getItems.innerHTML = '';
    localStorage.clear();
  });
};

const run = (roster) => {
  roster.remove();
  const getHtml = getItems.innerHTML;
  if (getHtml.length > 0) {
    saveCartItems(getHtml);
    getSum();
  } else {
    localStorage.clear();
    getSum();
  }
};

const removeItems = () => {
  const getList = document.querySelectorAll('.cart__item');
  if (getList.length > 0) {
    getList.forEach((roster) => {
      roster.addEventListener('click', () => {
        run(roster);
      });
    });
  }
};

window.onload = () => {
  load();
  list();
  const recoverList = getSavedCartItems();
  document.querySelector('.cart__items').innerHTML = recoverList;
  removeItens();
  removeItems();
  getSum();
};

// const listCart = async (ids) => {
//   const list = await fetchItem(ids);
//   const { id, title, price } = list;
//   const createObj = {
//        id, title, price,
//   };
//   console.log(createObj);
// };

// const listCartItem = async () => {
//   await fetchProducts();
//   const getButton = document.querySelectorAll('.item__add');
//   getButton.forEach((buttons) => {
//     buttons.addEventListener('click', (ev) => {
//       const getId = ev.target.parentNode;
//       listCart(getId.firstChild.innerHTML);
//     });
//   });
// };

// const listProducts = async () => {
//   const list = await fetchProducts();
//   const item = document.querySelector('.items');
//   list.forEach(({ id, title, price }) => {
//     const createObjPrice = createProductItemElement({ id, title, price });
//     item.append(createObjPrice);
//   });
// };

// window.onload = () => {
//   listProducts();
//   listCartItem();
// };
