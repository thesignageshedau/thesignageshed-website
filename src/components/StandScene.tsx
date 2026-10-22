import * as THREE from "three";
import { asset } from "../lib/asset";

// Procedural pull up banner stand: base cassette, pole and a printed banner that unrolls upward.
// Banner artwork is drawn on a canvas in brand colours with our logo, so no outside images.

const W = 0.85, H = 2.0; // metres, 850 × 2000mm

function bannerTexture(onReady: () => void, scale = 1): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = Math.round(1024 * scale); c.height = Math.round(2408 * scale); // 850 × 2000mm
  const g = c.getContext("2d")!;
  g.scale(scale, scale);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = scale < 1 ? 4 : 8;
  const draw = (logo?: HTMLImageElement) => {
    const W2 = 1024, cx = 512;
    g.textAlign = "center"; g.textBaseline = "alphabetic";
    // Cream top: the official main logo in its real colours.
    g.fillStyle = "#FAF6EE"; g.fillRect(0, 0, W2, 1180);
    if (logo) {
      const lw = 820, lh = lw * (logo.naturalHeight / logo.naturalWidth);
      g.drawImage(logo, cx - lw / 2, 520 - lh / 2, lw, lh);
    }
    g.fillStyle = "#C0582F"; g.fillRect(162, 1000, 700, 6);
    g.fillStyle = "#A2461F"; g.font = '600 46px "Zilla Slab", Georgia, serif';
    g.fillText("SIGNS THAT GET YOU SEEN", cx, 1090);
    // Rust middle: what we do.
    g.fillStyle = "#C0582F"; g.fillRect(0, 1180, W2, 820);
    g.fillStyle = "#FAF6EE"; g.font = '112px "Ultra", Georgia, serif';
    g.fillText("Printed", cx, 1450); g.fillText("signage", cx, 1590);
    g.fillStyle = "#F2EBDD"; g.font = '600 76px "Zilla Slab", Georgia, serif';
    g.fillText("& event gear", cx, 1710);
    g.fillStyle = "#F2EBDD"; g.fillRect(cx - 60, 1800, 120, 8);
    // Sage band: delivery.
    g.fillStyle = "#828E77"; g.fillRect(0, 2000, W2, 230);
    g.fillStyle = "#FAF6EE"; g.font = '600 66px "Zilla Slab", Georgia, serif';
    g.fillText("Shipped Australia-wide", cx, 2138);
    // Charcoal foot: web address.
    g.fillStyle = "#33373A"; g.fillRect(0, 2230, W2, 178);
    g.fillStyle = "#F2EBDD"; g.font = '600 58px "Zilla Slab", Georgia, serif';
    g.fillText("thesignageshed.au", cx, 2338);
    tex.needsUpdate = true;
    onReady();
  };
  const img = new Image();
  img.src = asset("images/logo-main-light-800.webp");
  Promise.all([img.decode().catch(() => undefined), document.fonts?.ready]).then(() =>
    draw(img.naturalWidth ? img : undefined),
  );
  return tex;
}

export interface StandOptions { mobile?: boolean; isVisible?: () => boolean }

export function mountStand(
  canvas: HTMLCanvasElement,
  getProgress: () => number,
  onFirstFrame?: () => void,
  opts: StandOptions = {},
): () => void {
  const mobile = !!opts.mobile;
  const seg = mobile ? 0.5 : 1; // geometry detail
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: !mobile, alpha: true, preserveDrawingBuffer: !mobile,
    powerPreference: mobile ? "low-power" : "default",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
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

  let raf = 0, last = -1, shown = getProgress(), first = true;
  const stand = new THREE.Group();
  scene.add(stand);
  const metal = new THREE.MeshStandardMaterial({ color: 0xa7aaac, metalness: 0.85, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x33373a, metalness: 0.4, roughness: 0.5 });

  // Base cassette: rounded body plus end caps and feet.
  const cassette = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, W - 0.06, mobile ? 4 : 6, 24 * seg), metal);
  cassette.rotation.z = Math.PI / 2;
  cassette.position.y = 0.09;
  stand.add(cassette);
  for (const x of [-1, 1]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.03, 24 * seg), dark);
    cap.rotation.z = Math.PI / 2; cap.position.set(x * (W / 2 + 0.02), 0.09, 0);
    stand.add(cap);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.32), dark);
    foot.position.set(x * (W / 2 - 0.08), 0.02, 0);
    stand.add(foot);
  }
  // Pole rises behind the banner.
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, mobile ? 8 : 12), metal);
  pole.position.set(0, 0.09, -0.05);
  stand.add(pole);
  // Banner: unit-height plane anchored at its bottom, scaled and UV-cropped as it unrolls.
  const geo = new THREE.PlaneGeometry(W, 1);
  geo.translate(0, 0.5, 0);
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  const tex = bannerTexture(() => { last = -1; }, mobile ? 0.75 : 1);
  const banner = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75, side: THREE.DoubleSide }));
  banner.position.set(0, 0.14, 0);
  stand.add(banner);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(W + 0.01, 0.025, 0.025), dark);
  stand.add(rail);

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
    if (!first && opts.isVisible && !opts.isVisible()) return; // paused off-screen
    const target = getProgress();
    shown += (target - shown) * 0.12; // smooth toward the scroll position
    if (Math.abs(shown - last) < 0.0005) return;
    last = shown;
    const unroll = ease(Math.min(1, Math.max(0, (shown - 0.02) / 0.7)));
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
    camera.position.z = mobile ? 4.3 / Math.min(1, Math.max(0.6, camera.aspect / 0.75)) : 5.2;
    camera.lookAt(0, 0.45 + unroll * 0.6, 0);
    renderer.render(scene, camera);
    if (first) { first = false; onFirstFrame?.(); }
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
