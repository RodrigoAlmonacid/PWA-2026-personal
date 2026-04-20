import basededatos from './basededatos.js'
import promptSync from 'prompt-sync';
const prompt = promptSync();
function calcularDanio(ataque, defensa, critico){
	if (critico){
		ataque = ataque * 2;
	}	
	let resultado = ataque - defensa;
	if(resultado<0){
		resultado = 0;
	}partida
	return resultado;
}

function puedeEvolucionar(nombre, nivel){
	nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
	let retorno = `${nombre} evolucionó a `;
	if(nombre === "Charmander" && nivel>=16){
		retorno += "Charmeleon";
	}	
	else if(nombre === "Bulbasaur" && nivel >= 15){
		retorno += "Ivysaur";
	}
	else if(nombre === "Squirtle" && nivel >= 18){
		retorno += "Wartortle";
	}
	else{
		retorno = `${nombre} todavía no puede evolucionar`;
	}
	return retorno;
}

function batalla(atacante, defensor, poder, ataque, defensa, critico){
	const danio = calcularDanio(ataque, defensa, critico);
	atacante = atacante.charAt(0).toUpperCase() + atacante.slice(1).toLowerCase();
	defensor = defensor.charAt(0).toUpperCase() + defensor.slice(1).toLowerCase();
	poder = poder.toLowerCase();
	let retorno = `${atacante} usó el ${poder} contra ${defensor}! Causó ${danio} de daño.`;
	if(danio >= 50){
		retorno += ` ${defensor} ha sido derrotado!`;
	}
	return retorno;
}

function aleatorio(){
	const op1="ataque";
	const op2="defensa";
	let retorno=Math.random()<0.5 ? op1 : op2;

	return retorno;
}

function valoresTurno(){
	let ataque=Math.floor(Math.random()*100);
	let defensa=Math.floor(Math.random()*100);
	let critico=Math.random()<0.5 ? true : false;
	
	return { ataque, defensa, critico };
}

function jugarTurno(){
	let jugador=prompt("¿Ataque o Defensa?").toLowerCase();
	let maquina=aleatorio();
	let danioJugador=0;
	let danioMaquina=0;
	const valoresJugador=valoresTurno();
	const valoresMaquina=valoresTurno();

	if(jugador!="ataque" && jugador!="defensa"){
		jugador=prompt("Escriba una de las dos opciones ¿Ataque o Defensa?").toLowerCase();	
	}
	
	if(jugador === maquina) {
		if(jugador==="ataque"){			
			danioMaquina=calcularDanio(valoresJugador.ataque, valoresMaquina.defensa, valoresJugador.critico);
            danioJugador=calcularDanio(valoresMaquina.ataque, valoresJugador.defensa, valoresMaquina.critico);
		}
	}
	else if ( jugador==="ataque" ) {
		danioMaquina=calcularDanio(valoresJugador.ataque, valoresMaquina.defensa, valoresJugador.critico)/2;			
	}
	else{
		danioJugador=calcularDanio(valoresMaquina.ataque, valoresJugador.defensa, valoresMaquina.critico)/2;		
	}

	return {jugador, danioJugador, danioMaquina, valoresJugador, valoresMaquina};
}

function partida(){
	let vidaJugador=100;
	let vidaMaquina=100;
	let turno=0;
	let mensaje="";
	let mensajeTurno="";

	while(turno<5 && vidaJugador>0 && vidaMaquina>0){
		turno++;
		const partida=jugarTurno();
	
		vidaJugador=vidaJugador-partida.danioJugador;
		vidaMaquina=vidaMaquina-partida.danioMaquina;
		
		mensajeTurno=`Turno ${turno}: `;

		if(partida.jugador==="ataque"){
			mensajeTurno+=`Atacaste con ${partida.valoresJugador.ataque}. El enemigo se defendió con ${partida.valoresMaquina.defensa}. ¡Le hiciste ${partida.danioMaquina} de daño!`;
		}
		else {
			mensajeTurno+=`Defendiste con ${partida.valoresJugador.defensa}. El enemigo atacó con ${partida.valoresMaquina.ataque}. ¡Bloqueaste parte del daño! Recibiste ${partida.danioJugador} de daño.`;
		}
	console.log(mensajeTurno);
	}
	if(vidaJugador<0){ vidaJugador=0; }
	if(vidaMaquina<0){ vidaMaquina=0; }
	mensaje+=`Vida final del jugador: ${vidaJugador}.
Vida final del enemigo: ${vidaMaquina}.
Resultado: se jugaron ${turno} turnos.`;
	if((vidaJugador-vidaMaquina)>0){
		mensaje+=` Ganaste`;
	}
	else if ((vidaJugador-vidaMaquina)<0){
		mensaje+=' Perdiste';
	}
	else{ mensaje+=' Empataste'; }

	mensaje+=' la batalla!';
	return mensaje;
}

//console.log(partida());

//modulo 5 trabajo con array's

//ejercicio 2: año promedio de estreno de peliculas
function promedioAnioEstreno(){
    const sumaAnio=basededatos.peliculas.reduce( (suma, pelicula) => {
        return suma + pelicula.anio;
    }, 0);
    const cantPeliculas=basededatos.peliculas.length;
    return sumaAnio / cantPeliculas;
}

//console.log('Año promedio: ', promedioAnioEstreno());

//2.2. Películas con buena crítica
//Escribí una función que devuelva un array con todas las películas que tienen promedio de críticas mayor a un valor dado por parámetro.

function promedioCalificacion(id){
    let buscaPeli=basededatos.calificaciones.filter(calificacion => {
        return calificacion.pelicula===id
    });
    let sumaCalificacion=buscaPeli.reduce( (suma, peli) => {
        return suma + peli.puntuacion;
    }, 0);
    let promedio=0;
    if(buscaPeli.length != 0){
        promedio = sumaCalificacion / buscaPeli.length;
    }
    return promedio;
}

function peliculasBuenaCritica(valor){
    const pelis = basededatos.peliculas.filter(pelicula => {
        let promedio = promedioCalificacion(pelicula.id);
        return promedio>valor;
    })
    return pelis;
}

//console.log(peliculasBuenaCritica(7))

/* 
2.3. Películas dirigidas por alguien
Escribí una función que reciba el nombre de un director y devuelva todas las películas que dirigió.
*/

function buscaDirector(nombre){
    const director=basededatos.directores.find(director => director.nombre === nombre);
    return director;
}

function buscaPeliDirector(nombre){
    const director=buscaDirector(nombre);
    const peliculasDirector = basededatos.peliculas.filter(pelicula => pelicula.directores.includes(director.id));
    return peliculasDirector;
}

//console.log(buscaPeliDirector('Juan Jose Campanella'));

/*
2.4. Promedio de crítica de una película
Escribí una función que reciba el id de una película y devuelva su promedio de puntuaciones.
*/

function promedioCritica(id){
    const criticas=basededatos.calificaciones.filter(calificacion=>calificacion.pelicula===id);
    const sumaCritica=criticas.reduce( (suma, critica) => {
        return suma + critica.puntuacion;
    }, 0);
    let promedio=0;
    if(criticas.length!==0){
        promedio=sumaCritica/criticas.length;
    }
    return promedio;
}

/* 
2.5. Películas con al menos una crítica excelente
Devuelve todas las películas que tienen al menos una crítica con puntuación >= 9.
*/
function buscarPeliId(id){
    const peli = basededatos.peliculas.find(peli => peli.id===id);
    return peli;
}

function peliculasExcelente(){
    const peliExcelente=basededatos.calificaciones.filter(calificacion => calificacion.puntuacion>=9);
    const peliculasFinales = peliExcelente.map(calificacion => {
        return buscarPeliId(calificacion.pelicula);
    });
    return peliculasFinales;
}

console.log(peliculasExcelente());