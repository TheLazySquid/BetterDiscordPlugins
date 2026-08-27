import { adjustUploadSize, maxUploadSize } from "$shared/modules";
import { selectedGuildStore } from "$shared/stores";

export function getMaxFileSize() {
	const options = adjustUploadSize.getOptions({ location: "web.showUploadFileSizeExceededError" });
	const guildId = selectedGuildStore.getGuildId();
	const baseSize = maxUploadSize(guildId);

	return adjustUploadSize.getRealSize(options, baseSize);
}