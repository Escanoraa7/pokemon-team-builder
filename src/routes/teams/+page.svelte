<script>
  let { data } = $props();
  
  // Echte Teams aus der Datenbank
  const teams = data.teams || [];
  
  // Lade auch alle Pokémon für die Vorschau
  const allPokemon = data.pokemon || [];
  
  // Funktion um Pokémon für ein Team zu finden
  function getTeamPokemon(team) {
    if (!team.pokemonIds || !allPokemon.length) return [];
    
    return team.pokemonIds
      .map(id => allPokemon.find(p => p._id === id))
      .filter(Boolean)
      .slice(0, 6); // Max 6 Pokémon
  }
  
  function getPokemonAvatar(name) {
    return name.substring(0, 2).toUpperCase();
  }
</script>

<style>
  .create-section {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #ffcb05 0%, #ffd700 100%);
    border-radius: 15px;
  }

  .teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .team-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .team-card:hover {
    transform: translateY(-5px);
  }

  .team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .team-name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #2a75bb;
  }

  .team-size {
    background: #2a75bb;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
  }

  .trainer-info {
    color: #666;
    margin-bottom: 1rem;
  }

  .pokemon-preview {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .pokemon-mini {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .pokemon-mini img {
    width: 35px;
    height: 35px;
    object-fit: contain;
  }

  .pokemon-mini .fallback {
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-text {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
</style>

<h1>Deine Pokémon-Teams</h1>

<div class="create-section">
  <p>Bereit um dein neues Team zusammenzustellen?</p>
  <a href="/teams/create"><button>Neues Team erstellen</button></a>
</div>

{#if teams.length > 0}
  <div class="teams-grid">
    {#each teams as team}
      <div class="team-card">
        <div class="team-header">
          <h3 class="team-name">{team.teamName}</h3>
          <span class="team-size">{team.pokemonIds.length}/6</span>
        </div>
        <div class="trainer-info">👤 Trainer: {team.trainerName}</div>
        <div class="pokemon-preview">
          {#each getTeamPokemon(team) as pokemon}
            <div class="pokemon-mini">
              {#if pokemon.imageUrl}
                <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy">
              {:else}
                <div class="fallback">{getPokemonAvatar(pokemon.name)}</div>
              {/if}
            </div>
          {/each}
          {#each Array(6 - getTeamPokemon(team).length) as _}
            <div class="pokemon-mini" style="opacity: 0.3;">
              <div class="fallback">?</div>
            </div>
          {/each}
        </div>
        <a href="/teams/{team._id}"><button>Team anzeigen</button></a>
      </div>
    {/each}
  </div>
{:else}
  <div class="empty-state">
    <div class="empty-icon">🎯</div>
    <div class="empty-text">Noch keine Teams erstellt</div>
    <p>Erstelle dein erstes Pokémon-Team und starte dein Abenteuer!</p>
    <a href="/teams/create"><button>Erstes Team erstellen</button></a>
  </div>
{/if}