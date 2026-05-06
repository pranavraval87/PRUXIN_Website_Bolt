import { Component, type ReactNode, type ErrorInfo } from "react"
import { logError } from "@/lib/errors"
import { track } from "@/lib/analytics"
import { ErrorFallback } from "@/components/errors/ErrorFallback"

interface Props {
  children: ReactNode
  /** Custom fallback — receives the error and a reset callback */
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode
  /** Name of the section/component for error reporting context */
  section?: string
  /** If true, renders a minimal inline error instead of a full-page fallback */
  inline?: boolean
}

interface State {
  error: Error | null
  errorId: string | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, errorId: null }

  static getDerivedStateFromError(error: Error): State {
    return {
      error,
      errorId: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logError(error, {
      section: this.props.section,
      componentStack: info.componentStack ?? undefined,
    })
    track({
      name: "error_boundary_triggered",
      component: this.props.section,
    })
  }

  reset = () => {
    this.setState({ error: null, errorId: null })
  }

  render() {
    const { error, errorId } = this.state
    const { children, fallback, section, inline } = this.props

    if (!error) return children

    if (fallback) {
      return fallback({ error, reset: this.reset })
    }

    return (
      <ErrorFallback
        error={error}
        errorId={errorId ?? undefined}
        section={section}
        inline={inline}
        onReset={this.reset}
      />
    )
  }
}
