const AppointmentList = ({ appointments, loading }) => {
    if (loading) return <div>Lade Termine...</div>;
    
    return (
      <div className="appointment-list">
        <h2>Deine Termine ({appointments.length})</h2>
        
        {appointments.length === 0 ? (
          <p>Keine bevorstehenden Termine</p>
        ) : (
          appointments.map(appointment => (
            <div key={appointment._id} className={`appointment-card status-${appointment.status}`}>
              <div className="appointment-meta">
                <span>{new Date(appointment.startTime).toLocaleDateString()}</span>
                <span>{appointment.status}</span>
              </div>
              <h3>Mit: {appointment.participant.username}</h3>
              <p>
                {new Date(appointment.startTime).toLocaleTimeString()} - 
                {new Date(appointment.endTime).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default AppointmentList;