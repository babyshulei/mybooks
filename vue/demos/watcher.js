export default class Watcher {
    constructor (expOrFn, cb) {
        // 执行 this.getter() 就可以拿到 data.a.b.c
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get () {
        Dep.target = this
        value = this.getter.call(vm, vm)
        Dep.target = undefined
    }

    update () {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}