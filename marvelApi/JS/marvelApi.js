var cantidad = 0;
var datos = [];

async function apirandomuser(){
    cantidad = document.getElementById("cantidad").value;
    const respuesta = await fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith="+cantidad);
    datos = await respuesta.json();
    muestra();
}

function muestra() {
    let foto = document.getElementById("foto");
    foto.setAttribute("src", datos.data.results[0].thumbnail.path+ "." +datos.data.results[0].thumbnail.extension);
}

