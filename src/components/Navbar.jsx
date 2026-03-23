"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/reports")) {
    return null;
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Logo className={styles.svgLogo} />
          Swift
        </Link>
        
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            Features
            <svg className={styles.chevron} viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </li>
          <li className={styles.navItem}>
            Industries
            <svg className={styles.chevron} viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </li>
          <li className={styles.navItem}>
            Resources
            <svg className={styles.chevron} viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>
            Log in
          </Link>
          <Link href="/demo" className="btn-primary">
            Book a free demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
