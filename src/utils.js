import { Base64 } from 'js-base64'

export const base64ToState = (base64, search) => {
  // for backward compatibility
  const params = new window.URLSearchParams(search)
  const themeFromUrl = params.get('theme') || 'default'

  const str = Base64.decode(base64)
  let state
  try {
    state = JSON.parse(str)
    if (state.code === undefined) { // not valid json
      state = { code: str, mermaid: { theme: themeFromUrl } }
    }
  } catch (e) {
    state = { code: str, mermaid: { theme: themeFromUrl } }
  }
  return state
}

const defaultCode = `graph LR
Browser(<span class='icon client'></span> Browser)
Server(<span class='icon origin'></span> Server)
Proxy(<span class='icon proxy'></span> Proxy)
`
export const defaultState = {
  code: defaultCode,
  mermaid: { theme: 'icons' }
}
