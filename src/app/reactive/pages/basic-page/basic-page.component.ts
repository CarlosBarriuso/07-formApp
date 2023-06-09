import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const pantalla = {
  name: 'Lenovo 24"',
  price: 120,
  inStorage: 1
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  /*Para crear el formulario con FormGroup
  public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    precio: new FormControl(0),
    almacenado: new FormControl(0),
  });
  */



  //Para crear el formulario con FormBuilder hay que inyectar el servicio en el constructor
  constructor( private  fb: FormBuilder ){}

  //Para cargar el formulario con los valores que se recojan por el ejemplo del back, lo hacemos con OnInit()
  ngOnInit(): void {
      this.myForm.reset( pantalla );
  }

  public myForm: FormGroup = this.fb.group({
    //las propiedades del objeto son  [ valor inicial, validación síncrona, validación asíncrona ]
    name: ['', [ Validators.required, Validators.minLength(3) ], [] ],
    price: [0, [ Validators.required, Validators.min(0) ], [] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ], [] ],
  })

  //Para comprobar los input del formulario, si tienen eerores y han sido tocados
  isValidField( field: string ) {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

  //Para recuperar el tipo de error del input
  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ){
      switch( key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } carácteres.`
      }
    }
    return null;
  }

  onSave():void {
    if (this.myForm.invalid){
      //para disparar los mensajes de error cuando se hace el submit, hacemos que se simule que se ha tocado
      //todos los input del formulario
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    //para poner el formulario al estado inicial  basta con llamar al método reset, en el
    //cual podemos pasar un objeto (entre {}), con el valor de las propiedades que necesitemos
    this.myForm.reset( { price:0, inStorage:0 } );
  }
}
