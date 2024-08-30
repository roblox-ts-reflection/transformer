import ts from "typescript";
import { GenerateTypeDescriptionFromNode } from "../helpers/generate-type-description";
import { ReflectionRuntime } from "../reflect-runtime";
import { TransformContext } from "../transformer";

export function VisitInterfaceDeclaration(context: TransformContext, node: ts.InterfaceDeclaration) {
	const typeDescription = GenerateTypeDescriptionFromNode(node);
	return [context.Transform(node), ReflectionRuntime.RegisterType(typeDescription.FullName, typeDescription)];
}
