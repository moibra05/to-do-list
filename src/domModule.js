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

  function remove(node){
    node.remove();
  }

  function deleteAllChildren(parent){
    const element = querySelector(parent);
    while(element.firstChild) {
      element.firstChild.remove();
    }
  }

  return {
    createNode,
    querySelector,
    updateTextContent,
    appendChild,
    toggleClass,
    addEventListener,
    setAttribute,
    remove,
    deleteAllChildren,
  }
})();

export { DOMModule }