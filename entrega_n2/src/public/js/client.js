const socket = io();

const newProductForm = document.getElementById("newProductForm");

newProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(newProductForm);
    const productData = {};

    formData.forEach((value, key) => {
        productData[key] = value;
    });

    socket.emit("new product", productData);
})

socket.on("added product", (newProduct) => {
    const productList = document.getElementById("productList");

    productList.innerHTML += `
        <li class="list-group-item"> ${newProduct.title} - $${newProduct.price} </li>
    `;
    
    newProductForm.reset();
});