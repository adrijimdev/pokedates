import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Pokemon } from 'src/app/models/pokemon';
import { SwipedPokemonService  } from '../../services/swiped-pokemon-service.service';

@Component({
  selector: 'likes-component',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  likedPokemonList: Pokemon[] = [];
  likedPokemonListSubscription!: Subscription;


  constructor(
    private router: Router,
    private swipedPokemonService: SwipedPokemonService
  ) {}

  ngOnInit() {
    // const storedLikedPokemonList = localStorage.getItem('likedPokemonList');
    // this.likedPokemonList = storedLikedPokemonList ? JSON.parse(storedLikedPokemonList) : [];
    this.likedPokemonList = this.swipedPokemonService.getLikedPokemon();
  }

  resetSwipes() {
    // localStorage.removeItem('swipedPokemon');
    // localStorage.removeItem('likedPokemonList');
    this.swipedPokemonService.clearLikedPokemon();
    this.swipedPokemonService.clearSwipedPokemon();
    this.router.navigate(['/swipe']);
  }
}
