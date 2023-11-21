export function insertStyle(css: string): void {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}
