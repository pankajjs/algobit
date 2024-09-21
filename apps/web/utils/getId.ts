
const getId = (id: string): string => {
	return id.split("").slice(0, 3).join("");
};

export default getId;