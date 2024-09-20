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

  function toggleClass(node, newClass){
    node.classList.toggle(newClass);
  }

  function addEventListener(node, event, callback){
    if(node){
      node.addEventListener(event, callback);
    }
  }

  function setAttribute(node, attribute, value){
    node.setAttribute(attribute, value);
  }

  return {
    createNode,
    querySelector,
    updateTextContent,
    appendChild,
    toggleClass,
    addEventListener,
    setAttribute
  }
})();

export { DOMModule }