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

	const disposableBump: vscode.Disposable = vscode.commands.registerCommand(
		"npm-bumper.bump",
		async () => {
			const packageJson = JSON.parse(await getPackageJson());

			const rawDependencies = packageJson["dependencies"];
			const rawDevDependencies = packageJson["devDependencies"];

			let errorMessage = undefined;

			if (rawDependencies === undefined && rawDevDependencies === undefined) {
				errorMessage =
					"Could not detect dependencies and devDependencies in your package.json";
				vscode.window
					.showErrorMessage(errorMessage, "Dismiss", reportIssue)
					.then((selection) => {
						if (selection === reportIssue) {
							vscode.env.openExternal(vscode.Uri.parse(newIssueUrl));
						}
					});
			} else if (rawDependencies !== undefined || rawDevDependencies !== undefined) {
				let message = "";
				if (rawDependencies === undefined) {
					message = "Bumping devDependencies...";
				} else if (rawDevDependencies === undefined) {
					message = "Bumping dependencies...";
				} else {
					message = "Bumping dependencies and devDependencies...";
				}

				vscode.window
					.showInformationMessage(message, "Dismiss", reportIssue, cancel)
					.then((selection) => {
						if (selection === reportIssue) {
							vscode.env.openExternal(vscode.Uri.parse(newIssueUrl));
						} else if (selection === cancel) {
							terminate();
						}
					});

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

				// Create backup file
				writeJsonFile("package.backup.json", JSON.stringify(packageJson));

				// Cache original package json for recovery
				context.workspaceState.update("cachedPackageJson", packageJson);

				const updatedPackageJson = packageJson;
				updatedPackageJson["dependencies"] = updatedDependencies;
				updatedPackageJson["devDependencies"] = updatedDevDependencies;

				writeJsonFile("package.json", JSON.stringify(updatedPackageJson));
			}
		}
	);

	const disposableUndo: vscode.Disposable = vscode.commands.registerCommand(
		"npm-bumper.undo",
		async () => {
			const cachedPackageJson = context.workspaceState.get("cachedPackageJson");
			if (cachedPackageJson === undefined) {
				vscode.window.showWarningMessage("Could not find cached copy of package.json!");
			} else {
				writeJsonFile("package.json", JSON.stringify(cachedPackageJson));
			}
		}
	);

	statusBarItem.updateText(`$(symbol-constructor) $(arrow-up)`);
	statusBarItem.updateTooltip("Bump dependencies");
	statusBarItem.setCommand("npm-bumper.bump");

	context.subscriptions.push(disposableBump);
	context.subscriptions.push(disposableUndo);
	context.subscriptions.push(statusBarItem.get());
}

export function terminate(): void {
	// Do nothing. For now.
}

export function deactivate(): void {
	// TODO
}
