let globalMoney = 0
let upkeepInter;
let sellInter;
let victoryText = document.getElementById("victory")
let defeatText = document.getElementById("defeat")
let restartButton = document.getElementById("restart-button")
var globalUpkeep;
let resources = {
    ore: {
        title: "Ore",
        symbol: "fas fa-frog" ,
        amount: 0,
        perClick:1,
        perSecond:0,
        baseSell:1,
        upgradeOneName:"Pickaxe",
        upgradeOnePrice:15,
        upgradeOneAmount:0,
        upgradeOneBoost:1,
        upgradeOneUpkeep:1,
        upgradeTwoName:"Miner",
        upgradeTwoPrice:60,
        upgradeTwoAmount:0,
        upgradeTwoBoost:2,
        upgradeTwoUpkeep:100,
    },
    wood:{
        title:"Wood",
        symbol: "fas fa-fist-raised",
        amount:0,
        perClick:1,
        perSecond:0,
        baseSell:1,
        upgradeOneName: "Axe",
        upgradeOnePrice:15,
        upgradeOneAmount:0,
        upgradeOneBoost:1,
        upgradeOneUpkeep:1,
        upgradeTwoName:"Lumberjack",
        upgradeTwoPrice:30,
        upgradeTwoAmount:0,
        upgradeTwoBoost:1,
        upgradeTwoUpkeep:2,
    },
    fish:{
        title:"Fish",
        symbol: "fas fa-fish", 
        amount:0,
        perClick:1,
        perSecond:0,
        baseSell:1,
        upgradeOneName:"Rod",
        upgradeOnePrice:25,
        upgradeOneAmount:0,
        upgradeOneBoost:2,
        upgradeOneUpkeep:1,
        upgradeTwoName:"Fisher",
        upgradeTwoPrice:50,
        upgradeTwoAmount:0,
        upgradeTwoBoost:1,
        upgradeTwoUpkeep:2
    }
      
}

function drawResources(){
    var template =""
    var resourceElem=document.getElementById("resource-items")
    for (let key in resources){
        let resource = resources[key]
        template += /* html */`
        <div class="col-md-3 text-center my-3 specialCard" id="resource-amount">
                        <h1>${resource.title}</h1>
                        <h3>You have ${resource.amount} ${resource.title}</h3>
                        <p>You are making ${resource.perClick} per click</p>
                        <p>You are making ${resource.perSecond} per second</p>
                        <button class="btn btn-info specialCard text-uppercase" onclick="buyResource('${key}')">Gather</i></button>
                    </div>
        `
    }
    resourceElem.innerHTML = template
    endGame()
}
function drawUpgradesOne(){
    let template =""
    let resource2Elem=document.getElementById("upgrade-items")
    for (let key in resources){
        let resource = resources[key]
        template += /* html */`
        <div class="col-12 text-center my-2 pb-1 specialCard rounded" id="upgrade-amount">
                        <h3>${resource.upgradeOneName}</h3>
                        <h4>This will cost $${resource.upgradeOnePrice}</h4>
                        <h5>You have ${resource.upgradeOneAmount}</h5>
                        <button class="btn btn-info specialCard text-uppercase" onclick="buyUpgradeOne('${key}')">Buy</button>
                    </div>
        `
    }
    resource2Elem.innerHTML = template
}
function drawUpgradesTwo(){
    let template =""
    let resource3Elem=document.getElementById("upgrade-items2")
    for (let key in resources){
        let resource = resources[key]
        template += /* html */`
        <div class="col-12 text-center my-2 pb-1 rounded specialCard" id="upgrade-amount">
                        <h3>${resource.upgradeTwoName}</h3>
                        <h4>This will cost $${resource.upgradeTwoPrice}</h4>
                        <h5>You have ${resource.upgradeTwoAmount}</h5>
                        <button class="btn btn-info specialCard text-uppercase" onclick="buyUpgradeTwo('${key}')">Hire</button>

                    </div>
        `
    }
    resource3Elem.innerHTML = template
}

function drawGlobalMoney(){
    let globalMoneyAmount = document.getElementById("global-money")
    globalMoneyAmount.innerText =`You have: $${globalMoney}`
}

function drawSellResource(){
    let template =""
    let sellResourceElem=document.getElementById("resource-sell")
    for (let key in resources){
        let resource = resources[key]
        template += /* html */`
        <div class="col-12 text-center py-1 rounded justify-content-end" id="upgrade-amount">
                        <h2>${resource.title}</h2>
                        <h4>Sell for ${resource.baseSell} dollars</h4>
                        <button class="btn btn-info specialCard text-uppercase" onclick="sellResources('${key}')">Sell</button>
                    </div>
        `
    }
    sellResourceElem.innerHTML = template
}

function drawResourcePerSecond(){
    for (let key in resources){
        let resource = resources[key]
        resource.amount = resource.amount+resource.perSecond
        drawResources()
        //console.log("bab")
    }
}
function rpsInterval(){
    setInterval(drawResourcePerSecond,1000)
}

function buyResource(resourceKey){
    let resource = resources[resourceKey]
    resource.amount=resource.amount + resource.perClick
    console.log(resource.amount);
    drawResources()
}
function buyUpgradeOne(resourceKey){
    let resource = resources[resourceKey]
    if(globalMoney>=resource.upgradeOnePrice){
        resource.perClick = resource.perClick + resource.upgradeOneBoost
        resource.upgradeOneAmount++
        globalMoney=globalMoney-resource.upgradeOnePrice
        resource.upgradeOnePrice = Math.floor(resource.upgradeOnePrice*1.5)
        drawUpgradesOne()
        drawResources()
        drawGlobalMoney()
    }
}
function buyUpgradeTwo(resourceKey){
    let resource = resources[resourceKey]
    if(globalMoney>=resource.upgradeTwoPrice){
        resource.perSecond = resource.perSecond + resource.upgradeTwoBoost
        resource.upgradeTwoAmount++
        globalMoney=globalMoney- resource.upgradeTwoPrice
        resource.upgradeTwoPrice = Math.floor(resource.upgradeTwoPrice*1.5)
        //console.log("a")
        drawUpgradesTwo()
        drawResources()
        drawGlobalMoney()
    }
}

function sellResoursesRandom(){
    for (let key in resources){
        let mathRandom = Math.ceil(Math.random()*5)
        let resource = resources[key]
        resource.baseSell = mathRandom
        //console.log("ty")
        drawSellResource()
    }
}
function sellInterval(){
    sellInter = setInterval(sellResoursesRandom,5000)
}

function sellResources(resourceKey){
    let resource = resources[resourceKey]
    globalMoney = globalMoney +(resource.amount*resource.baseSell)
    resource.amount=0
    drawResources()
    drawGlobalMoney()

}
function upkeep(){
    for (let key in resources){
        let resource = resources[key]
        globalUpkeep = 3+(resource.upgradeOneAmount*resource.upgradeOneUpkeep+resource.upgradeTwoAmount*resource.upgradeTwoUpkeep)
        globalMoney = globalMoney-globalUpkeep
        drawGlobalMoney()
        console.log("upkeep");
    }
}
function upkeepInterval(){
    upkeepInter = setInterval(upkeep,10000)
    
}
function endGame(){
    if(globalMoney<=-1000||globalMoney>=10000){
        if(globalMoney<=-1000){
            defeatText.removeAttribute("hidden")
        } else{victoryText.removeAttribute("hidden")}
        for (let key in resources){
            let resource = resources[key]
            globalMoney = 0
            resource.amount = 0
            resource.perSecond=0
            resource.perClick=0
            resource.upgradeOneAmount=0
            resource.upgradeTwoAmount=0
            resource.upgradeOnePrice=15
            resource.upgradeTwoPrice=50
            resource.upgradeOneUpkeep = 1
            resource.upgradeTwoUpkeep = 1
            drawUpgradesOne()
            drawUpgradesTwo();
            clearInterval(upkeepInter);
            clearInterval(sellInter)
            restartButton.removeAttribute("hidden")
        }
    }
}
function restartGame(){
    upkeepInterval()
    rpsInterval()
    sellInterval() 
    for (let key in resources){
        let resource = resources[key]
        resource.perClick = 1
        resource.upgradeOneUpkeep = 1
        resource.upgradeTwoUpkeep = 1
        restartButton.setAttribute("hidden","")
        victoryText.setAttribute("hidden","")
        defeatText.setAttribute("hidden","")
        //upkeepInterval()
       
    }
}

drawResources()
drawUpgradesOne()
drawUpgradesTwo()
drawGlobalMoney()
drawSellResource()
drawResourcePerSecond()
rpsInterval()
sellResoursesRandom()
sellInterval()
upkeepInterval()
endGame()