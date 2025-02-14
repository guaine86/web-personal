import {valida, mensaje} from './valida.js';
const miMain = (()=>{
    'use strict'
    const nombre =  document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const tel = document.querySelector('#telefono');
    const asunto = document.querySelector('#asunto');
    const msj = document.querySelector('#mensaje');
    
    const lista = [nombre, tel, asunto, msj];
    
    lista.forEach((input)=>{
        input.addEventListener('input', valida)
    })

    email.addEventListener('input', mensaje);
})();

