import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nadvar } from './nadvar/nadvar';

@Component({
  imports: [RouterOutlet, Nadvar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('desempeno2');
}
