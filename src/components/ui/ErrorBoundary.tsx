import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div role="alert" className="mx-auto my-10 max-w-xl rounded-xl border border-danger/30 bg-danger/5 p-6 text-sm">
        <p className="font-medium text-fg">{this.props.label ?? 'Этот блок не удалось отобразить.'}</p>
        <p className="mt-2 text-fg-muted">{this.state.error.message}</p>
        <button
          type="button"
          onClick={() => this.setState({ error: null })}
          className="mt-4 rounded-full border border-line-strong px-4 py-1.5 text-xs text-fg hover:bg-white/5"
        >
          Попробовать снова
        </button>
      </div>
    );
  }
}
