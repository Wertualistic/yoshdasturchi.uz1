import React from "react";
import ErrorPage from "../ErrorPage";

class ErrorBoundary extends React.Component {
  state = { hasError: false, isOnline: true };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Проверяем, является ли ошибка ошибкой отсутствия интернет-соединения
    if (error.message === "Failed to fetch") {
      this.setState({ isOnline: false });
    }
    // Можно использовать собственный сервис для логирования ошибок здесь
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError || !this.state.isOnline) {
      // Если произошла ошибка или отсутствует интернет, показываем страницу ошибки
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
