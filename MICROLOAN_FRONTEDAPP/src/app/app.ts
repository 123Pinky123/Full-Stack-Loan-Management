
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Navbar } from "./component/user/navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true,                 
  imports: [RouterOutlet],
  templateUrl: './app.html', 
  styleUrls: ['./app.css']   
})
export class App {
  protected readonly title = signal('MICROLOAN_FRONTEDAPP');
}
