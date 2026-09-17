/**
 * LEADUP — interactive 3D logo, built from the client's real logo artwork.
 *
 * assets/logo-shapes.json holds the exact letterform outlines (outer +
 * hole contours), auto-traced from the supplied brand artwork and split
 * into "main" (the LEADUP wordmark + arrow) and "tag" (the small tagline
 * text) groups, each further split by material color (silver / blue).
 * We extrude those real outlines into solid 3D geometry — bevels, depth,
 * metallic materials, real side/back faces — instead of approximating the
 * design with a generic font.
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const SHAPES_URL = new URL('../assets/logo-shapes.json', import.meta.url).href;

const COLORS = {
  silver: 0xd7dce3,
  blue: 0x2f6bff,
};

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

let shapesPromise = null;
function loadShapeData() {
  if (!shapesPromise) {
    shapesPromise = fetch(SHAPES_URL).then((r) => r.json());
  }
  return shapesPromise;
}

function toThreeShapes(entries) {
  return entries.map((entry) => {
    const shape = new THREE.Shape(entry.outer.map(([x, y]) => new THREE.Vector2(x, y)));
    entry.holes.forEach((hole) => {
      shape.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
    });
    return shape;
  });
}

function buildMesh(shapes, material, extrudeOpts) {
  if (!shapes.length) return null;
  const geometry = new THREE.ExtrudeGeometry(shapes, extrudeOpts);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

/** Assembles the full LEADUP wordmark (+ tagline) as a centered THREE.Group. */
async function buildLogoGroup() {
  const data = await loadShapeData();

  const silverMat = new THREE.MeshPhysicalMaterial({
    color: COLORS.silver,
    metalness: 1,
    roughness: 0.28,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  });
  const blueMat = new THREE.MeshPhysicalMaterial({
    color: COLORS.blue,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    emissive: new THREE.Color(COLORS.blue),
    emissiveIntensity: 0.12,
  });

  const mainOpts = {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.016,
    bevelSegments: 4,
    curveSegments: 2,
  };
  const tagOpts = {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 1,
  };

  const group = new THREE.Group();
  const meshes = [
    buildMesh(toThreeShapes(data.silverMain), silverMat, mainOpts),
    buildMesh(toThreeShapes(data.blueMain), blueMat, mainOpts),
    buildMesh(toThreeShapes(data.silverTag), silverMat, tagOpts),
    buildMesh(toThreeShapes(data.blueTag), blueMat, tagOpts),
  ];
  meshes.forEach((m) => m && group.add(m));

  // Tag geometry sits slightly recessed so it doesn't visually compete
  // with the main wordmark's larger bevel.
  meshes.slice(2).forEach((m) => m && (m.position.z -= 0.05));

  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.children.forEach((child) => {
    child.position.x -= center.x;
    child.position.y -= center.y;
  });
  group.position.z -= center.z;

  return group;
}

function setupEnvironment(renderer, scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  scene.environment = pmrem.fromScene(envScene, 0.04).texture;
  pmrem.dispose();
}

function setupLighting(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(3, 4, 5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x3f79ff, 1.6);
  rim.position.set(-4, 1.5, -3);
  scene.add(rim);

  const fill = new THREE.PointLight(0x3f79ff, 0.6, 20);
  fill.position.set(0, -2, 3);
  scene.add(fill);
}

/**
 * Interactive viewer: renders the LEADUP logo on its own canvas with
 * pointer/touch drag-to-rotate (Y axis) and inertia.
 */
export class LogoViewer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = Object.assign(
      { autoIdle: true, cameraZ: 5.6, fov: 32, onClick: null },
      options
    );
    this.rotationY = 0.35;
    this.rotationVelocity = 0.0025;
    this.dragging = false;
    this.dragMoved = false;
    this.lastPointerX = 0;
    this.disposed = false;
    this._raf = null;
    this._resizeObserver = null;
  }

  async init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;
    setupLighting(scene);
    setupEnvironment(renderer, scene);

    const camera = new THREE.PerspectiveCamera(this.options.fov, 1, 0.1, 100);
    camera.position.set(0, 0, this.options.cameraZ);
    this.camera = camera;

    const group = await buildLogoGroup();
    if (this.disposed) return;
    group.rotation.y = this.rotationY;
    scene.add(group);
    this.logoGroup = group;

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    this.objectSize = { width: size.x, height: size.y };

    this._bindEvents();
    this._resize();
    this._resizeObserver = new ResizeObserver(() => this._resize());
    this._resizeObserver.observe(this.canvas);

    this._tick();
    this.ready = true;
  }

  /** Distance the camera needs so the wordmark fully fits the frustum. */
  _fitCameraDistance(margin = 1.5) {
    if (!this.objectSize) return this.options.cameraZ;
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const distForHeight = (this.objectSize.height / 2) / Math.tan(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * this.camera.aspect);
    const distForWidth = (this.objectSize.width / 2) / Math.tan(hFov / 2);
    return Math.max(distForHeight, distForWidth) * margin;
  }

  _resize() {
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    if (this.objectSize && !this._transitioning) {
      this.camera.position.z = this._fitCameraDistance();
      this._baseCameraZ = this.camera.position.z;
    }
  }

  _bindEvents() {
    const el = this.canvas;
    const onDown = (x) => {
      this.dragging = true;
      this.dragMoved = false;
      this.lastPointerX = x;
    };
    const onMove = (x) => {
      if (!this.dragging) return;
      const dx = x - this.lastPointerX;
      if (Math.abs(dx) > 2) this.dragMoved = true;
      this.rotationVelocity = dx * 0.006;
      this.rotationY += this.rotationVelocity;
      this.lastPointerX = x;
    };
    const onUp = () => {
      this.dragging = false;
    };

    el.addEventListener('pointerdown', (e) => {
      el.setPointerCapture(e.pointerId);
      onDown(e.clientX);
    });
    el.addEventListener('pointermove', (e) => onMove(e.clientX));
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    el.addEventListener('click', () => {
      if (!this.dragMoved && typeof this.options.onClick === 'function') {
        this.options.onClick();
      }
    });
  }

  _tick() {
    if (this.disposed) return;
    this._raf = requestAnimationFrame(() => this._tick());

    if (!this.dragging) {
      if (Math.abs(this.rotationVelocity) > 0.00005) {
        this.rotationVelocity *= 0.94;
        this.rotationY += this.rotationVelocity;
      } else if (this.options.autoIdle) {
        this.rotationY += 0.0022;
      }
    }

    if (this.logoGroup) {
      this.logoGroup.rotation.y = this.rotationY;
      this.logoGroup.position.y = Math.sin(performance.now() * 0.0006) * 0.06;
    }

    this.renderer.render(this.scene, this.camera);
  }

  /** Ease the current rotation back to a front-facing view. */
  snapToFront(duration = 700) {
    const startRot = this.rotationY;
    const normalized = ((startRot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const target = normalized > Math.PI ? normalized - Math.PI * 2 : normalized;
    const delta = -target;
    const start = performance.now();
    this.rotationVelocity = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      if (this.dragging || this.disposed) return;
      const t = Math.min((now - start) / duration, 1);
      this.rotationY = startRot + delta * ease(t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /** Smoothly animate rotation + camera dolly-in, resolves when done. */
  playEnterTransition(duration = 1100) {
    return new Promise((resolve) => {
      const startRot = this.rotationY;
      const targetRot = 0;
      const startZ = this.camera.position.z;
      const targetZ = startZ * 0.42;
      const startScale = this.logoGroup.scale.x;
      const targetScale = startScale * 1.35;
      const start = performance.now();
      this.dragging = false;
      this.options.autoIdle = false;
      this._transitioning = true;

      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const e = ease(t);
        this.rotationY = startRot + (targetRot - startRot) * e;
        this.camera.position.z = startZ + (targetZ - startZ) * e;
        const s = startScale + (targetScale - startScale) * e;
        this.logoGroup.scale.setScalar(s);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  dispose() {
    this.disposed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._resizeObserver) this._resizeObserver.disconnect();
    if (this.renderer) this.renderer.dispose();
  }
}
