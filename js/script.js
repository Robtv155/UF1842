let totalCompra = 0;

// Función para agregar producto y crear la lista
function agrega_producto() {
  let productoInput = document.getElementById("producto");
  let productoText = productoInput.value.trim();
  let cantidadInput = document.getElementById("cantidad");
  let cantidadNumber = parseInt(cantidadInput.value);

  if (productoText === "") {
    alert("Por favor, ingresa un producto válido.");
    return;
  }
  if (
    cantidadInput.value === "" ||
    isNaN(cantidadNumber) ||
    cantidadNumber <= 0
  ) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  let productoList = document.getElementById("lista_productos");
  let li = document.createElement("li");

  let productoInfo = document.createElement("div");
  productoInfo.className = "producto-info";
  productoInfo.innerHTML = productoText + " x " + cantidadNumber;

  let precioInfo = document.createElement("div");
  precioInfo.className = "precio-info";

  let precioInput = document.createElement("input");
  precioInput.type = "number";
  precioInput.placeholder = "Precio unidad";
  precioInput.min = "0";
  precioInput.className = "numb2";

  let comprarBtn = document.createElement("button");
  comprarBtn.textContent = "Comprar";
  comprarBtn.onclick = function () {
    compra_producto();
    animar_carrito();
    productoList.removeChild(li);
  };

  // Función para hacer el ticket
  function compra_producto() {
    let li_ticket = document.createElement("li");
    let precioUnitario = parseFloat(precioInput.value);
    let precioTotal = precioUnitario * cantidadNumber;

    if (
      precioInput.value === "" ||
      isNaN(precioUnitario) ||
      precioUnitario <= 0
    ) {
      alert("Por favor, ingresa un precio válido.");
      return;
    }

    // Total de la compra
    totalCompra += precioTotal;

    let ticketContent = document.createElement("div");
    ticketContent.className = "ticket_info";
    ticketContent.innerHTML =
      productoText +
      " x " +
      cantidadNumber +
      " = " +
      precioTotal.toFixed(2) +
      " €";

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = function () {
      ticketList.removeChild(li_ticket);
      totalCompra -= precioTotal;
      actualizar_total();
    };

    ticketContent.appendChild(eliminarBtn);
    li_ticket.appendChild(ticketContent);
    let ticketList = document.getElementById("lista_ticket");
    ticketList.appendChild(li_ticket);

    actualizar_total();
  }

  precioInfo.appendChild(precioInput);
  precioInfo.appendChild(comprarBtn);
  li.appendChild(productoInfo);
  li.appendChild(precioInfo);

  productoList.appendChild(li);

  productoInput.value = "";
  cantidadInput.value = "";
}

// Actualizar el total en el ticket
function actualizar_total() {
  document.getElementById("total").textContent = totalCompra.toFixed(2) + " €";
}

// Animación del carrito
function animar_carrito() {
  let carrito = document.querySelector(".carrito");
  carrito.style.transition = "transform 0.5s ease-in-out";
  carrito.style.transform = "translateX(100px)";

  setTimeout(() => {
    carrito.style.transform = "translateX(0)";
  }, 500);
}
