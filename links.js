const axios = require("axios");
const cheerio = require("cheerio");

const { writeFile } = require("./wirter");

const fetchLinks = async (url) => {
  try {
    // Go to the dev.to tags page
    const response = await axios.get(url);

    // Get the HTML code of the webpage
    const html = response.data;
    const $ = cheerio.load(html);

    // Create tags array to store tags
    const foods = [];

    // Find all elements with crayons-tag class, find their innerText and add them to the tags array
    $("div.items > li > div > div.image > a").each((_idx, el) =>
      foods.push($(el).attr("href"))
    );

    return foods;
  } catch (error) {
    throw error;
  }
};

const handleFetch = async (baseurl, url, pageCount) => {
  let all = [];
  for (let i = 1; i <= pageCount; i++) {
    const endpoint = `${baseurl}/${url}/page/${i}/`;
    const data = await fetchLinks(endpoint);
    all = [...all, ...data];

    console.log(`${endpoint} fetched!`);
  }

  writeFile("other/" + url, all);

  console.log("done.");
};
const cats = [
  { name: "cake", count: 7 },
  { name: "turkish-food", count: 3 },
  { name: "soup", count: 2 },
  { name: "bread", count: 4 },
  { name: "salad", count: 3 },
  { name: "diet-food", count: 2 },
];

const runner = async () => {
  for (let index = 0; index < cats.length; index++) {
    const cat = cats[index];
    await handleFetch("https://rezim.ir/recipes-category", cat.name, cat.count);
  }
};

runner();
