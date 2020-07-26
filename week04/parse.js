const EOF = Symbol('EOF');

function data(ch) {

}

module.exports.parseHTML = (HTML) => {
  let state = data;
  for (let ch of HTML) {
    state = state(ch);
  }
  state = state(EOF);
}