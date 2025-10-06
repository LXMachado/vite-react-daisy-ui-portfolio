import React, { Suspense, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

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
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl bg-white/80 text-center text-sm text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.2)] dark:bg-surface/80 dark:text-ink-muted dark:shadow-inner">
          3D preview unavailable. Try refreshing the page.
        </div>
      )
    }

    return this.props.children
  }
}

const WireframeOrb = ({ reduceMotion }) => {
  const groupRef = React.useRef()
  const isHovered = React.useRef(false)
  const edgesGeometry = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.35, 2)
    const edges = new THREE.EdgesGeometry(base)
    base.dispose()
    return edges
  }, [])

  useEffect(() => {
    return () => {
      edgesGeometry.dispose()
    }
  }, [edgesGeometry])

  useFrame((state, delta) => {
    if (!groupRef.current || reduceMotion) return

    const elapsed = state.clock.elapsedTime
    const baseRotationX = Math.sin(elapsed * 0.25) * 0.35
    const baseRotationY = Math.cos(elapsed * 0.22) * 0.45
    const hoverStrength = isHovered.current ? 0.55 : 0.2
    const targetRotationX = baseRotationX + state.pointer.y * hoverStrength
    const targetRotationY = baseRotationY + state.pointer.x * hoverStrength

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.08 + delta * 0.3,
    )

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.08 + delta * 0.3,
    )

    groupRef.current.position.y = Math.sin(elapsed * 0.5) * 0.08
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        isHovered.current = true
      }}
      onPointerOut={() => {
        isHovered.current = false
      }}
    >
      <mesh>
        <icosahedronGeometry args={[1.18, 3]} />
        <meshStandardMaterial
          color="#070d1b"
          emissive="#38bdf8"
          emissiveIntensity={0.25}
          metalness={0.55}
          roughness={0.35}
          transparent
          opacity={0.45}
        />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </lineSegments>
      <points>
        <icosahedronGeometry args={[1.28, 4]} />
        <pointsMaterial color="#a855f7" size={0.035} sizeAttenuation transparent opacity={0.75} />
      </points>
    </group>
  )
}

const Lights = () => (
  <group>
    <ambientLight intensity={0.75} color="#93c5fd" />
    <directionalLight position={[2.5, 2.5, 4]} intensity={0.6} color="#38bdf8" />
    <pointLight position={[-2, -1, -3]} intensity={0.45} color="#c084fc" />
  </group>
)

const Scene = ({ reduceMotion }) => (
  <>
    <Lights />
    <WireframeOrb reduceMotion={reduceMotion} />
  </>
)

const CanvasFallback = () => (
  <div className="absolute inset-0 bg-slate-200/70 dark:bg-slate-900/70" aria-hidden="true" />
)

const HeroCanvasInner = ({ reduceMotion }) => (
  <Canvas
    className="h-full w-full"
    dpr={[1, 2]}
    camera={{ position: [0, 0, 5], fov: 48 }}
    gl={{ alpha: true, antialias: true }}
    frameloop={reduceMotion ? "demand" : "always"}
  >
    <Scene reduceMotion={reduceMotion} />
  </Canvas>
)

const HeroCanvas = ({ reduceMotion }) => {
  useEffect(() => {
    if (typeof window === "undefined") return
    const rafId = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"))
    })
    return () => window.cancelAnimationFrame(rafId)
  }, [])

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
