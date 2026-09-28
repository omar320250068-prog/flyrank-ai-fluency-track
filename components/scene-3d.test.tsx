import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Scene3DLazy } from './scene-3d-lazy';

describe('Scene3DLazy Component', () => {
  it('renders static 2D SVG fallback when reducedMotion is enabled', () => {
    render(<Scene3DLazy reducedMotion={true} />);

    expect(screen.getByLabelText('Static 3D core representation')).toBeDefined();
    expect(screen.getByText(/Static 2D fallback mode/i)).toBeDefined();
  });

  it('renders 3D container element when reducedMotion is false', () => {
    const { container } = render(<Scene3DLazy reducedMotion={false} />);
    expect(container.querySelector('.scene-3d-container')).not.toBeNull();
  });
});
