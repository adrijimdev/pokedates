import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'swift-component',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent {
  imgPokemon: string = "";
  maxNumber: number = 20; //1010
  pokemonSwiped: number = 0;
  id: number = 0;
  likedPokemon: Pokemon[] = [];
  dislikedPokemon: Pokemon[] = [];

  ngOnInit() {
    this.bringPokemon();
  }

  randomPokemon() {
    return Math.floor(Math.random() * this.maxNumber + 1);
  }

  bringPokemon() {
    this.id = this.randomPokemon();
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
    .then(response => response.json())
    .then((pokemonReceived) => {
      this.imgPokemon = pokemonReceived.sprites.other['official-artwork'].front_default;
    })
  }

}
