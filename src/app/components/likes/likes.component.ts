import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'likes-component',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  likedPokemonList: Pokemon[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedLikedPokemonList = localStorage.getItem('likedPokemonList');
    this.likedPokemonList = storedLikedPokemonList ? JSON.parse(storedLikedPokemonList) : [];
    for (let i = 0; i < this.likedPokemonList.length; i++) {
      console.log(this.likedPokemonList[i])
    }
  }

  resetSwipes() {
    localStorage.removeItem('swipedPokemon');
    localStorage.removeItem('likedPokemonList');
    this.router.navigate(['/swipe']);
  }
}
