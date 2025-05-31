import db from '$lib/db.js';

// Load-Funktion: Lädt alle Teams UND alle Pokémon aus der Datenbank
export async function load() {
    try {
        const teams = await db.getTeams();
        const pokemon = await db.getPokemon();
        
        return {
            teams: teams,
            pokemon: pokemon  // Für die Pokémon-Vorschau
        };
    } catch (error) {
        console.error('Fehler beim Laden der Teams:', error);
        return {
            teams: [],
            pokemon: []
        };
    }
}