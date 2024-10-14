/*
Funcion que devuelve el path de una imagen
de robot de manera aleatoria
*/
function getRandomPathImg() {
    let random = Math.floor(Math.random() * 20) + 1;
    if (random < 10) {
        return `./img/card/robot_0${random}.png`;
    }
    return `./img/card/robot_${random}.png`;

}

class Carta {
    constructor(tipo, puntos) {
        this.tipo = tipo;
        this.puntos = puntos;

        switch (tipo) {
            case "Desactivación":
                this.imagen = "./img/herramienta/herramienta.png";
                this.puntos = 0;
                break;
            case "Bomba":
                this.imagen = "./img/bomba/bomba.png";
                this.puntos = 0;
                break;
            case "Saltar turno":
                this.imagen = "./img/pasarTurno/pasarTurno.png";
                this.puntos = 0;
                break;
            case "Puntos":
                this.imagen = getRandomPathImg();
                this.puntos = Math.floor(Math.random() * 11);
                break;
        }
    }
}

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cartasJugador = [];
        this.eliminado = false;
    }

    sumarCarta(carta) {
        this.cartasJugador.push(carta);
    }

    contarCartas() {
        return this.cartasJugador.length;
    }

    numCartasDesactivar() {
        return this.cartasJugador.reduce((contador, carta) => carta.tipo === "Desactivación" ? contador + 1 : contador, 0);
    }

    gastarCartasDesactivar() {
        const i = this.cartasJugador.findIndex(carta => carta.tipo === "Desactivación");
        if (i !== -1) {
            this.cartasJugador.splice(i, 1);
        }
    }

    numCartasSaltoTurno() {
        return this.cartasJugador.reduce((contador, carta) => carta.tipo === "Saltar turno" ? contador + 1 : contador, 0);
    }

    gastarCartasSaltoTurno() {
        const i = this.cartasJugador.findIndex(carta => carta.tipo === "Saltar turno");
        if (i !== -1) {
            this.cartasJugador.splice(i, 1);
        }
    }

    getPuntosTotales() {
        return this.cartasJugador.reduce((total, carta) => carta.tipo === "Puntos" ? total + carta.puntos : total, 0);
    }

    eliminar() {
        this.eliminado = true;
        actualizarPilaDeDescarte(this.cartasJugador);
        this.cartasJugador = [];
    }
}

class Baraja {
    constructor() {
        this.cartasBaraja = [];
    }

    inicializar() {
        for (let i = 0; i < 6; i++) {
            let cartaNueva = new Carta("Desactivación");
            this.cartasBaraja.push(cartaNueva);
        }

        for (let i = 0; i < 6; i++) {
            let cartaNueva = new Carta("Bomba");
            this.cartasBaraja.push(cartaNueva);
        }

        for (let i = 0; i < 10; i++) {
            let cartaNueva = new Carta("Saltar turno");
            this.cartasBaraja.push(cartaNueva);
        }

        for (let i = 0; i < 38; i++) {
            let randomPuntos = Math.floor(Math.random() * 10) + 1;
            let cartaNueva = new Carta("Puntos", randomPuntos);
            this.cartasBaraja.push(cartaNueva);
        }
    }

    mezclar() {
        for (let i = this.cartasBaraja.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartasBaraja[i], this.cartasBaraja[j]] = [this.cartasBaraja[j], this.cartasBaraja[i]];
        }
    }

    robarCarta() {
        return this.cartasBaraja.pop();
    }

    estaVacia() {
        return this.cartasBaraja.length === 0;
    }
}


let baraja = new Baraja();
baraja.inicializar();
baraja.mezclar();


let jugadores = [
    new Jugador("Jugador 1"),
    new Jugador("Jugador 2"),
    new Jugador("Jugador 3"),
];


let turnoActual = 0;
resaltarJugador();

document.getElementById("btnPasar").addEventListener("click", () => {pasarTurno();});
document.getElementById("btnRobar").addEventListener("click", () => { robarCartaYVerificarBomba(jugadores[turnoActual]);});


// Función para pasar turno
function pasarTurno() {
    if (baraja.estaVacia()) {
        verificarGanadorPorPuntos();
    }
    else {
        const jugadorActual = jugadores[turnoActual];

        if (jugadorActual.numCartasSaltoTurno() > 0) {
            jugadorActual.gastarCartasSaltoTurno();
            actualizarPilaDeDescarte([{ tipo: "Saltar turno" }]);

            actualizarEstadisticasJugador(jugadorActual, `J${turnoActual + 1}`);


            turnoActual = (turnoActual + 1) % jugadores.length;

            while (jugadores[turnoActual].eliminado) {
                turnoActual = (turnoActual + 1) % jugadores.length;
            }

        } else {
            alert(`${jugadorActual.nombre} no tiene cartas de "Saltar turno".`);
        }
    }
    resaltarJugador();
}

// Función para robar carta y actualizar estadísticas
function robarCartaYVerificarBomba(jugador) {
    if (jugador.eliminado) return;

    if (baraja.estaVacia()) {
        verificarGanadorPorPuntos(); 
    } else {
    const cartaRobada = baraja.robarCarta();
    jugador.sumarCarta(cartaRobada);

    document.getElementById("imgCartaRobada").src = cartaRobada.imagen;

    if (cartaRobada.tipo === "Bomba") {
        if (jugador.numCartasDesactivar() > 0) {
            jugador.gastarCartasDesactivar();
            actualizarPilaDeDescarte([cartaRobada]);
            actualizarPilaDeDescarte([{ tipo: "Desactivación" }]);
        } else {
            eliminarJugador(jugador);
        }
    }


    actualizarEstadisticasJugador(jugador, `J${turnoActual + 1}`);
    
    turnoActual = (turnoActual + 1) % jugadores.length;

    if (jugadores[turnoActual].eliminado) {
        turnoActual = (turnoActual + 1) % jugadores.length;
    }
}

resaltarJugador();
}

// Función de eliminar jugador
function eliminarJugador(jugador) {
    jugador.eliminar();

    if (jugadores.filter(j => !j.eliminado).length === 1) {
        alert(`${jugadores.find(j => !j.eliminado).nombre} es el ganador!`);
        mostrarBotonReiniciar();
    }
}

// Función de actualizar la pila de descarte
function actualizarPilaDeDescarte(cartas) {
    const listaDescarte = document.getElementById("listaDescarte");
    cartas.forEach(carta => {
        const li = document.createElement("li");
        li.textContent = `Carta ${carta.tipo}`;
        listaDescarte.appendChild(li);
    });
}

//Funcioón que actualiza las estadísticas dependiendo del turno del jugador.
function actualizarEstadisticasJugador(jugador, jugadorId) {

    let numCartas = document.getElementById(`${jugadorId}NumCartas`);
    numCartas.textContent = `⚪️ Número de cartas: ${jugador.contarCartas()}`;
    let puntosTotales = document.getElementById(`${jugadorId}Puntos`);
    puntosTotales.textContent = `⚪️ Puntos totales: ${jugador.getPuntosTotales()}`;
    let cartasSaltoTurno = document.getElementById(`${jugadorId}saltoTurno`);
    cartasSaltoTurno.textContent = `⚪️ Cartas salto turno: ${jugador.numCartasSaltoTurno()}`;
    let cartasDesactivacion = document.getElementById(`${jugadorId}Desactivacion`);
    cartasDesactivacion.textContent = `⚪️ Cartas desactivación: ${jugador.numCartasDesactivar()}`;
}

// Función que sustituye al botón de pasar turno por el de reiniciar juego.
function mostrarBotonReiniciar() {
    document.getElementById("btnPasar").style.display = "none";

    let botonReiniciar = document.createElement("button");
    botonReiniciar.classList.add("btnAccion");
    botonReiniciar.textContent = "Jugar de nuevo";
    botonReiniciar.addEventListener("click", reiniciarJuego);

    let contenedorAcciones = document.getElementById("contenedorAcciones");
    contenedorAcciones.appendChild(botonReiniciar);
}

//Función que verifica el ganador por puntos en caso de que la baraja esté vacía.
function verificarGanadorPorPuntos() {
    if (baraja.estaVacia()) {

        const jugadoresActivos = jugadores.filter(jugador => !jugador.eliminado);
        let maxPuntos = 0;
        let ganador = "";


        jugadoresActivos.forEach(jugador => {
            const puntos = jugador.getPuntosTotales();
            if (puntos > maxPuntos) {
                maxPuntos = puntos;
                ganador = jugador;
            }
        });

        if (ganador) {
            alert(`${ganador.nombre} es el ganador con ${maxPuntos} puntos!`);
        }

        mostrarBotonReiniciar();
    }
}


// Función que reinicia el juego 
function reiniciarJuego() {
    location.reload();
}

//Resalta el nombre de cada jugador denpendiendo de a quién le toque jugar.
function resaltarJugador(){
    const cabecera = document.getElementsByClassName("cabeceraJugador");
    for (let i = 0; i < cabecera.length; i++) {
        if (i === turnoActual) {
            cabecera[i].classList.add("resaltado");
        } else {
            cabecera[i].classList.remove("resaltado");
        }
    }
}