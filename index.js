const puppeteer = require('puppeteer');


async function dataScrap(url, userName){

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    await page.goto(url,{ waitUntil: "domcontentloaded" });
    // await page.screenshot({path:"Item.png", fullPage:true,})

    const names = await page.evaluate(()=>{
        
      const  data =Array.from(document.querySelectorAll(".seller-name a")).map(x=>x.innerText);

      return data;
    })

    browser.close()

    if(userName){
        const findData = names.filter(x=> x == userName);
  
        if(findData){
             return `${userName} user found on 1 number page`
        }else{
            return "user not found"
        }
    }

    return names
   

}


dataScrap("https://www.fiverr.com/categories/graphics-design/creative-logo-design?source=category_tree","raihan").then(res=>{
   console.log(res)
})


