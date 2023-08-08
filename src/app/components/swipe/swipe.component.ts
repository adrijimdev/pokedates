import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'swift-component',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent {
  // imgPokemon: string = "";
  maxNumber: number = 2; //1010
  pokemonSwiped: number = 0;
  id: number = 0;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    image: ''
  };
  likedPokemon: Pokemon[] = [];
  dislikedPokemon: Pokemon[] = [];
  //array.includes(value)

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
      this.pokemon.id = pokemonReceived.id;
      this.pokemon.name = pokemonReceived.name;
      this.pokemon.image = pokemonReceived.sprites.other['official-artwork'].front_default;
    })
  }

  dislike() {

  }
  like() {

  }

}
