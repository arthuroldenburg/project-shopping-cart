// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// commitao da massa
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const { fetchItem } = require('./helpers/fetchItem');
const { fetchProducts } = require('./helpers/fetchProducts');
const saveCartItems = require('./helpers/saveCartItems');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

const getItens = document.querySelector('.cart__items');

const sumAll = () => {
  const getSum = document.querySelector('.total-price');
  const getCollection = getItems.children;
  const transformaArray = Array.from(getCollection);
  const keepValues = [];
  transformaArray.forEach((item) => keepValues.push(item.innerHTML.split('$')[1]));

  const total = keepValues.reduce((accumulator, value) => accumulator + Number(value), 0);
  getSum.innerHTML = total;
};

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

 const cartItemClickListener = ({ target }) => {
  target.remove();
  sumAll();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartItems = async ({ target }) => {
  const getId = target.parentNode.firstChild.innerHTML;
  const getAllId = await fetchItem(getId);
  const { id, title, price } = getAllId;
  const doObj = {
    id, title, price,
  };
  getItems.appendChild(createCartItemElement(doObj));
  const getHtml = getItems.innerHTML;
  saveCartItems(getHtml);
  sumAll();
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const getBtn = document.querySelectorAll('.item__add');
  getBtn.forEach((e) => e.addEventListener('click', cartItems));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */

const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const listCart = async () => { 
  const list = await fetchProducts();
  const itens = document.querySelector('.items');
  list.forEach(({ id, title, price }) => {
    const makePriceObj = createProductItemElement({
      id, title, price,
    });
    itens.append(makePriceObj);
  });
};

const removeItems = () => {
  const getButtonClear = document.querySelector('.empty-cart');
  getButtonClear.addEventListener('click', () => {
    getItems.innerHTML = '';
    localStorage.clear();
  });
};

const toRun = (lista) => {
  lista.remove();
        const getHTML = getItems.innerHTML;
        if (getHTML.length > 0) {
        saveCartItems(getHTML);
        sumAll();
      } else {
        localStorage.clear();
        sumAll();
      } 
};

const removeItens = () => {
  const getList = document.querySelectorAll('.cart__item');
  if (getList.length > 0) {
    getList.forEach((lista) => {
      lista.addEventListener('click', () => {
        toRun(lista);
      });
    });
  }
};

const listCartItens = async (ids) => {
  await fetchProducts();
  const list = await fetchItem(ids);
  const { id, title, price } = list;
  const createObj = {
       id, title, price,
  };
  itemsCart.appendChild(createObj);
};

window.onload = () => { 
  listCart();
  const recoverList = getSavedCartItems(); 
  getItens.innerHTML = recoverList;
  removeItems();
  removeItens();
};
