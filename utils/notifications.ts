// utils/notifications.ts
export const showNotification = (title: string, options?: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  } else {
    console.log('Notification permission is not granted or notifications are not supported.');
  }
};
