import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../features/notificationSlice';
import io from 'socket.io-client';

const NotificationBell = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { unread } = useSelector(state => state.notifications);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    newSocket.emit('subscribe', user?.id);
    
    newSocket.on('notification', (data) => {
      dispatch(addNotification(data));
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  return (
    <div className="notification-bell">
      🔔 {unread > 0 && <span className="badge">{unread}</span>}
      
      <div className="notification-dropdown">
        {/* Hier kommen später die Benachrichtigungen */}
      </div>
      
      <button 
        onClick={() => dispatch(markAsRead())}
        className="mark-read-btn"
      >
        Als gelesen markieren
      </button>
    </div>
  );
};

export default NotificationBell;