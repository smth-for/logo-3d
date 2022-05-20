<!-- [![Banner](static/moongooseCursor.jpg)](https://smth.it) -->

# Logo 3d

> Logo 3d component HTML.

The Logo 3d is an HTML component for visualizing a 3d Logo on a Web page.
The component auto-creates a div tag and injects a canvas in a WebGL context with a threeJS lib supporting.

The 3d rendered scene serve by an Orthographic Camera, Alpha background WebGLRenderer and a 3D Model loaded by GLTF Loader.

# Usage

For use a Lib inject in a header the bundle script

```html
<script src="https://yourhosted/bundle.js"></script>
```

Add a custom tag in your HTML page position, like this:

```html
<logo-3d
  id="logo-3d-example-id"
  glb-url="./public/Logo.glb"
  rotation-speed="0.01"
  camera-frustum="3.614"
  camera-position="0 3.47831 5.05579"
  camera-rotation="-0.35 0 0"
  ambient-light-color="#eeeeee"
  ambient-light-intensity="1"
  directional-light-color="#eeeeee"
  directional-light-intensity="2"
  style="width: 500px; height: 500px;"
></logo-3d>
```

### Params

* `glb-url` -> Url for a glb / gltf[embedded] resource.
* `rotation-speed` -> Speed for logo around Y Axe.
* `camera-frustum` -> Camera Frustum is region of space in the modeled world that may appear on the screen.
* `camera-position` -> Camera Position in Vector3 (x, y, z).
* `camera-rotation` -> Camera Rotation in Vector3 (x, y, z).
* `ambient-light-color` -> Color of Ambient Light in HEX annotation.
* `ambient-light-intensity` -> Intensity for Ambient Light.
* `directional-light-color` -> Color of Directional Light in HEX annotation.
* `directional-light-intensity` -> Intensity for Directional Light.


## Join [SMTH](https://smth.it) Community

[![Discord Banner 2](https://discordapp.com/api/guilds/748546400631128204/widget.png?style=banner2)](https://discord.gg/H6NkzZy)
## Code of Conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

## License

[Simtech Srl LICENCE](LICENSE)

## Special Thanks

- [ThreeJS](https://threejs.org/)
