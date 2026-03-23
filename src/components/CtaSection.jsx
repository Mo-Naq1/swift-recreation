"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section ref={ref} className={styles.cta}>
      {/* Dynamic scrolling background radial gradient via inline style below */}
      <motion.div 
        className={styles.container} 
        style={{ y, scale, opacity }}
      >
        <h2 className={styles.title}>Ready to grow your facility?</h2>
        <p className={styles.description}>
          Join hundreds of other sports facilities saving time and increasing their revenue with Swift.
        </p>
        <Link href="/demo" className={styles.btnLight}>
          Book a free demo
        </Link>
      </motion.div>
    </section>
  );
}
