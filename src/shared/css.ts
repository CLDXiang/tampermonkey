export function insertStyle(css: string): void {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}

export function insertRemovableStyle(css: string): () => void {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
  return () => {
    document.head.removeChild(style)
  }
}
