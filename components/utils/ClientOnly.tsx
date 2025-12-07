// components/ClientOnly.tsx
"use client";

import dynamic from "next/dynamic";
import type { FunctionComponent, PropsWithChildren } from "react";

// Base component – just returns children
const ClientOnlyBase: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

// Wrap it in next/dynamic so it only renders on the client
const ClientOnly = dynamic(() => Promise.resolve(ClientOnlyBase), {
  ssr: false,
});

export default ClientOnly;
