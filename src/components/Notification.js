import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ supabase, session }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch unread notifications from Supabase
  useEffect(() => {
    const fetchNotifications = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("recipient", session.user.email)
          .eq("read", false);

        if (error) {
          console.error("Error fetching notifications:", error);
        } else {
          setNotifications(data);
          setUnreadCount(data.length);
        }
      }
    };

    fetchNotifications();
  }, [session, supabase]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Mark notifications as read
  const markAsRead = async () => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("recipient", session.user.email)
      .eq("read", false);

    if (!error) {
      setUnreadCount(0);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }
  };

  return (
    <div className="notification-container">
      {/* Notification bell with unread count */}
      <button onClick={toggleDropdown} className="notification-button">
        <span className="notification-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>

      {/* Notification dropdown */}
      {dropdownVisible && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))
            ) : (
              <li>No new notifications.</li>
            )}
          </ul>
          {unreadCount > 0 && (
            <button onClick={markAsRead} className="mark-as-read-button">
              Mark all as read
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
