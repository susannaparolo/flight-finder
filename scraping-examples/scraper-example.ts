// // Example - League

// import axios from "axios";
// import cheerio from "cheerio";

// const url = "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";
// const AxiosInstance = axios.create();

// interface PlayerData {
//   rank: number;
//   name: string;
//   nationality: string;
//   goals: number;
// }

// AxiosInstance.get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const statsTable: cheerio.Cheerio = $(".statsTableContainer > tr");
//     const topScorers: PlayerData[] = [];

//     statsTable.each((i, elem) => {
//       const rank: number = parseInt($(elem).find(".rank > strong").text());
//       const name: string = $(elem).find(".playerName > strong").text();
//       const nationality: string = $(elem).find(".playerCountry").text();
//       const goals: number = parseInt($(elem).find(".mainStat").text());
//       topScorers.push({
//         rank,
//         name,
//         nationality,
//         goals,
//       });
//     });

//     console.log(topScorers);
//   })
//   .catch(console.error); // Error handling



//   // Example - Clarks

//   import axios from "axios";
//   import cheerio from "cheerio";
  
//   const url = "https://www.clarks.co.uk/search/?text=kids%20shoes";
//   const AxiosInstance = axios.create();
  
//   interface ShoesData {
//     name: string;
//     category: string;
//     price: number;
//   }
  
//   AxiosInstance.get(url).then((response) => {
//     const html = response.data;
//     console.log(response);
//     const $ = cheerio.load(html);
  
//     const result = $(".product-thumbnail__product-price-info").get();
//     console.log(result);
  
//     const resultDiv: cheerio.Cheerio = $("div").find(
//       "product-thumbnail__product-price-info"
//     );
//     console.log(resultDiv.length);
//     const searchResult: ShoesData[] = [];
  
//     resultDiv.each((i, elem) => {
//       const name: string = $(elem)
//         .find("h3.product-thumbnail__product-name.content-shimmer")
//         .text();
//       const category: string = $(elem)
//         .find("div.product-thumbnail__product-title.content-shimmer")
//         .text();
//       const price: number = parseInt(
//         $(elem)
//           .find('div.product-thumbnail__product-price span[itemprop="price"]')
//           .text()
//       );
//       searchResult.push({
//         name,
//         category,
//         price,
//       });
//     });
  
//     console.log(searchResult);
//   });


// Example - fetch - Clarks

const url = "https://www.clarks.co.uk/search-ajax?query=kids%20shoes";

interface Product {
  name: string;
  averageRating: number;
}

interface ClarksResponse {
  products: Product[];
}

export const getShoesData = async (): Promise<ClarksResponse> => {
  const response = await fetch(url);
  const foo = response.text();
  const result: ClarksResponse = JSON.parse(await foo);
  const output = result.products.map(function (value, index) {
    console.log(`product: ${value.name}, rating: ${value.averageRating}`);
  });
  return result;
};

getShoesData();
