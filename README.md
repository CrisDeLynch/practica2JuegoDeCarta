# Card Game
## 📄 1. Introducciones
En esta práctica, vamos a implementar una versión simplificada del popular juego de cartas Exploding Kittens. A través de este proyecto, se busca poner en práctica conceptos fundamentales de programación como el manejo de estructuras de datos (arrays), control de flujo (condicionales, bucles), y la creación de una interfaz de texto simple para interactuar con los jugadores. El proyecto permitirá a los estudiantes explorar la lógica de los juegos de cartas, desde la creación de las reglas hasta la gestión de turnos y las condiciones de victoria o derrota.

## 🎯 2. Objetivos
- Aplicar estructuras de datos como array para gestionar el estado del juego.
- Desarrollar habilidades en el uso de condicionales y bucles para controlar la lógica del juego.
- Implementar una interfaz simple por consola para permitir la interacción del jugador con el juego.
- Familiarizarse con el proceso de diseño de juegos, como la gestión de turnos, el manejo de cartas, y las condiciones de ganar o perder.
- Trabajar en la división de un problema más grande en funciones o módulos más pequeños y manejables.

## 📕 3. Descripción del juego
*Exploding Kittens* es un juego de cartas en el que los jugadores roban cartas por turnos con el objetivo de evitar una explosión. Los jugadores que roban una carta de *gato explosivo* (*Exploding Kitten*) quedan eliminados, a menos que usen una carta especial para desactivar la explosión.

En esta versión simplificada, las cartas se dividen en varios tipos, cada una con su propio efecto:

1. **Bomba:** Si un jugador roba esta carta, está eliminado, a menos que tenga una carta de desactivación.
2. **Desactivador:** Permite desactivar una bomba
3. **Otras cartas (Opcional):** Pueden incluir acciones como:
    - **Saltar turno:** El jugador pasa su turno sin robar.
    - **Cartas puntos**: Al generarse pueden tener un valor aleatorio entre 1 y 10, en caso de
    que se acabe la partida y haya más de un jugador vivo, ganará quien más puntos tenga.
    

El objetivo del juego es ser el último jugador que quede sin explotar.

## 🔁 4. Mecánica del juego
1. **Inicio del juego:**
    - Generación de la baraja (60 cartas)
        - Cartas Bomba: 6
        - Cartas Desactivación: 6
        - Cartas Saltar turno: 10
        - Cartas Puntos: 33.
        - Cada carta puede representarse como un objeto con dos propiedades:
            - Tipo: Bomba, Desactivación, Saltar turno o Puntos.
            - Valor, sólo el tipo “Puntos” tendrá esta propiedad, y sus posibles valores van del 1 al 10.
    - Mezclar todas las cartas mediante el algoritmo de Fisher-Yates Shuffle.
    
2. **Turnos:**
    - Los jugadores toman turnos en secuencia.
    - En cada turno, un jugador puede:
        1. Saltar turno.
        2. Robar una carta del mazo.
    - Si un jugador roba una bomba, tiene que usar inmediatamente un *Desactivador* para evitar la explosión o quedar eliminado.
        
        
3. **Fin del turno:**
    - Después de robar una carta, el turno del jugador termina y pasa al siguiente jugador.
        
        
4. **Condiciones de victoria:**
    - El juego continúa hasta que todos los jugadores, excepto uno, hayan sido eliminados por una bomba.

## ⚙️ 5. Mecánica del juego
- Un jugador solamente puede pasar turno si tiene una carta de pasar turno, en caso contrario el botón aparecerá deshabilitado.
- Un jugador solamente puede desactivar una bomba si posé una carta de desactivación. Está acción será automática. Se pondrán las dos cartas, bomba y desactivación en la pila de cartas descartadas.
- Si un jugador es eliminado, sus cartas irán a la pila de descarte y no podrá seguir jugando el resto de la partida.
- Si solamente queda un jugador, se mostrar un alert avisado de que es el ganador.
    - Se eliminará del dom el botón robar carta y en su lugar aparecerá un botón jugar de nuevo. Este botón reinicia el juego.
- Si no quedan cartas:
    - Se mostrar un alert con el Jugador que ganó, comparar los puntos.
    - Se eliminará del dom el botón robar carta y en su lugar aparecerá un botón jugar de nuevo. Este botón reinicia el juego.

## 6. Autores
- Borja Rodríguez.
    - Git: https://github.com/brodriguezp09
- David Elías Martín.
    - Git:  https://github.com/Elias-MN