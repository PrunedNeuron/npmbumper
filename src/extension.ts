import vscode from "vscode";

import Dependency from "./model/Dependency";
import StatusBarItem from "./model/StatusBarItem";
import { newIssueUrl } from "./util/constants";
import {
	getArrayFromObject,
	getObjectFromArray,
	getPackageJson,
	writeJsonFile
} from "./util/helper";

const statusBarItem = new StatusBarItem();

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	const reportIssue = "Report issue";
	const cancel = "Cancel";
	const disposable: vscode.Disposable = vscode.commands.registerCommand(
		"npm-bumper.bump",
		async () => {
			const packageJson = JSON.parse(await getPackageJson());

			context.workspaceState.update("cachedPackageJson", packageJson);

			const rawDependencies = packageJson["dependencies"];
			const rawDevDependencies = packageJson["devDependencies"];

			let errorMessage = undefined;

			if (rawDependencies === undefined && rawDevDependencies === undefined) {
				errorMessage =
					"Could not detect dependencies and devDependencies in your package.json";
			} else if (rawDependencies === undefined) {
				errorMessage = "Could not detect dependencies in your package.json";
			} else if (rawDevDependencies === undefined) {
				errorMessage = "Could not detect devDependencies in your package.json";
			}

			vscode.window
				.showInformationMessage("Bumping dependencies...", reportIssue, cancel)
				.then((selection) => {
					if (selection === reportIssue) {
						vscode.env.openExternal(vscode.Uri.parse(newIssueUrl));
					} else if (selection === cancel) {
						terminate();
					}
				});

			if (errorMessage !== undefined) {
				vscode.window.showErrorMessage(errorMessage);
			} else {
				const dependencies: Dependency[] = getArrayFromObject(rawDependencies);
				const devDependencies: Dependency[] = getArrayFromObject(rawDevDependencies);

				for (const dependency of dependencies) {
					await dependency.fetchLatestVersion();
				}

				for (const devDependency of devDependencies) {
					await devDependency.fetchLatestVersion();
				}

				const updatedDependencies = getObjectFromArray(dependencies);
				const updatedDevDependencies = getObjectFromArray(devDependencies);

				writeJsonFile("package-backup.json", JSON.stringify(packageJson));

				// getLatestVersions(dependencies);
			}
		}
	);

	statusBarItem.updateText(`$(symbol-constructor) $(arrow-up)`);
	statusBarItem.updateTooltip("Bump dependencies");
	statusBarItem.setCommand("npm-bumper.bump");

	context.subscriptions.push(disposable);
	context.subscriptions.push(statusBarItem.get());
}

export function terminate() {}

export function deactivate(): void {
	// TODO
}
