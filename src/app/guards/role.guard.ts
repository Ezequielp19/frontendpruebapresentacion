import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertasService } from '../services/alertas.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertasService: AlertasService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles && !expectedRoles.includes(user.role)) {
      this.alertasService.showError('Acceso Denegado', 'No tienes permisos para acceder a esta sección');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
