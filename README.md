
## Importazione HDRI images
HDRI sta per High Dynamic Range Image

```js
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

[...] // dopo animation loop

/* carica background */
const loader_bg = new EXRLoader();
loader_bg.load('assets/ferndale_studio_06_4k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});
```

## Per texture e materiali

Sketchfab (sketchfab.com) — enorme libreria, molti gratis con licenza CC
Poly Haven (polyhaven.com) — 100% gratis e CC0: modelli, HDRI (come quello che già usi!), texture
Quaternius (quaternius.com) — asset low-poly stilizzati, perfetti per giochi
Kenney (kenney.nl) — asset game-ready gratuiti, molto usati
KayKit — kit modulari carini
Unity Asset Store / Unreal Marketplace — a pagamento ma qualità alta (esportabili in GLTF)