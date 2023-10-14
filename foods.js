const axios = require("axios");
const cheerio = require("cheerio");
const uniqid = require("uniqid");
const colors = require("colors");

const { writeFile } = require("./wirter");

const fetchFood = async (url) => {
  try {
    // Go to the dev.to tags page
    const response = await axios.get(url);

    // Get the HTML code of the webpage
    const html = response.data;
    const $ = cheerio.load(html);

    // Create tags array to store tags
    const food = { id: uniqid() };

    // Find all elements with crayons-tag class, find their innerText and add them to the tags array
    $("h1 > a").each((_idx, el) => (food.title = $(el).text()));
    $("video").each((_idx, el) => (food.video = $(el).attr("src")));
    $("img.no_image_available").each(
      (_idx, el) => (food.banner = $(el).attr("src"))
    );
    $("dd#ad-category > a").each((_idx, el) => (food.category = $(el).text()));
    $("dd#ad-city > a").each((_idx, el) => (food.city = $(el).text()));
    $("div#collapseContent").each((_idx, el) => (food.content = $(el).text()));
    return food;
  } catch (error) {
    throw error;
  }
};

const fetchFoods = async (foods, base, name) => {
  let all = [];
  for (let i = 0; i < foods.length; i++) {
    const item = foods[i];
    console.log(colors.yellow(`Started! ${item}`));
    const data = await fetchFood(item);
    all.push(data);

    console.log(colors.green(`Fetched! ${item}`));
  }

  writeFile(`${base}/` + "1-" + name, all);

  console.log("done.".blue);
};

const runner = async (base, names) => {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const foods = require(`./${base}/${name}.json`);
    console.log(colors.cyan(name));
    await fetchFoods(foods, base, name);
    console.log(colors.rainbow(`Done=> ${name}`));
  }
};

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

(async () => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(colors.underline(file.base));
    await runner(file.base, file.names);
    console.log(colors.underline(`Done=> ${file.base}`));
  }
})();
