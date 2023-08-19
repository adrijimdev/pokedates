import { Component } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'swipe-component',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent {
  maxNumber: number = 1010; //1010
  swipedPokemon: number[] = [];
  id: number = 0;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    image: '',
    sprite: ''
  };
  likedPokemonList: Pokemon[] = [];
  showLikes: boolean = false;
  showSwipe: boolean = true;

  ngOnInit() {
    const storedSwipedPokemon = localStorage.getItem('swipedPokemon');
    this.swipedPokemon = storedSwipedPokemon ? JSON.parse(storedSwipedPokemon) : [];
    if (this.swipedPokemon.length !== this.maxNumber) {
      this.bringPokemon();
    }
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
      this.pokemon.sprite = pokemonReceived.sprites.front_default;
    })
  }

  dislike() {
    this.swipedPokemon.push(this.pokemon.id);
    if (this.swipedPokemon.length !== this.maxNumber) {
      this.bringPokemon();
    }
    this.saveToLocalStorage();
    this.removeHoverStyle();
  }

  removeHoverStyle() {
    const likeElement = document.querySelector('.like');
    if (likeElement) {
      likeElement.classList.remove('no-hover');
    }
  }

  like() {
    this.swipedPokemon.push(this.pokemon.id);
    const likedPokemon = new Pokemon(this.pokemon.id, this.pokemon.name, this.pokemon.image, this.pokemon.sprite);
    this.saveLikedPokemonToLocalStorage(likedPokemon);

    if (this.swipedPokemon.length !== this.maxNumber) {
      this.bringPokemon();
    }
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('swipedPokemon', JSON.stringify(this.swipedPokemon));
  }

  private saveLikedPokemonToLocalStorage(pokemon: Pokemon) {
    const storedLikedPokemonList = localStorage.getItem('likedPokemonList');
    const likedPokemonList = storedLikedPokemonList ? JSON.parse(storedLikedPokemonList) : [];
    likedPokemonList.push(pokemon);
    localStorage.setItem('likedPokemonList', JSON.stringify(likedPokemonList));
  }


}
