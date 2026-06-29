// ==========================================
// SCRIPT.JS — Quiz Matemático
// Lógica del juego con JavaScript básico
// ==========================================


// ------------------------------------------
// 1. BANCO DE PREGUNTAS
//    Un arreglo con 10 objetos.
//    Cada objeto tiene: tema, texto, formula,
//    opciones (arreglo) e indice de respuesta correcta.
// ------------------------------------------

var preguntas = [

  // --- ECUACIONES E INECUACIONES ---

  {
    tema: "Ecuaciones e Inecuaciones",
    texto: "¿Cuál es el valor de x que satisface la ecuación?",
    formula: "2x + 6 = 14",
    opciones: ["x = 3", "x = 4", "x = 5", "x = 7"],
    correcta: 1    // "x = 4" está en el índice 1 (empieza en 0)
  },

  {
    tema: "Ecuaciones e Inecuaciones",
    texto: "Resuelve la ecuación lineal:",
    formula: "3x - 9 = 0",
    opciones: ["x = -3", "x = 3", "x = 0", "x = 9"],
    correcta: 1    // "x = 3"
  },

  {
    tema: "Ecuaciones e Inecuaciones",
    texto: "¿Cuál es la solución de la inecuación?",
    formula: "2x - 4 > 6",
    opciones: ["x > 1", "x > 5", "x < 5", "x >= 5"],
    correcta: 1    // "x > 5"
  },

  {
    tema: "Ecuaciones e Inecuaciones",
    texto: "Resuelve la ecuación cuadrática:",
    formula: "x² - 5x + 6 = 0",
    opciones: ["x = 1 y x = 6", "x = -2 y x = -3", "x = 2 y x = 3", "x = 0 y x = 5"],
    correcta: 2    // "x = 2 y x = 3"
  },

  // --- POLINOMIOS ---

  {
    tema: "Polinomios",
    texto: "¿Cuál es el grado del siguiente polinomio?",
    formula: "P(x) = 4x⁵ - 3x² + 7",
    opciones: ["Grado 2", "Grado 7", "Grado 5", "Grado 4"],
    correcta: 2    // "Grado 5"
  },

  {
    tema: "Polinomios",
    texto: "Si P(x) = x³ - 2x + 1, ¿cuánto vale P(2)?",
    formula: "P(2) = (2)³ - 2(2) + 1",
    opciones: ["P(2) = 4", "P(2) = 5", "P(2) = 3", "P(2) = 7"],
    correcta: 1    // "P(2) = 5"
  },

  {
    tema: "Polinomios",
    texto: "Suma los siguientes polinomios:",
    formula: "(3x² + 2x - 1) + (x² - 4x + 5)",
    opciones: ["4x² - 2x + 4", "4x² + 6x - 6", "2x² - 2x + 4", "4x² - 2x - 4"],
    correcta: 0    // "4x² - 2x + 4"
  },

  // --- FACTORIZACIÓN ---

  {
    tema: "Factorización",
    texto: "Factoriza el siguiente polinomio (factor común):",
    formula: "6x² + 9x",
    opciones: ["6x(x + 9)", "3(2x² + 3x)", "x(6x + 9)", "3x(2x + 3)"],
    correcta: 3    // "3x(2x + 3)"
  },

  {
    tema: "Factorización",
    texto: "Factoriza usando diferencia de cuadrados:",
    formula: "x² - 25",
    opciones: ["(x - 5)²", "(x + 25)(x - 1)", "(x + 5)(x - 5)", "(x - 5)(x - 5)"],
    correcta: 2    // "(x + 5)(x - 5)"
  },

  {
    tema: "Factorización",
    texto: "Factoriza el siguiente trinomio cuadrado perfecto:",
    formula: "x² + 6x + 9",
    opciones: ["(x + 9)(x + 1)", "(x - 3)²", "(x + 3)(x - 3)", "(x + 3)²"],
    correcta: 3    // "(x + 3)²"
  }

];


// ------------------------------------------
// 2. VARIABLES DEL JUEGO
//    Guardamos el estado actual del juego
// ------------------------------------------

var preguntaActual = 0;   // número de la pregunta en la que estamos (0 = primera)
var puntaje = 0;          // cuántas preguntas ha respondido bien el jugador
var yaRespondio = false;  // para evitar que haga clic más de una vez por pregunta


// ------------------------------------------
// 3. REFERENCIAS AL HTML
//    Guardamos los elementos del HTML que
//    vamos a modificar con JavaScript
// ------------------------------------------

var pantallaBienvenida  = document.getElementById("pantalla-bienvenida");
var pantallaPregunta    = document.getElementById("pantalla-pregunta");
var pantallaResultado   = document.getElementById("pantalla-resultado");

var textoProgreso       = document.getElementById("texto-progreso");
var textoPuntaje        = document.getElementById("texto-puntaje");
var barraProgreso       = document.getElementById("barra-progreso");

var temaPregunta        = document.getElementById("tema-pregunta");
var textoPregunta       = document.getElementById("texto-pregunta");
var formulaPregunta     = document.getElementById("formula-pregunta");
var contenedorOpciones  = document.getElementById("contenedor-opciones");
var mensajeRespuesta    = document.getElementById("mensaje-respuesta");
var btnSiguiente        = document.getElementById("btn-siguiente");

var emojiResultado      = document.getElementById("emoji-resultado");
var tituloResultado     = document.getElementById("titulo-resultado");
var detalleResultado    = document.getElementById("detalle-resultado");
var puntajeNumero       = document.getElementById("puntaje-numero");

var btnComenzar         = document.getElementById("btn-comenzar");
var btnReiniciar        = document.getElementById("btn-reiniciar");


// ------------------------------------------
// 4. EVENTOS DE BOTONES
//    Le decimos a los botones qué hacer
//    cuando el usuario hace clic
// ------------------------------------------

// Cuando hace clic en "Comenzar"
btnComenzar.addEventListener("click", function() {
  iniciarJuego();
});

// Cuando hace clic en "Siguiente"
btnSiguiente.addEventListener("click", function() {
  siguientePregunta();
});

// Cuando hace clic en "Jugar nuevamente"
btnReiniciar.addEventListener("click", function() {
  reiniciarJuego();
});


// ------------------------------------------
// 5. FUNCIÓN: iniciarJuego
//    Oculta la bienvenida y muestra la
//    primera pregunta
// ------------------------------------------

function iniciarJuego() {
  // Ocultamos la pantalla de bienvenida
  pantallaBienvenida.classList.add("oculto");

  // Mostramos la pantalla de preguntas
  pantallaPregunta.classList.remove("oculto");

  // Cargamos la primera pregunta
  mostrarPregunta();
}


// ------------------------------------------
// 6. FUNCIÓN: mostrarPregunta
//    Muestra los datos de la pregunta actual
//    en el HTML
// ------------------------------------------

function mostrarPregunta() {
  // Reiniciamos el estado de "ya respondió"
  yaRespondio = false;

  // Obtenemos la pregunta actual del arreglo
  var pregunta = preguntas[preguntaActual];

  // Actualizamos el texto de progreso
  textoProgreso.textContent = "Pregunta " + (preguntaActual + 1) + " de " + preguntas.length;

  // Actualizamos el puntaje en el HUD
  textoPuntaje.textContent = "✅ Puntaje: " + puntaje;

  // Actualizamos la barra de progreso visual
  // Calculamos el porcentaje de avance
  var porcentaje = (preguntaActual / preguntas.length) * 100;
  barraProgreso.style.width = porcentaje + "%";

  // Mostramos el tema, el texto y la fórmula
  temaPregunta.textContent = "📌 " + pregunta.tema;
  textoPregunta.textContent = pregunta.texto;
  formulaPregunta.textContent = pregunta.formula;

  // Ocultamos el mensaje de respuesta anterior
  mensajeRespuesta.classList.add("oculto");
  mensajeRespuesta.textContent = "";
  mensajeRespuesta.className = "mensaje oculto";

  // Ocultamos el botón "Siguiente"
  btnSiguiente.classList.add("oculto");

  // Limpiamos los botones anteriores
  contenedorOpciones.innerHTML = "";

  // Creamos un botón por cada opción de respuesta
  for (var i = 0; i < pregunta.opciones.length; i++) {

    // Creamos un botón
    var boton = document.createElement("button");

    // Le ponemos la clase y el texto
    boton.classList.add("opcion");
    boton.textContent = pregunta.opciones[i];

    // Guardamos el índice como atributo (para saber cuál eligió)
    boton.setAttribute("data-indice", i);

    // Le asignamos la función que se ejecuta al hacer clic
    boton.addEventListener("click", function() {
      verificarRespuesta(this);   // "this" es el botón que se clickeó
    });

    // Agregamos el botón al contenedor en el HTML
    contenedorOpciones.appendChild(boton);
  }
}


// ------------------------------------------
// 7. FUNCIÓN: verificarRespuesta
//    Recibe el botón que el usuario clickeó
//    y verifica si es correcto o no
// ------------------------------------------

function verificarRespuesta(botonElegido) {

  // Si ya respondió, no hacemos nada
  if (yaRespondio) {
    return;
  }

  // Marcamos que ya respondió (bloquea más clics)
  yaRespondio = true;

  // Obtenemos el índice del botón que clickeó
  var indiceElegido = parseInt(botonElegido.getAttribute("data-indice"));

  // Obtenemos la pregunta actual
  var pregunta = preguntas[preguntaActual];

  // Deshabilitamos todos los botones para que no pueda cambiar
  var todosLosBotones = contenedorOpciones.querySelectorAll(".opcion");
  for (var i = 0; i < todosLosBotones.length; i++) {
    todosLosBotones[i].disabled = true;
  }

  // Comparamos si eligió la correcta
  if (indiceElegido === pregunta.correcta) {

    // ¡CORRECTO!
    puntaje = puntaje + 1;   // sumamos 1 al puntaje

    // Pintamos el botón de verde
    botonElegido.classList.add("correcta");

    // Mostramos el mensaje de correcto
    mensajeRespuesta.textContent = "✅ ¡Correcto! Muy bien.";
    mensajeRespuesta.className = "mensaje correcto";
    mensajeRespuesta.classList.remove("oculto");

    // Actualizamos el puntaje en pantalla
    textoPuntaje.textContent = "✅ Puntaje: " + puntaje;

  } else {

    // INCORRECTO
    // Pintamos el botón elegido de rojo
    botonElegido.classList.add("incorrecta");

    // Pintamos la correcta de verde para que vea cuál era
    for (var j = 0; j < todosLosBotones.length; j++) {
      if (parseInt(todosLosBotones[j].getAttribute("data-indice")) === pregunta.correcta) {
        todosLosBotones[j].classList.add("correcta");
      }
    }

    // Mostramos el mensaje de incorrecto
    mensajeRespuesta.textContent = "❌ Incorrecto. La respuesta correcta era: " + pregunta.opciones[pregunta.correcta];
    mensajeRespuesta.className = "mensaje incorrecto";
    mensajeRespuesta.classList.remove("oculto");
  }

  // Mostramos el botón "Siguiente"
  btnSiguiente.classList.remove("oculto");
}


// ------------------------------------------
// 8. FUNCIÓN: siguientePregunta
//    Avanza a la siguiente pregunta o muestra
//    el resultado final si ya terminaron todas
// ------------------------------------------

function siguientePregunta() {

  // Avanzamos al número de la siguiente pregunta
  preguntaActual = preguntaActual + 1;

  // ¿Ya terminaron todas las preguntas?
  if (preguntaActual >= preguntas.length) {

    // Sí terminaron: mostramos el resultado
    mostrarResultado();

  } else {

    // No terminaron: cargamos la siguiente pregunta
    mostrarPregunta();
  }
}


// ------------------------------------------
// 9. FUNCIÓN: mostrarResultado
//    Calcula el resultado final y muestra
//    la pantalla de resultado
// ------------------------------------------

function mostrarResultado() {

  // Ocultamos la pantalla de preguntas
  pantallaPregunta.classList.add("oculto");

  // Mostramos la pantalla de resultado
  pantallaResultado.classList.remove("oculto");

  // Ponemos el número de puntaje
  puntajeNumero.textContent = puntaje;

  // Mostramos un mensaje según el puntaje obtenido

  if (puntaje >= 9) {
    // 9 o 10 correctas
    emojiResultado.textContent = "🎉";
    tituloResultado.textContent = "¡Excelente!";
    detalleResultado.textContent = "Dominaste todos los temas. ¡Eres un crack de la matemática!";

  } else if (puntaje >= 7) {
    // 7 u 8 correctas
    emojiResultado.textContent = "👍";
    tituloResultado.textContent = "¡Muy bien!";
    detalleResultado.textContent = "Buen resultado. Repasa los temas donde fallaste.";

  } else if (puntaje >= 5) {
    // 5 o 6 correctas
    emojiResultado.textContent = "😊";
    tituloResultado.textContent = "¡Bien!";
    detalleResultado.textContent = "Aprobaste, pero puedes mejorar. ¡Sigue practicando!";

  } else {
    // Menos de 5 correctas
    emojiResultado.textContent = "😅";
    tituloResultado.textContent = "Sigue practicando";
    detalleResultado.textContent = "No te rindas. Repasa los temas y vuelve a intentarlo.";
  }

  // Actualizamos la barra al 100% al terminar
  barraProgreso.style.width = "100%";
}


// ------------------------------------------
// 10. FUNCIÓN: reiniciarJuego
//     Resetea todas las variables y vuelve
//     a la pantalla de bienvenida
// ------------------------------------------

function reiniciarJuego() {

  // Reiniciamos las variables del juego
  preguntaActual = 0;
  puntaje = 0;
  yaRespondio = false;

  // Ocultamos la pantalla de resultado
  pantallaResultado.classList.add("oculto");

  // Mostramos la pantalla de bienvenida
  pantallaBienvenida.classList.remove("oculto");

  // Reiniciamos la barra de progreso
  barraProgreso.style.width = "0%";
}
