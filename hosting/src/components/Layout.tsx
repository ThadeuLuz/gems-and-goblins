import type React from "preact/compat";

export const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="row">{children}</div>;
};
