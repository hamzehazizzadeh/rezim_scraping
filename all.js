const colors = require("colors");
const uniqid = require("uniqid");

const { writeFile } = require("./wirter");

const files = [
  {
    base: "asli",
    names: [
      "broth",
      "dolme",
      "foods",
      "kabab",
      "koko",
      "other-foods",
      "rice",
      "seafood",
      "steak",
      "stew",
    ],
  },
  {
    base: "fastfood",
    names: [
      "dumplings",
      "finger-food",
      "fried-foods",
      "lasagna",
      "other-fast-foods",
      "pasta",
      "pizza",
      "sandwich",
    ],
  },
  { base: "noshidany", names: ["hot-drink", "syrup"] },
  {
    base: "other",
    names: ["bread", "cake", "diet-food", "salad", "soup", "turkish-food"],
  },
  { base: "pishghaza", names: ["other-side-dishes", "pickle", "sauce"] },
  {
    base: "shirinyDeser",
    names: [
      "biscuits",
      "cupcakes",
      "dessert",
      "halva",
      "modern-sweets",
      "other-sweets",
      "tart",
      "traditional-sweets",
    ],
  },
  {
    base: "sobhaneh",
    names: ["cheese", "crepe", "jam", "omelette", "other-breakfasts"],
  },
];

const runner = async (base, names) => {
  const all = { id: uniqid(), title: base, subCategories: [] };

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const foods = require(`./${base}/1-${name}.json`);
    console.log(colors.cyan(name));

    all.subCategories.push({ id: uniqid(), title: name, foods });

    // writeFile(`${base}/` + "all", cat);
    console.log(colors.rainbow(`Done=> ${name}`));
  }
  return all;
};

(async () => {
  const all = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(colors.underline(file.base));
    const data = await runner(file.base, file.names);
    all.push(data);
    console.log(colors.underline(`Done=> ${file.base}`));
  }
  writeFile("data", all);
})();
