import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calificaciones-modal',
  templateUrl: './calificaciones-modal.component.html',
  styleUrls: ['./calificaciones-modal.component.scss']
})
export class CalificacionesModalComponent implements OnInit {
  
  calificaciones: any[] = [];
  promedio: number = 0;
  total: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CalificacionesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.calificaciones = data.calificaciones || [];
    this.promedio = data.promedio || 0;
    this.total = data.total || 0;
  }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}

