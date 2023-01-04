class Tools{

    Wait = (ms) => new Promise(res => setTimeout(res, ms));

    async WaitFor(condition, ms, max){
        let i = 0;
        while(!condition() && i < max){
            await this.Wait(ms);
            i++;
        }
    }

    distance(coords1, coords2){
        return Math.sqrt(Math.pow(coords1[0] - coords2[0], 2) + Math.pow(coords1[1] - coords2[1], 2) + Math.pow(coords1[2] - coords2[2], 2));
    }

    registerClientEvent(name, action) {
        onNet(name, (...args) => action(...args));
    }

    TriggerServerEvent(eventName, ...args){
        emitNet(eventName, ...args);
    }

}