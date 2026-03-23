"use client";

import { motion } from 'framer-motion';
import styles from './LogoCloud.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const logoVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: {
    opacity: 0.6,
    filter: 'blur(0px)',
    y: 0,
    transition: { ease: "easeOut", duration: 0.8 }
  }
};

export default function LogoCloud() {
  return (
    <section className={styles.cloud}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <h3 className={styles.title}>
          Join hundreds of the world’s best sports facilities
        </h3>
        <motion.div 
          className={styles.logos}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className={styles.logoItem} variants={logoVariants}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
             Premier Athletics
          </motion.div>
          <motion.div className={styles.logoItem} variants={logoVariants}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
             Elite Tennis
          </motion.div>
          <motion.div className={styles.logoItem} variants={logoVariants}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
             The Cage Baseball
          </motion.div>
          <motion.div className={styles.logoItem} variants={logoVariants}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 22 22 2 22"/></svg>
             Apex Sports Center
          </motion.div>
          <motion.div className={styles.logoItem} variants={logoVariants}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22l-10-10 10-10 10 10z"/></svg>
             Future Stars Academy
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
