export const dbArrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item.value
    return obj
  }, {})

/*
function (doc) {
  if(doc.docType && doc.docType === "project") {
    for (var i in  Object.keys(doc.users)) {
      emit(Object.keys(doc.users)[i], doc);
    }
  }
}
*/
