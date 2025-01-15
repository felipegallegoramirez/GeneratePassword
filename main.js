        // Referencias
        const customSelect = document.getElementById('customSelect');
        const selectedValue = document.getElementById('selectedValue');
        const options = customSelect.querySelectorAll('.option');


        let exist = false;
        let actualid = 'a';
        let actpasword = 'a';


        // Toggle desplegable
        customSelect.addEventListener('click', () => {
            customSelect.classList.toggle('active');
        });

        // Manejo de clic en opciones
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const value = option.dataset.value; // Obtiene el valor
                if(value != 'agregar'){
                  selectedValue.textContent = option.textContent; // Muestra la opción seleccionada
                  customSelect.classList.remove('active'); // Cierra el desplegable
                  actualid = value;
                  console.log(`Seleccionaste: ${value}`);
                }else{
                  actualid = 'a';
                  background.classList.toggle("ocultar");
                  form.classList.toggle("ocultar");
                }
            });
        });

        // Cerrar el desplegable al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('active');
            }
        });



        const suggestions = [
            "Google",
            "Paypal",
            "Facebook",
            "Amazon",
            "Outlook",
            "Netflix",
            "Instagram",
            "Airbnb",
            "Spotify",
            "Linkedin",
            "Twitter",
            "Pinterest",
            "Dropbox",
            "Slack",
            "Github",
            "Medium",
            "Trello",
            "Quora",
            "Reddit",
            "Udemy",
            "Coursera",
            "Platzi",
            "Behance",
          ];
      
          const input = document.getElementById("autocomplete-input");
          const list = document.getElementById("autocomplete-list");
          const button = document.getElementById("search-button");
      
          input.addEventListener("input", () => {
            const value = input.value.toLowerCase();
            list.innerHTML = ""; // Clear previous suggestions
      
            if (value) {
              const filtered = suggestions.filter(item =>
                item.toLowerCase().includes(value)
              );
      
              filtered.forEach(item => {
                const div = document.createElement("div");
                div.textContent = item;
                div.classList.add("autocomplete-item");
      
                div.addEventListener("click", () => {
                  input.value = item;
                  list.innerHTML = ""; // Clear the list after selection
                });
      
                list.appendChild(div);
              });
            }
          });
      
      
          // Close the suggestion list when clicking outside
          document.addEventListener("click", (e) => {
            if (!e.target.closest(".autocomplete-container")) {
              list.innerHTML = "";
            }
          });


// Encriptacion

const result = document.getElementById('C32');
const result2 = document.getElementById('C16');

button.addEventListener('click', async (e) => {
    e.preventDefault();
    const value1 = actualid;
    const value2 = actpasword;
    const value3 = input.value;

    const combined = `${value1}:${value2}:${value3}`; // Combina los valores
    const hash = await generateHash(combined); // Genera el hash
    const finalString = formatHash(hash); // Formatea el hash
    result.textContent = finalString;
    result2.textContent = finalString.substring(0, 16);
});

async function generateHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Genera un hash SHA-256
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convierte el buffer en un array
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convierte a string hexadecimal
}

function formatHash(hash) {
    const symbols = '#$*#$*#$*';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + symbols;
    let result = '';
    for (let i = 0; i < 32; i++) {
        const charIndex = parseInt(hash.slice(i * 2, i * 2 + 2), 16) % characters.length;
        result += characters[charIndex];
    }
    return result;
}

//! QR

document.getElementById("generate-btn").addEventListener("click", () => {
    const text = 'https://generatepassword-ochre.vercel.app/share/index.html?name=' + selectedValue.textContent + '&id=' + actualid;
  
    if (text.trim()) {
      // Abrir una nueva ventana
      const newWindow = window.open('', '', 'width=400,height=400');
      
      // Escribir el contenido en la nueva ventana
      newWindow.document.write('<html><head><title>QR Code</title></head><body style="displaay: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f4;">');
      newWindow.document.write('<canvas  id="qrcode"></canvas>');
      newWindow.document.write('</body></html>');
  
      // Generar el código QR en la nueva ventana
      newWindow.document.close();

      newWindow.onload = () => {
        const canvas = newWindow.document.getElementById("qrcode");
        if (canvas.getContext) {
          QRCode.toCanvas(canvas, text, { width: 200 }, (error) => {
            if (error) {
              console.error(error);
              alert("Failed to generate QR Code.");
            }
          });
        } else {
          console.error("Canvas not found or not supported.");
        }
      };
    } else {
      alert("Please enter some text.");
    }
  });


let background = document.getElementById("background");
let form = document.getElementById("form");


background.addEventListener("click", () => {
  background.classList.toggle("ocultar");
  form.classList.toggle("ocultar");
  mostrarOpciones();
});


document.getElementById('register').addEventListener("click", () => {
  let nombre = document.getElementById('name').value
  if(actualid == 'a'){
    createItem(generateRandomText(), nombre, '');
  }else{
    updateItem(actualid, nombre, '');
  }
  actpasword = document.getElementById('password').value ;
  background.classList.toggle("ocultar");
  form.classList.toggle("ocultar");
  mostrarOpciones();
  selectedValue.textContent = nombre
});




document.getElementById('delete').addEventListener("click", () => {

// Mostrar el mensaje de confirmación
const userResponse = confirm("¿Estás seguro de que deseas continuar?");
  // Verificar la respuesta del usuario
  if (userResponse) {
      alert("Eliminado correctamente.");
      background.classList.toggle("ocultar");
      form.classList.toggle("ocultar");
      deleteItem(actualid);
      actualid == 'a'
      mostrarOpciones();
  } else {
      alert("Has cancelado.");
      background.classList.toggle("ocultar");
      form.classList.toggle("ocultar");
  }
});


function generateRandomText() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const length = 128;
  let result = "";

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}





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

function mostrarOpciones() {
  const container = document.getElementById('options');
  if (!container) {
      console.error('No se encontró el contenedor con id "options-container"');
      return;
  }

  // Limpiar el contenedor
  container.innerHTML = '';

  // Obtener datos y generar los divs
  const items = getData();
  items.forEach((item, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.id = `opt${index + 1}`;
      optionDiv.className = 'option';
      optionDiv.dataset.value = item.Id;

      const circleDiv = document.createElement('div');
      circleDiv.className = 'circle';
      circleDiv.style.backgroundColor = item.Color; // Usar el color como fondo

      const textP = document.createElement('p');
      textP.textContent = item.Nombre;

      optionDiv.appendChild(circleDiv);
      optionDiv.appendChild(textP);
      container.appendChild(optionDiv);


      optionDiv.addEventListener('click', (e) => {
        const value = optionDiv.dataset.value; // Obtiene el valor
        if(value != 'agregar'){
          selectedValue.textContent = optionDiv.textContent; // Muestra la opción seleccionada
          customSelect.classList.remove('active'); // Cierra el desplegable
          actualid = value;
          background.classList.toggle("ocultar");
          form.classList.toggle("ocultar");
          console.log(`Seleccionaste: ${value}`);
          let nombre = document.getElementById('name')
          nombre.value = item.Nombre;
        }else{
          actualid = 'a';
          background.classList.toggle("ocultar");
          form.classList.toggle("ocultar");
        }
    });

  });


  const optionDiv = document.createElement('div');
  optionDiv.className = 'option agregar';
  optionDiv.dataset.value = 'agregar';


  const textP = document.createElement('p');
  textP.textContent = 'Crear';

  optionDiv.appendChild(textP);
  container.appendChild(optionDiv);

  optionDiv.addEventListener('click', (e) => {
      actualid = 'a';
      background.classList.toggle("ocultar");
      form.classList.toggle("ocultar");
});

}

mostrarOpciones();

