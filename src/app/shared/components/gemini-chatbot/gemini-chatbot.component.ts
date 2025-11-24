import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-gemini-chatbot',
  templateUrl: './gemini-chatbot.component.html',
  styleUrls: ['./gemini-chatbot.component.scss']
})
export class GeminiChatbotComponent implements OnInit {

  message: string = '';
  answer: string | null = null;

 URL_key='http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnswer() {
    this.http.post<{ answer: string }>(`${this.URL_key}/chat`, { message: this.message })
    .subscribe(response => {
      this.answer = response.answer;
    });
    
  }






  ngOnInit(): void {
    this.getAnswer()
  }

}
