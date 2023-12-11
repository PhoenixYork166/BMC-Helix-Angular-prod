export var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "rx-messageduration-success";
    NotificationType["Info"] = "rx-messageduration-info";
    NotificationType["Warning"] = "rx-messageduration-warn";
    NotificationType["Error"] = "rx-messageduration-error";
})(NotificationType || (NotificationType = {}));
export const RX_DEFAULT_NOTIFICATION_SETTINGS = {
    [NotificationType.Success]: { ttl: 3000 },
    [NotificationType.Info]: { ttl: 3000 },
    [NotificationType.Warning]: { ttl: 6000 },
    [NotificationType.Error]: { ttl: 6000 }
};
//# sourceMappingURL=notification.constants.js.map