export function MeshBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="mesh-orb mesh-orb--clay" />
      <div className="mesh-orb mesh-orb--haze" />
      <div className="mesh-orb mesh-orb--sand" />
      <div className="grain" />
    </div>
  );
}
