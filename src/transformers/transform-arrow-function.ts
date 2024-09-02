import ts from "typescript";
import { TransformContext } from "../transformer";
import { TransformAnyFunction } from "./transform-any-function";

export function VisitArrowFunction(context: TransformContext, node: ts.ArrowFunction) {
	const result = TransformAnyFunction(context, node);
	if (!result) return context.Transform(node);

	const [updatedNode, block] = result;

	return context.factory.updateArrowFunction(
		updatedNode,
		updatedNode.modifiers,
		updatedNode.typeParameters,
		updatedNode.parameters,
		updatedNode.type,
		updatedNode.equalsGreaterThanToken,
		block,
	);
}
