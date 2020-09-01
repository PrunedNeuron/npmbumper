type Dependencies = {
	[key: string]: string | undefined;
};

type Package = {
	name: string;
	currentVersion: string;
	latestVersion: string | undefined;
};
