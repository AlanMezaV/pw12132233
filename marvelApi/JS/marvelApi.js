var datos = [];
var nombres = [];
const lista = document.getElementById("miLista");
lista.style.display = "none";
const comics = document.getElementById("comics");
const descripcion = document.getElementById("descripcion");
const foto = document.getElementById("foto");

document.addEventListener("keyup", (e) => {
	if (e.target.matches("#nombre")) {
		if (e.key === "Escape") e.target.value = "";
		lista.style.display = "block";
		validaBusqueda();
	}
});

function validaBusqueda() {
	const nombre = document.getElementById("nombre").value;
	if (nombre == "") {
		lista.style.display = "none";
		limpia();
	} else {
		pedirDatos();
	}
}

async function pedirDatos() {
	const nombre = document.getElementById("nombre").value;
	const respuesta = await fetch(
		"https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=" +
			nombre
	);
	datos = await respuesta.json();
	const numNombres = Object.keys(datos.data.results).length;
	console.log(numNombres);
	nombres = [];
	if (numNombres > 0) {
		for (i = 0; i < numNombres; i++) {
			nombres.push(datos.data.results[i].name);
		}
		muestra();
	}
}

async function selected() {
	const nombre = document.getElementById("nombre").value;
	const respuesta = await fetch(
		"https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=" +
			nombre
	);
	datos = await respuesta.json();
	fotito();
}

function muestra() {
	comics.classList.add("disabled");
	descripcion.classList.add("disabled");
	lista.innerHTML = "";
	descripcion.innerHTML = "";
	comics.innerHTML = "";

	nombres.forEach(function (nombre) {
		const nuevoElemento = document.createElement("li");
		const texto = document.createTextNode(nombre);

		const enlace = document.createElement("a");
		enlace.href = "#"; // Asignar un enlace de referencia para el comportamiento predeterminado
		enlace.appendChild(texto);

		enlace.addEventListener("click", function (e) {
			e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
			const input = document.getElementById("nombre");
			input.value = nombre;
			lista.innerHTML = "";
			lista.style.display = "none";
			selected();
		});
		nuevoElemento.appendChild(enlace);
		lista.appendChild(nuevoElemento);
	});
}

function limpia() {
	lista.innerHTML = "";
	descripcion.innerHTML = "";
	comics.innerHTML = "";
	foto.setAttribute("src", "images/user.png");
}

function fotito() {
	comics.classList.remove("disabled");
	descripcion.classList.remove("disabled");
	foto.setAttribute(
		"src",
		datos.data.results[0].thumbnail.path +
			"." +
			datos.data.results[0].thumbnail.extension
	);
	descripcion.innerHTML = datos.data.results[0].description;
	let top = descripcion.clientHeight;
	comics.style.top = top + 60 + "px";
	comics.innerHTML =
		"Comics available: " + datos.data.results[0].comics.available;
}
