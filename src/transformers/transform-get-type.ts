import ts from "typescript";
import { GetTypeUid } from "../helpers";
import { GenerateIndexOfGenerics, GetGenericIndex } from "../helpers/generic-helper";
import { TransformContext } from "../transformer";
import { ConvertValueToCallExpression } from "../type-builders";

function TransformGetType(node: ts.CallExpression, typeId: string | ts.ElementAccessExpression) {
	return ConvertValueToCallExpression(node.expression.getText(), [typeId]);
}

export function VisitGetType(state: TransformContext, node: ts.CallExpression) {
	const name = node.expression.getText();
	if (name !== "GetType") return state.Transform(node);

	// TODO: Add check import

	if (!node.typeArguments) return state.Transform(node);

	const typeChecker = state.typeChecker;
	const typeArgument = node.typeArguments[0];
	const type = typeChecker.getTypeFromTypeNode(typeArgument);

	if (type.isTypeParameter()) {
		const index = GetGenericIndex(type);
		if (index === undefined) return state.Transform(node);

		return TransformGetType(node, GenerateIndexOfGenerics(index));
	}

	return TransformGetType(node, GetTypeUid(type));
}
