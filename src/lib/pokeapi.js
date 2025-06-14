// PokéAPI Integration 

// Deutsche Pokémon-Namen (Gen 1: 1-151)
const germanNames = {
    1: "Bisasam", 2: "Bisaknosp", 3: "Bisaflor", 4: "Glumanda", 5: "Glutexo",
    6: "Glurak", 7: "Schiggy", 8: "Schillok", 9: "Turtok", 10: "Raupy",
    11: "Safcon", 12: "Smettbo", 13: "Hornliu", 14: "Kokuna", 15: "Bibor",
    16: "Taubsi", 17: "Tauboga", 18: "Tauboss", 19: "Rattfratz", 20: "Rattikarl",
    21: "Habitak", 22: "Ibitak", 23: "Rettan", 24: "Arbok", 25: "Pikachu",
    26: "Raichu", 27: "Sandan", 28: "Sandamer", 29: "Nidoran♀", 30: "Nidorina",
    31: "Nidoqueen", 32: "Nidoran♂", 33: "Nidorino", 34: "Nidoking", 35: "Piepi",
    36: "Pixi", 37: "Vulpix", 38: "Vulnona", 39: "Pummeluff", 40: "Knuddeluff",
    41: "Zubat", 42: "Golbat", 43: "Myrapla", 44: "Duflor", 45: "Giflor",
    46: "Paras", 47: "Parasek", 48: "Bluzuk", 49: "Omot", 50: "Digda",
    51: "Digdri", 52: "Mauzi", 53: "Snobilikat", 54: "Enton", 55: "Entoron",
    56: "Menki", 57: "Rasaff", 58: "Fukano", 59: "Arkani", 60: "Quapsel",
    61: "Quaputzi", 62: "Quappo", 63: "Abra", 64: "Kadabra", 65: "Simsala",
    66: "Machollo", 67: "Maschock", 68: "Machomei", 69: "Knofensa", 70: "Ultrigaria",
    71: "Sarzenia", 72: "Tentacha", 73: "Tentoxa", 74: "Kleinstein", 75: "Georok",
    76: "Geowaz", 77: "Ponita", 78: "Gallopa", 79: "Flegmon", 80: "Lahmus",
    81: "Magnetilo", 82: "Magneton", 83: "Porenta", 84: "Dodu", 85: "Dodri",
    86: "Jurob", 87: "Jugong", 88: "Sleima", 89: "Sleimok", 90: "Muschas",
    91: "Austos", 92: "Nebulak", 93: "Alpollo", 94: "Gengar", 95: "Onix",
    96: "Traumato", 97: "Hypno", 98: "Krabby", 99: "Kingler", 100: "Voltobal",
    101: "Lektrobal", 102: "Owei", 103: "Kokowei", 104: "Tragosso", 105: "Knogga",
    106: "Kicklee", 107: "Nockchan", 108: "Schlurp", 109: "Smogon", 110: "Smogmog",
    111: "Rihorn", 112: "Rizeros", 113: "Chaneira", 114: "Tangela", 115: "Kangama",
    116: "Seeper", 117: "Seemon", 118: "Goldini", 119: "Golking", 120: "Sterndu",
    121: "Starmie", 122: "Pantimos", 123: "Sichlor", 124: "Rossana", 125: "Elektek",
    126: "Magmar", 127: "Pinsir", 128: "Tauros", 129: "Karpador", 130: "Garados",
    131: "Lapras", 132: "Ditto", 133: "Evoli", 134: "Aquana", 135: "Blitza",
    136: "Flamara", 137: "Porygon", 138: "Amonitas", 139: "Amoroso", 140: "Kabuto",
    141: "Kabutops", 142: "Aerodactyl", 143: "Relaxo", 144: "Arktos", 145: "Zapdos",
    146: "Lavados", 147: "Dratini", 148: "Dragonir", 149: "Dragoran", 150: "Mewtu",
    151: "Mew"
};

const typeTranslations = {
    normal: "Normal", fire: "Feuer", water: "Wasser", electric: "Elektro",
    grass: "Pflanze", ice: "Eis", fighting: "Kampf", poison: "Gift",
    ground: "Boden", flying: "Flug", psychic: "Psycho", bug: "Käfer",
    rock: "Gestein", ghost: "Geist", dragon: "Drache", dark: "Unlicht",
    steel: "Stahl", fairy: "Fee"
};

export async function fetchPokemonFromAPI(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    
    return {
        name: germanNames[pokemonId] || data.name.charAt(0).toUpperCase() + data.name.slice(1),
        pokedexId: data.id,
        types: data.types.map(type => type.type.name),
        level: 100,
        hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
        specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
        specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
        speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
        bst: data.stats.reduce((total, stat) => total + stat.base_stat, 0),
        imageUrl: data.sprites.front_default || data.sprites.other['official-artwork'].front_default
    };
}

export async function fetchAllGen1Pokemon() {
    const pokemon = [];
    const maxConcurrent = 10;
    
    for (let i = 1; i <= 151; i += maxConcurrent) {
        const batch = [];
        for (let j = i; j < i + maxConcurrent && j <= 151; j++) {
            batch.push(fetchPokemonFromAPI(j));
        }
        const results = await Promise.all(batch);
        results.forEach(result => {
            if (result) pokemon.push(result);
        });
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return pokemon;
}

export function translateType(englishType) {
    return typeTranslations[englishType] || englishType;
}