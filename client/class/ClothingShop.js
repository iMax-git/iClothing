class ClothingShop {
    constructor(name, coords, ui,markericon,markercolor) {
        this.name = name;
        this.coords = coords;
        this.tools = new Tools();
        this.interface = ui;
        this.markericon = markericon;
        this.markercolor = markercolor;
        this.initShop();
        // console.log("Initialized " + this.name);
    }

    async initShop(){
        const blip = AddBlipForCoord(this.coords[0], this.coords[1], this.coords[2]);
        SetBlipSprite(blip, this.markericon);
        BeginTextCommandSetBlipName("STRING");
        AddTextComponentString(this.name);
        EndTextCommandSetBlipName(blip);
        SetBlipAsShortRange(blip, true);
        SetBlipColour(blip, this.markercolor);
        var sended = false;
        while(true){
            const playerCoords = GetEntityCoords(PlayerPedId(), false);
            const distance = this.tools.distance(playerCoords, this.coords);
            // console.log(distance);
            const menuOpen = this.interface.isOpen();

            if (!menuOpen && distance < 5 ) {
                await this.tools.Wait(2);
                DrawMarker(0, this.coords[0],this.coords[1],this.coords[2],0.0,0.0,0.0,0.0,0.0,0.0,0.5,0.5,0.5,255,0,0,255,false,false,0,false,null,null,false)
                if(distance < 2 && IsControlJustPressed(0, 38)){
                    // console.log("Opening " + this.name + " at "+ this.coords);
                    this.interface.open(this.coords);
                }
                if(!sended){
                    SendNuiMessage(JSON.stringify({
                        action: "notification",
                        message: Config.languages[Config.local]["notification_open"],
                        type: "info"
                    }));
                    sended = true;
                }
            } else if(!menuOpen && distance < 10){
                await this.tools.Wait(50);
                sended = false;
            } else {
                await this.tools.Wait(1000);
            }
            
        }
    }
}