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
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      children: [
        { title: 'Visão geral do sistema', icon: 'insights' },
        { title: 'Indicadores principais', icon: 'bar_chart' },
        { title: 'Acesso rápido às ações', icon: 'bolt' }
      ]
    },
    {
      title: 'Acesso',
      icon: 'lock',
      route: '/acesso',
      children: [
        { title: 'Login', icon: 'login' },
        { title: 'Logout', icon: 'logout' },
        { title: 'Senha', icon: 'vpn_key' },
        { title: 'Usuário', icon: 'person' }
      ]
    },
    {
      title: 'Tabelas',
      icon: 'table_chart',
      route: '/tabelas',
      children: [
        { title: 'Pacientes', icon: 'people', route: '/pacientes' },
        { title: 'Funcionários', icon: 'badge', route: '/funcionarios' },
        { title: 'Clínicas', icon: 'local_hospital' },
        { title: 'Topografias', icon: 'map' },
        { title: 'Morfologias', icon: 'category' },
        { title: 'Materiais para codificação', icon: 'inventory' },
        { title: 'Diagnósticos para codificação', icon: 'healing' },
        { title: 'Colorações', icon: 'color_lens', route: '/coloracoes', subChildren: [
            { title: 'Tipo', icon: 'category', route: '/coloracoes/tipo' },
            { title: 'Coloração', icon: 'color_lens', route: '/coloracoes/coloracao' }
          ]
        },
        { title: 'Faturamento', icon: 'request_quote' },
        { 
          title: 'Anticorpos - Painel', 
          icon: 'science', 
          route: '/anticorpos', 
          subChildren: [
            { title: 'Tipo', icon: 'category', route: '/anticorpos/tipo' },
            { title: 'Fornecedor', icon: 'store', route: '/anticorpos/fornecedor' },
            { title: 'Anticorpo', icon: 'science', route: '/anticorpos/anticorpo' },
            { title: 'Painel', icon: 'dashboard', route: '/anticorpos/painel' }
          ]  
        },
        { title: 'Tabela TNM', icon: 'assessment', route: '/tabela-tnm', subChildren: [
            { title: 'Grupo', icon: 'category', route: '/tabela-tnm/tipo' },
            { title: 'Subgrupo', icon: 'label', route: '/tabela-tnm/categoria' },
            { title: 'CID', icon: 'timeline', route: '/tabela-tnm/cid' },
            { title: 'TNM', icon: 'timeline', route: '/tabela-tnm/tnm' },
            { title: 'Estádio', icon: 'timeline', route: '/estadios' },
            { title: 'CID x TNM', icon: 'timeline', route: '/tabela-tnm/cid-tnm' }
          ]
        },
        { title: 'Solicitantes', icon: 'assignment_ind' }
      ]
    },
    {
      title: 'Exames',
      icon: 'assignment',
      route: '/exames',
      children: [
        { title: 'Cadastros', icon: 'add_box' },
        { title: 'Incluir nova peça', icon: 'post_add' },
        { title: 'Auditoria', icon: 'rule' },
        { title: 'Assinatura', icon: 'edit_note' },
        { title: 'Verificar exames liberados', icon: 'check_circle' }
      ]
    },
    {
      title: 'Técnica',
      icon: 'build',
      route: '/tecnica',
      children: [
        { title: 'Distribuição de blocos', icon: 'view_module' },
        { title: 'Liberação de lâminas', icon: 'flip' },
        { title: 'Relatório de produtividade', icon: 'assessment' }
      ]
    },
    {
      title: 'Imuno-Histoquímica',
      icon: 'science',
      route: '/imuno',
      children: [
        { title: 'Solicitação internas', icon: 'inbox' },
        { title: 'Solicitação externas', icon: 'outbox' },
        { title: 'Controle', icon: 'tune' },
        { title: 'Relatórios', icon: 'description' }
      ]
    },
    {
      title: 'Codificação',
      icon: 'edit',
      route: '/codificacao',
      children: [
        { title: 'Histopatológicos', icon: 'description' },
        { title: 'Citopatológicos', icon: 'fact_check' },
        { title: 'Conferência', icon: 'rule' },
        { title: 'Estatística', icon: 'insert_chart' }
      ]
    },
    {
      title: 'Consulta',
      icon: 'search',
      route: '/consulta',
      children: [
        { title: 'Exames do paciente', icon: 'person_search' },
        { title: 'Receptores', icon: 'hub' },
        { title: 'Consulta por texto', icon: 'text_snippet' }
      ]
    },
    {
      title: 'Relatórios',
      icon: 'bar_chart',
      route: '/relatorios',
      children: [
        { title: 'Histopatológicos', icon: 'description' },
        { title: 'Citopatológicos', icon: 'analytics' },
        { title: 'Por clínica', icon: 'local_hospital' },
        { title: 'Pendentes', icon: 'pending_actions' }
      ]
    },
    {
      title: 'Gerenciais',
      icon: 'analytics',
      route: '/gerenciais',
      children: [
        { title: 'Estatística por clínica', icon: 'bar_chart' },
        { title: 'Produtividade', icon: 'speed' },
        { title: 'Auditoria faturamento', icon: 'rule' }
      ]
    },
    {
      title: 'Utilitários',
      icon: 'settings',
      route: '/utilitarios',
      children: [
        { title: 'Etiquetas', icon: 'print' },
        { title: 'Exportação SISCOLO', icon: 'file_upload' },
        { title: 'Unidade', icon: 'business' }
      ]
    }
  ];
}