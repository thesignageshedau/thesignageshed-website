import * as THREE from "three";
import { asset } from "../lib/asset";

// Procedural pull up banner stand: base cassette, pole and a printed banner that unrolls upward.
// Banner artwork is drawn on a canvas in brand colours with our logo, so no outside images.

const W = 0.85, H = 2.0; // metres, 850 × 2000mm

function bannerTexture(onReady: () => void): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 1204;
  const g = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const draw = (logo?: HTMLImageElement) => {
    g.fillStyle = "#F2EBDD"; g.fillRect(0, 0, 512, 1204);
    g.fillStyle = "#C0582F"; g.fillRect(0, 0, 512, 330);
    g.fillStyle = "#828E77"; g.fillRect(0, 1020, 512, 184);
    g.strokeStyle = "#33373A"; g.lineWidth = 10; g.strokeRect(22, 22, 468, 1160);
    g.fillStyle = "#F2EBDD"; g.textAlign = "center";
    g.font = '64px "Ultra", Georgia, serif';
    g.fillText("YOUR", 256, 150); g.fillText("BRAND", 256, 230);
    g.font = '600 30px "Zilla Slab", Georgia, serif';
    g.fillText("HERE", 256, 285);
    if (logo) g.drawImage(logo, 76, 400, 360, 360 * (logo.naturalHeight / logo.naturalWidth || 1));
    g.fillStyle = "#33373A"; g.font = '600 38px "Zilla Slab", Georgia, serif';
    g.fillText("Printed signage", 256, 900); g.fillText("& event gear", 256, 950);
    g.fillStyle = "#F2EBDD"; g.font = '600 30px "Zilla Slab", Georgia, serif';
    g.fillText("thesignageshed.au", 256, 1120);
    tex.needsUpdate = true;
    onReady();
  };
  draw();
  const img = new Image();
  img.onload = () => draw(img);
  img.src = asset("images/logo-sign-480.webp");
  document.fonts?.ready.then(() => draw(img.complete && img.naturalWidth ? img : undefined));
  return tex;
}

export function mountStand(canvas: HTMLCanvasElement, getProgress: () => number): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 1.1, 5.2);
  camera.lookAt(0, 1.0, 0);

  scene.add(new THREE.HemisphereLight(0xfaf6ee, 0x25292b, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2.5, 4, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe8946c, 1.2);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  const stand = new THREE.Group();
  scene.add(stand);
  const metal = new THREE.MeshStandardMaterial({ color: 0xa7aaac, metalness: 0.85, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x33373a, metalness: 0.4, roughness: 0.5 });

  // Base cassette: rounded body plus end caps and feet.
  const cassette = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, W - 0.06, 6, 24), metal);
  cassette.rotation.z = Math.PI / 2;
  cassette.position.y = 0.09;
  stand.add(cassette);
  for (const x of [-1, 1]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.03, 24), dark);
    cap.rotation.z = Math.PI / 2; cap.position.set(x * (W / 2 + 0.02), 0.09, 0);
    stand.add(cap);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.32), dark);
    foot.position.set(x * (W / 2 - 0.08), 0.02, 0);
    stand.add(foot);
  }
  // Pole rises behind the banner.
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 12), metal);
  pole.position.set(0, 0.09, -0.05);
  stand.add(pole);
  // Banner: unit-height plane anchored at its bottom, scaled and UV-cropped as it unrolls.
  const geo = new THREE.PlaneGeometry(W, 1);
  geo.translate(0, 0.5, 0);
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  const tex = bannerTexture(() => {});
  const banner = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75, side: THREE.DoubleSide }));
  banner.position.set(0, 0.14, 0);
  stand.add(banner);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(W + 0.01, 0.025, 0.025), dark);
  stand.add(rail);

  let raf = 0, last = -1, shown = 0;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    last = -1;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const frame = () => {
    raf = requestAnimationFrame(frame);
    const target = getProgress();
    shown += (target - shown) * 0.12; // smooth toward the scroll position
    if (Math.abs(shown - last) < 0.0005) return;
    last = shown;
    const unroll = ease(Math.min(1, Math.max(0, (shown - 0.05) / 0.75)));
    const h = Math.max(0.001, unroll * H);
    banner.scale.y = h;
    // Show the top of the artwork first, as a real banner pulls out of the cassette.
    for (let i = 0; i < uv.count; i++) uv.setY(i, i < 2 ? 1 : 1 - unroll);
    uv.needsUpdate = true;
    rail.position.set(0, 0.14 + h, 0.005);
    pole.scale.y = h + 0.05;
    pole.position.y = 0.09 + (h + 0.05) / 2;
    stand.rotation.y = -0.9 + shown * 1.25;
    camera.position.y = 0.6 + unroll * 0.55;
    camera.lookAt(0, 0.45 + unroll * 0.6, 0);
    renderer.render(scene, camera);
  };
  frame();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) { o.geometry.dispose(); (o.material as THREE.Material).dispose(); }
    });
    tex.dispose();
    renderer.dispose();
  };
}
