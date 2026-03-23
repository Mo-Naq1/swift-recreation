"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './Tournament.module.css';

export default function TournamentDashboard() {
  const [role, setRole] = useState('customer'); // 'customer', 'organizer', 'public'
  const [tourneyName, setTourneyName] = useState('Spring Smash 2026');
  const [magicLink, setMagicLink] = useState(null);

  // Organizer Setup State
  const [orgState, setOrgState] = useState('setup'); // 'setup', 'bracket', 'matchDetail'
  const [activeMatch, setActiveMatch] = useState(null); // { round, index }

  const [numTeams, setNumTeams] = useState(8);
  const defaultTeams = [
    'Vikings Athletics', 'Storm Chasers', 'Elite Blockers', 'Net Ninjas',
    'Spike Syndicate', 'Apex Predators', 'Titan Smash', 'Velocity VBC'
  ];
  const [teams, setTeams] = useState(defaultTeams);

  // Matches State for an 8-team Single Elimination Bracket
  const [matches, setMatches] = useState({
    qf: [
      { id: 'qf1', t1: teams[0], t2: teams[1], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf2', t1: teams[2], t2: teams[3], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf3', t1: teams[4], t2: teams[5], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf4', t1: teams[6], t2: teams[7], s1: null, s2: null, winner: null, status: 'Pending' },
    ],
    sf: [
      { id: 'sf1', t1: null, t2: null, s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'sf2', t1: null, t2: null, s1: null, s2: null, winner: null, status: 'Pending' },
    ],
    f: [
      { id: 'f1', t1: null, t2: null, s1: null, s2: null, winner: null, status: 'Pending' }
    ],
    champion: null
  });

  const handleStartBracket = () => {
    // Generate seeded array padding empty slots with BYE
    const spots = Array(8).fill("BYE");
    teams.slice(0, numTeams).forEach((team, idx) => {
       spots[idx] = team || `Team ${idx + 1}`;
    });

    const m_qf = [
      { id: 'qf1', t1: spots[0], t2: spots[7], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf2', t1: spots[3], t2: spots[4], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf3', t1: spots[2], t2: spots[5], s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'qf4', t1: spots[1], t2: spots[6], s1: null, s2: null, winner: null, status: 'Pending' },
    ];
    
    const m_sf = [
      { id: 'sf1', t1: null, t2: null, s1: null, s2: null, winner: null, status: 'Pending' },
      { id: 'sf2', t1: null, t2: null, s1: null, s2: null, winner: null, status: 'Pending' },
    ];

    // Automatically resolve matches involving BYEs
    m_qf.forEach((match, idx) => {
      if (match.t2 === "BYE" || match.t1 === "BYE") {
         const winner = match.t1 === "BYE" ? match.t2 : match.t1;
         match.winner = winner;
         match.s1 = "BYE";
         match.s2 = "BYE";
         match.status = 'Final';
         
         const nextMatchIdx = Math.floor(idx / 2);
         const isTopHalf = idx % 2 === 0;
         if (isTopHalf) m_sf[nextMatchIdx].t1 = winner;
         else m_sf[nextMatchIdx].t2 = winner;
      }
    });

    setMatches(prev => ({
      ...prev,
      qf: m_qf,
      sf: m_sf
    }));
    setOrgState('bracket');
  };

  const handleScoreUpdate = (round, matchIndex, teamIdx, score) => {
    setMatches(prev => {
      const newMatches = { ...prev };
      const match = newMatches[round][matchIndex];
      // Only allow score updates if match is not Final
      if (match.status !== 'Final') {
        if (teamIdx === 1) match.s1 = score;
        if (teamIdx === 2) match.s2 = score;
      }
      return newMatches;
    });
  };

  const handleMatchLifecycle = (round, matchIndex, action) => {
    setMatches(prev => {
      const newMatches = { ...prev };
      const match = newMatches[round][matchIndex];
      
      if (action === 'start') {
        match.status = 'Live';
      } else if (action === 'end') {
        if (match.s1 === null || match.s2 === null || match.s1 === '' || match.s2 === '' || match.s1 === match.s2) {
          alert('Please explicitly enter valid tie-broken scores to End Game.');
          return prev;
        }
        match.status = 'Final';
        const winner = parseInt(match.s1) > parseInt(match.s2) ? match.t1 : match.t2;
        match.winner = winner;

        // Advance to next round
        if (round === 'qf') {
          const nextMatchIdx = Math.floor(matchIndex / 2);
          const isTopHalf = matchIndex % 2 === 0;
          if (isTopHalf) newMatches.sf[nextMatchIdx].t1 = winner;
          else newMatches.sf[nextMatchIdx].t2 = winner;
        } else if (round === 'sf') {
          const isTopHalf = matchIndex === 0;
          if (isTopHalf) newMatches.f[0].t1 = winner;
          else newMatches.f[0].t2 = winner;
        } else if (round === 'f') {
          newMatches.champion = winner;
        }
      }
      return newMatches;
    });
  };

  const MatchCard = ({ data, round, matchIndex }) => {
    let statusClass = styles.statusPending;
    if (data.status === "Final") statusClass = styles.statusFinal;
    if (data.status === "Live") statusClass = styles.statusLive;
    
    // In Public View, user cannot edit
    const isPublic = role === 'public';
    const isEditingAllowed = !isPublic && data.t1 && data.t2 && data.t1 !== "BYE" && data.t2 !== "BYE";

    return (
      <div className={styles.matchWrapper} onClick={() => {
        if (isEditingAllowed) {
           setActiveMatch({ round, index: matchIndex });
           setOrgState('matchDetail');
        }
      }}>
        <motion.div 
          className={styles.matchCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ cursor: isEditingAllowed ? 'pointer' : 'default' }}
        >
          <div className={styles.matchHeader}>
            <span>Match {data.id.toUpperCase()}</span>
            <span className={`${styles.matchStatus} ${statusClass}`}>
              {data.status === "Live" && <span className={styles.liveDot}></span>}
              {data.status}
            </span>
          </div>
          
          <div className={`${styles.teamRow} ${data.winner === data.t1 ? styles.winner : (data.winner && data.winner !== data.t1 ? styles.loser : '')}`}>
            <span className={styles.teamName}>{data.t1 || <span style={{color: '#9ca3af', fontStyle:'italic'}}>TBD</span>}</span>
            <div className={styles.teamScore}>{data.s1 === null ? '-' : data.s1}</div>
          </div>

          <div className={`${styles.teamRow} ${data.winner === data.t2 ? styles.winner : (data.winner && data.winner !== data.t2 ? styles.loser : '')}`}>
            <span className={styles.teamName}>{data.t2 || <span style={{color: '#9ca3af', fontStyle:'italic'}}>TBD</span>}</span>
            <div className={styles.teamScore}>{data.s2 === null ? '-' : data.s2}</div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <Logo style={{width: 24, height: 24}} /> Swift Tournaments
        </Link>
        
        <div className={styles.roleToggle}>
          <button 
            className={`${styles.roleBtn} ${role === 'customer' ? styles.active : ''}`}
            onClick={() => setRole('customer')}
          >
            Customer Booking View
          </button>
          <button 
            className={`${styles.roleBtn} ${role === 'organizer' ? styles.active : ''}`}
            onClick={() => setRole('organizer')}
          >
            Organizer View
          </button>
          <button 
            className={`${styles.roleBtn} ${role === 'public' ? styles.active : ''}`}
            onClick={() => setRole('public')}
          >
            Public Fan View
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          
          {/* CUSTOMER BOOKING VIEW */}
          {role === 'customer' && (
            <motion.div 
              key="customer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.wizardCard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#d1fae5', color: '#059669', padding: '0.5rem', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h1 className={styles.wizardTitle} style={{ margin: 0 }}>Booking Confirmed</h1>
              </div>
              <p className={styles.wizardDesc}>
                Your rental at <strong>Northside Volleyball Center</strong> is confirmed. You were billed $450.00 for the reservation. Since you are hosting a tournament, your Swift Organizer Portal has been automatically provisioned.
              </p>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tournament Name</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={tourneyName}
                  onChange={(e) => setTourneyName(e.target.value)}
                  placeholder="Enter tournament name..."
                />
              </div>
              <div className={styles.inputGroup} style={{display: 'flex', gap: '1rem', opacity: 0.7, pointerEvents: 'none'}}>
                <div style={{flex: 1}}>
                  <label className={styles.label}>Date Booked</label>
                  <input type="date" className={styles.input} defaultValue="2026-06-15" disabled />
                </div>
                <div style={{flex: 1}}>
                  <label className={styles.label}>Courts Booked</label>
                  <input type="text" className={styles.input} defaultValue="Courts 1-4" disabled />
                </div>
              </div>
                
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.linkBox}
              >
                <p className={styles.label}>Tournament Organizer Link</p>
                <p className={styles.linkNotice}>This private link is for you to manage teams, brackets, and scores during your event.</p>
                <div className={styles.linkUrl}>https://swift.app/t/nvc-spring-smash</div>
                <button className={styles.btnPrimary} style={{ marginTop: '1rem' }} onClick={() => setRole('organizer')}>
                  Enter Organizer Portal
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ORGANIZER / PUBLIC VIEW */}
          {(role === 'organizer' || role === 'public') && (
            <motion.div 
              key="workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={styles.bracketWorkspace}>
                <div className={styles.bracketHeader}>
                  <div>
                    <h2 className={styles.bracketTitle}>{tourneyName} {role === 'public' ? '- Live Public Bracket' : '- Organizer Portal'}</h2>
                    <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem'}}>
                      Facility: Northside Volleyball Center • Courts 1-4
                    </p>
                  </div>
                  
                  {role === 'organizer' && orgState === 'setup' && (
                    <button className={styles.btnPrimary} style={{width: 'auto'}} onClick={handleStartBracket}>
                      Generate Bracket
                    </button>
                  )}

                  {role === 'organizer' && orgState === 'bracket' && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div className={styles.qrContainer}>
                        <svg className={styles.qrIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <rect x="3" y="3" width="7" height="7"></rect>
                           <rect x="14" y="3" width="7" height="7"></rect>
                           <rect x="14" y="14" width="7" height="7"></rect>
                           <rect x="3" y="14" width="7" height="7"></rect>
                           <path d="M6 6h1v1H6zM17 6h1v1h-1zM17 17h1v1h-1zM6 17h1v1H6z"></path>
                        </svg>
                        <div className={styles.qrLabel}>
                          Scan to View
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: '2px'}}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                        </div>
                      </div>
                      <button className={styles.btnPrimary} style={{width: 'auto', background: '#f3f4f6', color: '#111827'}} onClick={() => setRole('public')}>
                        Simulate Public View
                      </button>
                    </div>
                  )}
                </div>

                {role === 'public' && orgState === 'setup' ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <h3>Tournament hasn't started yet.</h3>
                    <p>The organizer is currently setting up the teams. Check back soon for the live bracket!</p>
                  </div>
                ) : orgState === 'matchDetail' && activeMatch ? (
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                    className={styles.matchDetailScreen}
                  >
                    <button className={styles.backBtn} onClick={() => setOrgState('bracket')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                      Back to Bracket
                    </button>

                    <div className={styles.sportsScoreboard}>
                      <div className={styles.sbHeader}>
                        <span>Match {matches[activeMatch.round][activeMatch.index].id.toUpperCase()} • Swift Network</span>
                        <span style={{color: matches[activeMatch.round][activeMatch.index].status === 'Live' ? '#f28b82' : '#9aa0a6'}}>
                          {matches[activeMatch.round][activeMatch.index].status === 'Live' ? 'LIVE' : (matches[activeMatch.round][activeMatch.index].status === 'Final' ? 'Full-time' : 'Pending')}
                        </span>
                      </div>

                      <div className={styles.sbMain}>
                        <div className={styles.sbTeam}>
                           <div className={styles.sbLogo}>
                             {matches[activeMatch.round][activeMatch.index].t1 && matches[activeMatch.round][activeMatch.index].t1 !== 'TBD' ? 
                               matches[activeMatch.round][activeMatch.index].t1.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : '?'}
                           </div>
                           <div className={styles.sbTeamName}>{matches[activeMatch.round][activeMatch.index].t1 || 'TBD'}</div>
                           {/* Controls */}
                           {role !== 'public' && matches[activeMatch.round][activeMatch.index].status !== 'Final' && (
                             <div className={styles.sbControls}>
                               <button 
                                 className={styles.sbBtn} 
                                 disabled={!matches[activeMatch.round][activeMatch.index].s1}
                                 onClick={() => {
                                   const cur = parseInt(matches[activeMatch.round][activeMatch.index].s1) || 0;
                                   handleScoreUpdate(activeMatch.round, activeMatch.index, 1, Math.max(0, cur - 1));
                                 }}
                               >
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>
                               <button 
                                 className={styles.sbBtn} 
                                 onClick={() => {
                                   const cur = parseInt(matches[activeMatch.round][activeMatch.index].s1) || 0;
                                   handleScoreUpdate(activeMatch.round, activeMatch.index, 1, cur + 1);
                                 }}
                               >
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>
                             </div>
                           )}
                        </div>

                        <div className={styles.sbCenter}>
                          <AnimatePresence mode="popLayout">
                            <motion.span 
                              key={`s1-${matches[activeMatch.round][activeMatch.index].s1}`}
                              initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}
                            >
                              {matches[activeMatch.round][activeMatch.index].s1 !== null ? matches[activeMatch.round][activeMatch.index].s1 : '-'}
                            </motion.span>
                          </AnimatePresence>
                          <span className={styles.sbHyphen}>-</span>
                          <AnimatePresence mode="popLayout">
                            <motion.span 
                              key={`s2-${matches[activeMatch.round][activeMatch.index].s2}`}
                              initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}
                            >
                              {matches[activeMatch.round][activeMatch.index].s2 !== null ? matches[activeMatch.round][activeMatch.index].s2 : '-'}
                            </motion.span>
                          </AnimatePresence>
                        </div>

                        <div className={styles.sbTeam}>
                           <div className={styles.sbLogo} style={{background: '#5a6268'}}>
                             {matches[activeMatch.round][activeMatch.index].t2 && matches[activeMatch.round][activeMatch.index].t2 !== 'TBD' ? 
                               matches[activeMatch.round][activeMatch.index].t2.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : '?'}
                           </div>
                           <div className={styles.sbTeamName}>{matches[activeMatch.round][activeMatch.index].t2 || 'TBD'}</div>
                           {/* Controls */}
                           {role !== 'public' && matches[activeMatch.round][activeMatch.index].status !== 'Final' && (
                             <div className={styles.sbControls}>
                               <button 
                                 className={styles.sbBtn} 
                                 disabled={!matches[activeMatch.round][activeMatch.index].s2}
                                 onClick={() => {
                                   const cur = parseInt(matches[activeMatch.round][activeMatch.index].s2) || 0;
                                   handleScoreUpdate(activeMatch.round, activeMatch.index, 2, Math.max(0, cur - 1));
                                 }}
                               >
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>
                               <button 
                                 className={styles.sbBtn} 
                                 onClick={() => {
                                   const cur = parseInt(matches[activeMatch.round][activeMatch.index].s2) || 0;
                                   handleScoreUpdate(activeMatch.round, activeMatch.index, 2, cur + 1);
                                 }}
                               >
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>
                             </div>
                           )}
                        </div>
                      </div>

                      {role !== 'public' && matches[activeMatch.round][activeMatch.index].status !== 'Final' && (
                        <div className={styles.sbActions}>
                          <AnimatePresence mode="wait">
                            {matches[activeMatch.round][activeMatch.index].status === 'Pending' ? (
                              <motion.button 
                                key="start-btn"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className={styles.sbActionBtn} 
                                onClick={() => handleMatchLifecycle(activeMatch.round, activeMatch.index, 'start')}
                              >
                                Start Game
                              </motion.button>
                            ) : (
                              <motion.button 
                                key="end-btn"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className={`${styles.sbActionBtn} ${styles.sbActionBtnDanger}`} 
                                onClick={() => {
                                  handleMatchLifecycle(activeMatch.round, activeMatch.index, 'end');
                                }}
                              >
                                End Game & Finalize
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : orgState === 'setup' ? (
                  <div style={{ padding: '2rem' }}>
                    <div className={styles.inputGroup} style={{ maxWidth: '300px', marginBottom: '2rem' }}>
                      <label className={styles.label}>Number of Teams</label>
                      <input 
                        type="number"
                        min="4"
                        max="8"
                        className={styles.input} 
                        value={numTeams} 
                        onChange={(e) => {
                          const num = Math.min(Math.max(parseInt(e.target.value) || 4, 4), 8);
                          setNumTeams(num);
                          const newTeams = defaultTeams.slice(0, num);
                          while (newTeams.length < num) newTeams.push('');
                          setTeams(newTeams);
                        }}
                      />
                    </div>

                    <div className={styles.teamsGrid} style={{ padding: 0 }}>
                      {Array.from({ length: numTeams }).map((_, idx) => (
                        <div className={styles.inputGroup} key={idx} style={{marginBottom: 0}}>
                          <label className={styles.label}>Seed #{idx + 1}</label>
                          <input 
                            type="text" 
                            className={styles.input} 
                            value={teams[idx] || ''}
                            onChange={(e) => {
                              const newTeams = [...teams];
                              newTeams[idx] = e.target.value;
                              setTeams(newTeams);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.bracketArena}>
                    
                    {/* QUARTERFINALS */}
                    <div className={styles.roundColumn}>
                      <div className={styles.matchPair}>
                        <MatchCard data={matches.qf[0]} round="qf" matchIndex={0} />
                        <MatchCard data={matches.qf[1]} round="qf" matchIndex={1} />
                      </div>
                      <div className={styles.matchPair}>
                        <MatchCard data={matches.qf[2]} round="qf" matchIndex={2} />
                        <MatchCard data={matches.qf[3]} round="qf" matchIndex={3} />
                      </div>
                    </div>

                    {/* SEMIFINALS */}
                    <div className={styles.roundColumn}>
                      <div className={styles.matchPair}>
                        <MatchCard data={matches.sf[0]} round="sf" matchIndex={0} />
                        <MatchCard data={matches.sf[1]} round="sf" matchIndex={1} />
                      </div>
                    </div>

                    {/* FINALS */}
                    <div className={styles.roundColumn} style={{justifyContent: 'center'}}>
                      <MatchCard data={matches.f[0]} round="f" matchIndex={0} />
                    </div>

                    {/* CHAMPION */}
                    <div className={styles.roundColumn} style={{justifyContent: 'center', width: '300px'}}>
                       <AnimatePresence>
                         {matches.champion ? (
                           <motion.div 
                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             transition={{ duration: 0.4, ease: 'easeOut' }}
                             className={styles.championBox}
                           >
                             <div className={styles.championLabel}>Tournament Champion</div>
                             <div className={styles.championName}>{matches.champion}</div>
                           </motion.div>
                         ) : (
                           <div style={{
                             border: '2px dashed var(--border)', 
                             borderRadius: '12px', 
                             padding: '2rem', 
                             textAlign: 'center', 
                             color: 'var(--text-muted)'
                           }}>
                             Champion TBD
                           </div>
                         )}
                       </AnimatePresence>
                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
