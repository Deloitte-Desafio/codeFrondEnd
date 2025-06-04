import { Component, OnInit } from '@angular/core';
import { ServicoService, Servico } from '../../../../../core/services/servico/servico.service';
import { UserService } from '../../../../../core/services/User/user.service';
import { User } from '../../../../../models/user.module';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-servicos',
  standalone: true,
  templateUrl: './listar-servicos.component.html',
  styleUrls: ['./listar-servicos.component.css'],
  imports: [CommonModule]

})
export class ListarServicosComponent implements OnInit {
  servicos: Servico[] = [];
  profissionais: User[] = [];

  constructor(
    private servicoService: ServicoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    forkJoin({
      servicos: this.servicoService.getServicos(),
      users: this.userService.getUsers()
    }).subscribe({
      next: ({ servicos, users }) => {
        this.profissionais = users.filter(u => u.tipoUsuario === 'PROFISSIONAL');

        this.servicos = servicos.map(servico => ({
          ...servico,
          nomeProfissional: this.getNomeProfissional(servico.profissionalId)
        }));
      }
    });
  }

  getNomeProfissional(id: number): string {
    const profissional = this.profissionais.find(p => p.id === id);
    return profissional ? profissional.nome : 'Profissional não encontrado';
  }
}
