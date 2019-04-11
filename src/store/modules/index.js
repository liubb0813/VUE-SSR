const modules = Object.create(null);

const files = require.context(".", false, /\.js$/);
files.keys().forEach(key => {
  if (key === "./index.js") return;

  const filename = key.replace(/(^\.\/|\.js$)/g, "");
  modules[filename] = files(key).default;
});

export default modules;
