import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'mostrar-maps', loadChildren: './mostrar-maps/mostrar-maps.module#MostrarMapsPageModule' },
  { path: 'descricao-lava', loadChildren: './descricao-lava/descricao-lava.module#DescricaoLavaPageModule' },
  { path: 'cadastro-lavacao', loadChildren: './cadastro-lavacao/cadastro-lavacao.module#CadastroLavacaoPageModule' },
  { path: 'solicitar-lava', loadChildren: './solicitar-lava/solicitar-lava.module#SolicitarLavaPageModule' },
  { path: 'controle-mapas', loadChildren: './controle-mapas/controle-mapas.module#ControleMapasPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
