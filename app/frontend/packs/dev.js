Object.defineProperty(Object.prototype, '_tap', {
  value: function (cb) {
    cb(this)
    return this
  }
})