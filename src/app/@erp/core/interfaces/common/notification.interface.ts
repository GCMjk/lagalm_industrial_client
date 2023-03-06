export interface INotification {
    title?: string,
    text: string,
    icon: 'success' | 'error' | 'info' | 'warning'
}