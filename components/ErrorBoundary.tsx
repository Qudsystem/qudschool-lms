import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    window.dispatchEvent(
      new CustomEvent('qudschool:error', {
        detail: { error, componentStack: info.componentStack },
      }),
    );
  }

  private retry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <main className="min-h-screen bg-neutral-light px-6 py-20 text-center text-neutral-dark dark:bg-neutral-dark dark:text-neutral-light">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h1 className="text-2xl font-bold">حدث خطأ غير متوقع</h1>
          <p className="mt-3 text-sm text-neutral-DEFAULT dark:text-gray-300">
            تم حفظ تقرير تشخيصي محليًا. جرّب المتابعة دون إعادة تحميل الصفحة.
          </p>
          <button
            type="button"
            onClick={this.retry}
            className="mt-6 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            المحاولة مرة أخرى
          </button>
        </div>
      </main>
    );
  }
}
