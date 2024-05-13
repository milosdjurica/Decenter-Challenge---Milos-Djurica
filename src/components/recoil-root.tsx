"use client";

import React from "react";
import { RecoilRoot, RecoilRootProps } from "recoil";

export default function RecoilRootComponent({ children }: RecoilRootProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
