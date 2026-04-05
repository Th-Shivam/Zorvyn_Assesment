import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('ZORVYN UI error:', error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] px-6 py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-white p-10 text-center shadow-premium">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-error">
              <span className="material-symbols-outlined icon-filled">error</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              The dashboard hit an unexpected error. Refresh the page to try again.
            </p>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
