import ts from "typescript";
import { IsCanRegisterType } from "../helpers";
import { GenerateTypeDescription } from "../helpers/generate-type-description";
import { ReflectionRuntime } from "../reflect-runtime";
import { TransformState } from "../transformer";

export function VisitInterfaceDeclaration(context: TransformState, node: ts.InterfaceDeclaration) {
	if (!IsCanRegisterType(node)) return node;

	const typeChecker = TransformState.Instance.typeChecker;
	const typeDescription = GenerateTypeDescription(typeChecker.getTypeAtLocation(node), true);

	context.AddNode(ReflectionRuntime.RegisterType(typeDescription), "before");
	return context.Transform(node);
}
