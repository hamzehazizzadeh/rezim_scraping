const colors = require("colors");

const sharp = require("sharp");

const names = [
  "0a6c91f2d1884be6b227ea1238fa21c3__charsoogh-1-1024x1024.jpg",
  "00d5dd8f8445d6ad9bcd3976fde5e279__charsoogh-1-1024x1024.jpg",
];

for (let i = 0; i < names.length; i++) {
  const name = names[i];

  console.log(colors.blue(name));
  sharp(`./input/${name}`)
    .webp({ quality: 5 })
    .toFile(`./output/${name}`, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(colors.green(name));
      }
    });
  console.log(colors.bgBlack(i));
}
