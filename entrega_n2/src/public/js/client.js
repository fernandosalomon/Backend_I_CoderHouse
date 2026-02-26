const socket = io();

const newProductForm = document.getElementById("newProductForm");

newProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(newProductForm);
    const productData = {};

    formData.forEach((value, key) => {
        productData[key] = value;
    });

    console.log(productData);
})