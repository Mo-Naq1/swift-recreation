import Sidebar from '@/components/Sidebar';
import '../globals.css';

export default function ReportsLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
