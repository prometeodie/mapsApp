import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { MapScreenComponent } from './pages/map-screen/map-screen.component';

const routes: Routes = [
  {
    path:'',
    children:[
    {
      path: 'propiedades',
      component: PropiedadesComponent
    },
    {
      path: 'zoomRange',
      component: ZoomRangeComponent
    },
    {
      path: 'marcadores',
      component: MarcadoresComponent
    },
    {
      path: 'mapScreen',
      component: MapScreenComponent
    },
    {
      path:'**',
      redirectTo:'mapScreen'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
