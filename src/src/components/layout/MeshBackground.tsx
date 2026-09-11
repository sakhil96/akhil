export function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian" aria-hidden>
      <div className="mesh-orb -left-24 -top-32 h-[34rem] w-[34rem] bg-iris/25" />
      <div className="mesh-orb top-[18%] -right-28 h-[32rem] w-[32rem] bg-sky-500/15" />
      <div className="mesh-orb bottom-[-12%] left-[22%] h-[28rem] w-[28rem] bg-aqua/12" />
      <div className="mesh-orb top-[48%] left-[38%] h-[18rem] w-[18rem] bg-indigo-700/20" />
      <div className="absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(5,6,11,0.55)_70%,#05060b_100%)]" />
    </div>
  );
}
