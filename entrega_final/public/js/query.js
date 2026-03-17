const queryForm = document.getElementById("productQueryForm");

queryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(queryForm);
  const queries = {};

  formData.forEach((value, key) => {
    queries[key] = value;
  });

  

  let url = "/products?"

  if(queries["filter"] != "") url += `filter=${queries["filter"]}`;
  if(queries["sort"] != "") url += `&sort=${queries["sort"]}`;
  if(queries["limit"] != "") url += `&limit=${queries["limit"]}`;
  if(queries["searchByCategory"] != "")
    url += `&searchByCategory=${queries["searchByCategory"]}`;

  window.location.href = url;

});
