import React from "react";
import { Header } from "./header";
import styles from "./layout.module.scss";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};
