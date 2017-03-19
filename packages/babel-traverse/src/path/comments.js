// This file contains methods responsible for dealing with comments.

/**
 * Share comments amongst siblings.
 */

export function shareCommentsWithSiblings(willBeRemoved) {
  // NOTE: this assumes numbered keys
  if (typeof this.key === "string") return;

  const node = this.node;
  if (!node) return;

  const trailing = node.trailingComments;
  const leading = node.leadingComments;
  if (!trailing && !leading) return;

  const prev = this.getSibling(this.key - 1);
  const next = this.getSibling(this.key + 1);
  if (prev.node) {
    prev.addComments("trailing", leading);
  } else if (next.node) {
    next.addComments("leading", leading);
  }
  if (next.node) {
    next.addComments("leading", trailing);
  } else if (prev.node) {
    prev.addComments("trailing", trailing);
  }
}

export function addComment(type, content, line?) {
  this.addComments(type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content,
  }]);
}

/**
 * Give node `comments` of the specified `type`.
 */

export function addComments(type: string, comments: Array) {
  if (!comments) return;

  const node = this.node;
  if (!node) return;

  const key = `${type}Comments`;

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
