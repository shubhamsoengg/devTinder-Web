export function formatChatTimestamp(isoString) {
	const date = new Date(isoString);
	const now = new Date();

	const isToday = date.toDateString() === now.toDateString();

	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);
	const isYesterday = date.toDateString() === yesterday.toDateString();

	if (isToday) {
		// Only show time
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	} else if (isYesterday) {
		return "Yesterday";
	} else if (date.getFullYear() === now.getFullYear()) {
		// Same year → just show Month + Day
		return date.toLocaleDateString("en-US", {
			month: "short", // Aug
			day: "numeric", // 31
		});
	} else {
		// Different year → show full date
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	}
}
