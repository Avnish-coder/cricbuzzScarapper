// require("chromedriver");
// let swd = require("selenium-webdriver");



// async function main(){
//               let browser =  new swd.Builder().forBrowser(`chrome`).build();
//               let matchId = 38397;
//              await browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchId}`);
//               await browser.wait(swd.until.elementLocated(swd.By.css(`.cb-nav-bar a `)));
//               let buttons = await browser.findElements(swd.By.css(`.cb-nav-bar a`));
              
//               await buttons[1].click();
// }

// main();

// console.log(`hekki world`);

// selenium methods are bydefault async and
// javaScript methods are bydefault sync and we use await to make async function to sync synchoronas
// javascript methods are sync except "setTimeOut", "setInterval".
// async functions fun parallely and sync functions run line by line.


// interview question important 
let x = {
              newObj: { 
                obj2 : {
                  obj5 : {
                      one : 1          
                  }
              }
           },
           obj3 : {
               obj4 : {
                   two : 2          
               }          
           }
    }

    function flatten(ob) {
       let result = {};
       
       for(let i in ob){
                     if((typeof ob[i]) === "object"){
                            const temp = flatten(ob[i]);
                            for(const j in  temp){
                                 result[i + "." + j]  =  temp[j];     
                            }
                     }
                     else{
                            result[i] = ob[i];
                     }     
       }
       return result;
    };

    console.log(flatten(x));

