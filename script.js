require("chromedriver");

let swd = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let fs = require("fs");
let browser = new swd.Builder().forBrowser(`chrome`).build();// to control a browser and build a browser. this is head browser for visible
// let browser = new swd.Builder().forBrowser(`chrome`).setChromeOptions(new chrome.Options().headless()).build(); // this browser will run in background
let matchId = 38397;

// browser.get("http://www.youtube.com");
// browser.get("https://www.cricbuzz.com/live-cricket-scores/"+ 38397); // this is you can make string by "" ;
// browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchId}`);// this is you can make string by ``;add variable by ${matchId};
let batsmanColumns = ["playerName", "out", "run", "bowls", "fours", "sixes", "strikeRate"]; // this if for batsman
let bowlersColumns = ["playerName", "O", "M", "R", "W", "NB", "WD", "ECO"];
let x = 1;
let inning1Batsman = [];
let inning1Bowlers = [];

// this is for batsman table
async function forBatsman() {


    await browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchId}`);
    await browser.wait(swd.until.elementLocated(swd.By.css(`.cb-nav-bar a`))); // automation
    let buttons = await browser.findElements(swd.By.css(`.cb-nav-bar a`));

    await buttons[1].click();

    await browser.wait(swd.until.elementLocated(swd.By.css(`#innings_${x} .cb-col.cb-col-100.cb-ltst-wgt-hdr`)));// this is for batsman
    let tables = await browser.findElements(swd.By.css(`#innings_${x} .cb-col.cb-col-100.cb-ltst-wgt-hdr`));// this is for batsman
    let inning1BatsmanRow = await tables[0].findElements(swd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));// this is for batsman






    //  this is for batsman
    for (let i = 0; i < (inning1BatsmanRow.length - 2); i++) {
        let columns = await inning1BatsmanRow[i].findElements(swd.By.css(".cb-col.cb-col"));
        let data = {};
        if (columns.length == 7) {
            for (j in columns) {
                if (j != 1) {
                    data[batsmanColumns[j]] = await columns[j].getAttribute("innerText"); // this is for batsman
                }
            }
        }

        inning1Batsman.push(data);

    }
    console.log(inning1Batsman);

    // this is for bowlers

    let inning1BowlersRow = await tables[1].findElements(swd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
    for (let i = 0; i < inning1BowlersRow.length; i++) {
        let columns = await inning1BowlersRow[i].findElements(swd.By.css(".cb-col.cb-col"));
        let data = {};
        if (columns.length == 8) {
            for (j in columns) {

                data[bowlersColumns[j]] = await columns[j].getAttribute("innerText"); // this is for bowlers

            }
        }


        inning1Bowlers.push(data);

    }
    console.log(inning1Bowlers);

    let finalData = inning1Batsman.concat(inning1Bowlers);

    fs.writeFileSync("carrer.json", JSON.stringify(finalData) );
    

}
forBatsman();

console.log(`hello world1`);





