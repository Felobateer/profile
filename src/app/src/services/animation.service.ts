import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    75,
    1, // Default aspect ratio to avoid errors
    0.1,
    1000
  );
  private renderer: THREE.WebGLRenderer | undefined = undefined;
  private loader = new GLTFLoader();

  constructor() {}

  private init(elementId: string) {
    if (typeof window === 'undefined') {
      throw new Error('Window object is not available');
    }

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById(elementId);
    if (!container) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    container.appendChild(this.renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  animate(gltfFilePath: string, elementId: string) {
    this.init(elementId);

    this.loader.load(gltfFilePath, (gltf) => {
      const model = gltf.scene;
      this.scene.add(model); // Add the loaded GLTF model to the scene

      if (!this.renderer) {
        throw new Error('Renderer is not initialized');
      }

      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer!.render(this.scene, this.camera);
      };

      animate();
    });
  }
}
