import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'mostrar-maps', loadChildren: './mostrar-maps/mostrar-maps.module#MostrarMapsPageModule',  canActivate: [AuthGuard]},
  { path: 'descricao-lava', loadChildren: './descricao-lava/descricao-lava.module#DescricaoLavaPageModule', canActivate: [AuthGuard] },
  { path: 'descricao-lava/:id', loadChildren: './descricao-lava/descricao-lava.module#DescricaoLavaPageModule', canActivate: [AuthGuard] },
  { path: 'cadastro-lavacao', loadChildren: './cadastro-lavacao/cadastro-lavacao.module#CadastroLavacaoPageModule', canActivate: [AuthGuard] },
  { path: 'solicitar-lava', loadChildren: './solicitar-lava/solicitar-lava.module#SolicitarLavaPageModule', canActivate: [AuthGuard] },
  { path: 'controle-mapas', loadChildren: './controle-mapas/controle-mapas.module#ControleMapasPageModule', canActivate: [AuthGuard] },
  { path: 'list-lavacao', loadChildren: './list-lavacao/list-lavacao.module#ListLavacaoPageModule', canActivate: [AuthGuard] },
  
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
