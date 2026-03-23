"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clients } from '@/data/mockReports';
import styles from './page.module.css';

export default function ReportsDashboard() {
  const [selectedId, setSelectedId] = useState(1);
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const client = clients.find(c => c.id === selectedId);

  return (
    <div className={styles.container}>
      {/* Top Bar inspired by the screenshot */}
      <div className={styles.topbar}>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>Monthly</button>
          <button className={`${styles.btn} ${styles.active}`}>Quarterly</button>
          <button className={styles.btn}>YTD</button>
        </div>
        
        <button className={styles.dateSelect}>
          March 2026
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className={styles.btnGroup}>
            <button className={`${styles.btn} ${styles.active}`}>Revenue</button>
            <button className={styles.btn}>Utilization</button>
          </div>
          <button className={styles.filterBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
             Filter View
          </button>
        </div>
      </div>

      {/* Facility Selector */}
      <select 
        className={styles.clientSelector} 
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* KPI Grid */}
          <div className={styles.grid}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiTitle}>Total Revenue</div>
              <div className={styles.kpiValue}>{client.kpis.revenue}</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiTitle}>Growth (YoY)</div>
              <div className={styles.kpiValue} style={{ color: client.kpis.growth.includes('+') ? '#10b981' : '#ef4444' }}>
                {client.kpis.growth}
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiTitle}>Profit Margin</div>
              <div className={styles.kpiValue}>{client.kpis.margin}</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiTitle}>Court Utilization</div>
              <div className={styles.kpiValue}>{client.kpis.utilization}</div>
            </div>
          </div>

          <div className={styles.contentGrid}>
            {/* Revenue Bar Chart */}
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Revenue Per Month</h3>
              <div className={styles.chartContainer}>
                <div className={styles.yAxis}>
                  <span>$100k</span>
                  <span>$75k</span>
                  <span>$50k</span>
                  <span>$25k</span>
                  <span>$0k</span>
                </div>
                <div className={styles.chartArea}>
                  <div className={styles.gridLines}>
                    <div className={styles.gridLine}></div>
                    <div className={styles.gridLine}></div>
                    <div className={styles.gridLine}></div>
                    <div className={styles.gridLine}></div>
                    <div className={styles.gridLine}></div>
                  </div>
                  {client.monthlyRevenue.map((data, i) => (
                    <div 
                      key={i} 
                      className={styles.barWrapper}
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      <AnimatePresence>
                        {hoveredMonth === i && (
                          <motion.div 
                            className={styles.tooltip}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                          >
                            ${data.rev}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div 
                        className={styles.bar} 
                        initial={{ height: 0 }}
                        animate={{ height: `${data.val}%` }}
                        transition={{ duration: 1, delay: i * 0.05, type: 'spring' }}
                      ></motion.div>
                      <span className={styles.barLabel}>{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Revenue Breakdown</h3>
              <div className={styles.sourcesList}>
                {client.revenueSources.map((source, i) => (
                  <div key={i} className={styles.sourceItem}>
                    <div className={styles.sourceHeader}>
                      <span className={styles.sourceName}>{source.name}</span>
                      <span className={styles.sourceValue}>${source.value.toLocaleString()} ({source.percentage}%)</span>
                    </div>
                    <div className={styles.sourceTrack}>
                      <motion.div 
                        className={styles.sourceFill}
                        style={{ backgroundColor: source.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className={styles.panel} style={{ marginBottom: '2rem' }}>
            <h3 className={styles.panelTitle}>Recent Transactions</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Transaction ID</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Customer</th>
                    <th className={styles.th}>Type</th>
                    <th className={styles.th}>Amount</th>
                    <th className={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {client.transactions.map((tx, i) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (i * 0.05) }}
                    >
                      <td className={styles.td} style={{ color: 'var(--primary)', fontWeight: 600 }}>{tx.id}</td>
                      <td className={styles.td}>{tx.date}</td>
                      <td className={styles.td}>{tx.customer}</td>
                      <td className={styles.td} style={{ color: 'var(--text-muted)' }}>{tx.type}</td>
                      <td className={styles.td} style={{ fontWeight: 700 }}>{tx.amount}</td>
                      <td className={styles.td}>
                        <span className={`${styles.statusPill} ${styles['status' + tx.status]}`}>
                          {tx.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
