import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [
  /* при входе в приложение делаем редирект login комоненту */
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'system', loadChildren: './system/system.module#SystemModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
