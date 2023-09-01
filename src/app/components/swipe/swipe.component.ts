import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Pokemon } from 'src/app/models/pokemon';
import { SwipedPokemonService  } from '../../services/swiped-pokemon-service.service';

@Component({
  selector: 'swipe-component',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent {
  constructor(private swipedPokemonService: SwipedPokemonService) {}
  swipedPokemon: number[] = [];
  swipedPokemonSubscription!: Subscription;
  maxNumber: number = 1010; //1010
  // swipedPokemon: number[] = [];
  id: number = 0;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    image: '',
    sprite: ''
  };
  // likedPokemonList: Pokemon[] = [];
  showLikes: boolean = false;
  showSwipe: boolean = true;
  loadingData: boolean = false;

  ngOnInit() {
    // Código utilizado cuando se almacenan los pokémon swipeados en localStorage
    // const storedSwipedPokemon = localStorage.getItem('swipedPokemon');
    // this.swipedPokemon = storedSwipedPokemon ? JSON.parse(storedSwipedPokemon) : [];
    // if (this.swipedPokemon.length !== this.maxNumber) {
    //   this.bringPokemon();
    // }
    this.swipedPokemon = this.swipedPokemonService.getSwipedPokemon();
    this.swipedPokemonSubscription = this.swipedPokemonService.swipedPokemonUpdated.subscribe((updatedPokemon) => {
      this.swipedPokemon = updatedPokemon;
    });
    this.bringPokemon();
  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte cuando el componente se destruye para evitar pérdida de memoria
    this.swipedPokemonSubscription.unsubscribe();
  }

  randomPokemon() {
    return Math.floor(Math.random() * this.maxNumber + 1);
  }

  bringPokemon() {
    do {
      this.id = this.randomPokemon();
    } while(this.swipedPokemonService.getSwipedPokemon().includes(this.id));

    this.loadingData = true;

    fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
    .then(response => response.json())
    .then((pokemonReceived) => {
      this.pokemon.id = pokemonReceived.id;
      this.pokemon.name = pokemonReceived.name;
      this.pokemon.image = pokemonReceived.sprites.other['official-artwork'].front_default;
      this.pokemon.sprite = pokemonReceived.sprites.front_default;

      const pokemonImage = new Image();
      pokemonImage.src = this.pokemon.image;
      pokemonImage.onload = () => {
        this.loadingData = false;
      }
    })
  }

  dislike() {
    this.swipedPokemonService.addSwipedPokemon(this.pokemon.id);
    if (this.swipedPokemonService.getSwipedPokemon().length !== this.maxNumber) {
      this.bringPokemon();
    }
    // this.saveToLocalStorage();
  }

  like() {
    this.swipedPokemonService.addSwipedPokemon(this.pokemon.id);
    this.swipedPokemonService.addLikedPokemon(
      new Pokemon(this.pokemon.id, this.pokemon.name, this.pokemon.image, this.pokemon.sprite)
    );
    // const likedPokemon = new Pokemon(this.pokemon.id, this.pokemon.name, this.pokemon.image, this.pokemon.sprite);
    // this.saveLikedPokemonToLocalStorage(likedPokemon);

    if (this.swipedPokemonService.getSwipedPokemon().length !== this.maxNumber) {
      this.bringPokemon();
    }
    // this.saveToLocalStorage();
  }
  // ESTAS DOS FUNCIONES SE UTILIZARÍAN EN CASO DE ALMACENAR LOS POKEMON SWIPEADOS EN LOCALSTORAGE
  // private saveToLocalStorage() {
  //   localStorage.setItem('swipedPokemon', JSON.stringify(this.swipedPokemon));
  // }

  // private saveLikedPokemonToLocalStorage(pokemon: Pokemon) {
  //   const storedLikedPokemonList = localStorage.getItem('likedPokemonList');
  //   const likedPokemonList = storedLikedPokemonList ? JSON.parse(storedLikedPokemonList) : [];
  //   likedPokemonList.push(pokemon);
  //   localStorage.setItem('likedPokemonList', JSON.stringify(likedPokemonList));
  // }

  // FUNCIONES PROBADAS PARA TENER UN EFECTO HOVER EN LOS BOTONES DE LIKE Y DISLIKE AL PULSARLOS EN UN DISPOSITIVO MÓVIL, NO FUNCIONARON
  // hoverIn() {
  //   const element = document.getElementById('dislike');
  //   if (element) {
  //     element.classList.add('hovered');
  //   }
  //   console.log("hover in");
  // }

  // hoverOut() {
  //   const element = document.getElementById('dislike');
  //   if (element) {
  //     element.classList.remove('hovered');
  //   }
  //   console.log("hover out");
  // }


}
