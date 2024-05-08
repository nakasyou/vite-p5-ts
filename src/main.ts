import P5 from 'p5'
import { setup, draw, data } from './sketch'

const appElem = document.getElementById('app') as HTMLDivElement

let pContext: any
new P5((p) => {
  const globalPropsMap: PropertyDescriptorMap = {}

  for (const key in p) {
    globalPropsMap[key] = {
      get() {
        if (typeof p[key] === 'function') {
          return (p[key] as Function).bind(p)
        }
        return p[key]
      },
      set(v) {
        p[key] = v
      },
    }
  }
  Object.defineProperties(globalThis, globalPropsMap)

  p.setup = setup
  p.draw = draw

  pContext = p
}, appElem)

let oldSetupFnString: string = setup.toString()
let oldDataJson: string = JSON.stringify(data)
if (import.meta.hot) {
  import.meta.hot.accept('./sketch', (newMod) => {
    if (newMod) {
      if (oldSetupFnString && oldSetupFnString !== newMod.setup.toString()) {
        pContext.setup = newMod.setup
      }
      if (oldDataJson && oldDataJson !== JSON.stringify(newMod.data)) {
      } else {
        for (const key in data) {
          newMod.data[key] = data[(key as keyof typeof data)]
        }
      }
      oldDataJson = JSON.stringify(data)
      oldSetupFnString = newMod.setup.toString()
      pContext.draw = newMod.draw
    }
  })
}