export function insertNode(parent: Node, child: Node, idx: number): boolean {
  if (idx < 0 || idx > parent.childNodes.length) {
    return false;
  }
  if (idx === parent.childNodes.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.childNodes[idx]);
  }
  return true;
}

export function getEventPath(e: Event) {
  if ('path' in e) {
    // @ts-ignore
    return e['path'];
  }
  const path = [e.target];
  let elem = e.target as HTMLElement;
  while ((elem as HTMLElement)['parentElement'] !== null) {
    path.push(elem.parentElement);
    elem = elem.parentElement as HTMLElement;
  }
  path.push(document, window);
  return path;
}
