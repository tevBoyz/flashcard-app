import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard-service';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/animations';

@Component({
  selector: 'app-flashcard-component',
  standalone: false,
  templateUrl: './flashcard-component.html',
  styleUrls: ['./flashcard-component.scss'],
  animations: [
    trigger('slide', [
      state('void', style({ opacity: 0, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: '{{direction}}' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { direction: 'translateX(100%)' } }),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: '{{direction}}' }))
      ], { params: { direction: 'translateX(-100%)' } })
    ])
  ]
})
export class FlashcardComponent implements OnInit {
  flashcards: Flashcard[] = [];
  currentIndex = 0;
  showAnswer = false;
  direction: 'next' | 'prev' = 'next';

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.flashcardService.getFlashcards().subscribe(data => {
      this.flashcards = data;
    });
  }

  get currentCard(): Flashcard {
    return this.flashcards[this.currentIndex];
  }

  animationClass = '';

nextCard(): void {
  if (this.currentIndex < this.flashcards.length - 1) {
    this.animateSlide('next');
    this.currentIndex++;
    this.showAnswer = false;
  }
  else if (this.currentIndex == this.flashcards.length - 1) {
    this.animateSlide('next');
    this.currentIndex = 0; // Loop back to the first card
    this.showAnswer = false;
  }
}

prevCard(): void {
  if (this.currentIndex > 0) {
    this.animateSlide('prev');
    this.currentIndex--;
    this.showAnswer = false;
  }
  else if (this.currentIndex == 0) {
    this.animateSlide('prev');
    this.currentIndex = this.flashcards.length - 1; // Loop back to the last card
    this.showAnswer = false;
  }
}

animateSlide(direction: 'next' | 'prev'): void {
  this.animationClass = ''; // Reset
  void document.body.offsetWidth; // Force reflow
  this.animationClass = direction; // Trigger animation
}


  toggleAnswer(): void {
    this.showAnswer = !this.showAnswer;
  }
}