import db from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

// Load-Funktion: Lädt alle Pokémon für die Auswahl
export async function load() {
    try {
        const pokemon = await db.getPokemon();
        
        return {
            availablePokemon: pokemon
        };
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon:', error);
        return {
            availablePokemon: []
        };
    }
}

// Form Action: Erstellt ein neues Team
export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            
            // Form-Daten extrahieren
            const teamName = formData.get('teamName');
            const trainerName = formData.get('trainerName');
            const description = formData.get('description') || '';
            
            // Validation
            if (!teamName || !trainerName) {
                return {
                    success: false,
                    error: 'Team-Name und Trainer-Name sind erforderlich'
                };
            }
            
            // Pokémon-IDs sammeln
            const pokemonIds = [];
            for (const [key, value] of formData.entries()) {
                if (key.startsWith('pokemon_') && value) {
                    pokemonIds.push(value);
                }
            }
            
            // Team-Object erstellen
            const newTeam = {
                teamName: teamName,
                trainerName: trainerName,
                description: description,
                pokemonIds: pokemonIds
            };
            
            // Team in Datenbank speichern
            const teamId = await db.createTeam(newTeam);
            
            if (teamId) {
                // Weiterleitung zur Teams-Übersicht
                throw redirect(303, '/teams');
            } else {
                return {
                    success: false,
                    error: 'Fehler beim Erstellen des Teams'
                };
            }
            
        } catch (error) {
            if (error.status === 303) {
                // Redirect weiterwerfen
                throw error;
            }
            
            console.error('Fehler beim Erstellen des Teams:', error);
            return {
                success: false,
                error: 'Unerwarteter Fehler beim Erstellen des Teams'
            };
        }
    }
};