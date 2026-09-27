import { ChatRoom } from '@/components/chat-room';
import { SiteFooter } from '@/components/site-footer';

type SearchParams = {
  panic?: string;
};

export default async function ChatPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const params = searchParams ? await searchParams : undefined;

  if (params?.panic === '1') {
    throw new Error('Route failure requested for the sabotage checklist.');
  }

  return (
    <main>
      <div className="site-shell" style={{ paddingTop: 28 }}>
        <div className="section-heading">
          <div>
            <div className="pill">Live project</div>
            <h1 className="display" style={{ marginTop: 14 }}>
              A stream that can break without breaking the page.
            </h1>
          </div>
          <p>
            This is the primary flow. The happy path works, the failure state is designed, and the retry only targets the
            failed message.
          </p>
        </div>
        <ChatRoom />
      </div>
      <SiteFooter />
    </main>
  );
}