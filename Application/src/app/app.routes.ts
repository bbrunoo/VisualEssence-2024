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
//------------------------------------------------------------------------------------

import { HomeInstComponent } from './Pages/Instituicao/home-inst/home-inst.component';
import { CriarSalaComponent } from './Pages/Instituicao/criar-sala/criar-sala.component';
import { OpcCadastComponent } from './Pages/Instituicao/opc-cadast/opc-cadast.component';
import { CadastUniComponent } from './Pages/Instituicao/cadast-uni/cadast-uni.component';
import { CadastMassaComponent } from './Pages/Instituicao/cadast-massa/cadast-massa.component';
import { CadastrosComponent } from './Pages/Instituicao/cadastros/cadastros.component';
import { DadCadastComponent } from './Pages/Instituicao/dad-cadast/dad-cadast.component';
import { EdtDadComponent } from './Pages/Instituicao/edt-dad/edt-dad.component';


//jogos

import { MiopiaInstructionsComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-instructions/miopia-instructions.component';
import { MiopiaGameComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-game.component';
import { MiopiaResultComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-result/miopia-result.component';

import { ContatoComponent } from './Pages/Contato/contato.component';
import { AuthGuard } from './guards/user-authenticated.guard';

export const routes: Routes = [
  {path: 'entrar', component: EntrarComponent},

  {path: 'contato', component: ContatoComponent},

  {path: 'login-pais', component: LoginPaisComponent},
  {path: 'cadastro-pais', component: CadastroPaisComponent},

  {path: 'login-inst', component: LoginInstComponent},
  {path: 'cadastro-inst', component: CadastroInstComponent},

  {path: 'admin-contato', component: AdminContatoComponent},

  {path: 'opc-entrar', component: OpcEntrarComponent},

  {path: 'esquecer-senha', component: EsquecerSenhaComponent},

  {path: '', component: HomeInstComponent},
  {path: 'criar-sala', component: CriarSalaComponent},
  {path: 'opc-cadast', component: OpcCadastComponent},
  {path: 'cadast-uni', component: CadastUniComponent},
  {path: 'cadast-massa', component: CadastMassaComponent},
  {path: 'cadastros', component: CadastrosComponent},
  {path: 'dad-cadast', component: DadCadastComponent},
  {path: 'edt-dad', component: EdtDadComponent},

  {path: 'jogos/miopia/instrucoes', component: MiopiaInstructionsComponent, canActivate: [AuthGuard]},
  {path: 'jogos/miopia', component: MiopiaGameComponent , canActivate: [AuthGuard]},
  {path: 'jogos/miopia/result', component: MiopiaResultComponent, canActivate: [AuthGuard]},

  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];
