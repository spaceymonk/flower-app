import React from 'react';
import { DeferredPromise } from '../types/DeferredPromise';

export function useDeferredPromise<T>() {
  const deferRef = React.useRef<DeferredPromise<T> | null>(null);

  const defer = () => {
    const deferred = {} as DeferredPromise<T>;

    const promise = new Promise<T>((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    deferred.promise = promise;
    deferRef.current = deferred;
    return deferRef.current;
  };

  return { defer, deferRef: deferRef };
}
