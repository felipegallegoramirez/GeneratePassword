// Función para obtener los datos del localStorage
function getData() {
  const data = localStorage.getItem('items');
  return data ? JSON.parse(data) : [];
}

// Función para guardar los datos en el localStorage
function saveData(data) {
  localStorage.setItem('items', JSON.stringify(data));
}

// Crear un nuevo elemento
function createItem(id, nombre, color) {
  const items = getData();
  const newItem = { Id: id, Nombre: nombre, Color: color };
  items.push(newItem);
  saveData(items);
  console.log('Elemento creado:', newItem);
}

// Leer todos los elementos
function readItems() {
  const items = getData();
  console.log('Todos los elementos:', items);
  return items;
}

// Actualizar un elemento por su Id
function updateItem(id, newNombre, newColor) {
  const items = getData();
  const index = items.findIndex(item => item.Id === id);

  if (index !== -1) {
      items[index].Nombre = newNombre;
      items[index].Color = newColor;
      saveData(items);
      console.log('Elemento actualizado:', items[index]);
  } else {
      console.log(`No se encontró un elemento con Id: ${id}`);
  }
}

// Eliminar un elemento por su Id
function deleteItem(id) {
  const items = getData();
  const filteredItems = items.filter(item => item.Id !== id);

  if (items.length !== filteredItems.length) {
      saveData(filteredItems);
      console.log(`Elemento con Id: ${id} eliminado.`);
  } else {
      console.log(`No se encontró un elemento con Id: ${id}`);
  }
}

const queryString = window.location.search;

// Crea un objeto URLSearchParams para analizarla
const urlParams = new URLSearchParams(queryString);

// Obtén el valor de un parámetro específico
const namer = urlParams.get('name'); // 'Felipe'
const id = urlParams.get('id');   // '20'



let data = readItems();

let re = data.findIndex(item => item.Id === id);

if (re === -1) {
  createItem(id, namer, 'red');
}else{
  updateItem(id, namer, 'red');
}

window.location.href = 'https://generatepassword-ochre.vercel.app/';