export function MessageSkeleton() {
  return (
    <article className="bubble assistant skeleton-bubble" aria-hidden="true" data-testid="message-skeleton">
      <div className="bubble-title">Assistant</div>
      <div className="skeleton-stack">
        <div className="skeleton short" />
        <div className="skeleton long" />
        <div className="skeleton medium" />
      </div>
    </article>
  );
}
