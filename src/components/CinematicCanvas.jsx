import { Canvas, useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useMemo, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)
const span = (p, a, b) => smooth(clamp01((p - a) / (b - a)))
const lerp = (a, b, t) => a + (b - a) * t
const mixVec = (a, b, t) => new THREE.Vector3(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t))

function useProgressRef(scrollProgress) {
  const progress = useRef(scrollProgress || 0)
  useFrame(() => {
    progress.current = THREE.MathUtils.lerp(progress.current, scrollProgress || 0, .09)
  })
  return progress
}

function useSeeded(count, map) {
  return useMemo(() => {
    let seed = 17321
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    return Array.from({ length: count }, (_, i) => map(i, rand))
  }, [count, map])
}

function SkyDome({ progress }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uProgress: { value: 0 } },
    vertexShader: `
      varying vec3 vPos;
      void main(){
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      varying vec3 vPos;
      float line(float x, float w){ return 1.0 - smoothstep(0.0, w, abs(fract(x) - .5)); }
      float noise(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      void main(){
        vec3 dir = normalize(vPos);
        float horizon = smoothstep(-0.3, 0.5, dir.y);
        float sunset = smoothstep(0.05, .9, 1.0 - abs(dir.y));
        vec3 deep = vec3(0.01, 0.01, 0.018);
        vec3 top = vec3(0.02, 0.03, 0.06);
        vec3 pink = vec3(1.0, 0.14, 0.58);
        vec3 orange = vec3(1.0, 0.43, 0.18);
        vec3 cream = vec3(0.98, 0.91, 0.82);
        float grid = line(dir.x * 12.0 + uTime * .04, .022) * line(dir.z * 8.0, .03);
        float stars = step(.9945, noise(floor(dir.xz * 120.0)));
        vec3 col = mix(deep, top, horizon);
        col = mix(col, pink, sunset * .28);
        col = mix(col, orange, sunset * .12);
        col += cream * grid * (.04 + uProgress * .08);
        col += vec3(stars) * horizon * .2;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  }), [])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uProgress.value = progress.current
  })

  return (
    <mesh scale={120}>
      <sphereGeometry args={[1, 48, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, -28]}>
      <planeGeometry args={[34, 120]} />
      <meshBasicMaterial color="#16070f" transparent opacity={0.65} />
    </mesh>
  )
}

function TunnelSegments({ progress }) {
  const { scene } = useGLTF('/models/tunnel/scene.gltf')
  const groups = useRef([])
  const count = 18
  const spacing = 6.5
  const clones = useMemo(() => Array.from({ length: count }, () => {
    const root = scene.clone(true)
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false
        obj.receiveShadow = true
        const baseMap = obj.material?.map || null
        const mat = new THREE.MeshStandardMaterial({
          map: baseMap,
          color: new THREE.Color('#d2c8bb'),
          roughness: 0.88,
          metalness: 0.06
        })
        if (mat.map) {
          mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping
          mat.map.repeat.set(1, 1)
        }
        obj.material = mat
      }
    })
    return root
  }), [scene])

  useFrame(() => {
    const p = progress.current
    const chase = span(p, .14, .62)
    const spin = span(p, .62, .82)
    const speed = 18 + chase * 92
    const offset = (p * speed * 8.2)
    groups.current.forEach((g, i) => {
      if (!g) return
      const z = (((-i * spacing) + offset + count * spacing) % (count * spacing)) - count * spacing
      g.position.set(0, -0.82, z)
      g.rotation.z = spin * -.95
    })
  })

  return (
    <group>
      {clones.map((clone, i) => (
        <group
          key={i}
          ref={(el) => { groups.current[i] = el }}
          scale={[1.82, 18, 8.8]}
        >
          <primitive object={clone} />
        </group>
      ))}
    </group>
  )
}

function TunnelRibs({ progress }) {
  const ribs = useRef([])
  const stripLights = useRef([])
  const count = 24
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .16, .64)
    const spin = span(p, .62, .82)
    const speed = 16 + chase * 78
    const offset = p * speed * 7.6
    ribs.current.forEach((rib, i) => {
      if (!rib) return
      rib.position.z = (((-i * 4.8) + offset + count * 4.8) % (count * 4.8)) - count * 4.8
      rib.rotation.z = spin * -.94
    })
    stripLights.current.forEach((light, i) => {
      if (!light) return
      light.position.z = (((-i * 3.4) + offset * 1.18 + count * 4.8) % (count * 4.8)) - count * 4.8
      light.rotation.z = spin * -.94
      light.material.opacity = .16 + chase * .34
    })
  })

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i} ref={(el) => { ribs.current[i] = el }} position={[0, 1.62, -i * 4.8]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[5.2, .08, 10, 32, Math.PI]} />
            <meshStandardMaterial color="#19141b" emissive="#15020d" emissiveIntensity={0.35} roughness={.5} metalness={.45} />
          </mesh>
          <mesh position={[0, .15, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[4.8, .045, 8, 28, Math.PI]} />
            <meshBasicMaterial color="#ff4dc8" transparent opacity={.42} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={`l-${i}`} ref={(el) => { stripLights.current[i] = el }} position={[0, 3.62, -i * 3.4]}>
          <boxGeometry args={[.22, .08, 2.2]} />
          <meshBasicMaterial color="#fff0d0" transparent opacity={.3} />
        </mesh>
      ))}
    </group>
  )
}

function LaneMarks({ progress }) {
  const ref = useRef()
  const marks = useSeeded(72, (i) => ({ z: -i * 4 }))
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .16, .64)
    const speed = 14 + chase * 86
    const offset = p * speed * 7.2
    marks.forEach((d, i) => {
      const z = ((d.z + offset + 320) % 320) - 320
      dummy.position.set(0, -.73, z)
      dummy.rotation.set(-Math.PI / 2, 0, 0)
      dummy.scale.set(.11, 1.22, 1.4)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, marks.length]}>
      <boxGeometry args={[1, .04, 1]} />
      <meshBasicMaterial color="#f7efd8" transparent opacity={.84} />
    </instancedMesh>
  )
}

function SideRails({ progress }) {
  const ref = useRef()
  const bars = useSeeded(120, (i) => ({ z: -i * 2.2, side: i % 2 ? -1 : 1 }))
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .16, .64)
    const speed = 16 + chase * 90
    const offset = p * speed * 7.2
    bars.forEach((d, i) => {
      const z = ((d.z + offset + 280) % 280) - 280
      dummy.position.set(d.side * 4.02, -.58, z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(1.6, .06, 1.2)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, bars.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ff4dc8" transparent opacity={.18} />
    </instancedMesh>
  )
}

function McLarenCar({ progress }) {
  const { scene } = useGLTF('/models/mclaren/scene.gltf')
  const group = useRef()
  const car = useMemo(() => {
    const root = scene.clone(true)
    const wheels = []
    root.traverse((obj) => {
      if (/P1-Wheel/i.test(obj.name)) wheels.push(obj)
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        const matName = obj.material?.name || ''
        let nextMaterial
        if (/Glass|Mirror/i.test(matName)) {
          nextMaterial = new THREE.MeshPhysicalMaterial({
            color: '#c4c8d6',
            roughness: 0.06,
            metalness: 0,
            transmission: 0.45,
            transparent: true,
            opacity: 0.48
          })
        } else if (/HeadlightsEmissive|Headlights/i.test(matName)) {
          nextMaterial = new THREE.MeshBasicMaterial({ color: '#fff4cf' })
        } else if (/Taillights/i.test(matName)) {
          nextMaterial = new THREE.MeshBasicMaterial({ color: '#ff4dc8' })
        } else if (/WhitePaintjob|Blue|Glossy/i.test(matName)) {
          nextMaterial = new THREE.MeshPhysicalMaterial({
            color: '#efe9dc',
            roughness: 0.18,
            metalness: 0.72,
            clearcoat: 1,
            clearcoatRoughness: 0.12,
            emissive: '#14040d',
            emissiveIntensity: 0.18
          })
        } else if (/Carbon|Black|Plastics|Plate/i.test(matName)) {
          nextMaterial = new THREE.MeshStandardMaterial({ color: '#101015', roughness: 0.42, metalness: 0.68 })
        } else if (/Rims|Brake|Brakes|Mechanicals|Pipes|Exhaust/i.test(matName)) {
          nextMaterial = new THREE.MeshStandardMaterial({ color: '#8f949e', roughness: 0.28, metalness: 0.92 })
        } else if (/tires/i.test(matName)) {
          nextMaterial = new THREE.MeshStandardMaterial({ color: '#040404', roughness: 0.78, metalness: 0.1 })
        } else if (/Interior|SafetyBelt|Stitchwork/i.test(matName)) {
          nextMaterial = new THREE.MeshStandardMaterial({ color: '#3d3241', roughness: 0.72, metalness: 0.12 })
        } else if (/Decals|Details|Grid/i.test(matName)) {
          nextMaterial = new THREE.MeshStandardMaterial({ color: '#f6efe0', roughness: 0.35, metalness: 0.48 })
        } else {
          nextMaterial = new THREE.MeshStandardMaterial({ color: obj.material?.color?.clone?.() || new THREE.Color('#c0bcc0'), roughness: 0.42, metalness: 0.36 })
        }
        obj.material = nextMaterial
      }
    })
    return { root, wheels }
  }, [scene])

  useFrame((state) => {
    const p = progress.current
    const pan = span(p, .16, .34)
    const chase = span(p, .34, .58)
    const flare = span(p, .58, .74)
    const spin = span(p, .7, .86)
    const land = span(p, .84, .98)
    const bob = Math.sin(state.clock.elapsedTime * 6) * .015
    if (!group.current) return
    group.current.visible = true
    group.current.position.set(lerp(0, -1.6, pan) + chase * .38, -0.88 - land * .72 + bob, lerp(1.4, -4.6, chase) - flare * .5 - land * 2.4)
    group.current.rotation.set(.015, lerp(0, -.42, pan) + chase * .16, spin * -.92)
    group.current.scale.setScalar(1.02 - chase * .16 - land * .2)
    car.wheels.forEach((wheel) => { if (wheel) wheel.rotation.x -= .28 + chase * 1.3 })
  })

  return (
    <group ref={group}>
      <primitive object={car.root} scale={0.92} />
    </group>
  )
}

function MotionStreaks({ progress }) {
  const group = useRef()
  const lines = useSeeded(86, (i, rand) => ({
    x: (rand() - .5) * 10.5,
    y: -.2 + rand() * 4.8,
    z: -rand() * 90,
    len: 2 + rand() * 13,
    hot: rand() > .58
  }))
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .34, .78)
    if (!group.current) return
    group.current.visible = chase > .01
    group.current.children.forEach((line, i) => {
      const d = lines[i]
      line.position.set(d.x, d.y, ((d.z + p * 230) % 100) - 92)
      line.scale.set(1, 1, .45 + chase * 2.8)
      line.material.opacity = chase * (d.hot ? .54 : .22)
    })
  })
  return (
    <group ref={group}>
      {lines.map((d, i) => (
        <mesh key={i}>
          <boxGeometry args={[.025, .025, d.len]} />
          <meshBasicMaterial color={d.hot ? '#ff4dc8' : '#fff5d8'} transparent opacity={0} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

function ImpactGrid({ progress }) {
  const ref = useRef()
  useFrame(() => {
    const p = progress.current
    const burst = span(p, .54, .78) * (1 - span(p, .8, .96))
    if (!ref.current) return
    ref.current.visible = burst > .02
    ref.current.material.opacity = burst * .32
    ref.current.rotation.z = -Math.PI / 6 - burst * .5
    ref.current.position.set(0.4, 0.4, -7.5)
    ref.current.scale.set(1 + burst * .35, 1 + burst * .35, 1)
  })
  return (
    <mesh ref={ref}>
      <planeGeometry args={[22, 14, 40, 40]} />
      <meshBasicMaterial color="#ff4dc8" wireframe transparent opacity={0} />
    </mesh>
  )
}

function CockpitFrame({ progress }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.visible = span(progress.current, 0, .26) > .02
  })
  return (
    <group ref={ref} position={[0, 0, 1.6]}>
      <mesh position={[0, -1.45, -2.1]} rotation={[-.18, 0, 0]}>
        <boxGeometry args={[6.2, 1.4, 2.6]} />
        <meshStandardMaterial color="#07070a" roughness={.7} metalness={.08} />
      </mesh>
      <mesh position={[-2.3, .55, -1.8]} rotation={[0, 0, .22]}>
        <boxGeometry args={[.42, 4.2, .58]} />
        <meshStandardMaterial color="#09090d" roughness={.55} />
      </mesh>
      <mesh position={[2.3, .55, -1.8]} rotation={[0, 0, -.22]}>
        <boxGeometry args={[.42, 4.2, .58]} />
        <meshStandardMaterial color="#09090d" roughness={.55} />
      </mesh>
      <mesh position={[0, -.62, -1.48]}>
        <torusGeometry args={[.5, .07, 10, 28]} />
        <meshStandardMaterial color="#14141b" metalness={.52} roughness={.34} />
      </mesh>
      <mesh position={[0, -.12, -1.82]}>
        <boxGeometry args={[1.46, .34, .08]} />
        <meshBasicMaterial color="#ff4dc8" transparent opacity={.46} />
      </mesh>
    </group>
  )
}

function ContentRunway({ progress }) {
  const group = useRef()
  useFrame(() => {
    const p = progress.current
    const reveal = span(p, .82, .99)
    if (!group.current) return
    group.current.visible = reveal > .02
    group.current.position.y = lerp(-4.7, -.52, reveal)
    group.current.rotation.z = lerp(-.95, 0, reveal)
    group.current.scale.setScalar(lerp(.38, 1, reveal))
    group.current.children.forEach((child, i) => {
      if (child.material) child.material.opacity = reveal * (.6 + i * .06)
    })
  })
  return (
    <group ref={group} position={[0, -4.7, -2.4]}>
      {['Writing', 'Workflow', 'Builds', 'Hire'].map((label, i) => (
        <mesh key={label} position={[(i - 1.5) * 1.7, 0, -i * .4]}>
          <boxGeometry args={[1.28, .08, .72]} />
          <meshBasicMaterial color={i % 2 ? '#ff4dc8' : '#f8f0da'} transparent opacity={0} />
          <Html center className="runway-label"><span>{label}</span></Html>
        </mesh>
      ))}
    </group>
  )
}

function Scene({ scrollProgress }) {
  const progress = useProgressRef(scrollProgress)

  useFrame((state) => {
    const p = progress.current
    const pan = span(p, .16, .34)
    const chase = span(p, .34, .58)
    const overdrive = span(p, .58, .78)
    const land = span(p, .82, .99)

    let cam = mixVec([0, .44, 3.3], [-4.6, 1.0, 1.5], pan)
    cam.lerp(mixVec([-2.8, 1.2, 2.2], [0, 1.75, 5.8], chase), chase)
    cam.lerp(new THREE.Vector3(.15, 2.9, 6.6), land)
    state.camera.position.copy(cam)

    const target = mixVec([0, -.3, -8], [-1.8, -.1, -2.8], pan)
    target.lerp(new THREE.Vector3(0, -.15, -5.7), chase)
    target.lerp(new THREE.Vector3(0, -.72, -2.15), land)
    state.camera.lookAt(target)
    state.camera.rotation.z += overdrive * -Math.PI * .48
    state.camera.fov = lerp(54, 78, span(p, .2, .76)) - land * 12
    state.camera.updateProjectionMatrix()
    state.gl.setClearColor('#050506')
  })

  return (
    <>
      <fog attach="fog" args={['#050506', 16, 58]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 7, 5]} intensity={1.9} castShadow color="#fff0d2" />
      <pointLight position={[0, 2.2, -5.5]} intensity={5.4} color="#ff4dc8" />
      <pointLight position={[0, 3.1, -12]} intensity={2.4} color="#ffd6a0" />
      <SkyDome progress={progress} />
      <GroundGlow />
      <Suspense fallback={null}>
        <TunnelSegments progress={progress} />
        <McLarenCar progress={progress} />
      </Suspense>
      <TunnelRibs progress={progress} />
      <LaneMarks progress={progress} />
      <SideRails progress={progress} />
      <MotionStreaks progress={progress} />
      <ImpactGrid progress={progress} />
      <CockpitFrame progress={progress} />
      <ContentRunway progress={progress} />
      <Html position={[0, -2.2, 0]} center className="scene-caption">
        <span>mclaren + tunnel gltf · toon-premium lighting · manga flash · glitch grid</span>
      </Html>
    </>
  )
}

function Overlay({ scrollProgress }) {
  const flash = span(scrollProgress, .56, .7) * (1 - span(scrollProgress, .72, .86))
  const wedges = span(scrollProgress, .6, .8) * (1 - span(scrollProgress, .82, .94))
  const grid = span(scrollProgress, .62, .84) * (1 - span(scrollProgress, .86, .98))
  const streaks = span(scrollProgress, .34, .84)
  const phase = scrollProgress < .16 ? 'cockpit' : scrollProgress < .34 ? 'window pan' : scrollProgress < .58 ? 'tunnel chase' : scrollProgress < .82 ? 'overdrive' : 'landing'
  return (
    <>
      <div className="hud hud-left"><span>ROCKY DRIVE SYSTEM</span><strong>{phase}</strong></div>
      <div className="hud hud-right"><span>STYLE STACK</span><strong>mclaren gltf · tunnel gltf · toon premium · fx overlays</strong></div>
      <div className="speed-gauge" style={{ '--speed': scrollProgress }}><span>{Math.round(44 + scrollProgress * 151)}</span><small>mph</small></div>
      <div className="phase-flash" style={{ opacity: flash * .9 }} />
      <div className="impact-wedges" style={{ opacity: wedges * .8 }} />
      <div className="grid-burst" style={{ opacity: grid * .7 }} />
      <div className="streak-bloom" style={{ opacity: streaks * .32 }} />
    </>
  )
}

export default function CinematicCanvas({ scrollProgress = 0 }) {
  const reduced = useReducedMotion()
  return (
    <div className="cinema-canvas" style={{ '--scene-progress': scrollProgress }}>
      {!reduced && (
        <Canvas camera={{ position: [0, .5, 4.5], fov: 60 }} shadows gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} dpr={[1, 1.8]}>
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      )}
      <Overlay scrollProgress={scrollProgress} />
      <div className="window-reflection" />
      <div className="speedline-overlay" />
      <div className="ink-overlay" />
      <div className="scanline-noise" />
    </div>
  )
}

useGLTF.preload('/models/mclaren/scene.gltf')
useGLTF.preload('/models/tunnel/scene.gltf')
