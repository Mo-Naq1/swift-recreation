"use client";

import { motion } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 }
  }
};

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>Everything you need to manage your business</h2>
          <p className={styles.subtitle}>
            Swift replaces a dozen generic tools with one platform built specifically for sports facilities and academies.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Online Booking</h3>
            <p className={styles.cardDesc}>
              Let clients book cages, courts, and classes 24/7. Fully integrated with your real-time availability.
            </p>
          </motion.div>
          
          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Payments & Invoicing</h3>
            <p className={styles.cardDesc}>
              Accept credit cards, set up auto-pay for memberships, and chase down failed payments automatically.
            </p>
          </motion.div>

          <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Member Management</h3>
            <p className={styles.cardDesc}>
              Keep track of family accounts, waivers, skill levels, and attendance records all in one place.
            </p>
          </motion.div>
        </motion.div>

        <div className={styles.bottomSection}>
          <motion.div 
            className={styles.splitMockup}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.calendarMockup}>
              <div className={styles.calHeader}>
                <div className={styles.calHeaderLine}></div>
              </div>
              <div className={styles.calGrid}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className={styles.calCell}>
                    {i % 4 === 0 && <motion.div 
                        className={styles.calEvent} 
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
                      ></motion.div>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            className={styles.splitContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.title}>How Swift helps power your growth</h2>
            <p className={styles.subtitle} style={{ marginBottom: "2rem" }}>
              Our scheduling engine handles the complexities of running a modern sports facility, allowing you to maximize utilization and increase revenue without adding headcount.
            </p>
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                "Eliminate double bookings and scheduling conflicts",
                "Detailed analytics on staff performance and facility usage",
                "Automated reminders for clients reducing no-shows"
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{ color: "var(--primary)", fontWeight: "bold" }}>✓</span>
                  <span style={{ color: "var(--text-main)" }}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
