const { writeFile } = require("./wirter");

const files = require("./data.json");

const runner = async () => {
  const all = [...files];

  for (let i = 0; i < all.length; i++) {
    const sub = all[i];
    for (let j = 0; j < sub.subCategories.length; j++) {
      let foods = sub.subCategories[j].foods;
      all[i].subCategories[j].foods = foods.filter((_f) => !!_f.banner);
    }
  }
  writeFile("all", all);
};

runner();
