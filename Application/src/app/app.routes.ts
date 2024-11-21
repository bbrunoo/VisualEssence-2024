import { DaltoNumerosInstComponent } from './Pages/Jogos/Daltonismo-numeros-inst/dalto-numeros-inst/dalto-numeros-inst.component';
import { DaltoNumerosInstInstrucaoComponent } from './Pages/Jogos/Daltonismo-numeros-inst/dalto-numeros-inst-instrucao/dalto-numeros-inst-instrucao.component';
import { DaltoNumerosInstResultadoComponent } from './Pages/Jogos/Daltonismo-numeros-inst/dalto-numeros-inst-resultado/dalto-numeros-inst-resultado.component';
import { DoePageComponent } from './Pages/PaisHome/doe-page/doe-page.component';
import { DoeInfoComponent } from './Pages/PaisHome/doe-info/doe-info.component';
import { Routes } from '@angular/router';

import { LoginPaisComponent } from './Pages/Conta/login-pais/login-pais.component';
import { CadastroPaisComponent } from './Pages/Conta/cadastro-pais/cadastro-pais.component';

import { LoginInstComponent } from './Pages/Conta/login-inst/login-inst.component';
import { CadastroInstComponent } from './Pages/Conta/cadastro-inst/cadastro-inst.component';

import { OpcEntrarComponent } from './Pages/Conta/opc-entrar/opc-entrar.component';

import { ImageUploadComponent } from './Pages/Instituicao/image-upload/image-upload.component';

import { SobreNosComponent } from './Pages/PaisHome/sobre-nos/sobre-nos.component';
import { PainelEducativoComponent } from './Pages/PaisHome/painel-educativo/painel-educativo.component';

import { AdminContatoComponent } from './Pages/admin-contato/admin-contato.component';

import { HomeInstComponent } from './Pages/Instituicao/home-inst/home-inst.component';
import { CriarSalaComponent } from './Pages/Instituicao/criar-sala/criar-sala.component';
import { OpcCadastComponent } from './Pages/Instituicao/opc-cadast/opc-cadast.component';
import { CadastUniComponent } from './Pages/Instituicao/cadast-uni/cadast-uni.component';
import { CadastMassaComponent } from './Pages/Instituicao/cadast-massa/cadast-massa.component';
import { CadastrosComponent } from './Pages/Instituicao/cadastros/cadastros.component';
import { DadCadastComponent } from './Pages/Instituicao/dad-cadast/dad-cadast.component';
import { EdtDadComponent } from './Pages/Instituicao/edt-dad/edt-dad.component';

import { HomeGameSectionComponent } from './Pages/Instituicao/01-Jogos-Instituicao/home-game-section/home-game-section.component';

import { HomeComponent } from './Pages/PaisHome/home/home.component';

//jogos
import { CadastroCriancaInstComponent } from './Pages/Jogos/cadastro-crianca-inst/cadastro-crianca-inst.component';
import { CadastroCriancaPaisComponent } from './Pages/Jogos/cadastro-crianca-pais/cadastro-crianca-pais.component';

//pais
//miopia
import { MiopiaInstructionsComponent } from './Pages/Jogos/Miopia/miopia-instructions/miopia-instructions.component';
import { MiopiaGameComponent } from './Pages/Jogos/Miopia/miopia-game/miopia-game.component';
import { MiopiaResultComponent } from './Pages/Jogos/Miopia/miopia-result/miopia-result.component';

//miopia-letras
import { MiopiaLetrasCadastroPaisComponent } from './Pages/Jogos/Miopia-Letras-Pais/miopia-letras-cadastro-pais/miopia-letras-cadastro-pais.component';
import { MiopiaLetrasPaisInstrucaoComponent } from './Pages/Jogos/Miopia-Letras-Pais/miopia-letras-pais-instrucao/miopia-letras-pais-instrucao.component';
import { MiopiaLetrasPaisResultadoComponent } from './Pages/Jogos/Miopia-Letras-Pais/miopia-letras-pais-resultado/miopia-letras-pais-resultado.component';
import { MiopiaLetrasPaisComponent } from './Pages/Jogos/Miopia-Letras-Pais/miopia-letras-pais/miopia-letras-pais.component';

//instituicao
//miopia
import { MiopiaInstComponent } from './Pages/Jogos/MiopiaInst/miopia-inst/miopia-inst.component';
import { MiopiaInstResultComponent } from './Pages/Jogos/MiopiaInst/miopia-inst-result/miopia-inst-result.component';
import { MiopiaInstInstrucoesComponent } from './Pages/Jogos/MiopiaInst/miopia-inst-instrucoes/miopia-inst-instrucoes.component';

//instituicao
//daltonismo
import { DaltoAnimaisInstComponent } from './Pages/Jogos/Daltonismo-animais-inst/dalto-animais-inst/dalto-animais-inst.component';

import { ContatoComponent } from './Pages/Contato/contato.component';
import { AuthGuard } from './guards/user-authenticated.guard';
import { HistoricoComponent } from './Pages/Instituicao/historico/historico.component';
import { HistoricoPaisComponent } from './Pages/PaisHome/historico-pais/historico-pais.component';
import { OpcoesDaltonismoComponent } from './Pages/PaisHome/opcoes-daltonismo/opcoes-daltonismo.component';
import { OpcoesMiopiaComponent } from './Pages/PaisHome/opcoes-miopia/opcoes-miopia.component';
import { OpcoesDaltonismoInstComponent } from './Pages/Instituicao/opcoes-daltonismo-inst/opcoes-daltonismo-inst.component';
import { OpcoesMiopiaInstComponent } from './Pages/Instituicao/opcoes-miopia-inst/opcoes-miopia-inst.component';
import { MiopiaLetrasInstInstrucaoComponent } from './Pages/Jogos/Miopia-Letras-Inst/miopia-letras-inst-instrucao/miopia-letras-inst-instrucao.component';
import { MiopiaLetrasCadastroInstComponent } from './Pages/Jogos/Miopia-Letras-Inst/miopia-letras-cadastro-inst/miopia-letras-cadastro-inst.component';
import { MiopiaLetrasInstComponent } from './Pages/Jogos/Miopia-Letras-Inst/miopia-letras-inst/miopia-letras-inst.component';
import { MiopiaLetrasInstResultadoComponent } from './Pages/Jogos/Miopia-Letras-Inst/miopia-letras-inst-resultado/miopia-letras-inst-resultado.component';
import { CriancasCadastradasSalaComponent } from './Pages/Instituicao/criancas-cadastradas-sala/criancas-cadastradas-sala.component';
import { HistoricoDetalhadoComponent } from './Pages/Instituicao/historico-detalhado/historico-detalhado.component';
import { DaltoAnimaisInstInstrucoesComponent } from './Pages/Jogos/Daltonismo-animais-inst/dalto-animais-inst-instrucoes/dalto-animais-inst-instrucoes.component';
import { DaltoAnimaisInstResultComponent } from './Pages/Jogos/Daltonismo-animais-inst/dalto-animais-inst-result/dalto-animais-inst-result.component';
import { DaltoAnimaisInstCadastroComponent } from './Pages/Jogos/Daltonismo-animais-inst/dalto-animais-inst-cadastro/dalto-animais-inst-cadastro.component';
import { DaltoAnimaisPaisCadastroComponent } from './Pages/Jogos/Daltonismo-animais-pais/dalto-animais-pais-cadastro/dalto-animais-pais-cadastro.component';
import { DaltoAnimaisPaisResultadoComponent } from './Pages/Jogos/Daltonismo-animais-pais/dalto-animais-pais-resultado/dalto-animais-pais-resultado.component';
import { DaltoAnimaisPaisComponent } from './Pages/Jogos/Daltonismo-animais-pais/dalto-animais-pais/dalto-animais-pais.component';
import { DaltoAnimaisPaisInstrucaoComponent } from './Pages/Jogos/Daltonismo-animais-pais/dalto-animais-pais-instrucao/dalto-animais-pais-instrucao.component';
import { DaltoNumerosInstCadastroComponent } from './Pages/Jogos/Daltonismo-numeros-inst/dalto-numeros-inst-cadastro/dalto-numeros-inst-cadastro.component';
import { DaltoNumPaisComponent } from './Pages/Jogos/Daltonismo-numeros-pais/dalto-num-pais/dalto-num-pais.component';
import { DaltoNumPaisResultadoComponent } from './Pages/Jogos/Daltonismo-numeros-pais/dalto-num-pais-resultado/dalto-num-pais-resultado.component';
import { DaltoNumPaisCadastroComponent } from './Pages/Jogos/Daltonismo-numeros-pais/dalto-num-pais-cadastro/dalto-num-pais-cadastro.component';
import { DaltoNumPaisInstrucaoComponent } from './Pages/Jogos/Daltonismo-numeros-pais/dalto-num-pais-instrucao/dalto-num-pais-instrucao.component';


export const routes: Routes = [
  { path: 'opc-entrar', component: OpcEntrarComponent },
  { path: '', component: OpcEntrarComponent },

  { path: 'contato', component: ContatoComponent },

  { path: 'login-pais', component: LoginPaisComponent },
  { path: 'cadastro-pais', component: CadastroPaisComponent },
  { path: 'instituicao/imagem', component: ImageUploadComponent, canActivate: [AuthGuard] },

  { path: 'login-inst', component: LoginInstComponent },
  { path: 'cadastro-inst', component: CadastroInstComponent },

  { path: 'admin-contato', component: AdminContatoComponent },

  { path: 'doe-info', component: DoeInfoComponent },

  { path: 'Pais/Home', component: HomeComponent },
  { path: 'Pais/Painel-Educativo', component: PainelEducativoComponent },
  { path: 'Pais/Sobre-nos', component: SobreNosComponent },
  { path: 'Pais/Jogos/Historico', component: HistoricoPaisComponent },
  { path: 'Pais/Jogos/Opcoes-Daltonismo', component: OpcoesDaltonismoComponent },
  { path: 'Pais/Jogos/Opcoes-Miopia', component: OpcoesMiopiaComponent },
  { path: 'Pais/Doe', component: DoePageComponent },

  { path: 'instituicao/home', component: HomeInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/criar-sala', component: CriarSalaComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/detalhes/:id', component: HistoricoDetalhadoComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/criancas-cadastradas/:id', component: CriancasCadastradasSalaComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/opcao-cadastro', component: OpcCadastComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/cadastro-unico', component: CadastUniComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/cadastro-massa', component: CadastMassaComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/cadastros', component: CadastrosComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/dados-cadastro/:id', component: DadCadastComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/editar-dados/:id', component: EdtDadComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos', component: HomeGameSectionComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/opcoes-daltonismo', component: OpcoesDaltonismoInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/opcoes-miopia', component: OpcoesMiopiaInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/historico', component: HistoricoComponent, canActivate: [AuthGuard] },

  { path: 'instituicao/jogos/cadastrar-crianca-inst', component: CadastroCriancaInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/miopia/instrucoes', component: MiopiaInstInstrucoesComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/miopia', component: MiopiaInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/miopia/result', component: MiopiaInstResultComponent, canActivate: [AuthGuard] },

  { path: 'instituicao/jogos/daltonismo-animais/cadastro', component: DaltoAnimaisInstCadastroComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-animais', component: DaltoAnimaisInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-animais/instrucao', component: DaltoAnimaisInstInstrucoesComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-animais/resultado', component: DaltoAnimaisInstResultComponent, canActivate: [AuthGuard] },

  { path: 'instituicao/jogos/daltonismo-numeros/cadastro', component: DaltoNumerosInstCadastroComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-numeros', component: DaltoNumerosInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-numeros/instrucao', component: DaltoNumerosInstInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/daltonismo-numeros/resultado', component: DaltoNumerosInstResultadoComponent, canActivate: [AuthGuard] },

  { path: 'instituicao/jogos/letras/instrucoes', component: MiopiaLetrasInstInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras-cadastro', component: MiopiaLetrasCadastroInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras', component: MiopiaLetrasInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras/result', component: MiopiaLetrasInstResultadoComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/miopia/instrucoes', component: MiopiaInstructionsComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/miopia', component: MiopiaGameComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/miopia/result', component: MiopiaResultComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/cadastrar-crianca-pais', component: CadastroCriancaPaisComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/letras-cadastro', component: MiopiaLetrasCadastroPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras/instrucoes', component: MiopiaLetrasPaisInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras', component: MiopiaLetrasPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras/result', component: MiopiaLetrasPaisResultadoComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/daltonismo-animais/instrucoes', component: DaltoAnimaisPaisInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-animais', component: DaltoAnimaisPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-animais/resultado', component: DaltoAnimaisPaisResultadoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-animais/cadastro', component: DaltoAnimaisPaisCadastroComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/daltonismo-numeros/instrucoes', component: DaltoNumPaisInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-numeros', component: DaltoNumPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-numeros/resultado', component: DaltoNumPaisResultadoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/daltonismo-numeros/cadastro', component: DaltoNumPaisCadastroComponent, canActivate: [AuthGuard] },
];
