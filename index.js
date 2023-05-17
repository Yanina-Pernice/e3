const formInput = document.querySelector(".pizza-form");
const inputPizza = document.querySelector("#pizza-input");
const showCard = document.querySelector("#card-item")
const showError = document.querySelector("#msj-error")

const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },
  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

//CREA Y RETORNA UNA CARD POR CADA PIZZA
const createCard = (miPizza) => {

  return `   
    <h3>${miPizza.nombre}</h3>
    <img class="card-img" src=${miPizza.imagen} data-id="${miPizza.id}/>
    <p class="precio">Precio: $${miPizza.precio}</p>
    `
};

// CREA Y RETORNA MSJ DE ERROR
const createError = (mensaje) => {

  return `<p>${mensaje}</p>`
};

const ejecutarForm = (e) => {
  e.preventDefault();

  // 1 - VALIDO EL ID
  if (inputPizza.value < 1 || inputPizza.value == undefined) {

    console.log("El valor del id no es valido.")
    // MUESTRO ERROR
    showError.innerHTML = createError("El ID NO ES VALIDO");
    showError.classList.remove("hidden");

    // OCULTO TARJETA
    showCard.classList.add("hidden");

  } else {

    showError.classList.add("hidden");

    // 2 - RECORRO LAS PIZZAS Y SI COINCIDE EL ID ME GUARDO LA PIZZA EN MI VARIABLE TEMPORAL.
    let miPizza = undefined

    const idPizzas = pizzas.map((pizza) => {

      if (pizza.id == inputPizza.value) {
        miPizza = pizza;
      }

    })

    // 3 - SI MI PIZZA ESTA DEFINIDA ES PORQUE ENCONTRE COINCIDENCIA DE ID
    // POR LO TANTO COMPLETO EL CUADRO Y LO MUESTRO 
    if (miPizza != undefined) {

      console.log("La pizza es: " + miPizza.nombre)

      // MUESTRO LA TARJETA
      showCard.innerHTML = createCard(miPizza);
      showCard.classList.remove("hidden");

      // OCULTO EL MENSAJE DE ERROR
      showError.classList.add("hidden");

    } else {
      console.log("La pizza no es valida")

      // OCULTO LA TARJETA
      showCard.classList.add("hidden");

      // MUESTRO EL MENSAJE DE ERROR
      showError.innerHTML = createError("La Pizza no es valida.");
      showError.classList.remove("hidden");
    }

    // 4 - SI LA PIZZA ES VALIDA LA GUARDO EN EL LOCALSTORAGE
    if (miPizza) {
      localStorage.setItem("LastPizza", JSON.stringify(miPizza));
    }
  }

};


const ejecutarAlInicio = (e) => {
  e.preventDefault();

  // LOCAL STORAGE. ME TRAIGO LA ÚLTIMA PIZZA
  let miPizza = JSON.parse(localStorage.getItem("LastPizza"));

  // SI MI PIZZA ESTA DEFINIDA ES PORQUE ENCONTRE COINCIDENCIA DE ID
  // POR LO TANTO COMPLETO EL CUADRO Y LO MUESTRO 
  if (miPizza != undefined) {

    console.log("La pizza es: " + miPizza.nombre)

    // MUESTRO LA TARJETA
    showCard.innerHTML = createCard(miPizza);
    showCard.classList.remove("hidden");

    // OCULTO EL MENSAJE DE ERROR
    showError.classList.add("hidden");

  } 

}

//FUNCION INIT

const init = () => {

  formInput.addEventListener("submit", ejecutarForm);

  document.addEventListener("DOMContentLoaded", ejecutarAlInicio);

};

init();