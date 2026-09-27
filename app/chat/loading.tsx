export default function LoadingChatPage() {
  return (
    <main>
      <div className="site-shell" style={{ paddingTop: 28 }}>
        <div className="loading-card">
          <div className="pill">Live project</div>
          <h1>A stream that can break without breaking the page.</h1>
          <p className="loading-copy">Loading the route and the chat shell with a layout that should not jump.</p>
          <div className="loading-grid">
            <div className="loading-panel">
              <div className="loading-bar short" />
              <div className="loading-bar long" />
              <div className="loading-bar medium" />
              <div className="loading-bar long" />
            </div>
            <div className="loading-panel">
              <div className="loading-bar medium" />
              <div className="loading-bar long" />
              <div className="loading-bar short" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}