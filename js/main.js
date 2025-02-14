import {valida, mensaje} from './valida.js';
const miMain = (()=>{
    'use strict'
    const nombre =  document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const tel = document.querySelector('#telefono');
    const asunto = document.querySelector('#asunto');
    const msj = document.querySelector('#mensaje');
    const formulario = document.querySelector('.formulario');
    
    const lista = [nombre, tel, asunto, msj];
    
    lista.forEach((input)=>{
        input.addEventListener('input', valida)
    })

    email.addEventListener('input', mensaje);
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        console.log(datos)
        if(!datos.nombre || !datos.email || !datos.teefono || !datos.asunto || !datos.mensaje){
            evento.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar todos los campos!",
            });
        }else{
            return
        }
    })
})();

