console.log("----- Server.js -----");
var ESX = exports[Config.extended].getSharedObject();


function RegisterServEvent(eventName, action) {
    onNet(eventName, (...args) => action(...args));
}

function TriggerClientEvent(eventName, src, ...args){
    emitNet(eventName, src, ...args);
}



RegisterServEvent("iClothing:buy",(skin) => {
    var player = ESX.GetPlayerFromId(source);
    if(player.getMoney() >= Config.Price){
        player.removeMoney(Config.Price);
        TriggerClientEvent("iClothing:ConfirmBuy",source,true);
        TriggerEvent("iClothing:save-skin", skin,source)
    } else {
        TriggerClientEvent("iClothing:ConfirmBuy",source,false);
    }
})

RegisterServEvent("iClothing:setClothing",(skin) => {
    TriggerEvent("iClothingsave-skin", skin,source)
})

RegisterServEvent("iClothing:save-skin", (skin,pSource) => {
    var player = ESX.GetPlayerFromId(pSource)
    const identifier = GetPlayerIdentifier(pSource, 0)
    console.log(identifier);
    const jsonSkin = JSON.stringify(skin);
    global.exports["oxmysql"].query("UPDATE users SET `skin` = ? WHERE identifier = ?",[jsonSkin,identifier], (result) => {

      });
})


RegisterServEvent("iClothing:getSaves", () => {
    const src = source;
    const playerLicence = GetPlayerIdentifier(src,0);
    // console.log(src,playerLicence);
    // global.exports["mysql-async"].mysql_fetch_all(
    //     "SELECT * FROM iClothing WHERE player = @player", { "player": playerLicence }, (result) => {
    //         // console.log(result);
    //         TriggerClientEvent("iClothing:sendSaves",src,result);
    //     }
    // )
    
    global.exports["oxmysql"].query("SELECT * FROM iClothing WHERE player = ?",[playerLicence ], (result) => {
        // console.log(result);
        TriggerClientEvent("iClothing:sendSaves",src,result);
    });
})

RegisterServEvent("iClothing:save", (data) => {
    const src = source;
    const playerLicence = GetPlayerIdentifier(src,0);
    // global.exports["mysql-async"].mysql_execute(
    //     "INSERT INTO iClothing (player, name,description,skin) VALUES (@player,@name,@description, @skin)", { "player": playerLicence, "name":data.name, "description":data.description,"skin":JSON.stringify(data.skin)}, (result) => {
    //         console.log("SAVED: ",result);
    //         if (result > 0) {
    //             TriggerClientEvent("iClothing:refreshSaves",src);
    //         }
    //     }
    // )
    global.exports["oxmysql"].query("INSERT INTO iClothing (player, name,description,skin) VALUES (?,?,?,?)",[playerLicence,data.name,data.description,JSON.stringify(data.skin)], (result) => {
        TriggerClientEvent("iClothing:refreshSaves",src);
    });
})

RegisterServEvent("iClothing:delete", (data) => {
    const src = source;
    // global.exports["mysql-async"].mysql_execute(
    //     "DELETE FROM iClothing WHERE id = @id", { "id": data.data }, (result) => {
    //         console.log("DELETED: ",result);
    //         if (result > 0) {
    //             TriggerClientEvent("iClothing:refreshSaves",src);
    //         }
    //     }
    // )
    
    global.exports["oxmysql"].query("DELETE FROM iClothing WHERE id = ?",[data.data ], (result) => {    
        TriggerClientEvent("iClothing:refreshSaves",src);
    
    });
})

RegisterServEvent("iClothing:setBucket", (data) => {
    const src = source;
    const bucket = data.bucket;
    SetPlayerRoutingBucket(src, bucket);
});