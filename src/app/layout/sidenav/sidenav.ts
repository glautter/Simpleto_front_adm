import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ChildItem {
  title: string;
  icon: string;
  route?: string;
  subChildren?: ChildItem[];
}

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  children?: ChildItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  @Input() collapsed = false;
  expandedItem: string | null = null;
  expandedChild: string | null = null; // ✅ NOVO: para controlar subChildren
  activeItem: string | null = null;
  activeChild: string | null = null;
  activeSubChild: string | null = null; // ✅ NOVO: para marcar subChild ativo

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.updateActive(this.router.url);
      }
    });
  }

  toggleExpand(title: string) {
    this.expandedItem = this.expandedItem === title ? null : title;
    // Reseta o child expandido ao trocar de item pai
    if (this.expandedItem !== title) {
      this.expandedChild = null;
    }
  }

  // ✅ NOVO: Toggle para subChildren
  toggleExpandChild(parentTitle: string, childTitle: string) {
    const key = `${parentTitle}-${childTitle}`;
    this.expandedChild = this.expandedChild === key ? null : key;
  }

  // ✅ NOVO: Verifica se um child está expandido
  isChildExpanded(parentTitle: string, childTitle: string): boolean {
    return this.expandedChild === `${parentTitle}-${childTitle}`;
  }

  updateActive(url: string) {
    // Reset
    this.activeItem = null;
    this.activeChild = null;
    this.activeSubChild = null;

    for (const item of this.menu) {
      // check parent route
      if (item.route && url.startsWith(item.route)) {
        this.activeItem = item.title;
        this.expandedItem = item.title;
      }

      // check children
      if (item.children) {
        for (const child of item.children) {
          // check child route
          if (child.route && url.startsWith(child.route)) {
            this.activeItem = item.title;
            this.activeChild = child.title;
            this.expandedItem = item.title;

            // Se o child não tem subChildren, já retorna
            if (!child.subChildren) {
              return;
            }
          }

          // ✅ NOVO: check subChildren routes
          if (child.subChildren) {
            for (const subChild of child.subChildren) {
              if (subChild.route && url.startsWith(subChild.route)) {
                this.activeItem = item.title;
                this.activeChild = child.title;
                this.activeSubChild = subChild.title;
                this.expandedItem = item.title;
                this.expandedChild = `${item.title}-${child.title}`;
                return;
              }
            }
          }
        }
      }
    }
  }

  isTextTruncated(event: MouseEvent): boolean {
    const element = event.target as HTMLElement;
    return element.offsetWidth < element.scrollWidth;
  }

  checkTooltip(event: MouseEvent, text: string) {
    const element = event.target as HTMLElement;
    if (element.offsetWidth < element.scrollWidth) {
      element.setAttribute('matTooltip', text);
    } else {
      element.removeAttribute('matTooltip');
    }
  }

  menu: MenuItem[] = [
  {
    title: 'Configurações e Cadastros Base',
    icon: 'settings',
    route: '/config',
    children: [
      {
        title: 'Plano de Contas',
        icon: 'list_alt',
        route: '/config/plano-contas'
      },
      {
        title: 'Taxas e Tarifas',
        icon: 'request_quote',
        route: '/config/taxas'
      },
      {
        title: 'Cadastro de Fornecedores',
        icon: 'store',
        route: '/config/fornecedores'
      },
      {
        title: 'Talões de Cheques',
        icon: 'receipt_long',
        route: '/config/cheques'
      }
    ]
  },
  {
    title: 'Gestão de Recebimentos e Rateio',
    icon: 'receipt_long',
    route: '/rateio',
    children: [
      {
        title: 'Rateio Mensal',
        icon: 'event_note',
        route: '/rateio/mensal'
      },
      {
        title: 'Programação de Rateio',
        icon: 'date_range',
        route: '/rateio/programacao'
      },
      {
        title: 'Rateio Avulso e Baixa Manual',
        icon: 'edit_note',
        route: '/rateio/avulso'
      }
    ]
  },
  {
    title: 'Contas a Pagar e Desembolsos',
    icon: 'payment',
    route: '/pagar',
    children: [
      {
        title: 'Contas a Pagar (Principal)',
        icon: 'account_balance_wallet',
        route: '/pagar/principal'
      },
      {
        title: 'Baixas e Cancelamentos',
        icon: 'cancel',
        route: '/pagar/baixas'
      },
      {
        title: 'Relatórios Financeiros',
        icon: 'bar_chart',
        route: '/pagar/relatorios'
      }
    ]
  },
  {
    title: 'Conciliação Bancária',
    icon: 'account_balance',
    route: '/conciliacao',
    children: [
      {
        title: 'Parametrização',
        icon: 'tune',
        route: '/conciliacao/parametros'
      },
      {
        title: 'Processamento de Arquivos',
        icon: 'file_upload',
        route: '/conciliacao/arquivos'
      },
      {
        title: 'Relatórios da Conciliação',
        icon: 'assessment',
        route: '/conciliacao/relatorios'
      }
    ]
  },
  {
    title: 'Controle de Serviços e Tarifas',
    icon: 'work',
    route: '/servicos',
    children: [
      {
        title: 'Gestão de Serviços',
        icon: 'engineering',
        route: '/servicos/gestao'
      },
      {
        title: 'Geração de Cobranças',
        icon: 'request_page',
        route: '/servicos/cobranca'
      },
      {
        title: 'Repasse e Impressão',
        icon: 'print',
        route: '/servicos/repasses'
      }
    ]
  },
  {
    title: 'Cobrança de Inadimplência',
    icon: 'gavel',
    route: '/cobranca',
    children: [
      {
        title: 'Cobrança Geral',
        icon: 'summarize',
        route: '/cobranca/geral'
      },
      {
        title: 'Gestão de Acordos',
        icon: 'handshake',
        route: '/cobranca/acordos'
      },
      {
        title: 'Carta de Cobrança',
        icon: 'mail',
        route: '/cobranca/cartas'
      }
    ]
  },
  {
    title: 'Orçamento',
    icon: 'trending_up',
    route: '/orcamento',
    children: [
      {
        title: 'Previsão Orçamentária',
        icon: 'calculate',
        route: '/orcamento/previsao'
      },
      {
        title: 'Manutenção de Valores',
        icon: 'tune',
        route: '/orcamento/manutencao'
      },
      {
        title: 'Impressão de Relatórios',
        icon: 'print',
        route: '/orcamento/relatorios'
      }
    ]
  },
  {
    title: 'Fechamento e Prestação de Contas',
    icon: 'folder_shared',
    route: '/fechamento',
    children: [
      {
        title: 'Fechamento de Contas',
        icon: 'assignment_turned_in',
        route: '/fechamento/processamento'
      },
      {
        title: 'Pasta Digital',
        icon: 'folder',
        route: '/fechamento/pasta'
      }
    ]
  }
];

}