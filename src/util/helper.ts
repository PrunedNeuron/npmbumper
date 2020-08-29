import vscode from "vscode";
import Dependency from "../model/Dependency";

export async function packageJsonExists(): Promise<boolean> {
	if (vscode.workspace.rootPath) {
		const files = await vscode.workspace.findFiles("package.json");
		if (files && files.length > 0) {
			return true;
		}
	}

	return false;
}

// TODO: write to package.json
export async function writeFile(path: string, contents: string) {}

export async function getPackageJson(): Promise<string> {
	const document = await vscode.workspace.openTextDocument(
		`${vscode.workspace.rootPath}/package.json`
	);
	let text = document.getText();
	return text;
}

export function getArrayFromObject(object: any) {
	return Object.keys(object).map((key) => new Dependency(key, object[key]));
}

export function getObjectFromArray(array: Dependency[]) {
	let object: { [key: string]: string | undefined } = {};
	array.forEach((element: Dependency) => {
		object[element.getObject().name] = element.getObject().latestVersion;
	});
	return object;
}
