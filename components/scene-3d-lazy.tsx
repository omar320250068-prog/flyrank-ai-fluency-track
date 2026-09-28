'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { Scene3DProps } from './scene-3d';

// Dynamic lazy import to ensure Three.js WebGL canvas is only loaded on client-side
const Scene3DComponent = dynamic(
  () => import('./scene-3d').then(mod => mod.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div className="scene-fallback-skeleton">
        <div className="skeleton-ring" />
        <p className="loading-copy">Staging 3D WebGL Canvas...</p>
      </div>
    )
  }
);

export function Scene3DLazy(props: Scene3DProps) {
  return (
    <div className="scene-3d-container">
      {props.reducedMotion ? (
        <div className="scene-static-fallback" aria-label="Static 3D core representation">
          <svg className="fallback-svg" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="75" stroke="var(--accent)" strokeWidth="4" strokeDasharray="12 6" />
            <polygon points="100,45 145,135 55,135" fill="none" stroke="var(--accent-strong)" strokeWidth="3" />
            <circle cx="100" cy="100" r="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
          </svg>
          <p className="small muted">Static 2D fallback mode (reduced-motion context)</p>
        </div>
      ) : (
        <Scene3DComponent {...props} />
      )}
    </div>
  );
}
