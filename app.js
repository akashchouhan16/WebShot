require('dotenv').config();

const puppeteer = require('puppeteer');
var prompt = require('prompt');
    prompt.start();
const promptsync = require('prompt-sync')({sigint: true});
var start = Date.now();


 // Checkpoints For testing.
 let check = Date.now() - start;
 const out0 = {
      LOG : `BEGIN`,
   STATUS : `PARSING CODE`,
     TIME : check
 }
console.table(out0);

(async ()=>{

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // ***Visit URLS and Take SS*** 
try{
    var urlOne;
    var urlTwo;
    prompt.get(['urlOne', 'urlTwo'], function (err, result) {
        if(err){
            let latencynew = Date.now() - start;
            const out = {
                LOG : err,
                STATUS : `ERROR`,
                TIME : latencynew
            }
            console.table(out);
            console.log(err);
        }

         urlOne = result.urlOne;
         urlTwo = result.urlTwo;
    console.log('Command-line input received:');
    console.log(' URL ONE : ' + result.urlOne);
    console.log(' URL Two : ' + result.urlTwo);
    });
    await page.waitForTimeout(3000);
    if(urlOne === undefined || urlOne == '' || urlOne === null){
        urlOne = process.env.FALLBACK_URL || 'https://github.com/akashchouhan16/';
         console.log(`##### USING THE FALLBACK URL1 : ${process.env.FALLBACK_URL} ######`);
    }
    if(urlTwo === undefined || urlTwo == '' || urlTwo === null){
        urlTwo = process.env.FALLBACK_URL2 || 'https://twitter.com/Akash_Chouhan_';
        console.log(`##### USING THE FALLBACK URL2 : ${process.env.FALLBACK_URL2}######`);
    }
    
    let timeoutOne = Date.now() - start;
     let out1 = {
         LOG : `Processing ${urlOne}`,
         STATUS : 'Pending',
         LATENCY : timeoutOne
     }
    console.table(out1);
    
    // URL ONE Processing
if(urlOne !== undefined){
    await page.goto(`${urlOne}`);
    page.setViewport({width : 1300, height : 2000, deviceScaleFactor : 1});
    await page.screenshot({path: `./Output/WEBShot${Math.floor(Math.random() * 10)}.png`});
    console.log(`\tScreenShot Captured!\n\tSaving the .png File....`);
    console.log(`\tFile Saved! [Process on Halt for 1second]`);
}

    // =======================================================================================================
     await page.waitForTimeout(1000);
     let timeoutTwo = Date.now() - start;
     let out2 = {
         LOG : `Processing ${urlTwo}`,
         STATUS : 'Pending',
         LATENCY : timeoutTwo
     }
    console.table(out2);
    console.log(`\n\tProcessing New request On ${urlTwo}`);


    //  URL Two Processing

    if(urlTwo !== undefined){
        await page.goto(`${urlTwo}`);
        page.setViewport({width : 1300, height : 2000, deviceScaleFactor : 1});
        await page.screenshot({path: `./Output/WEBShot${Math.floor(Math.random() * 10) + Date.now()}.png`});
        console.log(`\tScreenShot Captured!\n\tSaving the .png File....`);
        console.log(`\tFile Saved!`);
    }

    //End the Process.
    await browser.close();
}catch(error){
    let outlatency = Date.now()-start;
    let errorObject ={
        LOG : `Code Terminated`,
        STATUS : `FAILURE`,
        URL1 : urlOne,
        URL2 : urlTwo,
        ERROR : error,
        LATENCY : outlatency
    }
    console.table(errorObject);
}
    process.exit(0);
})();