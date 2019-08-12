(function () {
  class flippyCard extends HTMLElement {
    constructor() {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._image = ''
      this._head = ''
      this._body = ''
    }

    connectedCallback() {
      this._getElements()
      this._render()
    }

    _getElements() {
      this._image = this.querySelector('img')
      this._head = this.querySelector('h1')
      this._body = this.querySelector('p')
      console.log(this._image)
    }

    _redraw(node, elements) {
      node.innerHTML = ''
      elements.forEach(element => {
        node.appendChild(element)
      })
    }

    _render() {
      this._shadowRoot.innerHTML = ''
      const _imgUrl = this._image.getAttribute('src')
      const _headText = this._head.innerHTML
      const _bodyText = this._body.innerHTML
      const _img = document.createElement('img')
      const _div = document.createElement('div')
      const _headTag = document.createElement('h1')
      const _hiddenDiv = document.createElement('div')
      const _divNode = this._shadowRoot.appendChild(_div)
      const _active = document.createAttribute('active')
      const _bodyTag = document.createElement('p')
      _bodyTag.innerHTML = _bodyText
      _active.value = "true"

      _div.style.transition = '400ms'
      _div.style.border = '2px solid var(--color-md-dark)'
      _div.style.padding = '10px'

      _headTag.style.position = "absolute"
      _headTag.style.transition = "400ms"
      _headTag.style.margin = "0px"
      _headTag.style.padding = "0px"
      _headTag.style.textAlign = "center"
      _headTag.style.right = "50%"
      _headTag.style.opacity = "0"
      _headTag.style.top = "calc(50% - .5em)"
      _headTag.style.color = "var(--color-background)"
      _headTag.innerHTML = _headText

      _div.style.position = 'relative'
      _div.style.height = "160px";
      _div.style.width = "200px";
      _hiddenDiv.style.position = 'absolute'
      _hiddenDiv.style.height = '100%'
      _hiddenDiv.style.width = '100%'
      _hiddenDiv.style.left = '0px'
      _hiddenDiv.style.top = '0px'
      _hiddenDiv.style.background = 'var(--color-dark)'
      _hiddenDiv.style.opacity = '0'
      _hiddenDiv.style.transition = '400ms'
      _hiddenDiv.style.transition = '400ms'
      _hiddenDiv.onmouseover = () => {
        _hiddenDiv.style.opacity = '.6'
        _headTag.style.opacity = "1"

      }
      _hiddenDiv.onmouseleave = () => {
        _hiddenDiv.style.opacity = '0'
        _headTag.style.opacity = "0"
      }



      _div.setAttributeNode(_active)


      _div.onclick = () => {
         _active.value = _active.value === "true" ? "false" : "true"
         _div.style.transform = _active.value === "true" ? 'rotate(0deg)' : 'rotate(360deg)'
         this._redraw(_divNode, _active.value === "true"? [_hiddenDiv, _headTag, _img] : [_bodyTag])
         
         }
      _img.setAttribute('src', _imgUrl)
      _divNode.appendChild(_hiddenDiv)
      _divNode.appendChild(_headTag)
      _divNode.appendChild(_img)
      // this._shadowRoot.innerHTML = `<img src='${_imgUrl}' /><p>${_headText}, ${_bodyText}</p>`

    }
  }

  customElements.define('flippy-card', flippyCard)
})() 