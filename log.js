module.exports = function(args) {
  console.log(`${getCurrentTimeString()} - ${args}`);

  function getCurrentTimeString() {
    let date = new Date();
    return (`${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  }
}
