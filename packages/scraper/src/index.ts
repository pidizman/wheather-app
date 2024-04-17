import axios from "axios";
import cheerio from "cheerio";
import { config } from "dotenv";
import { readJsonSync, writeJson } from "fs-extra";
config({});

interface Data {
  dewpoint?: string;
  temperature?: string;
  date?: string;
  time?: string;
}

export async function scrapeData(URL: string) {
  try {
    const response = await axios.get(URL);

    const $ = cheerio.load(response.data);

    const data: Data = {};

    $(".row").each((index, element) => {
      var label = $(element).find(".label").text().trim();
      label = label.toLowerCase();

      if (label === "dewpoint" || label === "temperature") {
        const value = $(element).find(".value").text().trim();
        data[label] = `${value}°C`;
      }
    });

    const date = new Date();
    data["date"] = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    data["time"] =
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const newFileData = await readJsonSync("./output.json");
    newFileData.push(data);

    writeJson("./output.json", newFileData, (err) => {
      if (err) throw new Error(`${err}`);
    });
  } catch (error) {
    console.error("Chyba:", error);
  }
}
