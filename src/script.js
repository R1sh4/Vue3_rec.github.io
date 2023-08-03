import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";
let grenderer;
let gscene;
let gcamera;
let gmodel;
export function model(teg, src) {
  function initscene() {
    const scene = new THREE.Scene();
    const light = new THREE.DirectionalLight(0xffffff, 1.7);
    light.position.set(0, 2, 2);
    scene.add(light);
    const light2 = new THREE.DirectionalLight(0xffffff, 1.7);
    light2.position.set(0, 2, -2);
    scene.add(light2);
    gscene = scene;
    return scene;
  }
  function initcontrols(camera, renderer) {
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minPolarAngle = 1.2;
    controls.maxPolarAngle = 1.2;
    controls.update();
  }
  function initcamera() {
    const camera = new THREE.PerspectiveCamera(50);

    camera.position.z = 152;
    camera.updateProjectionMatrix();
    gcamera = camera;
    return camera;
  }
  function initrender() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(700, 700);
    let drawingSurface = teg;

    drawingSurface.appendChild(renderer.domElement);
    grenderer = renderer;
    return renderer;
  }
  function loadModel(scene) {
    const loader = new GLTFLoader();
    let img = teg.children[0];
    img.hidden = false;
    img.src = "gif.gif";
    loader.load(src, function (gltf) {
      img.src = "";
      img.hidden = true;
      let model = gltf.scene;

      model.position.set(0, -50, 0);
      model.scale.setScalar(9);

      model.rotation.y = -1.8;
      model.rotation.x = 0;
      gmodel = gltf.scene;
      scene.add(gltf.scene);
    });
  }
  if (teg.lastChild.tagName == "IMG") {
    let scene = initscene();
    let camera = initcamera();
    let renderer = initrender();
    console.log(renderer);
    initcontrols(camera, renderer);
    loadModel(scene);
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  } else {
    // var gl = teg.lastChild.getContext("webgl2");
    // console.log(gl);
    // console.log(teg.lastChild);

    // let renderer = setrender(teg.lastChild);
    // console.log(renderer);
    gscene.remove(gmodel);
    loadModel(gscene);
  }

  //camera.position.x = 10;

  //let controls = new OrbitControls(camera, renderer.domElement);
  //console.log(teg.children[1]);

  //const light = new THREE.AmbientLight(0x404040, 3.5);
  //light.position.set(-2, 0, 20);

  //загрузка модели и установление её настроек

  //document.getElementById("myDIV").style.visibility = "hidden";
}
