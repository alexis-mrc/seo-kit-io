import { afterNextRender, AfterRenderPhase, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { MessageWsType, ServerWebSocketService } from './server-websocket.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent {

  terminalEl = viewChild.required<ElementRef>('terminalEl')

  type = input.required<MessageWsType>();

  fitAddon = new FitAddon();

  serverWebSocketService = inject(ServerWebSocketService);

  constructor() {
    this.serverWebSocketService.connect();
    afterNextRender(() => {
      const terminal = new Terminal({
        convertEol: true,
        theme: this.getTheme()
      });
      terminal.loadAddon(this.fitAddon);
      terminal.open(this.terminalEl().nativeElement);
      this.fitAddon.fit();

      this.serverWebSocketService.messages.subscribe(m => {
        if (m.type === this.type()) {
          terminal.write(m.data);
        }
      });
    }, {phase: AfterRenderPhase.Write})
  }

  getTheme() {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const darkTheme = {
      background: "#2D2D2D",
      black: "#1C1C1C",
      blue: "#6A9FB5",
      brightBlack: "#4C4C4C",
      brightBlue: "#819CCF",
      brightCyan: "#8ABEB7",
      brightGreen: "#B5D4A0",
      brightMagenta: "#D8A9D2",
      brightRed: "#CC6666",
      brightWhite: "#EDEDED",
      brightYellow: "#F0C674",
      cursor: "#FFFFFF",
      cursorAccent: "#2D2D2D",
      cyan: "#8ABEB7",
      foreground: "#D3D3D3",
      green: "#B5D4A0",
      magenta: "#D8A9D2",
      red: "#CC6666",
      selectionBackground: "#5E5E5E",
      selectionForeground: "#FFFFFF",
      selectionInactiveBackground: "#3B3B3B",
      white: "#D3D3D3",
      yellow: "#F0C674"
    };

    const lightTheme = {
      background: "#FFFFFF",
      black: "#000000",
      blue: "#0A4B78",
      brightBlack: "#333333",
      brightBlue: "#005FAF",
      brightCyan: "#007F7F",
      brightGreen: "#007F00",
      brightMagenta: "#7F007F",
      brightRed: "#AF0000",
      brightWhite: "#1C1C1C",
      brightYellow: "#808000",
      cursor: "#000000",
      cursorAccent: "#FFFFFF",
      cyan: "#007F7F",
      foreground: "#000000",
      green: "#007F00",
      magenta: "#7F007F",
      red: "#AF0000",
      selectionBackground: "#C0C0C0",
      selectionForeground: "#000000",
      selectionInactiveBackground: "#D3D3D3",
      white: "#000000",
      yellow: "#808000"
    };



    return mediaQueryList.matches ? darkTheme : lightTheme;
  }
}
