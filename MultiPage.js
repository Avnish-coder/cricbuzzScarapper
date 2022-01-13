
require("chromedriver");
// this will open new browser for every player's information for fetching..
let swd = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let fs = require("fs");
const { get } = require("http");
// for make your fs global npm i -g fs
let browser = new swd.Builder().forBrowser(`chrome`).build();
// let browser = new swd.Builder().forBrowser(`chrome`).setChromeOptions(new chrome.Options().headless()).build(); // this browser will run in background
let matchId = 38397;

let PlayersAdd = 0;
let battingStats = ["Mat", "Inn", "No", "Runs", "Hs", "Avg", "BF", "Sr", "100s", "200s", "50s", "4s", "6s"]; // this is for batsman
let bowlingStats = ["Mat", "Inn", "Balls", "Runs", "Wkt", "BBI", "BBM", "Eco", "Avg", "sr", "5W", "10W"];
let x = 1;
let inning1Batsman = [];
let inning1Bowlers = [];
let carrerData = [];


async function getCarrerData(url, i, totalPlayers) {
              let browser = new swd.Builder().forBrowser(`chrome`).build();
              // let browser = new swd.Builder().forBrowser(`chrome`).setChromeOptions(new chrome.Options().headless()).build();
              await browser.get(url);
              await browser.wait(swd.until.elementLocated(swd.By.css("table.cb-col-100.cb-plyr-thead")));
              let tables = await browser.findElements(swd.By.css("table.cb-col-100.cb-plyr-thead"));

              for (let j in tables) {
                            let data = {};
                            let rows = await tables[j].findElements(swd.By.css("tbody tr"));
                            let columns
                            for (l in rows) {
                                          let tempData = {};
                                          columns = await rows[l].findElements(swd.By.css("td"));
                                          let matchType = await columns[0].getAttribute("innerText");
                                          let keyArr = battingStats;
                                          if (j == 1) {
                                                        let keyArr = bowlingStats;
                                          }
                                          // console.log(columns.length);

                                          for (let k = 1; k < columns.length; k++) {
                                                        tempData[keyArr[k - 1]] = await columns[k].getAttribute("innerText");
                                          }
                                          data[matchType] = tempData;
                            }
                            if (j == 0) {
                                          carrerData[i]["battingCarrer"] = data;
                            } else {
                                          carrerData[i]["bowlingCarrer"] = data;
                            }
              }


              PlayersAdd++;
              browser.close();
              if(PlayersAdd == totalPlayers){
              fs.writeFileSync("MultiPage.json", JSON.stringify(carrerData)); // store the carrer data in the MultiPage.json and make data object to stringify by the JSON.stringify
              }
              
}
// this is for batsmand
async function forBatsman() {


              await browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchId}`);
              await browser.wait(swd.until.elementLocated(swd.By.css(`.cb-nav-bar a`))); // automation
              let buttons = await browser.findElements(swd.By.css(`.cb-nav-bar a`));

              await buttons[1].click();

              await browser.wait(swd.until.elementLocated(swd.By.css(`#innings_${x} .cb-col.cb-col-100.cb-ltst-wgt-hdr`)));// this is for batsman
              let tables = await browser.findElements(swd.By.css(`#innings_${x} .cb-col.cb-col-100.cb-ltst-wgt-hdr`));
              let inning1BatsmanRow = await tables[0].findElements(swd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));


              //  this is for batsman
              for (let i = 0; i < inning1BatsmanRow.length; i++) {
                            let columns = await inning1BatsmanRow[i].findElements(swd.By.css(".cb-col.cb-col"));
                              // if(i==3){
                              //    break;
                              // }
                            if (columns.length == 7) {
                                          let url = await columns[0].findElement(swd.By.css("a")).getAttribute("href");
                                          let playerName = await columns[0].getAttribute("innerText");
                                          carrerData.push({ "PlayerName": playerName });
                                          inning1Batsman.push(url);
                            }



              }
              //     console.log(inning1Batsman);

              // this is for bowlers

              let inning1BowlersRow = await tables[1].findElements(swd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
              for (let i = 0; i < inning1BowlersRow.length; i++) {
                            let columns = await inning1BowlersRow[i].findElements(swd.By.css(".cb-col.cb-col"));
                                 // if(i == 3){
                                 //    break;
                                 // }
                            if (columns.length == 8) {
                                          let url = await columns[0].findElement(swd.By.css("a")).getAttribute("href");
                                          let playerName = await columns[0].getAttribute("innerText");
                                          carrerData.push({ "PlayerName": playerName });
                                          inning1Bowlers.push(url);
                            }

              }
              //     console.log(inning1Bowlers);

              let finalUrls = inning1Batsman.concat(inning1Bowlers);

              //     console.log(finalUrls);

              for (let i in finalUrls) {
                            getCarrerData(finalUrls[i], i, finalUrls.length);
              }

                 // console.log(carrerData);
              

   browser.close();

}
forBatsman();

console.log(`hello world1`);









