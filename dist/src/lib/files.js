"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fixName = name => {
  return name.toLowerCase().replace(/ı/g, "i").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ä/g, "a").replace(/ß/g, "ss").replace(/,./g, "").replace(/_/g, " ").split(" ").join("-");
};

const copyFile = async (file, target, destination, debug) => {
  let oldPath = `${target}\\${file}`;
  let newPath = `${destination}\\${fixName(file)}`;

  if (await _fsExtra.default.lstatSync(oldPath).isDirectory()) {
    await process({
      target: oldPath,
      destination: newPath
    });
  } else {
    if (debug) {
      console.log(`${file} to ${fixName(file)}`);
    }

    await _fsExtra.default.copy(oldPath, newPath);
  }
};

const process = async ({
  target,
  destination,
  debug
}) => {
  if (!_fsExtra.default.lstatSync(target).isDirectory()) {
    let info = target.split('\\');
    let fileName = info.pop();
    let destinationPart = destination.split('\\');

    if (target === destination.replace('-fix', '')) {
      destinationPart = info;
    }

    return copyFile(fileName, info.join('\\'), destinationPart.join('\\'), debug);
  }

  let files = await _fsExtra.default.readdir(target, 'utf-8');
  await Promise.all(files.map(file => copyFile(file, target, destination, debug)));
};

var _default = {
  fixName,
  process
};
exports.default = _default;