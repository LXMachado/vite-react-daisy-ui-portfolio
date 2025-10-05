import React, { Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== "production") {
      console.error("HeroCanvas error:", error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl bg-surface/80 text-center text-sm text-ink-muted shadow-inner">
          3D preview unavailable. Try refreshing the page.
        </div>
      )
    }

    return this.props.children
  }
}

const FloatingCrystal = ({ reduceMotion }) => {
  const meshRef = React.useRef()
  const hues = useMemo(() => ["#38bdf8", "#f472b6", "#fbbf24"], [])

  useFrame((_, delta) => {
    if (reduceMotion || !meshRef.current) return
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.35
  })

  return (
    <group ref={meshRef} dispose={null}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={hues[0]}
          emissive={hues[1]}
          emissiveIntensity={0.22}
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0.5, -0.3, -0.8]}>
        <torusKnotGeometry args={[0.4, 0.12, 120, 16]} />
        <meshStandardMaterial color={hues[2]} metalness={0.4} roughness={0.25} />
      </mesh>
    </group>
  )
}

const BackgroundGradient = () => (
  <mesh position={[0, 0, -4]} receiveShadow>
    <planeGeometry args={[10, 10]} />
    <meshBasicMaterial color="#070b18" />
  </mesh>
)

const Lights = () => (
  <group>
    <ambientLight intensity={0.6} color="#0ea5e9" />
    <directionalLight position={[3, 3, 4]} intensity={0.7} color="#f472b6" castShadow />
    <pointLight position={[-4, -2, -1]} intensity={0.5} color="#fbbf24" />
  </group>
)

const Scene = ({ reduceMotion }) => (
  <>
    <color attach="background" args={["#0b1120"]} />
    <fog attach="fog" args={["#070b18", 6, 14]} />
    <Lights />
    <BackgroundGradient />
    <FloatingCrystal reduceMotion={reduceMotion} />
  </>
)

const CanvasFallback = () => (
  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-accent/30 via-highlight/20 to-amberglow/20 opacity-80" />
)

const HeroCanvasInner = ({ reduceMotion }) => (
  <Canvas
    className="h-full w-full pointer-events-none"
    dpr={[1, 2]}
    camera={{ position: [0, 0, 5], fov: 48 }}
    gl={{ alpha: true, antialias: true }}
    frameloop={reduceMotion ? "demand" : "always"}
  >
    <Scene reduceMotion={reduceMotion} />
  </Canvas>
)

const HeroCanvas = ({ reduceMotion }) => {
  return (
    <CanvasErrorBoundary>
      <Suspense fallback={<CanvasFallback />}>
        <div className="absolute inset-0">
          <HeroCanvasInner reduceMotion={reduceMotion} />
        </div>
      </Suspense>
    </CanvasErrorBoundary>
  )
}

export default HeroCanvas
