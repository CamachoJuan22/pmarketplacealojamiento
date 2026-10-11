import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuAbierto = false;

  alternarMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }
}
