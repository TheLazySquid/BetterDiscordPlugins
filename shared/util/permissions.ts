import { premiumPermissions } from "$shared/modules";
import { userStore } from "$shared/stores";

export function getMaxFileSize() {
	const user = userStore.getCurrentUser();
	return premiumPermissions.getUserMaxFileSize(user);
}