import db from '$lib/db.js';
import { fetchAllGen1Pokemon } from '$lib/pokeapi.js';

// Load-Funktion: Lädt alle Pokémon aus der Datenbank
export async function load() {
    try {
        // Lade alle Pokémon aus der Datenbank
        let pokemon = await db.getPokemon();
        
        // Falls weniger als 50 Pokémon vorhanden sind, lade von API
        if (pokemon.length < 50) {
            console.log(`🔄 Nur ${pokemon.length} Pokémon in DB - lade 151 aus der API...`);
            
            // Lade alle 151 Pokémon aus der PokéAPI (ohne Collection zu löschen)
            const apiPokemon = await fetchAllGen1Pokemon();
            
            if (apiPokemon.length > 0) {
                // Speichere sie in der Datenbank
                const result = await db.populatePokemonFromAPI(apiPokemon);
                console.log(`✅ ${result.inserted} Pokémon in Datenbank gespeichert`);
                
                // Lade die neuen Pokémon
                pokemon = await db.getPokemon();
            }
        } else {
            // Einmalig: Setze alle auf Level 100
            console.log('🔄 Prüfe Level-Update...');
            if (pokemon.length > 0 && pokemon[0].level !== 100) {
                const updated = await db.updateAllPokemonToLevel100();
                console.log(`✅ ${updated} Pokémon auf Level 100 gesetzt`);
                
                // Lade die aktualisierten Pokémon
                pokemon = await db.getPokemon();
            }
        }
        
        return {
            pokemon: pokemon
        };
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon:', error);
        return {
            pokemon: []
        };
    }
}