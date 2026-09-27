export type FailureKind = 'rate-limit' | 'mid-stream' | 'network' | 'malformed' | 'empty' | 'unknown';

export type FailureCopy = {
  kind: FailureKind;
  title: string;
  copy: string;
};

function readStatusCode(error: unknown) {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    return error.statusCode;
  }

  if ('status' in error && typeof error.status === 'number') {
    return error.status;
  }

  return undefined;
}

function readMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error ?? '');
}

export function classifyChatError(error: unknown): FailureCopy {
  const message = readMessage(error);
  const status = readStatusCode(error);
  const blob = `${status ?? ''} ${message}`.toLowerCase();

  if (status === 429 || blob.includes('rate limit')) {
    return {
      kind: 'rate-limit',
      title: 'Rate limit',
      copy: 'The model is overloaded right now. Retry sends only the failed message, not the whole conversation.'
    };
  }

  if (blob.includes('mid-stream') || blob.includes('injected') || blob.includes('interrupted')) {
    return {
      kind: 'mid-stream',
      title: 'Stream interrupted',
      copy: 'The reply broke mid-stream. Retry resubmits the failed message and leaves the rest of the thread intact.'
    };
  }

  if (
    blob.includes('failed to fetch') ||
    blob.includes('network') ||
    blob.includes('offline') ||
    blob.includes('load failed')
  ) {
    return {
      kind: 'network',
      title: 'Network failure',
      copy: 'The request never landed. Check the connection, then retry the failed message.'
    };
  }

  if (blob.includes('json') || blob.includes('malformed') || blob.includes('unexpected token')) {
    return {
      kind: 'malformed',
      title: 'Broken tool payload',
      copy: 'The server returned malformed JSON. Retry the failed message once the tool output is valid again.'
    };
  }

  if (status === 400 || blob.includes('empty input')) {
    return {
      kind: 'empty',
      title: 'Empty input',
      copy: 'Nothing was sent. Type a prompt or use an example below.'
    };
  }

  return {
    kind: 'unknown',
    title: 'Request failed',
    copy: 'Something went wrong. Retry the failed message, not the whole conversation.'
  };
}
