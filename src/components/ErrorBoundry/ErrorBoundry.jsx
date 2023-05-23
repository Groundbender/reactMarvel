import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// компонент обработки ошибок
class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
