
Config = {

    extended: "extended", // Name of your resource esx (e.g. "es_extended")

    Price: 50, // Price of the clothes

    local: "us-US",

    languages: {
        "us-US": {
            ["notification_open"]: "Press E to open the clothing shop.",
            ["buy_success"]: "You have bought a new clothes.",
            ["buy_fail"]: "You don't have enough money.",
        },
        "fr-FR": {
            ["notification_open"]: "Appuyez sur E pour ouvrir la boutique de vêtements.",
            ["buy_success"]: "Vous avez acheté de nouveau vêtement.",
            ["buy_fail"]: "Vous n'avez pas assez d'argent.",
        }
    },

    Stores: [
        // Icon : https://docs.fivem.net/docs/game-references/blips/#blips
        // Colors : https://docs.fivem.net/docs/game-references/blips/#blip-colors
        // { name: "Banco", coords: [ -818.5, -1055.2, 12.04248 ], icon:73, color:0 },
        { name: "Discount Clothing Store", coords: [72.254, -1399.102, 28.376], icon:73, color:0 },
        { name: "Ponsonbys", coords: [-703.776, -152.258, 36.415], icon:73, color:0 },
        { name: "Ponsonbys", coords: [-167.863, -298.969, 38.733], icon:73, color:0 },
        { name: "Binco", coords: [428.694, -800.106, 28.491], icon:73, color:0 },
        { name: "Binco", coords: [-829.413, -1073.710, 10.328], icon:73, color:0 },
        { name: "Ponsonbys", coords: [-1447.797, -242.461, 48.820], icon:73, color:0 },
        { name: "Discount Clothing Store", coords: [11.632, 6514.224, 30.877], icon:73, color:0 },
        { name: "Suberban", coords: [123.646, -219.440, 53.557], icon:73, color:0 },
        { name: "Discount Clothing Store", coords: [1696.291, 4829.312, 41.063], icon:73, color:0 },
        { name: "Suberban", coords: [618.093, 2759.629, 41.088], icon:73, color:0 },
        { name: "Discount Clothing Store", coords: [1190.550, 2713.441, 37.222], icon:73, color:0 },
        { name: "Suberban", coords: [-1193.429, -772.262, 16.324], icon:73, color:0 },
        { name: "Suberban", coords: [-3172.496, 1048.133, 19.863], icon:73, color:0 },
        { name: "Discount Clothing Store", coords: [-1108.441, 2708.923, 18.107], icon:73, color:0 },
    ],

    Categories: [
        { label: "t-Shirt", variants: "tshirt_1", color: "tshirt_2"},
        { label: "Pants", variants: "pants_1", color: "pants_2"},
        { label: "Shoes", variants: "shoes_1", color: "shoes_2"},
        { label: "Glasses", variants: "glasses_1", color: "glasses_2"},
        { label: "Hats", variants: "helmet_1", color: "helmet_2"},
        { label: "Torse", variants: "torso_1", color: "torso_2"},
        { label: "Decorations", variants: "decals_1", color: "decals_2"},
        { label: "Chaines", variants: "chain_1", color: "chain_2"},
        { label: "Bras", variants: "arms", color: "arms_2"},
        { label: "Sac", variants: "bags_1", color: "bags_2"},
    ]
        

}