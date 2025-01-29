import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../features/appointmentSlice';
import { fetchBlocks } from '../features/blockSlice';
import { useState } from 'react';
import CreateAppointmentModal from '../components/CreateAppointmentModal';
import AppointmentList from '../components/AppointmentList';
import BlockList from '../components/BlockList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false); // Vorübergehend
  const { appointments, status: appointmentsStatus } = useSelector(state => state.appointments);
  const { blocks, status: blocksStatus } = useSelector(state => state.blocks);

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchBlocks());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1>Deine Übersicht</h1>
      
      <section className="dashboard-actions">
  <button 
    className="btn-primary" 
    onClick={() => setShowAppointmentModal(true)}
  >
    + Neuer Termin
  </button>
        <button className="btn-secondary">+ Zeit blockieren</button>
      </section>

      {showAppointmentModal && (
  <CreateAppointmentModal 
    onClose={() => setShowAppointmentModal(false)}
  />
)}

      <div className="dashboard-content">
        <AppointmentList 
          appointments={appointments} 
          loading={appointmentsStatus === 'loading'} 
        />
        
        <BlockList 
          blocks={blocks} 
          loading={blocksStatus === 'loading'} 
        />
      </div>
    </div>
  );
};

export default Dashboard;