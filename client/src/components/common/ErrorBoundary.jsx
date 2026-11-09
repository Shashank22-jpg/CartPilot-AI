import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CartPilot ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.replace('/dashboard');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy-950 text-slate-100 flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-navy-900 border border-navy-750 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Rendering Error Intercepted
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                CartPilot AI encountered an unexpected rendering error. Your cart and preferences have been preserved.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-left overflow-x-auto text-[11px] font-mono text-rose-300">
                <div className="font-bold">{this.state.error.toString()}</div>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-2 text-[10px] text-slate-400 whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 border border-navy-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-electric-400" />
                <span>Reload Application</span>
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-violet-600 hover:from-electric-500 hover:to-violet-500 text-white text-xs font-bold shadow-glow-blue flex items-center space-x-2 transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
