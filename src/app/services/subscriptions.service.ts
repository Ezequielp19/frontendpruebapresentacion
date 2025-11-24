import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  active: boolean;
}

export interface PlansResponse {
  plans: SubscriptionPlan[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface MySubscriptionResponse {
  subscription: Subscription;
}

export interface SubscribeRequest {
  planId: string;
  paymentMethodId: string;
}

export interface ChangePlanRequest {
  newPlanId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl = `${environment.apiUrl}/subscription`;

  constructor(private http: HttpClient) { }

  // GET /subscription/plans - Obtener planes disponibles (público)
  getPlans(): Observable<PlansResponse> {
    return this.http.get<PlansResponse>(`${this.apiUrl}/plans`);
  }

  // GET /subscription/plans/:planType - Obtener plan específico
  getPlanByType(planType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/plans/${planType}`);
  }

  // POST /subscription/provider/subscribe - Suscribir provider
  subscribeProvider(data: SubscribeRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/provider/subscribe`, data);
  }

  // GET /subscription/provider/:providerId - Suscripciones de provider
  getProviderSubscriptions(providerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/provider/${providerId}`);
  }

  // GET /subscription/:subscriptionId - Obtener suscripción específica
  getSubscription(subscriptionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${subscriptionId}`);
  }

  // POST /subscription/change-plan - Cambiar plan de suscripción
  changePlan(data: ChangePlanRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-plan`, data);
  }

  // POST /subscription/cancel - Cancelar suscripción
  cancelSubscription(): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel`, {});
  }

  // POST /subscription/renew - Renovar suscripción
  renewSubscription(): Observable<any> {
    return this.http.post(`${this.apiUrl}/renew`, {});
  }

  // POST /subscription/members/invite - Invitar miembro a suscripción
  inviteMember(email: string, memberType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/invite`, { email, memberType });
  }

  // POST /subscription/members/activate/:memberId - Activar miembro
  activateMember(memberId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/activate/${memberId}`, {});
  }

  // POST /subscription/members/deactivate/:memberId - Desactivar miembro
  deactivateMember(memberId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/deactivate/${memberId}`, {});
  }

  // POST /subscription/members/change-type/:memberId - Cambiar tipo de miembro
  changeMemberType(memberId: string, memberType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/change-type/${memberId}`, { memberType });
  }

  // GET /subscription/members/:subscriptionId - Listar miembros
  getSubscriptionMembers(subscriptionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/${subscriptionId}`);
  }

  // GET /subscription/members/invitations - Invitaciones del usuario
  getMyInvitations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/invitations`);
  }

  // GET /subscription/user/active - Suscripción activa del usuario
  getMyActiveSubscription(): Observable<MySubscriptionResponse> {
    return this.http.get<MySubscriptionResponse>(`${this.apiUrl}/user/active`);
  }
}
