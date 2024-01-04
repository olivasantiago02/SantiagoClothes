let baseDeDatos = [
    {
        id: 1,
        nombre: 'Camiseta Reciclada Blanca',
        precio: 15.00,
        imagen: '../images/camiseta-blanca.jpg'
        
    },
    {
        id: 2,
        nombre: 'Remera Reciclada Negra',
        precio: 15.00,
        imagen: '../images/camiseta-negra.jpg'
    },
    {
        id: 3,
        nombre: 'Remera Reciclada Azul',
        precio: 15.00,
        imagen: '../images/camiseta2-azul.jpg'
    },
    {
        id: 4,
        nombre: 'Blazer Azul',
        precio: 27.50,
        imagen: '../images/blazer-azul.jpg'
    },
    {
        id: 5,
        nombre: 'Buzo Gris Hombre',
        precio: 32.99,
        imagen: '../images/buzo-gris-h.jpg'
    },
    {
        id: 6,
        nombre: 'Buzo Verde Mujer',
        precio: 27.50,
        imagen: '../images/buzo-verde-mujer.jpg'
    },
    {
        id: 7,
        nombre: 'Buzo Verde Hombre',
        precio: 32.99,
        imagen: '../images/buzo-verde-tienda.jpg'
    },
    {
        id: 8,
        nombre: 'Jean Reciclado Mezclilla',
        precio: 30.99,
        imagen: '../images/jean-tienda-unisex.jpg'
    },
    {
        id: 9,
        nombre: 'Jean Claro Unisex',
        precio: 32.99,
        imagen: '../images/jean-claro-tienda.jpg'
    },
    {
        id: 10,
        nombre: 'Jean Reciclado Azul/Perla',
        precio: 30.00,
        imagen: '../images/jean-tienda-sust.jpg'
    },
    {
        id: 11,
        nombre: 'Pantalón Mujer Azul',
        precio: 30.00,
        imagen: '../images/jean-azul-tienda.jpg'
    },
    {
        id: 12,
        nombre: 'Remera Polo Hombre',
        precio: 19.99,
        imagen: '../images/polo-remera-tienda.jpg'
    },
    {
        id: 13,
        nombre: 'Bolso Cuero Artificial Hombre',
        precio: 35.00,
        imagen: '../images/bolso-tienda-hombre.jpg'
    },
    {
        id: 14,
        nombre: 'Cartera Mujer Simil-Cuero',
        precio: 29.99,
        imagen: '../images/bolso-tienda-mujer.jpg'
    },
    {
        id: 15,
        nombre: 'Bolso Mujer Playa',
        precio: 35.00,
        imagen: '../images/bolso-playa-tienda.jpg'
    },
    {
        id: 16,
        nombre: 'Sombrero Mujer Reciclado',
        precio: 13.00,
        imagen: '../images/sombrero-tienda.jpg'
    }
];

function filtrarProductos(categoria) {
    // Obtener todos los productos
    var productos = document.querySelectorAll('.producto');

    // Mostrar u ocultar productos según la categoría seleccionada
    productos.forEach(function(producto) {
        if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        miNodoImagen.setAttribute('alt', info.nombre); 
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

// Nuevo botón de pagar
const DOMbotonPagar = document.querySelector('#boton-pagar');
DOMbotonPagar.style.display = 'none'; // Ocultamos el botón al inicio

function actualizarBotonPagar() {
    DOMbotonPagar.style.display = carrito.length > 0 ? 'block' : 'none';
}

// Nuevo evento para el botón de pagar
DOMbotonPagar.addEventListener('click', () => {
    alert('¡Compra realizada con éxito!');
    vaciarCarrito(); // Vaciamos el carrito después de la compra
    actualizarBotonPagar(); // Ocultamos el botón después de vaciar el carrito
});

// Nuevo evento para el botón de vaciar
DOMbotonVaciar.addEventListener('click', () => {
    vaciarCarrito();
    actualizarBotonPagar(); // Ocultamos el botón después de vaciar el carrito
});

function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito
    renderizarCarrito();

}


function renderizarCarrito() {
   // Vaciamos todo el html
   DOMcarrito.textContent = '';
   // Quitamos los duplicados
   const carritoSinDuplicados = [...new Set(carrito)];
   // Generamos los Nodos a partir de carrito
   carritoSinDuplicados.forEach((item) => {
       // Obtenemos el item que necesitamos de la variable base de datos
       const miItem = baseDeDatos.filter((itemBaseDatos) => {
           // ¿Coincide las id? Solo puede existir un caso
           return itemBaseDatos.id === parseInt(item);
       });
       // Cuenta el número de veces que se repite el producto
       const numeroUnidadesItem = carrito.reduce((total, itemId) => {
           // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
           return itemId === item ? total += 1 : total;
       }, 0);
       // Creamos el nodo del item del carrito
       const miNodo = document.createElement('li');
       miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
       miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
       // Boton de borrar
       const miBoton = document.createElement('button');
       miBoton.classList.add('btn', 'btn-danger', 'mx-5');
       miBoton.textContent = 'X';
       miBoton.style.marginLeft = '1rem';
       miBoton.dataset.item = item;
       miBoton.addEventListener('click', borrarItemCarrito);
       
        // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
        actualizarBotonPagar(); // Actualizamos el estado del botón de pagar
       // Mezclamos nodos
       miNodo.appendChild(miBoton);
       DOMcarrito.appendChild(miNodo);
   });
   // Renderizamos el precio total en el HTML
   DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

function calcularTotal() {
    // Recorremos el array del carrito
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();
