const select = document.getElementById("cartSelect");

select.addEventListener("change", function () {
  const cart = this.value;

  if (cart) {
    window.location.href = `/carts?cartID=${cart}`;
  } else {
    window.location.href = `/carts`;
  }
});
