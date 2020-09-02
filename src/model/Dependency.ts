import axios from "axios";

export default class Dependency {
	private name: string;
	private currentVersion: string;
	private latestVersion: string | undefined;

	constructor(name: string, version: string) {
		this.name = name;
		this.currentVersion = version;
		this.latestVersion = undefined;
	}

	async fetchLatestVersion(): Promise<void> {
		const response = (await axios(`https://registry.npmjs.org/${this.name}/latest`)).data;

		// Preserve semver prefix
		if (["^", "~"].includes(this.currentVersion[0])) {
			this.latestVersion = this.currentVersion[0] + response.version;
		} else {
			this.latestVersion = response.version;
		}
	}

	getObject(): Package {
		return {
			name: this.name,
			currentVersion: this.currentVersion,
			latestVersion: this.latestVersion
		};
	}
}
