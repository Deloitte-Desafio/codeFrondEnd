import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../../models/servico.model';
import { UserServicesService } from '../services/user-services.service';
import { UserResponse } from '../../models/user.model';
import { forkJoin } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-servicos',
  templateUrl: './listar-servicos.component.html',
  styleUrl: './listar-servicos.component.css',
  imports: [NgFor,RouterLink]
})
export class ListarServicosComponent implements OnInit {
  servicos: Servico[] = [];
  profissionais: UserResponse[] = [];

  constructor(
    private servicoService: ServicoService,
    private profissionalService: UserServicesService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    forkJoin({
      servicos: this.servicoService.getServicos(),
      profissionais: this.profissionalService.getUsers()
    }).subscribe({
      next: ({ servicos, profissionais }) => {
        this.profissionais = profissionais;

        this.servicos = servicos.map(servico => ({
          ...servico,
          nomeProfissional: this.getNomeProfissional(servico.profissionalId)
        }));
      }
    });
  }

  getNomeProfissional(id: number): string {
    const prof = this.profissionais.find(p => p.id === id);
    return prof ? prof.nome : 'Profissional não encontrado';
  }
}
