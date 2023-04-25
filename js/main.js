import * as THREE from "three";
//import { TextGeometry } from '../../three.js-master/';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


const loader = new GLTFLoader();

// const gltfLoader = new GLTFLoader();

// SCENE
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x1d2226);

/////// STATS /////////////////////////
let container, stats;
stats = new Stats();
container = document.createElement("div");
document.body.appendChild(container);
// container.appendChild(stats.dom);

// let text, stats2;
// stats2 = new Stats();
// text = document.createElement("div");
// document.body.appendChild(text);
// text.appendChild(stats2.dom);




// RENDERER
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvasContainer = document.getElementById("canvas-container");
const renderer = new THREE.WebGLRenderer({ canvasContainer });
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);




// CAMERA
// simple & static
// const camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// with controls
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.set(65, 2, 48);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;
controls.enableZoom = false;

controls.enableRotate = false; // desativa a órbita da câmera
camera.lookAt(0, 0.5, 0); // direciona a câmera para o centro da cena


//Load background texture
// const bgLoader = new THREE.TextureLoader();
// bgLoader.load("../img/juliana_silva.jpeg", function (img) {
//     scene.background = img;
// });

// FOG
scene.fog = new THREE.Fog(0xcccccc, 30, 175);

// CONTENT
// Light
const light = new THREE.AmbientLight(0x404040); // soft white light
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-30, 10, 30);

/////// INTERACTIVE //////////////////////

/**
 * make things clickable part 1
 */
let raycaster = new THREE.Raycaster();
let INTERSECTED;
let theta = 0;
const pointer = new THREE.Vector2();
const radius = 100;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);
document.addEventListener("click", onPointerMove);
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * 3D Objects
 */

// Lines
// const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// const points = [];
// points.push(new THREE.Vector3(-20, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));
// points.push(new THREE.Vector4(14, 10, 0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(geometry, material);


// Adding textures
const texture = new THREE.TextureLoader().load("textures/poem.png");
const texture2 = new THREE.TextureLoader().load(
    "textures/pexels-monicore-135157.jpg"
);
texture2.mapping = THREE.EquirectangularReflectionMapping;



// Box middle
const geometry2 = new THREE.BoxGeometry(9, 9, 9);


const material2 = new THREE.MeshPhongMaterial({
    map: texture,
    //    bumpMap: texture,
    //    bumpScale: 1,
    // color: 0x00ff00,
    shininess: 100,
    reflectivity: 1,
    envMap: texture2,
    //wireframe: true
});

const cube = new THREE.Mesh(geometry2, material2);

function openPage1() {
    window.location.href = "page1.html";
}

cube.onClick = openPage1;

// Box left
const geometry_left = new THREE.BoxGeometry(9, 9, 9);


const material_left = new THREE.MeshPhongMaterial({
    map: texture,
    //    bumpMap: texture,
    //    bumpScale: 1,
    // color: 0x00ff00,
    shininess: 100,
    reflectivity: 1,
    envMap: texture2,
    //wireframe: true
});

const cube_left = new THREE.Mesh(geometry_left, material_left);

cube_left.position.z = 20;
cube_left.position.setX(-10);

// Box right
const geometry_right = new THREE.BoxGeometry(9, 9, 9);


const material_right = new THREE.MeshPhongMaterial({
    map: texture,
    //    bumpMap: texture,
    //    bumpScale: 1,
    // color: 0x00ff00,
    shininess: 100,
    reflectivity: 1,
    envMap: texture2,
    //wireframe: true
});

const cube_right = new THREE.Mesh(geometry_right, material_right);

cube_right.position.z = -20;
cube_right.position.setX(10);

//Tryng image 3D
// gltfLoader.load(
//     "../img/model.glb",
//     (gltf) => {
//         // o objeto carregado é passado como parâmetro para esta função
//         scene.add(gltf.scene);
//     },
//     undefined,
//     (error) => {
//         console.error(error);
//     }
// );

//////////////// RESIZE //////////////////////////////
window.addEventListener("resize", onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
/////////////////////////////////////////////

/////////////////////////////////////////////////

// ADD TO SCENE & RENDER EVERYTHING
//scene.add( line );
scene.add(cube);
scene.add(cube_left);
scene.add(cube_right);
// scene.add(sphere);
// scene.add(torus);

scene.add(light);
scene.add(pointLight);

renderer.setAnimationLoop(animation);
//renderer.render( scene, camera );

function animation(time) {
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    cube_left.rotation.x = time / 2000;
    cube_left.rotation.y = time / 1000;

    cube_right.rotation.x = time / 2000;
    cube_right.rotation.y = time / 1000;

    // sphere.rotation.z += 0.3;
    // torus.rotation.y = time / 2000;
    stats.update();
    //renderer.render( scene, camera );
    render();
}

function render() {
    // theta += 0.1;

    // camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    /**
     * make things clickable part 2
     */

    // find intersections
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED)
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xb28007);
            
            console.log("you clicked the box");
        }
    } else {
        if (INTERSECTED)
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;
    }

    renderer.render(scene, camera);
}

