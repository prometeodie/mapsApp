import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';

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
      path:'**',
      redirectTo:'zoomRange'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
