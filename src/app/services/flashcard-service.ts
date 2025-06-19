import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = 'http://localhost:3000/flashcards/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{message: string; flashcards: Flashcard[]}>{
    
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string; flashcards: Flashcard[] }>(this.apiUrl, formData);
  }

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }
}
