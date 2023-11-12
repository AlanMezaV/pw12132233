var datos = [];
var nombres = [];
const listaUl = document.getElementById('miLista');
listaUl.style.display = 'none';  

document.addEventListener("keyup", e => {
    if (e.target.matches("#cantidad")) {
        if (e.key === "Escape") e.target.value = "" 
        listaUl.style.display = 'block';    
        validaBusqueda();
    }
});
  
function validaBusqueda() {
    console.log("entro valida");
    const cantidad = document.getElementById("cantidad").value;
    if (cantidad == ""){
        listaUl.style.display = 'none';  
        limpia();
    }
    else {
        pedirDatos();
    }
}

/*
document.addEventListener("keyup", e=>{
  if (e.target.matches("#cantidad")){

      if (e.key ==="Escape")e.target.value = ""
        pedirDatos();
  }
})
*/
async function pedirDatos() {
    const cantidad = document.getElementById("cantidad").value;
    console.log(cantidad);
    const respuesta = await fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith="+cantidad);
    datos = await respuesta.json();
    const numNombres = Object.keys(datos.data.results).length;
    console.log(numNombres);
    nombres = [];
    if (numNombres > 0) {
        for (i=0; i < numNombres; i++){
            nombres.push(datos.data.results[i].name);
        }
        muestra();
    }
}

async function selected() {
    cantidad = document.getElementById("cantidad").value;
    const respuesta = await fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith="+cantidad);
    datos = await respuesta.json();
    foto();
}

function muestra() {
    const lista = document.getElementById("miLista");
    const input = document.getElementById("cantidad");

    lista.innerHTML = '';

    nombres.forEach(function(nombre) {
        const nuevoElemento = document.createElement("li");
        const texto = document.createTextNode(nombre);

        const enlace = document.createElement("a");
        enlace.href = "#"; // Asignar un enlace de referencia para el comportamiento predeterminado
        enlace.appendChild(texto);
            
        enlace.addEventListener("click", function(e) {
          e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
           // Muestra el valor del texto del <li> al que está asociado el enlace
           input.value = nombre;
           lista.innerHTML = '';
           listaUl.style.display = 'none';  
           selected();
        });
        
        nuevoElemento.appendChild(enlace);
        lista.appendChild(nuevoElemento);
    });
}

function limpia() {
    const lista = document.getElementById("miLista");
    lista.innerHTML = '';
    let foto = document.getElementById("foto");
    foto.setAttribute("src","images/user.png");
}

function foto (){
    let foto = document.getElementById("foto");
    foto.setAttribute("src", datos.data.results[0].thumbnail.path+ "." +datos.data.results[0].thumbnail.extension);
}