//Desafio 1: Dado un string con una frase, invertir unicamente las palabras que tengan mas de 4 letras, dejando las otras igual.
function extraePalabras(texto){
    const palabras=[];
    const caracteres=texto.length;
    let unaPalabra="";
    let unCaracter="";

    for(let i=0; i<caracteres; i++){
        unCaracter=texto.charAt(i);
        if(unCaracter!==" "){
            unaPalabra+=unCaracter;
        }
        else{
            palabras.push(unaPalabra);
            unaPalabra="";
        }
    }
    if(unaPalabra.length>0){
        palabras.push(unaPalabra);
    }
    return palabras;
}

function invertidor(texto){
    const caracteres=texto.length;
    let invertido="";

    for(let i=1; i<=caracteres; i++){
        invertido+=texto.charAt(caracteres-i);
    }
    return invertido;
}

function inviertePalabras(texto){
    const palabras=extraePalabras(texto);
    let fraseInvertida="";
    palabras.forEach(unaPalabra =>{
        if(unaPalabra.length>4){
            unaPalabra=invertidor(unaPalabra);
        }
        fraseInvertida+=unaPalabra+" ";
    });
    return fraseInvertida;
}
//console.log(inviertePalabras('A veces, las palabras tienen poder'));
//Escribir una funcion que reemplace todas las vocales en una texto por * 
function reemplazoVocales(texto){
    let nuevoTexto="";
    const caracteres=texto.length;
    let unCaracter="";
    const regla=/[aAeEiIoOuU]/;
    for(let i=0; i<caracteres; i++){
        unCaracter=texto.charAt(i);
        if(regla.test(unCaracter)){
            unCaracter="*";
        }
        nuevoTexto+=unCaracter;
    }
    return nuevoTexto;
}

//console.log(reemplazoVocales('Nueva pruEba'));

//Contador de palabras unicas
//Escribir una funcion que cuente cuántas palabras únicas hay en una frase, sin distinguir mayusculas y minusculas y sin contar signos de puntuación
function datoRepetido(dato, arreglo){
    let encuentra=false;
    let i=0;
    while(!encuentra && i<arreglo.length){
        if(dato.toLowerCase()===arreglo[i].toLowerCase()){ encuentra=true; }
        i++;
    }
    return encuentra;
}

function palabrasUnicas(texto){
    const palabras=extraePalabras(texto);
    let cantPalabrasUnicas=0;
    let i=0;
    const cantInicial=palabras.length;
    if(cantInicial<2){
        cantPalabrasUnicas=cantInicial;
    }
    else{
        do{
            if(datoRepetido(palabras[i], palabras.slice(i+1))){
                palabras.splice(i, 1); //a palabras le quito el lugar i
            }
            else{
                i++;
            }
        }while(i<cantInicial);
    }
    return palabras.length;
}

console.log(palabrasUnicas('hola mundo MUNDO holA HoLA'));