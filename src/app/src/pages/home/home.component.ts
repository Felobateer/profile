import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { AnimationService } from '../../services/animation.service';
// "Razer Blade 15 Laptop" (https://skfb.ly/oSnHG) by Htwest is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `<canvas #home></canvas>`,
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {
  constructor(private animation: AnimationService) {}

  ngOnInit(): void {
    this.start();
  }

  async start() {
    await this.animation.animate('../../figures/laptop/scene.gltf', 'home');
  }
}
