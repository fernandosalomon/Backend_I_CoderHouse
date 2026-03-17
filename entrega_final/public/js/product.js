const addToCartBtn = document.getElementById("addToCartBtn");

addToCartBtn.addEventListener("click", async (event) => {
  

  try {
    event.preventDefault();

    const productID = window.location.href.split("/product/")[1];
    const cartSelect = document.getElementById("cartSelect");
    const cartID = cartSelect.value;
    const quantity = document.getElementById("productQuantity").value || 1;

    const response = await fetch(`/api/carts/${cartID}/product/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: Number(quantity) }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    Swal.fire({
      icon: "success",
      title: "Producto agregado con éxito",
      text: `El producto se agrego al carrito`,
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } 
    
});
