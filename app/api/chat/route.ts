import { NextResponse } from 'next/server';

type ChatMessage = {
  role?: string;
  content?: string;
  parts?: Array<{ type?: string; text?: string }>;
};

type ChatBody = {
  messages?: ChatMessage[];
  scenario?: string;
};

export const runtime = 'nodejs';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readLastPrompt(messages: ChatMessage[] | undefined) {
  const last = messages?.at(-1);
  const fromContent = last?.content?.trim() ?? '';
  if (fromContent) {
    return fromContent;
  }

  return (
    last?.parts
      ?.filter(part => part.type === 'text')
      .map(part => part.text ?? '')
      .join('')
      .trim() ?? ''
  );
}

function buildResponseText(prompt: string) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes('no results') || normalized.includes('nothing')) {
    return [
      'No matching record yet.',
      'Try asking about a clean run, or tap an example prompt so this page has a next step instead of a dead end.'
    ].join('\n\n');
  }

  return [
    'Clean run:',
    'Inputs are checked, the draft is short, and the next useful action is visible.',
    'If the stream breaks, retry only resubmits the failed message.'
  ].join('\n\n');
}

async function streamText(
  text: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  options: { failMidStream: boolean; signal: AbortSignal }
) {
  const encoder = new TextEncoder();
  const segments = text.match(/.{1,18}(?:\s|$)/g) ?? [text];

  for (let index = 0; index < segments.length; index += 1) {
    if (options.signal.aborted) {
      controller.close();
      return;
    }

    if (options.failMidStream && index === 2) {
      controller.error(new Error('Injected mid-stream failure'));
      return;
    }

    controller.enqueue(encoder.encode(segments[index]));
    await sleep(90);
  }

  controller.close();
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatBody;
  const scenario = body.scenario ?? '';
  const lastMessage = readLastPrompt(body.messages);
  const haystack = `${scenario} ${lastMessage}`.toLowerCase();

  if (!lastMessage) {
    return NextResponse.json({ error: 'Empty input is not allowed.' }, { status: 400 });
  }

  if (haystack.includes('rate-limit') || haystack.includes('rate limit')) {
    return NextResponse.json({ error: 'Rate limit reached.' }, { status: 429 });
  }

  if (haystack.includes('malformed')) {
    return new Response('{not-valid-json', {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  }

  if (haystack.includes('throw-route')) {
    throw new Error('Injected route-handler failure for sabotage testing.');
  }

  const responseText = buildResponseText(lastMessage);
  const failMidStream = haystack.includes('mid-stream');
  const slow = haystack.includes('slow');

  if (slow) {
    await sleep(1600);
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      void streamText(responseText, controller, { failMidStream, signal: request.signal }).catch(error => {
        if (request.signal.aborted) {
          controller.close();
          return;
        }

        controller.error(error);
      });
    }
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
