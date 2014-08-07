(function (window, document) {

  var btnBreadcrumbSubmit = document.getElementById('btnBreadcrumbSubmit');
  var btnSave = document.getElementById('btnSave');
  var btnRestore = document.getElementById('btnRestore');
  var inputElementId = document.getElementById('inputElementId');
  var inputElementName = document.getElementById('inputElementName');

  var btnBreadcrumbSubmitBis = document.getElementById('btnBreadcrumbSubmitBis');
  var btnSaveBis = document.getElementById('btnSaveBis');
  var btnRestoreBis = document.getElementById('btnRestoreBis');
  var inputElementIdBis = document.getElementById('inputElementIdBis');
  var inputElementNameBis = document.getElementById('inputElementNameBis');

  var breadcrumb = new Breadcrumb('placeholderForBreadcrumb');
  var breadcrumbBis = new Breadcrumb('placeholderForBreadcrumbBis');

  btnBreadcrumbSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumb.append(inputElementId.value, inputElementName.value);
    inputElementId.value = '';
    inputElementName.value = '';
    inputElementId.focus();
  });

  btnSave.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumb.save();
  });

  btnRestore.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumb.restore();
  });

  btnBreadcrumbSubmitBis.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumbBis.append(inputElementIdBis.value, inputElementNameBis.value);
    inputElementIdBis.value = '';
    inputElementNameBis.value = '';
    inputElementIdBis.focus();
  });

  btnSaveBis.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumbBis.save();
  });

  btnRestoreBis.addEventListener('click', function (e) {
    e.preventDefault();
    breadcrumbBis.restore();
  });

}(this, this.document));