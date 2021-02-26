module.exports = {
  on: false,

  debugLog: function() {
    if (module.exports.on) {
      console.log(`LOG NUM: ${module.exports.debugLogCounter} --- `, arguments);
      module.exports.debugLogCounter += 1;
    }
  },

  debugLogCounter: 0,
};
