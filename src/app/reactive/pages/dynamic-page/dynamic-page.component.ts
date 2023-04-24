import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',

})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['WRC 9', Validators.required],
    ])
  })

  constructor( private fb: FormBuilder ){}

  get juegosFavoritos() {
    // Es necesario indicar el tipo que vamos a utilizar  usando el 'as'
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onDeleteFavorite( index:number ): void {
    this.juegosFavoritos.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }

}
