const DOMModule = (function () {
  function createNode(elementType) {
    return document.createElement(elementType);
  }

  function querySelector(phrase) {
    return document.querySelector(phrase);
  }

  function updateTextContent(node, text) {
    node.textContent = text;
  }

  function appendChild(parent, child){
    parent.appendChild(child);
  }

  function addClass(node, newClass){
    node.classList.add(newClass);
  }

  function addEventListener(node, event, callback){
    if(node){
      node.addEventListener(event, callback);
    }
  }

  return {
    createNode,
    querySelector,
    updateTextContent,
    appendChild,
    addClass,
    addEventListener
  }
})();

export { DOMModule }