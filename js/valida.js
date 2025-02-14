class ValidaCadena{
    constructor(campo, valor){
        this.campo = campo;
        this.valor = valor;
        this.patron = this.asignaPatron();
        this.mensaje;
    };
    asignaPatron(){
        if (this.campo  === 'nombre' ){
            this.patron = new RegExp(/^[a-zA-Z|ñ\s]*$/);
            this.mensaje = 'Este campo solo admite caracteres alfabeticos!!';
        }else if(this.campo === 'telefono'){
            this.patron = new RegExp(/^\d*[-|\s]*\d*[-|\s]*\d*$/);
            this.mensaje = 'Ingrese telefono con el siguiente fomato 11 5555-6666';
        }
        this.valida();
        return
    }
    valida(){
        if(!this.patron.test(this.valor)){
            setTimeout(()=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: this.mensaje,
                });
            },30);
            return
        }
    }
}

function valida(evento){
    const validaCadena = new ValidaCadena(evento.target.id, evento.target.value);
    mensaje(evento);
    return
}

function mensaje(evento){
    const campo = evento.target;
    const validaCampo = campo.validity;

    if(validaCampo.tooShort){
        campo.setCustomValidity(`El campo ${evento.target.id.toUpperCase()} requiere ${evento.target.minLength} caracteres como minimo`);
    }else{
        campo.setCustomValidity("");
    }
    campo.reportValidity();
    return
};

export{valida, mensaje};