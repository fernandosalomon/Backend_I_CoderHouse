const socket = io();
const select = document.getElementById("cartSelect");

select.addEventListener("change", (event) => {
  event.preventDefault();

  const cart = event.target.value;

  event.target.selected = true;

  if (cart) {
    const url = new URL(window.location);
    url.searchParams.set("cartID", cart);
    history.pushState({}, "", url);
  }
  socket.emit("change cart", cart);
});

socket.on("found cart", (cartData) => {
  const productTable = document.getElementById("productTable");
  const oldTbody = document.getElementById("productTableTbody");
  const newTbody = document.createElement("tbody");
  const totalToPay = document.getElementById("totalToPay");
  newTbody.id = "productTableTbody";
  let total = 0;

  cartData.products.map((product) => {
    total +=
      Number(product.product.price?.$numberDecimal * product.quantity) ||
      Number(product.product.price * product.quantity);
    newTbody.innerHTML += `
            <tr id="id-${product.product._id}">
              <td><img
                  src="${product.product.thumbnails[0]}"
                  alt="${product.product.title}"
                  style="width: 80px; height: 80px;"
                /></td>
              <td>${product.product.title}</td>
              <td>$${product.product.price?.$numberDecimal || product.product.price}</td>
              <td>
                <input
                  id="productQuantity"
                  value=${product.quantity}
                  type="number"
                  onchange="modifyQuantity(event, '${product.product._id}')"
                />
              </td>
              <td>$${
                product.product.price?.$numberDecimal
                  ? Number(
                      product.product.price.$numberDecimal * product.quantity,
                    ).toFixed(2)
                  : Number(
                      product.product.price * product.quantity,
                    ).toFixed(2)
              }</td>
              <td><button
                  class="btn btn-danger"
                  onclick="deleteProduct('${product.product._id}')"
                >Borrar</button></td>
            </tr>
        `;
  });

  if (oldTbody) {
    productTable.replaceChild(newTbody, oldTbody);
  } else {
    productTable.appendChild(newTbody);
  }

  totalToPay.innerHTML = `$${Number(total).toFixed(2)}`;
});

const addNewCartBtn = document.getElementById("addNewCartBtn");

addNewCartBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/carts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const result = await response.json();

    Swal.fire({
      icon: "success",
      title: "Nuevo carrito creado",
      text: `Se creo el carrito con ID: ${result.payload._id}`,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
});

const modifyQuantity = async (e, productID) => {
  try {
    const quantity = e.target.value;
    const cartID = window.location.search?.split("?cartID=")[1];

    const response = await fetch(`/api/carts/${cartID}/product/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: Number(quantity) }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const result = await response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

const deleteProduct = async (productID) => {
  try {
    const cartID = window.location.search?.split("?cartID=")[1];

    const response = await fetch(`/api/carts/${cartID}/product/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const result = await response.json();

    Swal.fire({
      icon: "success",
      title: "Producto borrado con éxito",
      text: `El producto ${result.payload.product.title} se borro correctamente`,
    });

    location.reload();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};
