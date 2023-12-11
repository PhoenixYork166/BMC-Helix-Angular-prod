export var ApprovalRequestStatus;
(function (ApprovalRequestStatus) {
    ApprovalRequestStatus["Pending"] = "Pending";
    ApprovalRequestStatus["Hold"] = "On Hold";
    ApprovalRequestStatus["MoreInfo"] = "More Information";
    ApprovalRequestStatus["RequestMoreInfo"] = "Request More Information";
    ApprovalRequestStatus["NeedsAttention"] = "Needs Attention";
    ApprovalRequestStatus["Approved"] = "Approved";
    ApprovalRequestStatus["Rejected"] = "Rejected";
    ApprovalRequestStatus["Cancelled"] = "Cancelled";
    ApprovalRequestStatus["Error"] = "Error";
    ApprovalRequestStatus["Closed"] = "Closed";
})(ApprovalRequestStatus || (ApprovalRequestStatus = {}));
export var ApprovalGridType;
(function (ApprovalGridType) {
    ApprovalGridType["ApprovalRequests"] = "approvalRequests";
    ApprovalGridType["NeedAttentionRequests"] = "needAttentionRequests";
})(ApprovalGridType || (ApprovalGridType = {}));
export var ApprovalCommandType;
(function (ApprovalCommandType) {
    ApprovalCommandType["Approved"] = "Approved";
    ApprovalCommandType["Rejected"] = "Rejected";
    ApprovalCommandType["OnHold"] = "OnHold";
    ApprovalCommandType["Reassign"] = "Reassign";
})(ApprovalCommandType || (ApprovalCommandType = {}));
//# sourceMappingURL=approval-console.types.js.map