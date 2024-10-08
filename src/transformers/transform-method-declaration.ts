import ts from "typescript";
import { TransformState } from "../transformer";
import { TransformAnyFunction } from "./transform-any-function";

export function VisitMethodDeclaration(context: TransformState, node: ts.MethodDeclaration) {
	const result = TransformAnyFunction(context, node);
	if (!result) return node;

	const [updatedNode, block] = result;

	return context.factory.updateMethodDeclaration(
		updatedNode,
		updatedNode.modifiers,
		updatedNode.asteriskToken,
		updatedNode.name,
		updatedNode.questionToken,
		updatedNode.typeParameters,
		updatedNode.parameters,
		updatedNode.type,
		block ?? updatedNode.body,
	);
}
