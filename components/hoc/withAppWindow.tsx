export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    return <WrappedComponent {...props} />;
  };

  ComponentWithWindow.displayName = `withWindow(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWindow;
}
