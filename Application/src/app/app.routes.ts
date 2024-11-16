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

//figurascoloridas
import { FigurasColoridasComponent } from './Pages/Jogos/FigurasColoridas/figuras-coloridas/figuras-coloridas.component';
import { FigurasColoridasInstrucoesComponent } from './Pages/Jogos/FigurasColoridas/figuras-coloridas-instrucoes/figuras-coloridas-instrucoes.component';
import { FigurasColoridasResultComponent } from './Pages/Jogos/FigurasColoridas/figuras-coloridas-result/figuras-coloridas-result.component';
import { CadastroCriancaFigurasComponent } from './Pages/Jogos/FigurasColoridas/cadastro-crianca-figuras/cadastro-crianca-figuras.component';

//instituicao
//miopia
import { MiopiaInstComponent } from './Pages/Jogos/MiopiaInst/miopia-inst/miopia-inst.component';
import { MiopiaInstResultComponent } from './Pages/Jogos/MiopiaInst/miopia-inst-result/miopia-inst-result.component';
import { MiopiaInstInstrucoesComponent } from './Pages/Jogos/MiopiaInst/miopia-inst-instrucoes/miopia-inst-instrucoes.component';

//figurascoloridas
import { FigurasColoridasInstComponent } from './Pages/Jogos/FigurasColoridasInst/figuras-coloridas-inst/figuras-coloridas-inst.component';
import { FigurasColoridasInstInstrucoesComponent } from './Pages/Jogos/FigurasColoridasInst/figuras-coloridas-inst-instrucoes/figuras-coloridas-inst-instrucoes.component';
import { FigurasColoridasInstResultComponent } from './Pages/Jogos/FigurasColoridasInst/figuras-coloridas-inst-result/figuras-coloridas-inst-result.component';
import { CadastroCriancasInstFigurasComponent } from './Pages/Jogos/FigurasColoridasInst/cadastro-criancas-inst-figuras/cadastro-criancas-inst-figuras.component';

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

  { path: 'instituicao/jogos/cadastrar-crianca-figuras', component: CadastroCriancasInstFigurasComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/figuras-coloridas/instrucoes', component: FigurasColoridasInstInstrucoesComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/figuras-coloridas', component: FigurasColoridasInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/figuras-coloridas/result', component: FigurasColoridasInstResultComponent, canActivate: [AuthGuard] },

  { path: 'instituicao/jogos/letras/instrucoes', component: MiopiaLetrasInstInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras-cadastro', component: MiopiaLetrasCadastroInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras', component: MiopiaLetrasInstComponent, canActivate: [AuthGuard] },
  { path: 'instituicao/jogos/letras/result', component: MiopiaLetrasInstResultadoComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/miopia/instrucoes', component: MiopiaInstructionsComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/miopia', component: MiopiaGameComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/miopia/result', component: MiopiaResultComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/cadastrar-crianca-pais', component: CadastroCriancaPaisComponent, canActivate: [AuthGuard] },

  { path: 'Pais/jogos/cadastrar-crianca-figuras', component: CadastroCriancaFigurasComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/figuras-coloridas/instrucoes', component: FigurasColoridasInstrucoesComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/figuras-coloridas', component: FigurasColoridasComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/figuras-coloridas/result', component: FigurasColoridasResultComponent },

  { path: 'Pais/jogos/letras-cadastro', component: MiopiaLetrasCadastroPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras/instrucoes', component: MiopiaLetrasPaisInstrucaoComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras', component: MiopiaLetrasPaisComponent, canActivate: [AuthGuard] },
  { path: 'Pais/jogos/letras/result', component: MiopiaLetrasPaisResultadoComponent, canActivate: [AuthGuard] },


];
