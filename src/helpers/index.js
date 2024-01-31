// funcion de formatear el dinero
// usando una api nativa de js convertimos los valores en formato de dinero
const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ'
    });
    return formatter.format(valor);
}

// funcion calcular a pagar
// pasamos dos parametros, la cantidad y el plazo
const calcularTotalPagar = (cantidad, plazo) => {
    let total;

    // Mientras mayor sea la cantidad, menor es el interes
    if(cantidad < 5000){
        total = cantidad * 1.5;
    } else if (cantidad >= 5000 && cantidad < 10000) {
        total = cantidad * 1.4;
    } else if (cantidad >= 10000 && cantidad < 15000) {
        total = cantidad * 1.3;
    } else {
        total = cantidad * 1.2;

    }

    // plazo - mas plazo mayor interes
    if(plazo === 6){
        total *= 1.1;
    } else if (plazo === 12){
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total;
}

export {
    formatearDinero,
    calcularTotalPagar
};