# Studio Bea Sophia — Somewhere, Down There

A standalone, scroll-controlled illustrated journey, deployed as a separate Vercel project. This is **not** an ordinary landing page or a copy of Sleep Well Creatives. It is a story-world constructed for Studio Bea Sophia, with a continuously moving Three.js camera.

## Live
https://studio-bea-sophia-somewhere-down-th.vercel.app/

## Creative direction
An illustrated astronaut falls from space into a city of umbrellas. A single page of paper travels with the visitor, then points towards The Page Gallery, and finally an independent creative web studio.

The original artwork was supplied for this commission as five drawings. An atlas of fifteen cutouts was prepared from those drawings in a previous prototype. The atlas in `assets/illustration-atlas.b64` contains transparent artwork cutouts and is used as **actual Three.js plane textures**, not as full-background photographs. The city also contains procedural ink buildings and people as a fallback where the atlas fails to load.

## Design and animation choices
- A **single WebGL canvas**, a scene composed of objects at separate Z depths, and a perspective camera with continuously interpolated scroll coordinates.
- No page-panel transitions. The scroll is a journey through space, illustrated clouds, a city and gallery.
- **Cut-paper figures**, black-line skyline illustrations, paper texture, uneven stars and restrained type.
- Minimal HTML typography cues on top of the 3D scene rather than cards or a dashboard.
- Fully working accessibility fallback for `prefers-reduced-motion`.
- Mobile camera FOV and responsive titles.

## Repositories consulted (study patterns, do not copy or vendor their implementations)
- [boydcroberts/CherryTree](https://github.com/boydcroberts/CherryTree): one continuous scroll-controlled Three.js film, with custom shaders.
- [JosephASG/codrops-cinematic-scroll-animations](https://github.com/JosephASG/codrops-cinematic-scroll-animations): cinematic camera, depth and scroll.
- [decriptcypher/scroll-storytelling](https://github.com/decriptcypher/scroll-storytelling): SVG scene deconstruction and scroll choreography.
- [14islands/r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig): robust alternative to synchronise HTML and WebGL if rebuilt using React Three Fiber.
- [theatre-js/theatre](https://github.com/theatre-js/theatre): future visual timeline for fine-tuning individual figure movements.
- [danielgatis/rembg](https://github.com/danielgatis/rembg): possible enhancement to cutout cleanup, particularly pale paper flecks and soft edges.

The current site uses Three.js directly to keep the implementation simple, and does not install the listed repositories. Media is entirely owned input, procedural graphics, or local assets. Three.js is imported from jsDelivr at runtime; a blocked CDN or WebGL-disabled device activates the text fallback.

## Project verification
`check-world.cjs` is run by GitHub Actions and captures six stages at desktop (1440×900) and mobile (390×844). It checks the production server, PNG atlas, WebGL canvas and readiness before saving images as a workflow artifact.

## Still to develop
The first implementation is an immersive **3D cut-paper prototype**. It is not yet a frame-matched finished short film. For studio-grade finish, the next production pass should introduce segmented puppet rigs with independently animated umbrellas, custom GLSL paper textures, and more precise, editable GSAP/Theatre.js animation tracks. None of these are claimed to have been completed.

## Ownership and publication
These illustrations were supplied by the user. Deploy this work only in contexts where the user has appropriate rights. This is not the source code or 3D asset package of Sleep Well Creatives.
