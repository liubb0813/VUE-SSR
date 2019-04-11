export function prepareTableTree(tree, level = 1) {
  let items = [];
  for (let i = 0, len = tree.length; i < len; i++) {
    let item = tree[i];

    if (item.children && item.children.length > 0) {
      item.children = prepareTableTree(item.children, level + 1);
    }

    items.push(
      Object.assign(item, {
        _level: level,
        _expanded: false
      })
    );
  }

  return items;
}

export function translateDataToTree(data) {
  let parents = data.filter(
    value => value.parentId == "undefined" || value.parentId == null
  );
  let children = data.filter(
    value => value.parentId !== "undefined" && value.parentId != null
  );
  let translator = (parents, children) => {
    parents.forEach(parent => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          let temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          typeof parent.children !== "undefined"
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };

  translator(parents, children);

  return parents;
}

export function toQueryString(params) {
  return Object.keys(params)
    .map(k => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}

// https://github.com/grncdr/js-capitalize/blob/master/index.js
export function capitalize(string) {
  if (!string) return "";
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.substring(1);
}

export function isEmpty(obj) {
  return ["", "null", "undefined"].indexOf(String(obj)) > -1;
}

export function toHumanReadableFileSize(bytes, si = true) {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return `${bytes.toFixed(1)} ${units[u]}`;
}

export function blobToString(blob) {
  return new Promise(function(resolve) {
    const reader = new FileReader();
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.readAsText(blob);
  });
}

export function expiredDate(expireTime, now) {
  return (
    Math.floor((new Date(expireTime) - new Date(now)) / (24 * 3600 * 1000)) < 30
  );
}
