import { maxUploadSize } from "$shared/modules";
import { selectedGuildStore } from "$shared/stores";

export function getMaxFileSize() {
	const guildId = selectedGuildStore.getGuildId();
	const baseSize = maxUploadSize(guildId);

	return Math.max(0x1400000, baseSize);
}