import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeployService} from "./deploy.service";
import {TerminalComponent} from "../shared/terminal/terminal.component";

@Component({
  selector: 'app-deploy',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.scss',
})
export class DeployComponent {

  deployService = inject(DeployService);

}
