import { ReactNode, Suspense } from 'react';

type Props = {
  condition: () => Promise<boolean>;
  children: ReactNode;
  loadingFallback?: ReactNode;
  otherwise?: ReactNode;
};

export default function AsyncIf(
  { loadingFallback, ...props }: Props
) {
  return (
    <Suspense fallback={loadingFallback}>
      <SuspendedComponent {...props} />
    </Suspense>
  );
}

async function SuspendedComponent(
  { children, condition, otherwise }: Omit<Props, 'loadingFallback'>
) {
  return await condition() ? children : otherwise;
}
