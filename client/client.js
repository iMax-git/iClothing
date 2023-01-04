console.log("----- Client.js -----");


function init() {
    
    StoreList = [];
    const ui = new UserInterface();
    Config.Stores.forEach(element => {
        new ClothingShop(element.name, element.coords, ui,element.icon,element.color)
    });
    // on("__cfx_nui:CallBack", (data) => {
    //     var jsonData = JSON.stringify(data);
    //     console.log(jsonData);
    //     switch (data.action) {
    //         case "close":{
                
    //         }
    //     }
    // });

    on("esx:onPlayerDeath", (data)=>{
        ui.close();
    })
}


init();