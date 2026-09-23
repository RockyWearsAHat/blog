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
    progress.current = THREE.MathUtils.lerp(progress.current, scrollProgress || 0, .085)
  })
  return progress
}

function useSeeded(count, map) {
  return useMemo(() => {
    let seed = 19381
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    return Array.from({ length: count }, (_, i) => map(i, rand))
  }, [count, map])
}

function NeonSky({ progress }) {
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
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      void main(){
        vec3 dir = normalize(vPos);
        float h = smoothstep(-0.3, 0.65, dir.y);
        float glow = smoothstep(0.02, .86, 1.0 - abs(dir.y));
        vec3 deep = vec3(0.005, 0.01, 0.02);
        vec3 top = vec3(0.02, 0.12, 0.18);
        vec3 cyan = vec3(0.10, 1.0, 0.86);
        vec3 pink = vec3(1.0, 0.16, 0.64);
        vec3 violet = vec3(0.28, 0.12, 0.9);
        vec3 col = mix(deep, top, h);
        col = mix(col, cyan, glow * 0.12);
        col = mix(col, pink, glow * 0.16);
        col += violet * (0.05 + uProgress * 0.06) * (1.0 - h);
        float grain = hash(floor(dir.xz * 160.0));
        col += vec3(step(0.997, grain)) * 0.12;
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
  return <mesh scale={140}><sphereGeometry args={[1, 48, 32]} /><primitive object={material} attach="material" /></mesh>
}

function WetFloor({ progress }) {
  const mat = useRef()
  useFrame(() => {
    const p = progress.current
    if (mat.current) mat.current.opacity = 0.34 + span(p, .18, .76) * 0.24
  })
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, -30]}>
        <planeGeometry args={[34, 140]} />
        <meshStandardMaterial color="#07090d" roughness={0.12} metalness={0.28} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.948, -30]}>
        <planeGeometry args={[34, 140]} />
        <meshBasicMaterial ref={mat} color="#12ffd4" transparent opacity={0.32} />
      </mesh>
    </>
  )
}

function TunnelSegments({ progress }) {
  const { scene } = useGLTF('/models/tunnel_opt.glb')
  const groups = useRef([])
  const count = 18
  const spacing = 6.5
  const clones = useMemo(() => Array.from({ length: count }, () => {
    const root = scene.clone(true)
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false
        obj.receiveShadow = true
        obj.material = new THREE.MeshToonMaterial({
          color: new THREE.Color('#263841')
        })
      }
    })
    return root
  }), [scene])

  useFrame(() => {
    const p = progress.current
    const chase = span(p, .12, .64)
    const spin = span(p, .66, .84)
    const speed = 18 + chase * 98
    const offset = p * speed * 8.4
    groups.current.forEach((g, i) => {
      if (!g) return
      const z = (((-i * spacing) + offset + count * spacing) % (count * spacing)) - count * spacing
      g.position.set(0, -0.82, z)
      g.rotation.z = spin * -1.02
    })
  })

  return (
    <group>
      {clones.map((clone, i) => (
        <group key={i} ref={(el) => { groups.current[i] = el }} scale={[1.82, 18, 8.8]}>
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
    const spin = span(p, .66, .84)
    const speed = 16 + chase * 84
    const offset = p * speed * 7.6
    ribs.current.forEach((rib, i) => {
      if (!rib) return
      rib.position.z = (((-i * 4.8) + offset + count * 4.8) % (count * 4.8)) - count * 4.8
      rib.rotation.z = spin * -1.01
    })
    stripLights.current.forEach((light, i) => {
      if (!light) return
      light.position.z = (((-i * 3.4) + offset * 1.18 + count * 4.8) % (count * 4.8)) - count * 4.8
      light.rotation.z = spin * -1.01
      light.material.opacity = .18 + chase * .36
    })
  })

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i} ref={(el) => { ribs.current[i] = el }} position={[0, 1.62, -i * 4.8]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[5.15, .08, 10, 32, Math.PI]} />
            <meshToonMaterial color="#10131a" />
          </mesh>
          <mesh position={[0, .16, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[4.84, .035, 8, 28, Math.PI]} />
            <meshBasicMaterial color="#ff3dc8" transparent opacity={.48} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={`l-${i}`} ref={(el) => { stripLights.current[i] = el }} position={[0, 3.56, -i * 3.4]}>
          <boxGeometry args={[.24, .08, 2.35]} />
          <meshBasicMaterial color="#c8fff5" transparent opacity={.36} />
        </mesh>
      ))}
    </group>
  )
}

function LaneMarks({ progress }) {
  const ref = useRef()
  const marks = useSeeded(82, (i) => ({ z: -i * 4 }))
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .16, .64)
    const speed = 14 + chase * 90
    const offset = p * speed * 7.2
    marks.forEach((d, i) => {
      const z = ((d.z + offset + 360) % 360) - 360
      dummy.position.set(0, -.73, z)
      dummy.rotation.set(-Math.PI / 2, 0, 0)
      dummy.scale.set(.11, 1.22, 1.5)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, marks.length]}>
      <boxGeometry args={[1, .04, 1]} />
      <meshBasicMaterial color="#f7efd8" transparent opacity={.82} />
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
    const speed = 16 + chase * 92
    const offset = p * speed * 7.2
    bars.forEach((d, i) => {
      const z = ((d.z + offset + 280) % 280) - 280
      dummy.position.set(d.side * 4.03, -.58, z)
      dummy.scale.set(1.6, .06, 1.2)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, bars.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#13ffd7" transparent opacity={.16} />
    </instancedMesh>
  )
}

function NeonBillboards({ progress }) {
  const groups = useRef([])
  const signs = useSeeded(28, (i, rand) => ({
    side: i % 2 ? -1 : 1,
    z: -8 - i * 7.2 - rand() * 4,
    y: .7 + rand() * 2.4,
    w: .8 + rand() * 1.1,
    h: .7 + rand() * 1.2,
    tilt: (rand() - .5) * .18,
    color: ['#13ffd7', '#ff3dc8', '#7f4cff', '#73ff5b'][i % 4]
  }))
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .16, .64)
    const spin = span(p, .66, .84)
    const speed = 14 + chase * 88
    const offset = p * speed * 7.8
    groups.current.forEach((g, i) => {
      const d = signs[i]
      if (!g) return
      const z = ((d.z + offset + 260) % 260) - 260
      g.position.set(d.side * 6.4, d.y, z)
      g.rotation.set(0, d.side * (.18 + d.tilt), spin * -1.02)
    })
  })
  return (
    <group>
      {signs.map((d, i) => (
        <group key={i} ref={(el) => { groups.current[i] = el }}>
          <mesh>
            <boxGeometry args={[d.w, d.h, .08]} />
            <meshToonMaterial color="#0d1016" />
          </mesh>
          <mesh position={[0, 0, .045]}>
            <planeGeometry args={[d.w * .82, d.h * .74]} />
            <meshBasicMaterial color={d.color} transparent opacity={.82} />
          </mesh>
          <mesh position={[0, -d.h * .62, 0]}>
            <boxGeometry args={[.06, d.h * 1.15, .06]} />
            <meshToonMaterial color="#121418" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function McLarenCar({ progress }) {
  const { scene } = useGLTF('/models/mclaren_opt_balanced.glb')
  const group = useRef()
  const glowLeft = useRef()
  const glowRight = useRef()
  const glowBottom = useRef()
  const car = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        obj.material = new THREE.MeshPhysicalMaterial({
          color: '#030408',
          roughness: 0.2,
          metalness: 0.92,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          emissive: '#100014',
          emissiveIntensity: 0.22
        })
      }
    })
    return root
  }, [scene])

  useFrame((state) => {
    const p = progress.current
    const pan = span(p, .14, .34)
    const chase = span(p, .34, .6)
    const flare = span(p, .56, .76)
    const spin = span(p, .68, .86)
    const land = span(p, .84, .99)
    const bob = Math.sin(state.clock.elapsedTime * 5.6) * .012
    if (!group.current) return
    group.current.position.set(lerp(0, -1.72, pan) + chase * .42, -0.9 - land * .72 + bob, lerp(1.25, -4.8, chase) - flare * .32 - land * 2.2)
    group.current.rotation.set(.015, lerp(0, -.44, pan) + chase * .14, spin * -.96)
    group.current.scale.setScalar(1.0 - chase * .14 - land * .18)
    const glow = .18 + chase * .34
    if (glowLeft.current) glowLeft.current.material.opacity = glow
    if (glowRight.current) glowRight.current.material.opacity = glow * .86
    if (glowBottom.current) glowBottom.current.material.opacity = .08 + chase * .16
  })

  return (
    <group ref={group}>
      <primitive object={car} scale={0.92} />
      <mesh ref={glowLeft} position={[-.9, -.48, .2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 4.4]} />
        <meshBasicMaterial color="#12ffd7" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={glowRight} position={[.9, -.48, .1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 4.4]} />
        <meshBasicMaterial color="#ff3dc8" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={glowBottom} position={[0, -.49, .1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.1, 4.8]} />
        <meshBasicMaterial color="#7f4cff" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function MotionStreaks({ progress }) {
  const group = useRef()
  const lines = useSeeded(110, (i, rand) => ({
    x: (rand() - .5) * 12,
    y: -.4 + rand() * 5.2,
    z: -rand() * 100,
    len: 2 + rand() * 16,
    hot: rand() > .5,
    color: rand() > .5 ? '#ff3dc8' : '#13ffd7'
  }))
  useFrame(() => {
    const p = progress.current
    const chase = span(p, .3, .84)
    if (!group.current) return
    group.current.visible = chase > .01
    group.current.children.forEach((line, i) => {
      const d = lines[i]
      line.position.set(d.x, d.y, ((d.z + p * 240) % 104) - 96)
      line.scale.set(1, 1, .55 + chase * 3.3)
      line.material.opacity = chase * (d.hot ? .46 : .2)
    })
  })
  return (
    <group ref={group}>
      {lines.map((d, i) => (
        <mesh key={i}>
          <boxGeometry args={[.022, .022, d.len]} />
          <meshBasicMaterial color={d.color} transparent opacity={0} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

function ImpactGrid({ progress }) {
  const ref = useRef()
  useFrame(() => {
    const p = progress.current
    const burst = span(p, .56, .8) * (1 - span(p, .82, .96))
    if (!ref.current) return
    ref.current.visible = burst > .02
    ref.current.material.opacity = burst * .22
    ref.current.rotation.z = -Math.PI / 6 - burst * .42
    ref.current.position.set(0.3, 0.28, -7.2)
    ref.current.scale.set(1 + burst * .32, 1 + burst * .32, 1)
  })
  return (
    <mesh ref={ref}>
      <planeGeometry args={[24, 14, 36, 36]} />
      <meshBasicMaterial color="#ff3dc8" wireframe transparent opacity={0} />
    </mesh>
  )
}

function CockpitFrame({ progress }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.visible = span(progress.current, 0, .24) > .02
  })
  return (
    <group ref={ref} position={[0, 0, 1.6]}>
      <mesh position={[0, -1.45, -2.1]} rotation={[-.18, 0, 0]}>
        <boxGeometry args={[6.2, 1.4, 2.6]} />
        <meshToonMaterial color="#05060a" />
      </mesh>
      <mesh position={[-2.3, .55, -1.8]} rotation={[0, 0, .22]}>
        <boxGeometry args={[.42, 4.2, .58]} />
        <meshToonMaterial color="#08090f" />
      </mesh>
      <mesh position={[2.3, .55, -1.8]} rotation={[0, 0, -.22]}>
        <boxGeometry args={[.42, 4.2, .58]} />
        <meshToonMaterial color="#08090f" />
      </mesh>
    </group>
  )
}

function ContentRunway({ progress }) {
  const group = useRef()
  useFrame(() => {
    const p = progress.current
    const reveal = span(p, .84, .99)
    if (!group.current) return
    group.current.visible = reveal > .02
    group.current.position.y = lerp(-4.7, -.5, reveal)
    group.current.rotation.z = lerp(-.96, 0, reveal)
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
          <meshBasicMaterial color={i % 2 ? '#ff3dc8' : '#12ffd7'} transparent opacity={0} />
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
    const pan = span(p, .14, .34)
    const chase = span(p, .34, .6)
    const overdrive = span(p, .58, .82)
    const land = span(p, .84, .99)

    let cam = mixVec([0, .44, 3.3], [-4.9, 1.06, 1.52], pan)
    cam.lerp(mixVec([-2.85, 1.22, 2.2], [0, 1.7, 5.8], chase), chase)
    cam.lerp(new THREE.Vector3(.15, 2.9, 6.6), land)
    state.camera.position.copy(cam)

    const target = mixVec([0, -.3, -8], [-1.86, -.1, -2.8], pan)
    target.lerp(new THREE.Vector3(0, -.18, -5.8), chase)
    target.lerp(new THREE.Vector3(0, -.72, -2.15), land)
    state.camera.lookAt(target)
    state.camera.rotation.z += overdrive * -Math.PI * .5
    state.camera.fov = lerp(54, 80, span(p, .2, .78)) - land * 12
    state.camera.updateProjectionMatrix()
    state.gl.setClearColor('#040507')
  })

  return (
    <>
      <fog attach="fog" args={['#040507', 12, 52]} />
      <ambientLight intensity={0.92} />
      <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow color="#e5fff4" />
      <pointLight position={[-3.8, 2.2, -3]} intensity={8.6} color="#14ffd8" />
      <pointLight position={[3.8, 2.1, -5]} intensity={8.6} color="#ff3dc8" />
      <pointLight position={[0, 2.8, -9]} intensity={5.4} color="#7f4cff" />
      <pointLight position={[0, .2, -4]} intensity={2.8} color="#73ff5b" />
      <NeonSky progress={progress} />
      <WetFloor progress={progress} />
      <Suspense fallback={null}>
        <TunnelSegments progress={progress} />
        <McLarenCar progress={progress} />
      </Suspense>
      <TunnelRibs progress={progress} />
      <LaneMarks progress={progress} />
      <SideRails progress={progress} />
      <NeonBillboards progress={progress} />
      <MotionStreaks progress={progress} />
      <ImpactGrid progress={progress} />
      <CockpitFrame progress={progress} />
      <ContentRunway progress={progress} />
    </>
  )
}

function Overlay({ scrollProgress }) {
  const flash = span(scrollProgress, .56, .7) * (1 - span(scrollProgress, .72, .86))
  const wedges = span(scrollProgress, .6, .82) * (1 - span(scrollProgress, .84, .96))
  const grid = span(scrollProgress, .62, .84) * (1 - span(scrollProgress, .86, .98))
  const streaks = span(scrollProgress, .3, .86)
  return (
    <>
      <div className="phase-flash" style={{ opacity: flash * .88 }} />
      <div className="impact-wedges" style={{ opacity: wedges * .78 }} />
      <div className="grid-burst" style={{ opacity: grid * .72 }} />
      <div className="streak-bloom" style={{ opacity: streaks * .34 }} />
    </>
  )
}

export default function CinematicCanvas({ scrollProgress = 0 }) {
  const reduced = useReducedMotion()
  return (
    <div className="cinema-canvas neon-cinema" style={{ '--scene-progress': scrollProgress }}>
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

useGLTF.preload('/models/mclaren_opt_balanced.glb')
useGLTF.preload('/models/tunnel_opt.glb')
