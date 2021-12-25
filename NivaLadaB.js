console.log("Lade Recourcen");

const steps = 5; //How many steps the bot takes before exiting.
let walked = 0;
let xp = 0;
var sneeze = new Audio('https://murtfeld.ddns.net/mp3/sneeze.mp3');
sneeze.volume = 0.1;

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verify(verifytime){
    for (const buttonverify of document.querySelectorAll("a")){
        if (buttonverify.textContent.includes("Press here to verify")){
            console.log("Verify pls!!!")
            buttonverify.click();
            sneeze.play();
            await sleep(verifytime);
        }
    }
}

async function attack(){
    for (const buttonattack of document.querySelectorAll("a")){
        if (buttonattack.textContent.includes("Attack")){
            buttonattack.click();
            await sleep(2000);
            for (const buttonigattack of document.querySelectorAll("button")){
                if (buttonigattack.textContent.includes("Attack")){
                    buttonigattack.click();
                    await sleep(1000);
                    for (const buttonclose of document.querySelectorAll("a")){
                        if (buttonclose.textContent.includes("Close")){
                            buttonclose.click();
                        }
                    }
                }
            }
        }
    }
}

async function takeastep(delay){
await verify(20000);
//await attack();
await sleep(delay);
console.log("Sleeping for:", delay);
console.log("taking step: ", walked, "/", steps);
for (const buttonstep of document.querySelectorAll("button")){
    if (buttonstep.textContent.includes("Take a step") || buttonstep.textContent.includes("Take another step")){
        if(buttonstep.disabled){
            console.log(buttonstep.textContent, "Disabled")
            return 1;
        }
        else{
            buttonstep.click()
            console.log("Took step: ", walked, "/", steps);
            await sleep(500);
            //Counts EXP
            //let exp = document.querySelector('[x-text="notif_exp"]');
            //xp = Number(xp) + Number(exp.textContent);
            //exp = 0;
            console.log("EXP Gained: ", xp);
            return 0;
        }
    }
  }
}

console.log("Starting NivaLadaB");

while(steps >= walked){
    if(await takeastep(5000)){
        walked++;
    }
}
