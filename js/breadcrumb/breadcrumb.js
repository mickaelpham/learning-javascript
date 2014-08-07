/*
 * The breadcrumb component stores all elements that you send to it and display
 * them, with a "destroy" icon close to them. It also publishes a message when
 * an item is destroyed.
 */

var Breadcrumb = function (placeholderhtmlId) {
  this.htmlId = placeholderhtmlId;
  this.elementIds = new ZSet();
  this.storedElements = {};
};


// Append an element to the breadcrumb.
Breadcrumb.prototype.append = function (id, element) {
  this.elementIds.add(id);
  this.storedElements[id] = element;
  this.render();
};

// Remove an element from the breadcrumb.
Breadcrumb.prototype.remove = function (elementId) {
  var removed = this.storedElements[elementId];
  this.elementIds.remove(elementId);
  delete this.storedElements[elementId];
  this.render();
};

// Render the breadcrumb in it's associated div.
Breadcrumb.prototype.render = function () {
  var self = this;
  var oldDiv = document.getElementById(this.htmlId);
  var div = document.createElement('div');
  div.id = this.htmlId;

  // Replace the old div to remove all event listeners previously associated.
  oldDiv.parentNode.replaceChild(div, oldDiv);

  var keySet = self.elementIds.list();
  for (var i = 0; i < keySet.length; i++) {
    var element = self.storedElements[keySet[i]];
    div.innerHTML += '<li>[id: ' + keySet[i] + '; element: ' + element
        + '] &bullet; <a href="#" data-remove-id="' + keySet[i]
        + '">remove</a></li>';
  }

  div.innerHTML += '</ul>';

  // Add event listener to all the remove links.
  div.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      self.remove(e.target.dataset.removeId);
    }
  }, false);

};

// Save this breadcrumb to LocalStorage.
Breadcrumb.prototype.save = function () {
  var save = {};
  save.htmlId = this.htmlId;
  save.elementIds = this.elementIds.list();
  save.storedElements = this.storedElements;
  var jsonSave = JSON.stringify(save);
  try {
    localStorage.setItem('breadcrumb-' + this.htmlId, jsonSave);
  } catch (e) {
    console.log('>>> LocalStorage not supported');
  }
};

// Restore this breadcrumb state from LocalStorage.
Breadcrumb.prototype.restore = function () {
  try {
    var jsonRetrieved = localStorage.getItem('breadcrumb-' + this.htmlId);
    if (jsonRetrieved != null) {
      var restored = JSON.parse(jsonRetrieved);
      this.htmlId = restored.htmlId;
      this.storedElements = restored.storedElements;
      this.elementIds = new ZSet();
      for (var i = 0; i < restored.elementIds.length; i++) {
        this.elementIds.add(restored.elementIds[i]);
      }
      this.render();
    }
  } catch (e) {
    console.log('>>> LocalStorage not supported');
  }
};
