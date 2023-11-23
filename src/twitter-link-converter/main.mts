function modifyLink(link: HTMLAnchorElement) {
  if (link.href.includes('t.co')) {
    let urlText = link.innerText
    if (urlText.endsWith('…')) urlText = urlText.slice(0, -1)
    if (urlText.startsWith('http')) link.href = urlText
    else if (!urlText.startsWith('/')) link.href = `https://${urlText}`
  }
}

function observeDOM() {
  try {
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node instanceof HTMLAnchorElement) modifyLink(node)
              else node.querySelectorAll('a').forEach(modifyLink)
            }
          })
        }
      }
    }).observe(document.body, { childList: true, subtree: true })
  } catch (e) {
    console.log(e)
  }
}

document.querySelectorAll('a').forEach(modifyLink)
observeDOM()
