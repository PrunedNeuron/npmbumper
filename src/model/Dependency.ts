import axios from "axios";

import { Package } from "../typings/types";

export default class Dependency {
	private name: string;
	private currentVersion: string;
	private latestVersion: string | undefined;

	constructor(name: string, version: string) {
		this.name = name;
		this.currentVersion = version.replace("^", "");
		this.latestVersion = undefined;
	}

	async fetchLatestVersion(): Promise<void> {
		const response = (await axios(`https://registry.npmjs.org/${this.name}/latest`)).data;
		// console.log(response);
		this.latestVersion = response.version;
	}

	getObject(): Package {
		return {
			name: this.name,
			currentVersion: this.currentVersion,
			latestVersion: this.latestVersion
		};
	}
}
