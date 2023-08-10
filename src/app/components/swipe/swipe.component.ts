import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'swipe-component',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent {
  maxNumber: number = 4; //1010
  swipedPokemon: number[] = [];
  id: number = 0;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    image: ''
  };
  likedPokemon: Pokemon[] = [];

  ngOnInit() {
    this.bringPokemon();
  }

  randomPokemon() {
    return Math.floor(Math.random() * this.maxNumber + 1);
  }

  bringPokemon() {
    do {
      this.id = this.randomPokemon();
    } while(this.swipedPokemon.includes(this.id));

    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
    .then(response => response.json())
    .then((pokemonReceived) => {
      this.pokemon.id = pokemonReceived.id;
      this.pokemon.name = pokemonReceived.name;
      this.pokemon.image = pokemonReceived.sprites.other['official-artwork'].front_default;
    })
  }

  dislike() {
    this.swipedPokemon.push(this.pokemon.id);
    if (this.swipedPokemon.length !== this.maxNumber) {
      this.bringPokemon();
    }
  }

  like() {
    this.swipedPokemon.push(this.pokemon.id);
    this.likedPokemon.push(new Pokemon(this.pokemon.id, this.pokemon.name, this.pokemon.image))
    if (this.swipedPokemon.length !== this.maxNumber) {
      this.bringPokemon();
    }
  }

}
