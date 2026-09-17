/**
 * LEADUP — interactive 3D logo card.
 *
 * Uses the client's actual logo artwork as a real CSS 3D object (front +
 * back faces on a plane, rotated in 3D space) instead of a font-based
 * approximation, so the wordmark on screen is pixel-identical to the
 * supplied brand asset while still being fully drag-to-rotate.
 */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class Logo3DCard {
  constructor(stage, card, options = {}) {
    this.stage = stage;
    this.card = card;
    this.options = Object.assign({ autoIdle: true, onClick: null }, options);
    this.rotationY = 22; // slight angled resting pose
    this.rotationVelocity = 0;
    this.dragging = false;
    this.dragMoved = false;
    this.lastPointerX = 0;
    this.disposed = false;
    this.scale = 1;
    this._raf = null;

    this._bindEvents();
    this._tick();
  }

  _bindEvents() {
    const el = this.stage;
    const onDown = (x) => {
      this.dragging = true;
      this.dragMoved = false;
      this.rotationVelocity = 0;
      this.lastPointerX = x;
    };
    const onMove = (x) => {
      if (!this.dragging) return;
      const dx = x - this.lastPointerX;
      if (Math.abs(dx) > 2) this.dragMoved = true;
      this.rotationVelocity = dx * 0.45;
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

  _render() {
    const bob = REDUCED_MOTION ? 0 : Math.sin(performance.now() * 0.0012) * 6;
    this.card.style.transform =
      `translateY(${bob}px) rotateY(${this.rotationY}deg) scale(${this.scale})`;
  }

  _tick() {
    if (this.disposed) return;
    this._raf = requestAnimationFrame(() => this._tick());

    if (!this.dragging && !this._transitioning) {
      if (Math.abs(this.rotationVelocity) > 0.01) {
        this.rotationVelocity *= 0.94;
        this.rotationY += this.rotationVelocity;
      } else if (this.options.autoIdle && !REDUCED_MOTION) {
        this.rotationY += 0.045;
      }
    }

    this._render();
  }

  /** Ease the current rotation back to a front-facing view. */
  snapToFront(duration = REDUCED_MOTION ? 0 : 650) {
    const startRot = this.rotationY;
    const normalized = ((startRot % 360) + 360) % 360;
    const target = normalized > 180 ? normalized - 360 : normalized;
    const delta = -target;
    if (duration === 0) {
      this.rotationY = startRot + delta;
      return;
    }
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

  /** Settle to front-facing, scale up and fade — the "enter the brand" beat. */
  playEnterTransition(duration = REDUCED_MOTION ? 200 : 1000) {
    return new Promise((resolve) => {
      const startRot = this.rotationY;
      const normalized = ((startRot % 360) + 360) % 360;
      const target = normalized > 180 ? normalized - 360 : normalized;
      const startScale = this.scale;
      const targetScale = startScale * 2.4;
      const start = performance.now();
      this.dragging = false;
      this.options.autoIdle = false;
      this._transitioning = true;

      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const e = ease(t);
        this.rotationY = startRot + (-target) * e;
        this.scale = startScale + (targetScale - startScale) * e;
        this._render();
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
  }
}
