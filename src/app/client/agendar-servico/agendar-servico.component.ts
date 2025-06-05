import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AgendamentoService } from '../services/agendamento.service';
import { AuthService } from '../../../app/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendar-servico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agendar-servico.component.html',
  styleUrls: ['./agendar-servico.component.css']
})
export class AgendarServicoComponent implements OnInit {
  form!: FormGroup;
  clienteId!: number;
  servicoId!: number;
  profissionalId!: number;
  errorMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dataHoraInicio: ['', Validators.required],
      dataHoraFim: ['', Validators.required]
    });

    const servicoIdParam = this.route.snapshot.paramMap.get('servicoId');
    const profissionalIdParam = this.route.snapshot.queryParamMap.get('profissionalId');

    this.servicoId = servicoIdParam ? Number(servicoIdParam) : 0;
    this.profissionalId = profissionalIdParam ? Number(profissionalIdParam) : 0;

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.clienteId = user.id;
      },
      error: (err) => {
        console.error('Erro ao obter o usuário:', err);
        this.errorMessage = 'Erro ao carregar informações do usuário.';
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }

    const agendamento = {
      clienteId: this.clienteId,
      servicoId: this.servicoId,
      profissionalId: this.profissionalId,
      dataHoraInicio: this.form.value.dataHoraInicio,
      dataHoraFim: this.form.value.dataHoraFim
    };

    this.errorMessage = null; 
    this.agendamentoService.criarAgendamento(agendamento).subscribe({
      next: () => {
        alert('Agendamento realizado com sucesso!');
        this.router.navigate(['/client/dash']); 
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao realizar o agendamento. Tente novamente.';
        console.error('Erro ao agendar:', err);
      }
    });
  }
}