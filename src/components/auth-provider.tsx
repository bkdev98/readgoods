"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function AuthProvider(props: SessionProviderProps) {
  return <SessionProvider {...props} />;
}
