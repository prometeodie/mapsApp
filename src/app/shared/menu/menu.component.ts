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
      ruta: '/mapas/fullScreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoomRange',
      nombre: 'Zoom Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]


}
