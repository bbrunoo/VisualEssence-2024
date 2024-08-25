import { Routes, provideRouter } from '@angular/router';

import { LoginPaisComponent } from './Pages/Conta/login-pais/login-pais.component';
import { CadastroPaisComponent } from './Pages/Conta/cadastro-pais/cadastro-pais.component';

import { LoginInstComponent } from './Pages/Conta/login-inst/login-inst.component';
import { CadastroInstComponent } from './Pages/Conta/cadastro-inst/cadastro-inst.component';

import { EntrarComponent } from './Pages/Conta/entrar/entrar.component';

import { EsquecerSenhaComponent } from './Pages/Conta/esquecer-senha/esquecer-senha.component';

import { OpcEntrarComponent } from './Pages/Conta/opc-entrar/opc-entrar.component';

import { HomeComponent } from './Pages/Home/home.component';

import { AdminContatoComponent } from './Pages/admin-contato/admin-contato.component';

//-----------------------------------
import { HomeInstComponent } from './Pages/Instituicao/home-inst/home-inst.component';
//-----------------------------------


//jogos

import { MiopiaInstructionsComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-instructions/miopia-instructions.component';
import { MiopiaGameComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-game.component';
import { MiopiaResultComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-result/miopia-result.component';

import { ContatoComponent } from './Pages/Contato/contato.component';
import { AuthGuard } from './guards/user-authenticated.guard';

export const routes: Routes = [
  {path: '', component: EntrarComponent},

  {path: 'contato', component: ContatoComponent},

  {path: 'login-pais', component: LoginPaisComponent},
  {path: 'cadastro-pais', component: CadastroPaisComponent},

  {path: 'login-inst', component: LoginInstComponent},
  {path: 'cadastro-inst', component: CadastroInstComponent},

  {path: 'admin-contato', component: AdminContatoComponent},

  {path: 'opc-entrar', component: OpcEntrarComponent},

  {path: 'esquecer-senha', component: EsquecerSenhaComponent},

  {path: 'home-inst', component: HomeInstComponent},

  {path: 'jogos/miopia/instrucoes', component: MiopiaInstructionsComponent, canActivate: [AuthGuard]},
  {path: 'jogos/miopia', component: MiopiaGameComponent , canActivate: [AuthGuard]},
  {path: 'jogos/miopia/result', component: MiopiaResultComponent, canActivate: [AuthGuard]},

  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];
