var CategoriesInfo = []
var currentVal = []
var categories = []
var category_index = 0
var max_vals = []
var SELECTED_ID_VARIATION = 0
var SELECTED_ID_COLOR = 0

var MAX_VARIATION = -1
var MAX_COLOR = -1

const REF_CATEGORIE = document.getElementById('SELECTED_CATEGORIE')

const REF_ID_VARIATION = document.getElementById('SELECTED_ID_VARIATION')
const REF_ID_COLOR = document.getElementById('SELECTED_ID_COLOR')

const REF_MAX_VARIATION = document.getElementById('MAX_VARIATION')
const REF_MAX_COLOR = document.getElementById('MAX_COLOR')

const REF_NOTIFICATION = document.getElementById('NOTIFICATION')


const REF_SAVE_MENU = document.getElementById('SAVE_MENU')

const REF_BTN_ROTATE = document.getElementById('BTN_ROTATE')


const REF_SAVE_NAME = document.getElementById('SAVE_NAME')
const REF_SAVE_DESCRIPTION = document.getElementById('SAVE_DESCRIPTION')
const REF_SAVE_SAVELIST = document.getElementById('SAVE_SAVELIST')

window.addEventListener("message", (event) => {
    const data = event.data
    const action = data.action
    // console.log(action)
    switch (action) {
        case "open":{
            if (data.open) {
                callback({action:"UpdateColor"})
                currentVal = data.currentskin;
                // console.log(currentVal)
                SELECTED_ID_VARIATION = currentVal[CategoriesInfo[category_index].variants]
                SELECTED_ID_COLOR = currentVal[CategoriesInfo[category_index].color]
    
    
                MAX_COLOR = max_vals[CategoriesInfo[category_index].color]
                REF_MAX_COLOR.innerHTML = MAX_COLOR
    
                REF_ID_VARIATION.innerHTML = SELECTED_ID_VARIATION
                REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR
            } else {
                REF_SAVE_MENU.style.display = "none"
            }
            
            const container = document.getElementById("UI_CONTAINER")
            data.open ? container.style.display = "block" : container.style.display = "none"
            
            break;
        }

        case "initInterface":{
            // console.log("[iClothing] initInterface")
            CategoriesInfo = data.Categories_Label
            data.Categories_Label.forEach(element => {
                categories.push(element.label)
            });
            REF_CATEGORIE.innerHTML = categories[category_index]
            max_vals = data.Max_Value
            MAX_VARIATION = max_vals[CategoriesInfo[category_index].variants]
            MAX_COLOR = max_vals[CategoriesInfo[category_index].color]

            REF_ID_VARIATION.innerHTML = SELECTED_ID_VARIATION
            REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR

            REF_MAX_VARIATION.innerHTML = MAX_VARIATION
            REF_MAX_COLOR.innerHTML = MAX_COLOR
            callback({action:"initialized"})
            break;
        }

        case "initSave":{
            // console.log("[iClothing] initSave")
            REF_SAVE_SAVELIST.innerHTML = ""
            data.saves.forEach(element => {
                addSavedClothing(element)
            });
            break;
        }

        case "UpdateColor":{
            // console.log("[iClothing] UpdateColor")
            max_vals = data.Max_Value
            MAX_COLOR = data.Max_Value[CategoriesInfo[category_index].color]
            REF_MAX_COLOR.innerHTML = MAX_COLOR
            break;
        }

        case "updateMaxVars":{
            // console.log("[iClothing] updateMaxVars")
            max_vals = data.Max_Value
            MAX_VARIATION = data.Max_Value[CategoriesInfo[category_index].variants]
            REF_MAX_VARIATION.innerHTML = MAX_VARIATION
            
            break;
        }

        case "notification":{
            // console.log("[iClothing] notification")
            Notification(data.message, data.type)
            break;
        }

        default:{
            console.log("[iClothing | UI] Unknown action: " + action)
        }
    }
})

callback = (data) => {
    // console.log(data)
    const newdata = JSON.stringify(data)
    // console.log(newdata)
    fetch('https://iClothing/CallBack',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: newdata,
        }).catch(error => {
            // console.log(error)
        }).then(response => {
            // console.log(response)
        })
}

changeCategory = (step) => {
    switch (step) {
        case "next":{
            if (category_index < categories.length - 1) {
                category_index++
                REF_CATEGORIE.innerHTML = categories[category_index]
                refreshNewCategory
            } else {
                category_index = 0
                REF_CATEGORIE.innerHTML = categories[category_index]
            }
            break;
        }
        case "prev":{
            if (category_index > 0) {
                category_index--
                REF_CATEGORIE.innerHTML = categories[category_index]
            } else {
                category_index = categories.length - 1
                REF_CATEGORIE.innerHTML = categories[category_index]
            }
            break;
        }
    }
    refreshNewCategory()
}

refreshNewCategory = () => {
    SELECTED_ID_VARIATION = currentVal[CategoriesInfo[category_index].variants]
    SELECTED_ID_COLOR = currentVal[CategoriesInfo[category_index].color]
    REF_ID_VARIATION.innerHTML = SELECTED_ID_VARIATION
    REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR
    callback({action:"updateMaxVars"})
}

changeVariation = (step) => {
    switch (step) {
        case "next":{
            if (SELECTED_ID_VARIATION < max_vals[CategoriesInfo[category_index].variants] - 1) {
                SELECTED_ID_VARIATION++
            } else {
                SELECTED_ID_VARIATION = 0
            }
            REF_ID_VARIATION.innerHTML = SELECTED_ID_VARIATION
            callback({action:"change",categorie:CategoriesInfo[category_index].variants,id:SELECTED_ID_VARIATION})
            callback({action:"change",categorie:CategoriesInfo[category_index].color,id:0})
            callback({action:"UpdateColor"})
            break;
        }
        case "prev":{
            if (SELECTED_ID_VARIATION > 0) {
                SELECTED_ID_VARIATION--
            } else {
                SELECTED_ID_VARIATION = max_vals[CategoriesInfo[category_index].variants] - 1
            }
            REF_ID_VARIATION.innerHTML = SELECTED_ID_VARIATION
            callback({action:"change",categorie:CategoriesInfo[category_index].variants,id:SELECTED_ID_VARIATION})
            callback({action:"change",categorie:CategoriesInfo[category_index].color,id:0})
            callback({action:"UpdateColor"})
            break;
        }
    }
    refreshNewVariation()
}

refreshNewVariation = () => {
    SELECTED_ID_COLOR = 0
    REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR
    callback({action:"UpdateColor"})
}

changeColor = (step) => {
    switch (step) {
        case "next":{
            // console.log(SELECTED_ID_COLOR,max_vals[CategoriesInfo[category_index].color])
            if (SELECTED_ID_COLOR < max_vals[CategoriesInfo[category_index].color] - 1) {
                SELECTED_ID_COLOR++
            } else {
                SELECTED_ID_COLOR = 0
            }
            REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR
            callback({action:"change",categorie:CategoriesInfo[category_index].color,id:SELECTED_ID_COLOR})
            break;
        }
        case "prev":{
            if (SELECTED_ID_COLOR > 0) {
                SELECTED_ID_COLOR--
            } else {
                SELECTED_ID_COLOR = max_vals[CategoriesInfo[category_index].color] - 1
            }
            REF_ID_COLOR.innerHTML = SELECTED_ID_COLOR
            callback({action:"change",categorie:CategoriesInfo[category_index].color,id:SELECTED_ID_COLOR})
            break;
        }
    }
}

Notification = (msg,type) => {
    var div = document.createElement("div")
    div.className = "notification"
    const i = document.createElement("i")
    const p = document.createElement("p")
    p.innerHTML = msg
    switch (type) {
        case "error":{
            div.className += " error"
            i.className = "fas fa-exclamation-triangle icon"

            break;
        }
        case "success":{
            i.className = "fas fa-check-circle icon"
            div.className += " success"
            break;
        }
        case "info":{
            i.className = "fas fa-info-circle icon"
            div.className += " info"
            break;
        }
        default:{
            i.className = "fas fa-info-circle icon"
            div.className += " info"
        }
    }
    div.appendChild(i)
    div.appendChild(p)
    REF_NOTIFICATION.appendChild(div)
    setTimeout(() => {
        div.remove()
    }, msg.length * 100)
}

openSaveMenu = () => {
    REF_SAVE_MENU.style.display = "flex"

}

closeSaveMenu = () => {
    REF_SAVE_MENU.style.display = "none"
}

addSavedClothing = (data) => {
    // console.log(data)
    const div = document.createElement("div")
    const textdiv = document.createElement("div")
    const span = document.createElement("span")
    const description = document.createElement("span")
    const btndiv = document.createElement("div")


    textdiv.className = "save-text-container"
    span.innerHTML = data.name
    description.innerHTML = data.description
    btndiv.className = "save-btn-container"

    textdiv.appendChild(span)
    textdiv.appendChild(description)
    div.appendChild(textdiv)
    const i = document.createElement("i")
    i.className = "fa-solid fa-save"
    i.onclick = () => {
        callback({action:"setClothing",data:data.skin})
    }
    btndiv.appendChild(i)
    const i_delete = document.createElement("i")
    i_delete.className = "fa-solid fa-trash"
    i_delete.onclick = () => {
        callback({action:"deleteClothing",data:data.id})
        div.remove()
    }
    btndiv.appendChild(i_delete)
    div.appendChild(btndiv)
    REF_SAVE_SAVELIST.appendChild(div)
}

createSave = () => {
    if (REF_SAVE_NAME.value.length > 0 && REF_SAVE_DESCRIPTION.value.length > 0) {
        callback({
            action:"saveNewClothing",
            data:{
                name:REF_SAVE_NAME.value,
                description:REF_SAVE_DESCRIPTION.value
            }
        })
        REF_SAVE_NAME.value = ""
        REF_SAVE_DESCRIPTION.value = ""
    } else {
        Notification("Please fill in all fields","error")
    }
    
}

var rotate = true;
setRotation = () => {
    switch (rotate) {
        case true:{
            rotate = false
            REF_BTN_ROTATE.innerHTML = "Rotate : OFF"   
            REF_BTN_ROTATE.className = "button btn-sw-red"
            break;
        }
        case false:{
            rotate = true
            REF_BTN_ROTATE.innerHTML = "Rotate : ON"
            REF_BTN_ROTATE.className = "button btn-sw-green"
            break;
        }
    }
    
    callback({action:'switchRotate',data:rotate})
}