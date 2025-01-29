import React from 'react';
import { useDispatch } from 'react-redux';
import { acceptAppointment, declineAppointment } from '../features/appointmentSlice';
import PropTypes from 'prop-types'; // Optional, aber empfohlen

const AppointmentList = ({ appointments, loading }) => {
  const dispatch = useDispatch();

  if (loading) {
    return <div className="loading-message">Lade Termine...</div>;
  }

  return (
    <div className="appointment-list">
      <h2>Deine Termine ({appointments.length})</h2>
      
      {appointments.length === 0 ? (
        <p className="no-appointments">Keine bevorstehenden Termine</p>
      ) : (
        appointments.map(appointment => (
          <div 
            key={appointment._id} 
            className={`appointment-card status-${appointment.status}`}
          >
            <div className="appointment-meta">
              <span className="date">
                {new Date(appointment.startTime).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </span>
              <span className={`status-badge ${appointment.status}`}>
                {appointment.status === 'pending' && '⏳ Ausstehend'}
                {appointment.status === 'accepted' && '✅ Angenommen'}
                {appointment.status === 'declined' && '❌ Abgelehnt'}
              </span>
            </div>
            
            <div className="appointment-details">
              <h3 className="participant">
                Mit: {appointment.participant?.username || 'Unbekannter Benutzer'}
              </h3>
              
              <p className="time">
                🕒 {new Date(appointment.startTime).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} - {new Date(appointment.endTime).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>

              {appointment.reason && (
                <p className="decline-reason">
                  🚫 Grund: {appointment.reason}
                </p>
              )}
            </div>

            {appointment.status === 'pending' && (
              <div className="appointment-actions">
                <button
                  onClick={() => dispatch(acceptAppointment(appointment._id))}
                  className="btn-success"
                  aria-label="Termin annehmen"
                >
                  Annehmen
                </button>
                
                <button
                  onClick={() => {
                    const reason = prompt('Bitte geben Sie einen Ablehnungsgrund ein (optional):');
                    dispatch(declineAppointment({ 
                      appointmentId: appointment._id,
                      reason: reason || 'Kein Grund angegeben'
                    }));
                  }}
                  className="btn-danger"
                  aria-label="Termin ablehnen"
                >
                  Ablehnen
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

// Prop Validation (optional)
AppointmentList.propTypes = {
  appointments: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default AppointmentList;