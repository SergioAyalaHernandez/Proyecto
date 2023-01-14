import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// se agrega, cómo estrategia PreloadAllModules, para precargar los chunks
// se ejecuta en el imports, cómo configuración del routes
// colocando "{preloadingStrategy: PreloadAllModules}"
import {NotFoundComponent} from "./not-found/not-found.component";
import {CustomPreloadService} from "./services/custom-preload.service";
import {AdminGuard} from "./guards/admin.guard";



const routes: Routes = [

  {
    path: '',
    loadChildren:() => import('./website/website.module').then(m=> m.WebsiteModule),
    data:{
      preload: true
    }
  },
  {
    path: 'cms',

    loadChildren:() => import('./cms/cms.module').then(m=> m.CmsModule),
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    //preloadingStrategy: QuicklinkStrategy // cargade acuerdo
    preloadingStrategy: CustomPreloadService //< de acuerdo a las directivas del servicio
    //preloadingStrategy: PreloadAllModules //< carga de acuerdo al orden y precarga
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
