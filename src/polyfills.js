Element.prototype.is = function(elementSelector) {
  switch (elementSelector[0]) {
    case '.':
      var er = new RegExp(elementSelector.replace('.', ''))
      return this.className.match(er)
      break
    case '#':
      return this.getAttribute('id') === elementSelector.replace('#', '')
      break
    default:
      return this.tagName === elementSelector.toUpperCase()
      break
  }
}

Element.prototype.delegate = function(eventName, elementSelector, cb) {
  var $this = this

  $this.addEventListener(eventName, function(evt) {
    var $this = evt.target

    if ($this.is(elementSelector)) {
      cb.call($this, evt)
    }
    if ($this.parentNode.is(elementSelector)) {
      cb.call($this.parentNode, evt)
    }
  })
}

Array.prototype.swap = function (x,y) {
  var array = this[x];
  this[x] = this[y];
  this[y] = array;
  return this;
}
