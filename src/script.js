import './style.css'
import * as THREE from "three"
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

// Canvas
const canvas = document.getElementById('webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// GSAP
// gsap.to(cube.position, {x: 2, duration:1, delay:1})
// gsap.to(cube.position, {x: 0, duration:1, delay:2})

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.set(0,0,3)
scene.add(camera)

// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true
})

const clock = new THREE.Clock()

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Resize
window.addEventListener('resize', ()=> {
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    
    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    // cube.position.x = Math.sin(elapsedTime)
    // cube.position.y = Math.cos(elapsedTime)
    
    cube.rotation.y = elapsedTime
    controls.update()
    renderer.setSize(sizes.width, sizes.height)
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()