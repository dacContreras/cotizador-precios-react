// importaciones necesarios
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from "./components/Header";
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar } from './helpers'

// esta es la app o pagina
function App() {
    // usamos useState para datos dinamicos
    const [cantidad, setCantidad] = useState(10000);
    const [meses, setMeses] = useState(6);
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0)

    // usamos useEffect para leer datos que cambian
    useEffect(() => {
        const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
        setTotal(resultadoTotalPagar);
    }, [cantidad, meses, total]);

    useEffect(() => {
        // calcular el pago mensual
        setPago(total / meses);
    }, [total, meses]);

    // constantes
    const MIN = 0;
    const MAX = 20000;
    const STEP = 100;

    // esta funcion cambia la cantidad escuchadno el evento
    function handleChange(e){
        setCantidad(+e.target.value)
    }

    // esta funcion le resta al valor el valor del step
    function handleClickDecremento(){
        const valor = cantidad - STEP;
        if(valor < MIN){
            // esto es una alerta personalizada
            Swal.fire(
                'Cantidad no valida',
                'presiona OK para continuar',
                'error'
              )
            return;
        }
        setCantidad(valor);
    }

    // esta funcion le suma al valor el valor del step
    function handleClickIncremento(){
        const valor = cantidad + STEP;
        if(valor > MAX){
            Swal.fire(
                'Cantidad no valida',
                'presiona OK para continuar',
                'error'
            )
            return;
        }
        setCantidad(valor);
    }

    // esto es lo que muestra en la pagina
    return (
        // contenedor
        <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
            {/* llamamos el componente header */}
            <Header /> 
            {/* aca se encuentra los botones */}
            <div className="flex justify-between my-6">
                <Button
                    operador="-"
                    fn={handleClickDecremento}
                />
                <Button
                    operador="+"
                    fn={handleClickIncremento}
                />
            </div>
            {/* este el rango */}
            <input
                type="range"
                className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
                onChange={handleChange}
                min={MIN}
                max={MAX}
                step={STEP}
                value={cantidad}
            />
            {/* aca mostramos la candtidad en pantalla */}
            <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
                {formatearDinero(cantidad)  }
            </p>

            <h2 className="text-2xl font-extrabold text-gray-500 text-center">
                Elige un <span className='text-indigo-600'>Plazo</span> a pagar
            </h2>

            {/* aca seleccionamos los msees */}
            <select
                className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
                value={meses}
                onChange={e => setMeses(+e.target.value)}
            >
                <option value="6">6 Meses</option>
                <option value="12">12 Meses</option>
                <option value="24">24 Meses</option>
            </select>

            {/* aca mostramos ya los valores finales */}
            <div className="my-5 space-y-3 bg-gray-50 p-5">
                <h2 className="text-2xl font-extrabold text-gray-500 text-center">
                    Resumen <span className="text-indigo-600">de pagos </span>
                </h2>

                <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
                <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
                <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>

            </div>
        </div>
    )
}

export default App
