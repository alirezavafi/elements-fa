"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonPathForPosition = void 0;
const getJsonPathForPosition = ({ ast }, position) => {
    const path = [];
    findNodeAtPosition(ast, position, path);
    return path;
};
exports.getJsonPathForPosition = getJsonPathForPosition;
function findNodeAtPosition(node, position, path) {
    if (position.line >= node.position.start.line - 1 && position.line <= node.position.end.line - 1) {
        const { children } = node;
        if (Array.isArray(children)) {
            for (let i = children.length - 1; i >= 0; i--) {
                const item = findNodeAtPosition(children[i], position, path);
                if (item &&
                    (item.position.start.line !== item.position.end.line ||
                        (position.character >= item.position.start.column - 1 &&
                            position.character <= item.position.end.column - 1))) {
                    path.unshift('children', i);
                    return findNodeAtPosition(item, position, path);
                }
            }
        }
        return node;
    }
    return;
}
//# sourceMappingURL=getJsonPathForPosition.js.map