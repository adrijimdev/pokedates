import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class SwipedPokemonService {
  private likedPokemon: Pokemon[] = [];
  private swipedPokemon: number[] = [];
  private swipedPokemonSubject = new BehaviorSubject<number[]>(this.swipedPokemon);

  constructor() {}

  addLikedPokemon(pokemon: Pokemon) {
    this.likedPokemon.push(pokemon);
  }

  addSwipedPokemon(id: number) {
    this.swipedPokemon.push(id)
  }

  getLikedPokemon(): Pokemon[] {
    return this.likedPokemon;
  }

  getSwipedPokemon(): number[] {
    return this.swipedPokemon;
  }

  clearLikedPokemon() {
    this.likedPokemon = [];
  }

  clearSwipedPokemon() {
    this.swipedPokemon = [];
    this.swipedPokemonSubject.next(this.swipedPokemon);
  }

  swipedPokemonUpdated = this.swipedPokemonSubject.asObservable();
}
