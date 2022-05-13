import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const logo3DTag = document.createElement('logo-3d')
window.addEventListener('DOMContentLoaded', (event) => {

    var tagInstances = document.getElementsByTagName('logo-3d');
    for (var i = 0; i < tagInstances.length; i++) {
        const customElement = tagInstances[i];
        const divEl = document.createElement('div');
        divEl.setAttribute('style', customElement.getAttribute('style'));
        customElement.appendChild(divEl);

        const cameraPositionInput = (customElement.getAttribute('camera-position') || '0 3.47831 5.05579').split(' ');
        const cameraRotationInput = (customElement.getAttribute('camera-rotation') || '-0.35 0 0').split(' ');

        const params = {
            glbUrl: customElement.getAttribute('glb-url'),
            rotationSpeed: +customElement.getAttribute('rotation-speed') || 0.01,
            frustum: +customElement.getAttribute('camera-frustum') || 3.614,
            cameraPosition: new THREE.Vector3(+cameraPositionInput[0], +cameraPositionInput[1], +cameraPositionInput[2]),
            cameraRotation: new THREE.Euler(+cameraRotationInput[0], +cameraRotationInput[1], +cameraRotationInput[2]),
            ambientLightColor: customElement.getAttribute('ambient-light-color') || '#eeeeee',
            ambientLightIntensity: +customElement.getAttribute('ambient-light-intensity') || 1,
            directionalLightColor: customElement.getAttribute('directional-light-color') || '#eeeeee',
            directionalLightIntensity: +customElement.getAttribute('directional-light-intensity') || 2,
        }

        createLogo(customElement, divEl, params);
    }
});

function createLogo(
    customElement: Element,
    htmlElement: HTMLElement,
    params: {
        glbUrl: string,
        rotationSpeed: number,
        frustum: number,
        cameraPosition: THREE.Vector3,
        cameraRotation: THREE.Euler,
        ambientLightColor: string,
        ambientLightIntensity: number,
        directionalLightColor: string,
        directionalLightIntensity: number
    }) {

    /** SCREEN */
    let width = htmlElement.clientWidth;
    let height = htmlElement.clientHeight;
    let aspect = width / height;

    /** SCENE */
    let scene = new THREE.Scene();

    /** RENDERER */
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setSize(htmlElement.clientWidth, htmlElement.clientHeight);
    htmlElement.appendChild(renderer.domElement);

    /** CAMERA */
    var camera = new THREE.OrthographicCamera((params.frustum * aspect) / -2, (params.frustum * aspect) / 2, params.frustum / 2, params.frustum / -2, 1, 100);
    camera.position.x = params.cameraPosition.x;
    camera.position.y = params.cameraPosition.y;
    camera.position.z = params.cameraPosition.z;

    camera.rotation.x = params.cameraRotation.x;
    camera.rotation.y = params.cameraRotation.y;
    camera.rotation.z = params.cameraRotation.z;

    /** LIGHTS */
    var light = new THREE.AmbientLight(params.ambientLightColor, params.ambientLightIntensity);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(params.directionalLightColor, params.directionalLightIntensity);
    scene.add(directionalLight);
    directionalLight.position.copy(camera.position);

    var gltfLoader = new GLTFLoader();

    var logo: THREE.Object3D;
    gltfLoader.load(params.glbUrl, (gltf: GLTF) => {
        logo = gltf.scene.children[0];
        scene.add(logo);
        directionalLight.lookAt(logo.position);
        htmlElement.appendChild(renderer.domElement);

        customElement.dispatchEvent(new Event('ready'));
        console.info('💻 Logo develop by https://smth.it ');
    });

    window.addEventListener('resize', () => {
        width = htmlElement.clientWidth;
        height = htmlElement.clientHeight;
        aspect = width / height;

        camera.left = - (params.frustum * aspect / 2);
        camera.right = (params.frustum * aspect / 2);
        camera.updateProjectionMatrix();

        renderer.setSize(htmlElement.clientWidth, htmlElement.clientHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        if (!!logo) { logo.rotation.y += params.rotationSpeed; }

        renderer.render(scene, camera);
    };

    animate();
}