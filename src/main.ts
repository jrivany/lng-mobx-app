import lng from "@lightningjs/core"
import { makeAutoObservable, autorun, IReactionDisposer } from "mobx"

class Counter {
  count: number

  constructor() {
    this.count = 0
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}
const counter = new Counter()

class MobxComponent extends lng.Component {
  private _reactionDisposer?: IReactionDisposer

  override _active() {
    this._reactionDisposer = autorun(() => this.patch(counter))
  }

  override _inactive() {
    if (this._reactionDisposer) {
      this._reactionDisposer()
      this._reactionDisposer = void 0
    }
  }
}

class CounterComponent extends MobxComponent {
  static _template() {
    return {
      Text: {
        text: {
          text: this.bindProp('count', context => 'Count: ' + context.count),
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      }
    }
  }
}

class App extends lng.Application {
  static _template() {
    const spacing = 60
    return {
      Background: {
        color: 0xff000000,
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        rect: true
      },
      Counter0: {
        type: CounterComponent,
        y: spacing * 0
      },
      Counter1: {
        type: CounterComponent,
        y: spacing * 1
      },
      Counter2: {
        type: CounterComponent,
        y: spacing * 2
      },
      Counter3: {
        type: CounterComponent,
        y: spacing * 3
      },
      Counter4: {
        type: CounterComponent,
        y: spacing * 4
      },
      Counter5: {
        type: CounterComponent,
        y: spacing * 5
      },
      Counter6: {
        type: CounterComponent,
        y: spacing * 6
      },
      Counter7: {
        type: CounterComponent,
        y: spacing * 7
      },
      Counter8: {
        type: CounterComponent,
        y: spacing * 8
      },
      Counter9: {
        type: CounterComponent,
        y: spacing * 9
      },
      Counter10: {
        type: CounterComponent,
        y: spacing * 10
      },
      Counter11: {
        type: CounterComponent,
        y: spacing * 11
      },
      Counter12: {
        type: CounterComponent,
        y: spacing * 12
      },
      Counter13: {
        type: CounterComponent,
        y: spacing * 13
      },
      Counter14: {
        type: CounterComponent,
        y: spacing * 14
      },
      Counter15: {
        type: CounterComponent,
        y: spacing * 15
      }
    }
  }

  override _init() {
    setInterval(() => counter.increment(), 100)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    stage: {
      w: 1920,
      h: 1080,
      precision: 1,
      clearColor: 0x00000000,
      useImageWorker: false,
      autostart: true,
      defaultFontFace: 'Roboto'
    },
    debug: true,
    keys: {},
    enablePointer: true,
  })
  document.body.appendChild(app.stage.getCanvas())
})