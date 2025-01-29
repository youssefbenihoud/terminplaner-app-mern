import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlock } from '../features/blockSlice';
import DateTimePicker from 'react-datetime-picker';

const CreateBlockModal = ({ onClose }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blockData = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      reason
    };

    try {
      await dispatch(createBlock(blockData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Blockierung fehlgeschlagen:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Zeit blockieren</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>Grund (optional):</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn-primary">
              Blockieren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlockModal;