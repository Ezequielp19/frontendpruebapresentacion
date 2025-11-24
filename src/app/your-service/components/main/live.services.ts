// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { environment } from '../../../../environments/environment';

// interface StreamResponse {
//   streamingUrl: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LiveService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) { }

//   getStreamUrl() {
//     return this.http.post<StreamResponse>(${this.apiUrl}/stream/stream, {}).pipe(
//       tap((response: StreamResponse) => {
//         console.log('URL de streaming recibida:', response.streamingUrl);
//       })
//     );
//   }
// }