/** Builds an anchor id from heading text; shared by the outline and the markdown renderer. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*`]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function textFromChildren(node: unknown): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textFromChildren).join('');
  if (typeof node === 'object' && 'props' in (node as Record<string, unknown>)) {
    const props = (node as { props?: { children?: unknown } }).props;
    return textFromChildren(props?.children);
  }
  return '';
}
