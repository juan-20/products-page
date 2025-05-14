interface StorageItem<T> {
	value: T;
	expiry: number;
}

export function setWithExpiry<T>(key: string, value: T, ttl: number) {
	const item: StorageItem<T> = {
		value: value,
		expiry: new Date().getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry<T>(key: string): T | null {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}

	const item: StorageItem<T> = JSON.parse(itemStr);
	const now = new Date().getTime();

	if (now > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
}
