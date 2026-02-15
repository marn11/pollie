export function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-bg-dark">
				<div
					className="
						absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(var(--color-border-muted) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
				/>
      {/* Fade mask */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg-dark)_80%)]"
      />
    </div>
  );
}
