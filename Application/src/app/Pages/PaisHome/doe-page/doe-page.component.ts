import { Component } from '@angular/core';
import { LogoMenuComponent } from "../../SharedMenu/logo-menu/logo-menu.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VlibrasComponent } from "../../vlibras/vlibras.component";
import { ChatBotComponent } from "../../chat-bot-conteudo/chat-bot/chat-bot.component";
import { ChatBotIconeComponent } from "../../chat-bot-conteudo/chat-bot-icone/chat-bot-icone.component";

@Component({
  selector: 'app-doe-page',
  standalone: true,
  imports: [LogoMenuComponent, NgFor, CommonModule, VlibrasComponent, ChatBotIconeComponent],
  templateUrl: './doe-page.component.html',
  styleUrl: './doe-page.component.css'
})
export class DoePageComponent {
  conteudos = [
    {
      titulo: 'Renovatio',
      descricao: `Localizada em São Paulo, que visa trazer saúde visual e doação de óculos de grau
        para aqueles que mais precisam. Com um ônibus adaptado, transformado em duas clínicas oftalmológicas,
        viajam o Brasil levando atendimento oftalmológico de qualidade e distribuição de óculos de grau totalmente
        gratuitos a comunidades carentes, escolas públicas, comunidades ribeirinhas entre outros, são mais de
        60 mil consultas realizadas e 55 mil óculos doados.`,
      link: 'https://www.renovatio.org.br/',
      imagem: '../../../../assets/PaginaDoe/Logo_Renovatio.png'
    },
    {
      titulo: 'Amdaf',
      descricao: `A AMDAF conta com uma equipe médica multidisciplinar,
      que prestam serviços de saúde em aldeias em locais de difícil acesso na Floresta Amazônica.
      Na área da oftalmologia, ela realiza consultas, exames, cirurgias de cataratas e pterígios,
      além de distribuir óculos. A associação conta com dois projetos específicos relacionados à saúde ocular,
      já foram mais de 2.500 pares distribuídos. `,
      link: 'https://amdaf.org/',
      imagem: '../../../../assets/PaginaDoe/Logo_Amdaf.png'
    },
    {
      titulo: 'Fundação Altino Ventura',
      descricao: `Atuando em Recife, a FAV tem como missão prestar assistência à saúde ocular,
      cirurgias, transplantes de córnea e reabilitação de pessoas de baixa renda.
      Ela também é credenciada ao SUS para prestar serviços médicos nas regiões Norte e Nordeste,
      além de ser considerada uma Unidade de Referência em Oftalmologia pelo Ministério da Saúde e
      possui um Centro Especializado em Reabilitação. `,
      link: 'https://www.fundacaoaltinoventura.org.br/ ',
      imagem: '../../../../assets/PaginaDoe/Logo_FuncacaoAltinoVentura.png'
    },
    {
      titulo: 'IPEPO',
      descricao: `Projeto Oftalmologia Humanitária- IPEPO Instituto da visão
      O Oftalmologia Humanitária, oferece atendimento oftalmológico gratuito à população no interior do Amazonas.
      Os voluntários atuam principalmente na prevenção e correção de catarata e pterígio, doenças com alta incidência
      em trabalhadores de lavoura devido à exposição a raios ultravioletas. Além das consultas e cirurgias,
      ainda realizam doações de óculos aos pacientes.`,
      link: 'https://www.institutodavisao.org.br/area-do-medico/oftalmologia-humanitaria-6/',
      imagem: '../../../../assets/PaginaDoe/Logo_IPEPO.png'
    },
  ];
}
