import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

function getScroll() {
  const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
  return Math.min(1, Math.max(0, window.scrollY / max))
}

const inkVertex = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
void main(){
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const inkFragment = `
uniform float uTime;
uniform float uScroll;
uniform vec3 uBase;
uniform vec3 uInk;
uniform float uPink;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float hatch(vec2 p, float scale){
  float a = abs(sin((p.x + p.y) * scale));
  float b = abs(sin((p.x - p.y) * scale * 0.73));
  return smoothstep(0.76, 0.99, max(a,b));
}
void main(){
  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 2.2);
  float shade = dot(normalize(vNormal), normalize(vec3(-0.25, 0.8, 0.5))) * 0.5 + 0.5;
  float h = hatch(vUv * 1.7 + vWorld.xy * 0.03, 38.0 + uScroll * 90.0);
  float paper = hash(floor(gl_FragCoord.xy * 0.45)) * 0.08;
  vec3 pink = vec3(1.0, 0.05, 0.62);
  vec3 color = mix(uBase, uInk, h * 0.72 + fresnel * 0.35 - shade * 0.18);
  color = mix(color, pink, uPink * (0.35 + fresnel * 0.65));
  color += paper;
  gl_FragColor = vec4(color, 1.0);
}`

const burstVertex = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const burstFragment = `
uniform float uTime;
uniform float uScroll;
uniform float uPink;
varying vec2 vUv;
float line(vec2 uv, float angle, float offset){
  vec2 p = uv - .5;
  float d = abs(dot(p, vec2(cos(angle), sin(angle))) - offset);
  return smoothstep(.018, .0, d);
}
void main(){
  vec2 p = vUv - .5;
  float r = length(p);
  float a = atan(p.y, p.x);
  float rays = 0.0;
  rays += smoothstep(.985, 1.0, abs(sin(a * 14.0 + uScroll * 18.0)));
  rays += smoothstep(.965, 1.0, abs(sin(a * 23.0 - uScroll * 22.0))) * .7;
  float tunnel = smoothstep(.48, .05, r) * .25;
  float edge = smoothstep(.46, .18, r);
  float ink = (rays * edge + tunnel) * (1.0 - smoothstep(.47,.52,r));
  vec3 white = vec3(.965, .95, .9);
  vec3 black = vec3(.005, .005, .004);
  vec3 pink = vec3(1.0, .03, .58);
  vec3 color = mix(white, black, ink);
  color = mix(color, pink, uPink * ink * .6);
  gl_FragColor = vec4(color, clamp(ink + .08, 0.0, .9));
}`

function InkMaterial({ pink = 0, base = '#f4f1e8' }) {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uBase: { value: new THREE.Color(base) },
    uInk: { value: new THREE.Color('#050505') },
    uPink: { value: pink },
  }), [pink, base])
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uScroll.value = getScroll()
  })
  return <shaderMaterial uniforms={uniforms} vertexShader={inkVertex} fragmentShader={inkFragment} />
}

function Outline({ children, scale = 1.035 }) {
  return (
    <group>
      <group scale={scale}>{children('#050505', true)}</group>
      {children(null, false)}
    </group>
  )
}

function Shard({ position, rotation, scale = 1, pink = 0 }) {
  return (
    <Outline scale={1.045}>
      {(color, outline) => (
        <mesh position={position} rotation={rotation} scale={scale}>
          <octahedronGeometry args={[0.35, 0]} />
          {outline ? <meshBasicMaterial color={color} side={THREE.BackSide} /> : <InkMaterial pink={pink} />}
        </mesh>
      )}
    </Outline>
  )
}

function SpeedRay({ angle, length, width, z, pink = 0 }) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: pink ? '#ff1593' : '#050505', transparent: true, opacity: pink ? 0.62 : 0.76, side: THREE.DoubleSide }), [pink])
  return (
    <mesh rotation={[0, 0, angle]} position={[0, 0, z]} material={mat}>
      <planeGeometry args={[length, width]} />
    </mesh>
  )
}

function MangaBurst({ pinkPhase }) {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uPink: { value: 0 },
  }), [])
  useFrame((state) => {
    const s = getScroll()
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uScroll.value = s
    uniforms.uPink.value = pinkPhase(s)
  })
  return (
    <group position={[0, 0, -2.7]}>
      <mesh scale={[12, 7, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial uniforms={uniforms} vertexShader={burstVertex} fragmentShader={burstFragment} transparent depthWrite={false} />
      </mesh>
      {Array.from({ length: 34 }).map((_, i) => (
        <SpeedRay
          key={i}
          angle={(Math.PI * 2 * i) / 34 + (i % 3) * 0.07}
          length={5.5 + (i % 7) * 1.1}
          width={0.018 + (i % 5) * 0.013}
          z={0.02 + i * 0.001}
          pink={i % 7 === 0}
        />
      ))}
    </group>
  )
}

function GridFloor() {
  const ref = useRef()
  useFrame(() => {
    const s = getScroll()
    if (ref.current) {
      ref.current.position.z = -4 + s * 5
      ref.current.material.opacity = 0.2 + Math.sin(s * Math.PI) * 0.38
    }
  })
  return (
    <gridHelper ref={ref} args={[28, 44, '#ffffff', '#ffffff']} position={[0, -2.25, -4]} rotation={[0, 0, 0]}>
      <meshBasicMaterial transparent opacity={0.3} />
    </gridHelper>
  )
}

function CentralObject() {
  const group = useRef()
  const donut = useRef()
  const cube = useRef()
  useFrame((state) => {
    const s = getScroll()
    const t = state.clock.elapsedTime
    if (!group.current) return
    group.current.rotation.y = -0.55 + s * 5.3 + Math.sin(t * 0.35) * 0.04
    group.current.rotation.x = 0.18 + Math.sin(s * Math.PI * 2.0) * 0.65
    group.current.position.z = -0.6 + Math.sin(s * Math.PI) * 0.8
    group.current.scale.setScalar(1.0 + Math.sin(s * Math.PI * 3.0) * 0.28)
    if (donut.current) donut.current.visible = s < 0.54
    if (cube.current) cube.current.visible = s >= 0.38
  })
  return (
    <group ref={group}>
      <Outline scale={1.028}>
        {(color, outline) => (
          <mesh ref={donut} rotation={[Math.PI / 2, 0, 0]}>
            <torusKnotGeometry args={[0.8, 0.23, 190, 18, 2, 3]} />
            {outline ? <meshBasicMaterial color={color} side={THREE.BackSide} /> : <InkMaterial pink={0.05} />}
          </mesh>
        )}
      </Outline>
      <Outline scale={1.06}>
        {(color, outline) => (
          <mesh ref={cube} rotation={[0.72, 0.83, 0.22]}>
            <boxGeometry args={[1.32, 1.32, 1.32, 5, 5, 5]} />
            {outline ? <meshBasicMaterial color={color} side={THREE.BackSide} /> : <InkMaterial pink={0.38} base="#fff7fb" />}
          </mesh>
        )}
      </Outline>
    </group>
  )
}

function ExplodedRig() {
  const group = useRef()
  const shards = useMemo(() => Array.from({ length: 26 }).map((_, i) => {
    const a = (i / 26) * Math.PI * 2
    const r = 1.5 + (i % 6) * 0.45
    return {
      position: [Math.cos(a) * r, Math.sin(a * 1.7) * 0.65 + ((i % 4) - 1.5) * 0.35, Math.sin(a) * r * 0.45],
      rotation: [i * 0.37, a, i * 0.21],
      scale: 0.35 + (i % 5) * 0.15,
    }
  }), [])
  useFrame((state) => {
    const s = getScroll()
    const t = state.clock.elapsedTime
    const blast = THREE.MathUtils.smoothstep(s, 0.32, 0.72)
    if (!group.current) return
    group.current.visible = s > 0.18
    group.current.rotation.y = s * 2.2
    group.current.children.forEach((child, i) => {
      const base = shards[i]
      if (!base) return
      child.position.set(
        base.position[0] * (0.25 + blast * 1.15),
        base.position[1] * (0.2 + blast) + Math.sin(t + i) * 0.035,
        base.position[2] * (0.25 + blast * 1.8)
      )
      child.rotation.x += 0.005 + blast * 0.01
      child.rotation.z += 0.004
      child.scale.setScalar(base.scale * (0.35 + blast))
    })
  })
  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <Shard key={i} {...s} pink={i % 3 === 0 ? 0.9 : 0.1} />
      ))}
    </group>
  )
}

function ChromePanels() {
  const ref = useRef()
  useFrame(() => {
    const s = getScroll()
    if (ref.current) {
      ref.current.rotation.z = -0.12 + s * 0.55
      ref.current.position.y = -0.4 + Math.sin(s * Math.PI * 2) * 0.35
    }
  })
  return (
    <group ref={ref} position={[0, -0.3, -1.2]}>
      {[-2.1, -1.05, 1.05, 2.1].map((x, i) => (
        <mesh key={x} position={[x, -1.15 + (i % 2) * 0.28, -0.2]} rotation={[0.08, 0.15 * i, -0.18 + i * 0.08]}>
          <boxGeometry args={[1.8, 0.1, 0.52, 1, 1, 1]} />
          <meshStandardMaterial color={i % 2 ? '#f3f3ef' : '#101010'} roughness={0.18} metalness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function SceneRig() {
  const camera = useRef()
  const reduced = useReducedMotion()
  useFrame((state) => {
    const s = reduced ? 0.25 : getScroll()
    if (camera.current) {
      camera.current.position.x = Math.sin(s * Math.PI * 2.0) * 1.1
      camera.current.position.y = 0.3 + Math.cos(s * Math.PI * 1.2) * 0.55
      camera.current.position.z = 5.2 - s * 2.1
      camera.current.rotation.z = -0.035 + Math.sin(s * Math.PI * 3) * 0.06
      camera.current.lookAt(0, 0, 0)
    }
  })
  const pinkPhase = (s) => THREE.MathUtils.smoothstep(s, 0.28, 0.62) * (1.0 - THREE.MathUtils.smoothstep(s, 0.82, 0.98))
  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault fov={46} position={[0, 0.4, 5.2]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[-4, 5, 4]} intensity={1.65} />
      <pointLight position={[2.8, -1, 2]} intensity={pinkPhase(getScroll()) * 20} color="#ff1493" />
      <MangaBurst pinkPhase={pinkPhase} />
      <GridFloor />
      <ChromePanels />
      <CentralObject />
      <ExplodedRig />
      <Environment preset="city" />
    </>
  )
}

export default function ComicR3FScene() {
  return (
    <div className="r3f-stage" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#000000']} />
        <SceneRig />
      </Canvas>
    </div>
  )
}
