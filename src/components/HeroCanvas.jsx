import React, { Suspense, useEffect } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
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

const LogoBillboard = ({ reduceMotion }) => {
  const groupRef = React.useRef()
  const materialRef = React.useRef()
  const isHovered = React.useRef(false)

  const logoTexture = useLoader(THREE.TextureLoader, "/images/img/AM.png")

  useEffect(() => {
    if (!logoTexture) return
    logoTexture.colorSpace = THREE.SRGBColorSpace
    logoTexture.anisotropy = 8
  }, [logoTexture])

  useFrame((state, delta) => {
    if (!groupRef.current || reduceMotion) return

    const elapsed = state.clock.elapsedTime
    const baseRotationX = Math.sin(elapsed * 0.25) * 0.18
    const baseRotationY = Math.cos(elapsed * 0.22) * 0.25
    const hoverStrength = isHovered.current ? 0.45 : 0.18
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

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.sin(elapsed * 0.18) * 0.1,
      0.05 + delta * 0.2,
    )

    groupRef.current.position.y = Math.sin(elapsed * 0.6) * 0.04

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        isHovered.current ? 0.45 : 0.18,
        0.12,
      )
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        isHovered.current ? 1 : 0.92,
        0.08,
      )
    }
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
      onPointerMove={(event) => {
        event.stopPropagation()
        isHovered.current = true
      }}
      onPointerDown={() => {
        isHovered.current = true
      }}
      onPointerUp={() => {
        isHovered.current = false
      }}
    >
      <mesh>
        <planeGeometry args={[2.3, 2.3, 1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          map={logoTexture}
          transparent
          opacity={0.92}
          roughness={0.35}
          metalness={0.25}
          emissive="#1d4ed8"
          emissiveIntensity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial color="#0f172a" opacity={0.55} transparent />
      </mesh>
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
    <LogoBillboard reduceMotion={reduceMotion} />
  </>
)

const CanvasFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-slate-200/70 dark:bg-slate-900/70" aria-hidden="true">
    <img src="/images/img/AM.png" alt="Alexandre Machado logo" className="h-3/4 w-auto drop-shadow-xl" />
  </div>
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
