export function insertStyle(css: string, key?: string): void {
  const style = document.createElement('style')
  style.innerHTML = css
  if (key)
    style.dataset[key] = ''
  document.head.appendChild(style)
}

export function insertRemovableStyle(css: string, key?: string): { rm: () => void, style: HTMLStyleElement } {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
  if (key)
    style.dataset[key] = ''
  return {
    rm: () => style.remove(),
    style,
  }
}
