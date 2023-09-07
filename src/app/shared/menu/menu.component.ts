import { Component } from '@angular/core';


interface MenuItem {
  ruta: string;
  nombre:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  styles: [`
    li{
      cursor:pointer;
    }
  `]
})
export class MenuComponent  {

  menu: MenuItem[] =[
    {
      ruta: '/mapas/zoomRange',
      nombre: 'Map'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Markers'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]

  isMenuClosed:boolean = true;

  closeMenu(){
    this.isMenuClosed = !this.isMenuClosed;
  }
}
