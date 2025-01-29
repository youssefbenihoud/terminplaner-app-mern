import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../features/appointmentSlice';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

const CreateAppointmentModal = ({ onClose }) => {
  const [participantUsername, setParticipantUsername] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.appointments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const appointmentData = {
      participantUsername,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };

    try {
      await dispatch(createAppointment(appointmentData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Fehler bei Terminerstellung:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Neuen Termin erstellen</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Teilnehmer Benutzername:</label>
            <input
              type="text"
              value={participantUsername}
              onChange={(e) => setParticipantUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Startzeit:</label>
            <DateTimePicker
              onChange={setStartTime}
              value={startTime}
              minDate={new Date()}
              format="dd.MM.y HH:mm"
            />
          </div>

          <div className="form-group">
            <label>Endzeit:</label>
            <DateTimePicker
              onChange={setEndTime}
              value={endTime}
              minDate={startTime}
              format="dd.MM.y HH:mm"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
            >
              Abbrechen
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Wird erstellt...' : 'Termin anlegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;