import { valida, mensaje } from './valida.js';

const miMain = (() => {
    'use strict';

    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const tel = document.querySelector('#telefono');
    const asunto = document.querySelector('#asunto');
    const msj = document.querySelector('#mensaje');
    const formulario = document.querySelector('.formulario');
    const responseMessage = document.getElementById('response-message'); // Asegúrate de que este elemento exista en tu HTML

    const lista = [nombre, tel, asunto, msj];

    lista.forEach((input) => {
        input.addEventListener('input', valida);
    });

    email.addEventListener('input', mensaje);

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        const datos = Object.fromEntries(new FormData(evento.target));

        if (!datos.nombre || !datos.email || !datos.telefono || !datos.asunto || !datos.mensaje) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar todos los campos!",
            });
            return; // Detiene la ejecución si la validación falla
        }

        try {
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Mensaje enviado!",
                    text: result.message,
                });
                formulario.reset(); // Limpia el formulario después de enviar
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.error || 'Error al enviar el mensaje',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Error al enviar el mensaje',
            });
        }
    });
})();