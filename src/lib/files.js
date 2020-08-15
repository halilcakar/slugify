import fs from 'fs-extra';


const fixName = (name) => {
  return name.toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ä/g, "a")
    .replace(/ß/g, "ss")
    .replace(/,./g, "")
    .replace(/_/g, " ")
    .split(" ")
    .join("-");
};

const copyFile = async (file, target, destination, debug) => {
  let oldPath = `${target}\\${file}`;
  let newPath = `${destination}\\${fixName(file)}`;

  if (await fs.lstatSync(oldPath).isDirectory()) {
    await process({ target: oldPath, destination: newPath });
  }
  else {
    if (debug) {
      console.log(`${file} to ${fixName(file)}`);
    }
    await fs.copy(oldPath, newPath);
  }
};

const process = async ({ target, destination, debug }) => {

  if (!fs.lstatSync(target).isDirectory()) {
    let info = target.split('\\');
    let fileName = info.pop();
    return copyFile(fileName, info.join('\\'), info.join('\\'), debug);
  }

  let files = await fs.readdir(target, 'utf-8');

  await Promise.all(
    files.map(
      (file) => copyFile(file, target, destination, debug)
    )
  )

};

export default {
  fixName,
  process,
};
