module.exports = function myLoader() {
  return item.replace("console.log(", "alert(");
};
