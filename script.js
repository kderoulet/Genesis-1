let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let loader = new THREE.TextureLoader()


let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

scene.add(new THREE.AmbientLight(0x050505))

// set up the sun
let sun = new THREE.Object3D()
let sunLight = new THREE.SpotLight(0xffffff, 1.5)

sun.add(sunLight)

let radius = 1, widthSegments = 30, heightSegments = 30
let sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments)
let sunMaterial = new THREE.MeshLambertMaterial({map: loader.load('2k_sun.jpg', () => console.log('loaded'))})
// let sunMaterial = new THREE.MeshLambertMaterial({emissive: 0xfeea22})
let sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
sunMesh.scale.set(10,10,10)
let sunZ = -100
sun.position.z = sunZ
// sun.position.x = -5
sun.add(sunMesh)
scene.add(sun)

let sunLighting = new THREE.SpotLight(0xffffff, 1.0)
sunLighting.position.set(0,0,sunZ + 50)
sunLighting.target = sun
scene.add(sunLighting)

let sunLighting2= new THREE.SpotLight(0xffffff, 1.0)
sunLighting2.position.set(50,0,sunZ + 50)
sunLighting2.target = sun
scene.add(sunLighting2)

let sunLighting3 = new THREE.SpotLight(0xffffff, 1.0)
sunLighting3.position.set(-50,0,sunZ + 50)
sunLighting3.target = sun
scene.add(sunLighting3)

let sunLighting4 = new THREE.SpotLight(0xffffff, 1.0)
sunLighting4.position.set(0,50,sunZ + 50)
sunLighting4.target = sun
scene.add(sunLighting4)

let sunLighting5= new THREE.SpotLight(0xffffff, 1.0)
sunLighting5.position.set(0,-50, sunZ + 50)
sunLighting5.target = sun
scene.add(sunLighting5)




let moonOrbit = new THREE.Object3D()
moonOrbit.position.z = 5
moonOrbit.position.x = 0

let moonMaterial = new THREE.MeshLambertMaterial({emissive: 0x050505, map: loader.load('2k_moon.jpg', () => console.log('loaded'))})
// let moonMaterial = new THREE.MeshLambertMaterial({emissive: 0x303030})
let moon = new THREE.Mesh(sphereGeometry, moonMaterial)
moon.position.z = -5
moon.position.x = 0
moonOrbit.add(moon)
scene.add(moonOrbit)


// SPACE
// let spaceGeometry = new THREE.CubeGeometry(100,100,100)
let spaceGeometry = new THREE.SphereBufferGeometry(100,100,100)
let spaceMaterial = new THREE.MeshBasicMaterial({map: loader.load('2k_stars.jpg', () => console.log('loaded')), side: THREE.BackSide})
// let spaceMaterial = new THREE.MeshBasicMaterial({color: 0xaa5555, side: THREE.BackSide})
let space = new THREE.Mesh(spaceGeometry, spaceMaterial)
scene.add(space)

camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)
    camera.rotation.y += 0.01
    moonOrbit.rotation.y += 0.01
    // sun.rotation.y += 0.001
    // sun.rotation.x += 0.0001
    renderer.render(scene,camera)
    // if (sun.position.z < 0) {
    //     sun.position.z += 1
    // }
}
animate()