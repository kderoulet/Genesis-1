let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let loader = new THREE.TextureLoader()
let fontLoader = new THREE.FontLoader()


let renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)

let ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
scene.add(ambientLight)


// set up the sun
let sun = new THREE.Object3D()
let sunLight = new THREE.SpotLight(0xffffff, 1.5)

sun.add(sunLight)

let radius = 1, widthSegments = 250, heightSegments = 250
let sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments)
let sunMaterial = new THREE.MeshLambertMaterial({transparent: true, opacity: 0, map: loader.load('2k_sun.jpg', () => console.log('loaded'))})
// let sunMaterial = new THREE.MeshLambertMaterial({emissive: 0xfeea22})
let sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
let sunZ = -300
let sunScale = 75
sunMesh.scale.set(sunScale,sunScale,sunScale)

sun.position.z = sunZ
// sun.position.x = -5
sun.add(sunMesh)
scene.add(sun)

let andItWasSoSpotlight = new THREE.SpotLight(0xffffff, 0)
andItWasSoSpotlight.position.z = -50
andItWasSoSpotlight.target = camera
scene.add(andItWasSoSpotlight)


let backgroundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0, transparent: true})
let backgroundGeometry = new THREE.BoxGeometry(200, 50, 50)
let andItWasSoBackground = new THREE.Mesh(backgroundGeometry,backgroundMaterial)
andItWasSoBackground.position.z = -50
scene.add(andItWasSoBackground)

let sunLightingIntensity = 15

let sunLighting = new THREE.SpotLight(0xffffff, sunLightingIntensity)
sunLighting.position.set(0,0,sunZ + sunScale)
sunLighting.target = sun
scene.add(sunLighting)

let sunLighting2= new THREE.SpotLight(0xffffff, sunLightingIntensity)
sunLighting2.position.set(sunScale*2,0,sunZ + sunScale)
sunLighting2.target = sun
scene.add(sunLighting2)

let sunLighting3 = new THREE.SpotLight(0xffffff, sunLightingIntensity)
sunLighting3.position.set(-sunScale*2,0,sunZ + sunScale)
sunLighting3.target = sun
scene.add(sunLighting3)

let sunLighting4 = new THREE.SpotLight(0xffffff, sunLightingIntensity)
sunLighting4.position.set(0,sunScale*2,sunZ + sunScale)
sunLighting4.target = sun
scene.add(sunLighting4)

let sunLighting5= new THREE.SpotLight(0xffffff, sunLightingIntensity)
sunLighting5.position.set(0,-sunScale*2, sunZ + 50)
sunLighting5.target = sun
scene.add(sunLighting5)

sunLightingArray = [sunLighting, sunLighting2, sunLighting3, sunLighting4, sunLighting5]



let moonOrbit = new THREE.Object3D()
// moonOrbit.position.z = 0
// moonOrbit.position.x = 0
moonOrbit.rotation.y = -3

let moonMaterial = new THREE.MeshLambertMaterial({transparent: true, opacity: 0, emissive: 0x050505, map: loader.load('2k_moon.jpg', () => console.log('loaded'))})
let moon = new THREE.Mesh(sphereGeometry, moonMaterial)
moon.position.z = -15
moon.position.x = 0
moonOrbit.add(moon)
// scene.add(moonOrbit)

let earthOrbit = new THREE.Object3D()
earthOrbit.position.z = sunZ
let earthMaterial = new THREE.MeshLambertMaterial({transparent: true, opacity: 0, emissive: 0x050709, map: loader.load('2k_earth.jpg', () => console.log('loaded'))})
let earth = new THREE.Mesh(sphereGeometry, earthMaterial)
let earthPosition = new THREE.Object3D()
earthPosition.position.y = -3
earthPosition.position.z = Math.abs(sunZ)

// earth.position.y = -3
// earth.position.z = Math.abs(sunZ)
earth.scale.set(4,4,4)
earthOrbit.add(earthPosition)
earthPosition.add(earth)
earthPosition.add(moonOrbit)
// moon.position.z -= 10
scene.add(earthOrbit)


// SPACE
// 500 radius seems excessive; not sure on width/height segments)
let spaceGeometry = new THREE.SphereBufferGeometry(500,100,100)
let spaceMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0, map: loader.load('2k_stars.jpg', () => console.log('loaded')), side: THREE.BackSide})
// let spaceMaterial = new THREE.MeshBasicMaterial({color: 0xaa5555, side: THREE.BackSide})
let space = new THREE.Mesh(spaceGeometry, spaceMaterial)
scene.add(space)

camera.position.z = -10
camera.position.y = -3




// TEXT


var height = 0.5,
size = 3,
hover = 0,
curveSegments = 3,
bevelThickness = 1,
bevelSize = 2,
bevelEnabled = false,
font = undefined,
textMesh = undefined,
textMeshY = 1,
textMeshZ = -75,
textMeshRotation = Math.PI * 2


function loadFont(text) {
        fontLoader.load( 'helvetiker_bold' + '.typeface.json', function ( response ) {
        font = response

        textGeo = new THREE.TextGeometry(text, {
            font: font,
            size: size,
            height: height,
            curveSegments: curveSegments,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled
        })
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x )
        let materials = [
            new THREE.MeshPhongMaterial( { color: 0xffffff, opacity: 0, transparent: true, flatShading: true } ), // front
            new THREE.MeshPhongMaterial( { color: 0xffffff, opacity: 0, transparent: true} ) // side
        ];
        textGeo = new THREE.BufferGeometry().fromGeometry(textGeo)
        textMesh = new THREE.Mesh( textGeo, materials );
        
        textMesh.position.x = centerOffset;
        textMesh.position.y = textMeshY
        textMesh.position.z = textMeshZ
        textMesh.rotation.x = 0;
        textMesh.rotation.y = textMeshRotation;
        textMesh.material[0].opacity = 0
        textMesh.material[1].opacity = 0        
        scene.add(textMesh)

    })

}

// SIZE MATH:
// Sun is 400x size of moon
// Earth is 4x size of moon


// PHASE = current phase in animation
// phase = 1: 
// And God said, “Let there be lights in the vault of the sky 
// to separate the day from the night, and let them serve as signs 
// to mark sacred times, and days and years, and let them be lights
// in the vault of the sky to give light on the earth.” 

// phase = 2:
// And it was so.

// phase = 3:
// ** sun and moon and stars appear ** 

// phase = 4:
// ** moon rotates through its phases **

// phase = 5:
// God made two great lights—the greater light to govern the day 
// and the lesser light to govern the night. He also made the stars.

// God set them in the vault of the sky to give light on the earth,
// to govern the day and the night, and to separate light from darkness. 

// phase = 6:
// ** move to view of the earth slowly rotating, sun on one side, moon on other **
// **  ** 

// phase 7:
// And God saw that it was good. 

let phase = 1
let positive = true
let itWasGood = false

loadFont(
'And God said, “Let there be lights in the vault of the sky \n to separate the day from the night, and let them serve as signs \n to mark sacred times, and days and years, and let them be lights \n in the vault of the sky to give light on the earth.”'
)
function animate() {
    requestAnimationFrame(animate)

    if (phase == 1) {
        // let done = animatePhase1()
        if (animatePhase1()) {
            transitionToPhase2()
            phase++
        }
    }

    if (phase == 2) {
        if (animatePhase2()) phase++
    }

    if (phase == 3) {
        if (animatePhase3()) phase++
    }

    if (phase > 3) {
        animateSun()
    }

    if (phase == 4) {
        if (animatePhase4()) phase++
    }

    if (phase == 5) {
        if (animatePhase5()) phase++
    }

    if (phase == 6) {
        if (animatePhase6()) phase++
    }

    renderer.render(scene,camera)

}
animate()

function animatePhase1() {
        // phase = 1: 
    // And God said, “Let there be lights in the vault of the sky 
    // to separate the day from the night, and let them serve as signs 
    // to mark sacred times, and days and years, and let them be lights
    // in the vault of the sky to give light on the earth.” 

    if (textMesh && font) {
        if (textMesh.material[0].opacity < 1) {
            textMesh.material[0].opacity += 0.01
            textMesh.material[1].opacity += 0.01
        } else {
            return true
        }
    }
}

function transitionToPhase2() {
    textMesh.material[0].opacity = 0
    textMesh.material[1].opacity = 0
    scene.remove(textMesh)
    loadFont('And it was so.')
}

function animatePhase2() {
    // phase = 2:
    // And it was so.
    if (textMesh.material[0].opacity < 1) {
        textMesh.material[0].opacity += 0.01
        textMesh.material[1].opacity += 0.01
    } else {
        return true
    }
}

function animatePhase3() {
    if (sunMesh.material.opacity == 0) {
        // ambientLight.intensity = 0
        andItWasSoSpotlight.intensity = 15
        andItWasSoBackground.material.opacity += 0.1
        sunMesh.material.opacity += 0.1
        textMesh.material[0].opacity -= 0.1
        textMesh.material[1].opacity -= 0.1
    }
    if (sunMesh.material.opacity < 1) {
        andItWasSoBackground.material.opacity += 0.1
        sunMesh.material.opacity += 0.1
        textMesh.material[0].opacity -= 0.1
        textMesh.material[1].opacity -= 0.1
        space.material.opacity += 0.1
    } else if (sunLighting.intensity > 1.25) {
        sunLightingArray.forEach(light => {
            light.intensity -= 0.1
        })
        // andItWasSoSpotlight.intensity -= 0.05
        andItWasSoBackground.material.opacity -= 0.1
    } else {
        andItWasSoSpotlight.intensity = 0
        return true
    }
    // ambientLight.color = 0x000000
    // ambientLight.intensity = 10
    // phase = 3:
    // ** sun and moon and stars appear ** 
}

function animateSun() {
    // sun movement -- not final but a step in the right direction
    if (sunLightingArray[1].intensity > 1.5) {
        positive = false
    }
    if (sunLightingArray[1].intensity <= 1) {
        positive = true
    }
    if (positive) {
        sunLightingArray[0].intensity += 0.02
        sunLightingArray[1].intensity += 0.02
        sunLightingArray[2].intensity -= 0.02
        sunLightingArray[3].intensity += 0.02
        sunLightingArray[4].intensity -= 0.02
    } else {
        sunLightingArray[0].intensity -= 0.02
        sunLightingArray[1].intensity -= 0.02
        sunLightingArray[2].intensity += 0.02
        sunLightingArray[3].intensity -= 0.02
        sunLightingArray[4].intensity += 0.02
    }
}


function animatePhase4() {
    if (moon.material.opacity < 1) {
        moon.material.opacity += 0.1
    } else if (moonOrbit.rotation.y < 0) {
        moonOrbit.rotation.y += 0.1
    } else if (camera.rotation.y < Math.PI * 2) {
        camera.rotation.y += 0.1
        moonOrbit.rotation.y += 0.1    
    } else if (moonOrbit.rotation.y < Math.PI * 3) {
        moonOrbit.rotation.y += 0.1
    } else {
        scene.remove(textMesh)
        loadFont('God made two great lights—the greater light to govern the day \n and the lesser light to govern the night. He also made the stars. \n\n\n\nGod set them in the vault of the sky to give light on the earth,\n to govern the day and the night, and to separate light from darkness.')
        return true
    }
}

function animatePhase5() {
    // get textMesh into proper y position
    if (textMesh.position.y < 6) {
        textMesh.position.y += 0.1
        // next make text non-opaque
    } else if (textMesh.material[0].opacity == 0) {
        // start increasing opacity, increase ambient light
        ambientLight.intensity = 0.75
        textMesh.material[0].opacity += 0.1
        textMesh.material[1].opacity += 0.1
        // finally bring opacity to 1
    } else if (textMesh.material[0].opacity < 1) {
        textMesh.material[0].opacity += 0.1
        textMesh.material[1].opacity += 0.1
    } else {
        scene.remove(textMesh)
        return true
    }
}

function animatePhase6() {
    if (camera.rotation.y < Math.PI * 2.25) {
        camera.rotation.y += 0.01
    }
    if (camera.position.z < 5) {
        camera.position.z += 0.1
    }
    if (camera.position.x < 100) {
        camera.position.x += 0.5
    }
    if (earth.material.opacity < 1) {
        earth.material.opacity += 1
    }
    if (camera.position.x >= 100 && camera.position.z >= 5 && camera.rotation.y >= Math.PI * 2.25 && itWasGood == false) {
        itWasGood = true
        textMeshY = 60
        // textMeshZ = camera.position.z -15
        size = 10        
        textMeshRotation = camera.rotation.y       
        loadFont('And God saw that it was good.')
        textMesh.material[0].opacity = 0
        textMesh.material[1].opacity = 0
    } else if (itWasGood) {
        if (textMesh.material[0].opacity < 1) {
            textMesh.material[0].opacity += 0.1
            textMesh.material[1].opacity += 0.1
        }
    }
    earth.rotation.y += 0.001
    moonOrbit.rotation.y += 0.000037
    moon.rotation.y += 0.000037
    earthOrbit.rotation.y += 0.00001
}



window.addEventListener( 'resize', onWindowResize, false )

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
