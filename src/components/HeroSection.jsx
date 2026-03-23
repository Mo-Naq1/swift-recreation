"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          style={{ y: contentY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Grow your sports facility on <span className={styles.highlight}>auto-pilot</span>
          </motion.h1>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Spend less time on the phone and more time growing your business. Swift provides everything you need to manage scheduling, payments, and members in one unified platform.
          </motion.p>
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/demo" className="btn-primary">
              Book a free demo
            </Link>
            <Link href="/overview" className={styles.watchBtn}>
              <div className={styles.playIcon}>
                <svg className={styles.svgIcon} viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              Watch a feature overview
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.preview}
          style={{ y: mockupY }}
          initial={{ opacity: 0, scale: 0.95, rotateY: -15, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, rotateY: -5, rotateX: 2 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.mockupContainer}>
            <div className={styles.mockupHeader}>
              <div className={`${styles.dot} ${styles.dotRed}`}></div>
              <div className={`${styles.dot} ${styles.dotYel}`}></div>
              <div className={`${styles.dot} ${styles.dotGrn}`}></div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupMetrics}>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Active Members</div>
                  <div className={styles.metricValue}>1,248 <span className={styles.metricTrend}>+12%</span></div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Monthly Revenue</div>
                  <div className={styles.metricValue}>$42.5k <span className={styles.metricTrend}>+8%</span></div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Classes Booked</div>
                  <div className={styles.metricValue}>384 <span className={styles.metricTrend}>+5%</span></div>
                </div>
              </div>
              <div className={styles.mockupChart}>
                <div className={styles.chartHeader}>Revenue Overview</div>
                <div className={styles.chartArea}>
                  <div className={styles.chartLine}></div>
                  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                    <path d="M0,50 Q20,20 40,40 T80,30 T100,10 L100,100 L0,100 Z" fill="rgba(0,82,204,0.1)" stroke="var(--primary)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
