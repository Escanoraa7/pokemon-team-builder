import db from '$lib/db.js';
import { error, redirect } from '@sveltejs/kit';

// Load-Funktion: Lädt ein spezifisches Team mit Details
export async function load({ params }) {
    try {
        const teamId = params.id;
        const team = await db.getTeam(teamId);
        
        if (!team) {
            throw error(404, 'Team nicht gefunden');
        }
        
        // Pokémon-Details für das Team laden (wenn pokemonIds vorhanden)
        let teamPokemon = [];
        if (team.pokemonIds && team.pokemonIds.length > 0) {
            for (const pokemonId of team.pokemonIds) {
                const pokemon = await db.getPokemonById(pokemonId);
                if (pokemon) {
                    teamPokemon.push(pokemon);
                }
            }
        }
        
        return {
            team: team,
            teamPokemon: teamPokemon
        };
    } catch (error) {
        console.error('Fehler beim Laden des Teams:', error);
        throw error(500, 'Fehler beim Laden der Team-Details');
    }
}

// Form Actions
export const actions = {
    delete: async ({ params }) => {
        try {
            const teamId = params.id;
            const result = await db.deleteTeam(teamId);
            
            if (result) {
                // Erfolgreich gelöscht - zurück zur Teams-Liste
                throw redirect(303, '/teams');
            } else {
                return {
                    success: false,
                    error: 'Team konnte nicht gelöscht werden'
                };
            }
        } catch (error) {
            if (error.status === 303) {
                // Redirect weiterwerfen
                throw error;
            }
            
            console.error('Fehler beim Löschen des Teams:', error);
            return {
                success: false,
                error: 'Unerwarteter Fehler beim Löschen'
            };
        }
    }
};