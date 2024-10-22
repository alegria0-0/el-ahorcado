const palabrasConCategorias = [
    { palabra: 'elefante', categoria: 'animal', pista: 'Lo que adivinarás será un animal.' },
    { palabra: 'manzana', categoria: 'fruta', pista: 'Lo que adivinarás será una fruta.' },
    { palabra: 'brasil', categoria: 'pais', pista: 'Lo que adivinarás será un país.' },
    { palabra: 'python', categoria: 'lenguaje', pista: 'Lo que adivinarás será un lenguaje de programación.' },
    { palabra: 'everest', categoria: 'montaña', pista: 'Lo que adivinarás será una montaña.' }
];
let palabraSecreta = '';
let pistaActual = '';
let intentosRestantes = 6;
let letrasIncorrectas = [];
let palabraMostrada = [];
let historialPartidas = [];

const palabraElemento = document.getElementById('palabra-secreta');
const intentosElemento = document.getElementById('intentos-restantes');
const letrasIncorrectasElemento = document.getElementById('letras-incorrectas');
const mensajeElemento = document.getElementById('mensaje');
const inputLetra = document.getElementById('input-letra');
const btnEnviar = document.getElementById('btn-enviar');
const btnReiniciar = document.getElementById('reiniciar');
const historialElemento = document.getElementById('historial');
const pistaElemento = document.getElementById('pista'); // Elemento para mostrar la pista

// Seleccionar una palabra aleatoria con su categoría y pista
function elegirPalabra() {
    const indice = Math.floor(Math.random() * palabrasConCategorias.length);
    palabraSecreta = palabrasConCategorias[indice].palabra;
    pistaActual = palabrasConCategorias[indice].pista;
    palabraMostrada = Array(palabraSecreta.length).fill('_');
    palabraElemento.textContent = palabraMostrada.join(' ');
    pistaElemento.textContent = pistaActual; // Mostrar la pista tipo acertijo
}

// Actualizar la palabra mostrada en pantalla
function actualizarPalabra() {
    palabraElemento.textContent = palabraMostrada.join(' ');
}

// Verificar la letra ingresada
function verificarLetra() {
    const letra = inputLetra.value.toLowerCase();
    mensajeElemento.textContent = '';

    if (letra === '' || letrasIncorrectas.includes(letra) || palabraMostrada.includes(letra)) {
        mensajeElemento.textContent = 'Letra inválida o ya usada.';
        return;
    }

    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraMostrada[i] = letra;
            }
        }
    } else {
        letrasIncorrectas.push(letra);
        intentosRestantes--;
    }

    actualizarJuego();
    inputLetra.value = '';
}

// Actualizar el estado del juego
function actualizarJuego() {
    actualizarPalabra();
    intentosElemento.textContent = intentosRestantes;
    letrasIncorrectasElemento.textContent = `Letras incorrectas: ${letrasIncorrectas.join(', ')}`;

    if (!palabraMostrada.includes('_')) {
        mensajeElemento.textContent = '¡Ganaste! Felicidades';
        agregarHistorial('ganó');
        terminarJuego();
    } else if (intentosRestantes === 0) {
        mensajeElemento.textContent = `Perdiste. La palabra era: ${palabraSecreta}`;
        agregarHistorial('perdió');
        terminarJuego();
    }
}

// Terminar el juego
function terminarJuego() {
    inputLetra.disabled = true;
    btnEnviar.disabled = true;
}

// Función para agregar la fecha y hora actuales
function obtenerFechaHoraActual() {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan desde 0
    const año = ahora.getFullYear();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}

// Agregar resultado al historial
function agregarHistorial(resultado) {
    const historialItem = document.createElement('li');
    const fechaHora = obtenerFechaHoraActual();
    historialItem.textContent = `El jugador ${resultado.toUpperCase()} el ${fechaHora}`;
    historialElemento.appendChild(historialItem);
}

// Reiniciar el juego
function reiniciarJuego() {
    intentosRestantes = 6;
    letrasIncorrectas = [];
    inputLetra.disabled = false;
    btnEnviar.disabled = false;
    mensajeElemento.textContent = '';
    letrasIncorrectasElemento.textContent = '';
    intentosElemento.textContent = intentosRestantes;
    elegirPalabra();
}

// Eventos
btnEnviar.addEventListener('click', verificarLetra);
btnReiniciar.addEventListener('click', reiniciarJuego);
inputLetra.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        verificarLetra();
    }
});

// Iniciar el juego
elegirPalabra();
