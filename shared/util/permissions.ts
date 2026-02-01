import { maxUploadSize } from "$shared/modules";
import { selectedGuildStore } from "$shared/stores";

export function getMaxFileSize() {
	const id = selectedGuildStore.getGuildId();
	return maxUploadSize(id);
}