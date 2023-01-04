class UserInterface{
    #open;
    constructor(){
        this.#open = false;
        this.tools = new Tools();
        this.playerskin = [];
        this.callback();
        this.init();
        this.cam = null;
        this.initialized = false;
        this.rotate = true;
    }

    async init(){
        // TriggerEvent("skinchanger:loadDefaultModel")
        await this.tools.Wait(1000);
        TriggerEvent("skinchanger:getData", (components,maxval) => {
            // console.log(components);
            // console.log(maxval);
            // console.log("Initialized", components.length);
            SendNuiMessage(JSON.stringify({
                action: "initInterface",
                Categories_Label: Config.Categories,
                Max_Value: maxval,
            }));
        })
        TriggerServerEvent("iClothing:getSaves");
        this.tools.registerClientEvent("iClothing:sendSaves",(saves)=>{
            SendNuiMessage(JSON.stringify({
                action: "initSave",
                saves: saves,
            }));
        })
        this.tools.registerClientEvent("iClothing:refreshSaves",(saves)=>{
            TriggerServerEvent("iClothing:getSaves");
        })
        this.tools.registerClientEvent("iClothing:ConfirmBuy", (yn) => {
            if(yn){
                this.close();
                SendNuiMessage(JSON.stringify({
                    action: "notification",
                    message: Config.languages[Config.local]["buy_success"]+" ("+Config.Price+"$)",
                    type: "success"
                }));
            } else {
                SendNuiMessage(JSON.stringify({
                    action: "notification",
                    message: Config.languages[Config.local]["buy_fail"]+" ("+Config.Price+"$)",
                    type: "error",
                }));
                TriggerEvent("skinchanger:loadSkin",this.playerskin, () =>{
                    this.close();
                })

            }
        })
    }

    async open(coordsShop){
        if (this.initialized){
            this.#open = true;
            SetEntityCoords(PlayerPedId(),coordsShop[0],coordsShop[1],coordsShop[2]+0.1,false,false,false,false);
            FreezeEntityPosition(PlayerPedId(),true);
            SetEntityHeading(PlayerPedId(),-90);
            this.cam = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', coordsShop[0]+1.5, coordsShop[1], coordsShop[2]+1, 0, 0, 90, 90)
            SetCamActive(this.cam, true)
            RenderScriptCams(true, false, 1, false, false)
            RequestAnimDict( "clothingshirt" )
            TaskPlayAnim(PlayerPedId(), "clothingshirt", "try_shirt_neutral_d", 1.0, -1.0, -1.0, 1, 0, 0, 0, 0)
            TriggerEvent("skinchanger:getSkin", (skin) => {
                this.playerskin = skin;
                // console.log(skin)
                SetNuiFocus(true, true);
                SendNuiMessage(JSON.stringify({
                    action: "open",
                    open: true,
                    currentskin:skin,
                }));
            })
            while(this.#open){
                await this.tools.Wait(5);
                this.rotate ? SetEntityHeading(PlayerPedId(),GetEntityHeading(PlayerPedId())-0.2) : NaN;
            }
            StopAnimTask(PlayerPedId(), "clothingshirt", "try_shirt_neutral_d", 1.0)
        }
    }

    close(){
        this.#open = false;
        FreezeEntityPosition(PlayerPedId(),false);
        SetCamActive(this.cam, false)
        RenderScriptCams(false, false, 1, false, false)
        DestroyCam(this.cam);
        SetNuiFocus(false, false);
        SendNuiMessage(JSON.stringify({
            action: "open",
            open: false
        }));
    }

    isOpen(){
        return this.#open;
    }

    callback(){
        
        RegisterNuiCallbackType("CallBack");
        on("__cfx_nui:CallBack", (data) => {
            console.log(data.action);
            switch (data.action) {
                case "close":{
                    TriggerEvent("skinchanger:loadSkin",this.playerskin, () =>{
                        this.close();
                    })
                    break;
                }
                case "UpdateColor":{
                    TriggerEvent("skinchanger:getData", (components,maxval) => {
                        // console.log(components);
                        // console.log(maxval);
                        // console.log("Update", components.length);
                        SendNuiMessage(JSON.stringify({
                            action: "UpdateColor",
                            Categories_Label: Config.Categories,
                            Max_Value: maxval,
                        }));
                    })
                    break;
                }
                case "updateMaxVars":{
                    TriggerEvent("skinchanger:getData", (components,maxval) => {
                        // console.log(components);
                        // console.log(maxval);
                        // console.log("Update", components.length);
                        SendNuiMessage(JSON.stringify({
                            action: "updateMaxVars",
                            Categories_Label: Config.Categories,
                            Max_Value: maxval,
                        }));
                    })
                    break;
                }
                case "change":{
                    this.onChange(data.categorie,data.id)
                    break;
                }
                case "buy":{
                    // console.log("buy event")
                    TriggerEvent("skinchanger:getSkin", (skin) => {
                        TriggerServerEvent("iClothing:buy",skin);
                    })
                    break;
                }

                case "saveNewClothing":{
                    // console.log("saveNewClothing event")
                    TriggerEvent("skinchanger:getSkin", (skin) => {
                        var newData = data.data;
                        newData.skin = skin;
                        TriggerServerEvent("iClothing:save", newData);
                    })
                    break;
                }

                case "deleteClothing":{
                    // console.log("deleteClothing event")
                    TriggerServerEvent("iClothing:delete", data);
                    break;
                }

                case "setClothing": {
                    // console.log("setClothing event")
                    const skin = JSON.parse(data.data);
                    let newSkin = {...skin};
                    TriggerEvent("skinchanger:getData", (components,maxval) => {
                       components.forEach((component) => {
                            let finded = false;
                            Config.Categories.forEach((categorie) => {
                                if(categorie.variants == component.name || categorie.color == component.name){
                                    finded = true;
                                }
                            })
                            if(!finded){
                                newSkin[component.name] = component.value;
                            }
                            finded = false;
                        })
                        TriggerEvent("skinchanger:loadSkin",newSkin)
                        TriggerServerEvent("iClothing:setClothing",newSkin)
                        this.close();
                    })
                    
                    break;
                }

                case "switchRotate":{
                    // console.log("switchRotate event")
                    this.rotate = data.data;
                    break;
                }

                case "initialized":{
                    this.initialized = true;
                    break;
                }
            }
        });
    }

    onChange(variant,nbr){
        TriggerEvent("skinchanger:change", variant,nbr)
    }

}