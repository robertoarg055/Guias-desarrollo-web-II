export const createNotificationSlice = (set) => ({
    notifications: [],
    //Nuevo slice de notificaciones para ejercicio complementario
    addNotification: (message, type = "success") => {
        const id = Date.now();
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }]
        }));
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((notif) => notif.id !== id)
            }));
        }, 2000);
    }
});
