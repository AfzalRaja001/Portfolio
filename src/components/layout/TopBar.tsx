export function TopBar() {
  return (
    <header className="topbar">
      <a href="#home" className="mark">
        <span className="glyph">A</span>
        Afzal <em>/ Raja</em>
      </a>
      <div className="meta">
        <span>
          <span className="live-dot" />
          Open to Summer &apos;27
        </span>
        <span>IIIT Allahabad · IN</span>
        <span>25.43°N · 81.84°E</span>
      </div>
    </header>
  );
}
