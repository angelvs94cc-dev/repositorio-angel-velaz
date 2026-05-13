export const buildNotification = (message, type) => {
  return `<div class="notification ${type}">${message}</div>`
}