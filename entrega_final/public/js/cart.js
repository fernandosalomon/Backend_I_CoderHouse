const select = document.getElementById("cartSelect");

select.addEventListener("change", function () {
  const cart = this.value;

  if (cart) {
    window.location.href = `/carts?cartID=${cart}`;
  } else {
    window.location.href = `/carts`;
  }
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

    console.log(result)

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

    console.log(result);

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