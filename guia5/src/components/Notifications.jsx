import { useAppStore } from "../store/useAppStore";

export default function Notifications() {
    const notifications = useAppStore((state) => state.notifications);

    return (
        <div className="fixed top-5 right-5 z-50">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className={`p-3 mb-2 rounded shadow-md text-white ${
                        notif.type === "error" ? "bg-orange-500" : "bg-green-500"
                    }`}
                >
                    {notif.message}
                </div>
            ))}
        </div>
    );
}
