import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../../services/flashcard-service';
import { Flashcard } from '../../models/flashcard.model';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard-component.html',
  styleUrls: ['./flashcard-component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FlashcardComponent {
  flashcards: Flashcard[] = [];
  currentIndex: number = 0;
  showAnswer: boolean = false;
  loading: boolean = false;
  showFlashPage: boolean =false;
  animationClass: 'next' | 'prev' | '' = '';

  constructor(private flashcardService: FlashcardService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'text/plain') {
      this.loading = true;
      this.flashcardService.uploadFile(file).subscribe(
        (res) => {
          this.flashcards = res.flashcards;
          this.currentIndex = 0;
          this.showAnswer = false;
          this.loading = false;
          this.showFlashPage = true;
          //console.log(this.flashcards)
        },
        (err) => {
          console.error(err);
          this.loading = false;
          if (err.status === 0) {
          // Network error
          alert('Connection failed. Please check your internet or server status.');
        } else {
          alert('An error occurred while uploading. Please try again.');
        }
        }
      );
    } else {
      alert('Only .txt files are supported');
    }
  }

  nextCard() {
    this.animationClass = 'next';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.flashcards.length;
      this.showAnswer = false;
      this.animationClass = '';
    }, 200);
  }

  prevCard() {
    this.animationClass = 'prev';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.flashcards.length) % this.flashcards.length;
      this.showAnswer = false;
      this.animationClass = '';
    }, 200);
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  get currentCard() {
    return this.flashcards[this.currentIndex];
  }
}
