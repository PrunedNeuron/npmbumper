import axios from "axios";

export default class Dependency {
	private name: string;
	private currentVersion: string;
	private latestVersion: string | undefined;

	constructor(name: string, version: string) {
		this.name = name;
		this.currentVersion = version.replace("^", "");
		this.latestVersion = undefined;
	}

	async fetchLatestVersion() {
		const response = (await axios(`https://registry.npmjs.org/${this.name}/latest`)).data;
		// console.log(response);
		this.latestVersion = response.version;
	}

	getObject() {
		return {
			name: this.name,
			currentVersion: this.currentVersion,
			latestVersion: this.latestVersion
		};
	}
}
