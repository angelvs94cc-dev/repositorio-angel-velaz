import { buildNotification } from "./notification-view.js"

export const notificationsController = (notificationsContainer) => {

  const showNotification = (message, type) => {
    const newNotification = document.createElement('div')
    newNotification.innerHTML = buildNotification(message, type)
    notificationsContainer.appendChild(newNotification)

    setTimeout(() => {
      newNotification.remove()
    }, 5000);
  }

  return {
    showNotification
  }
}