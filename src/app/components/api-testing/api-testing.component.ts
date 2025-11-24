import { Component, OnInit } from '@angular/core';
import { ApiTestingService, TestResult } from '../../services/api-testing.service';

@Component({
  selector: 'app-api-testing',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3>🧪 API Testing Dashboard</h3>
          <p class="mb-0">Testing completo de todos los endpoints del backend</p>
        </div>

        <div class="card-body">
          <div class="mb-3">
            <button
              class="btn btn-lg btn-success"
              (click)="runTests()"
              [disabled]="isRunning">
              <span *ngIf="!isRunning">▶️ Ejecutar Tests</span>
              <span *ngIf="isRunning">
                <span class="spinner-border spinner-border-sm me-2"></span>
                Ejecutando...
              </span>
            </button>
          </div>

          <!-- Resumen -->
          <div *ngIf="summary" class="row mb-4">
            <div class="col-md-3">
              <div class="card border-primary">
                <div class="card-body text-center">
                  <h5>Total Tests</h5>
                  <h2 class="text-primary">{{ summary.total }}</h2>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-success">
                <div class="card-body text-center">
                  <h5>✅ Exitosos</h5>
                  <h2 class="text-success">{{ summary.success }}</h2>
                  <small>{{ summary.successRate }}</small>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-warning">
                <div class="card-body text-center">
                  <h5>⚠️ Advertencias</h5>
                  <h2 class="text-warning">{{ summary.warnings }}</h2>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-danger">
                <div class="card-body text-center">
                  <h5>❌ Errores</h5>
                  <h2 class="text-danger">{{ summary.errors }}</h2>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabla de resultados -->
          <div *ngIf="results.length > 0" class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>Estado</th>
                  <th>Servicio</th>
                  <th>Endpoint</th>
                  <th>Método</th>
                  <th>Auth</th>
                  <th>Código</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let result of results"
                    [class.table-success]="result.status === 'success'"
                    [class.table-warning]="result.status === 'warning'"
                    [class.table-danger]="result.status === 'error'">
                  <td>
                    <span *ngIf="result.status === 'success'">✅</span>
                    <span *ngIf="result.status === 'warning'">⚠️</span>
                    <span *ngIf="result.status === 'error'">❌</span>
                  </td>
                  <td><strong>{{ result.service }}</strong></td>
                  <td><code>{{ result.endpoint }}</code></td>
                  <td>
                    <span class="badge"
                          [class.bg-success]="result.method === 'GET'"
                          [class.bg-primary]="result.method === 'POST'"
                          [class.bg-warning]="result.method === 'PUT'"
                          [class.bg-danger]="result.method === 'DELETE'">
                      {{ result.method }}
                    </span>
                  </td>
                  <td>
                    <span *ngIf="result.requiresAuth" class="badge bg-info">🔒 Sí</span>
                    <span *ngIf="!result.requiresAuth" class="badge bg-secondary">🌐 No</span>
                  </td>
                  <td>
                    <span class="badge"
                          [class.bg-success]="(result.statusCode || 0) >= 200 && (result.statusCode || 0) < 300"
                          [class.bg-warning]="(result.statusCode || 0) >= 400 && (result.statusCode || 0) < 500"
                          [class.bg-danger]="(result.statusCode || 0) >= 500">
                      {{ result.statusCode || 'N/A' }}
                    </span>
                  </td>
                  <td>{{ result.message }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mensaje inicial -->
          <div *ngIf="results.length === 0 && !isRunning" class="alert alert-info">
            👆 Haz clic en "Ejecutar Tests" para comenzar el testing de la API
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .table-responsive {
      max-height: 600px;
      overflow-y: auto;
    }

    code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
    }
  `]
})
export class ApiTestingComponent implements OnInit {
  results: TestResult[] = [];
  summary: any = null;
  isRunning = false;

  constructor(private apiTestingService: ApiTestingService) {}

  ngOnInit(): void {
    console.log('🎯 Componente de testing inicializado');
  }

  runTests(): void {
    this.isRunning = true;
    this.results = [];
    this.summary = null;

    console.log('🚀 Iniciando tests...');

    this.apiTestingService.runAllTests().subscribe({
      next: (results: TestResult[]) => {
        this.results = results;
        this.summary = this.apiTestingService.getSummary();
        this.isRunning = false;
        console.log('✅ Tests completados');
        console.log('📊 Resumen:', this.summary);
      },
      error: (error: any) => {
        console.error('❌ Error al ejecutar tests:', error);
        this.isRunning = false;
      }
    });
  }
}
