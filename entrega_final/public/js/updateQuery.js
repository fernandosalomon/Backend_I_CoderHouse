function updateQuery(queryParam){
    const url = new URL(window.location.href);
    const search = url.search.split("?")[1].split("&");
    const newQuery = window.encodeURI(queryParam);

    const queries = {}

    search.map(query => {
        const key = query.split("=")[0];
        const value = query.split("=")[1];
        
        queries[key] = value;
    });

    queries['searchByCategory'] = newQuery;
    queries['page'] = 1;

    let newURL = "?";

    Object.entries(queries).map((query, index) => {
        newURL += `${query[0]}=${query[1]}`
        if (index != Object.keys(queries).length - 1) newURL += "&";
    })

    window.location.href = newURL;
}