import Link from 'next/link';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Logo className={styles.svgLogo} />
            Swift
          </Link>
          <p className={styles.description}>
            Grow your sports facility on auto-pilot.
          </p>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Product</span>
          <Link href="#" className={styles.link}>Features</Link>
          <Link href="#" className={styles.link}>Pricing</Link>
          <Link href="#" className={styles.link}>Integrations</Link>
          <Link href="#" className={styles.link}>Changelog</Link>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Company</span>
          <Link href="#" className={styles.link}>About Us</Link>
          <Link href="#" className={styles.link}>Careers</Link>
          <Link href="#" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Legal</span>
          <Link href="#" className={styles.link}>Privacy Policy</Link>
          <Link href="#" className={styles.link}>Terms of Service</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} Swift. All rights reserved.</span>
      </div>
    </footer>
  );
}
