import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor( private fb: FormBuilder ){}

  get juegosFavoritos() {
    // Es necesario indicar el tipo que vamos a utilizar  usando el 'as'
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;
    this.juegosFavoritos.push(
      this.fb.control( newGame, Validators.required )
    );
    //Para borrar el texto despues de añadirlo al array
    this.newFavorite.reset();
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
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array( [] );
    this.myForm.reset();
  }

}
