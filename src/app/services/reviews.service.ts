import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  verifiedPurchase: boolean;
  likes: number;
  createdAt: string;
}

export interface ReviewListResponse {
  success: boolean;
  reviews: Review[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) { }

  // GET /reviews - Listar todos los reviews (público)
  getAllReviews(
    page: number = 1,
    limit: number = 20,
    sortBy?: string,
    rating?: number
  ): Observable<ReviewListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (sortBy) params = params.set('sortBy', sortBy);
    if (rating) params = params.set('rating', rating.toString());

    return this.http.get<ReviewListResponse>(this.apiUrl, { params });
  }

  // POST /reviews - Crear nuevo review
  createReview(data: CreateReviewRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // GET /reviews/product/:productId - Obtener reviews de un producto específico
  getProductReviews(
    productId: string,
    page: number = 1,
    limit: number = 20,
    sortBy?: string
  ): Observable<ReviewListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (sortBy) params = params.set('sortBy', sortBy);

    return this.http.get<ReviewListResponse>(`${this.apiUrl}/product/${productId}`, { params });
  }

  // GET /reviews/professional/:professionalId - Obtener reviews de un profesional
  getProfessionalReviews(
    professionalId: string,
    page: number = 1,
    limit: number = 20
  ): Observable<ReviewListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ReviewListResponse>(`${this.apiUrl}/professional/${professionalId}`, { params });
  }

  // POST /reviews/:id/like - Dar/quitar like a un review
  likeReview(reviewId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${reviewId}/like`, {});
  }

  // POST /reviews/:id/respond - Responder a un review (vendedor/profesional)
  respondToReview(reviewId: string, response: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${reviewId}/respond`, { response });
  }

  // POST /reviews/:id/flag - Reportar un review
  flagReview(reviewId: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${reviewId}/flag`, { reason });
  }

  // DELETE /reviews/:id - Eliminar review propio
  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }
}
