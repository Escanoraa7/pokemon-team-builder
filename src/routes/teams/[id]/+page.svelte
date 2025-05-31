<script>
  let { data } = $props();
  
  const team = data.team;
  const teamPokemon = data.teamPokemon || [];
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  }
  
  function getPokemonAvatar(name) {
    return name.substring(0, 2).toUpperCase();
  }
  
  const typeMapping = {
    electric: 'Elektro', fire: 'Feuer', water: 'Wasser', grass: 'Pflanze',
    poison: 'Gift', flying: 'Flug', psychic: 'Psycho', normal: 'Normal',
    ice: 'Eis', fighting: 'Kampf', ground: 'Boden', bug: 'Käfer',
    rock: 'Gestein', ghost: 'Geist', dragon: 'Drache', dark: 'Unlicht',
    steel: 'Stahl', fairy: 'Fee'
  };
  
  function getTypeLabel(type) {
    return typeMapping[type] || type;
  }
</script>

<style>
  .back-link {
    display: inline-block;
    color: #2a75bb;
    text-decoration: none;
    font-weight: bold;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: rgba(42, 117, 187, 0.1);
  }

  .team-header {
    background: linear-gradient(135deg, #2a75bb 0%, #4facfe 100%);
    color: white;
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 2rem;
  }

  .team-meta {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    opacity: 0.9;
  }

  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .pokemon-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #ff6b6b;
  }

  .pokemon-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .pokemon-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .pokemon-avatar img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  .pokemon-avatar .fallback {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .pokemon-info h3 {
    font-size: 1.4rem;
    color: #2a75bb;
    margin: 0;
  }

  .pokemon-level {
    color: #666;
    background: rgba(42, 117, 187, 0.1);
    padding: 0.2rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
  }

  .pokemon-types {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .type-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }

  .type-badge.fire { background: #ff6b6b; }
  .type-badge.water { background: #4ecdc4; }
  .type-badge.electric { background: #feca57; color: #333; }
  .type-badge.grass { background: #26de81; }
  .type-badge.poison { background: #8e44ad; }
  .type-badge.flying { background: #3498db; }
  .type-badge.normal { background: #a8a878; }
  .type-badge.ice { background: #98d8d8; }
  .type-badge.fighting { background: #c03028; }
  .type-badge.ground { background: #e0c068; color: #333; }
  .type-badge.bug { background: #a8b820; }
  .type-badge.rock { background: #b8a038; }
  .type-badge.ghost { background: #705898; }
  .type-badge.dragon { background: #7038f8; }
  .type-badge.dark { background: #705848; }
  .type-badge.steel { background: #b8b8d0; color: #333; }
  .type-badge.fairy { background: #ee99ac; color: #333; }

  .team-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .btn-danger {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
  }

  .section-title {
    text-align: center;
    color: #2a75bb;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .empty-team {
    text-align: center;
    padding: 3rem 2rem;
    color: #666;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    margin-bottom: 2rem;
  }

  .description-section {
    background: linear-gradient(135deg, rgba(255, 203, 5, 0.1) 0%, rgba(255, 203, 5, 0.05) 100%);
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-left: 4px solid #ffcb05;
  }

  .description-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #2a75bb;
    margin-bottom: 0.8rem;
  }

  .description-text {
    color: #555;
    line-height: 1.6;
    font-size: 1rem;
  }
</style>

<a href="/teams" class="back-link">← Zurück zu Teams</a>

<div class="team-header">
  <h1>{team.teamName}</h1>
  <div class="team-meta">
    <span>👤 Trainer: {team.trainerName}</span>
    <span>📅 Erstellt: {formatDate(team.createdAt)}</span>
    <span>⚡ {teamPokemon.length}/6 Pokémon</span>
  </div>
</div>

{#if team.description}
  <div class="description-section">
    <div class="description-title">📝 Team-Beschreibung</div>
    <p class="description-text">{team.description}</p>
  </div>
{/if}

<h2 class="section-title">Team-Mitglieder</h2>

{#if teamPokemon.length > 0}
  <div class="pokemon-grid">
    {#each teamPokemon as pokemon}
      <div class="pokemon-card">
        <div class="pokemon-header">
          <div class="pokemon-avatar">
            {#if pokemon.imageUrl}
              <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy">
            {:else}
              <div class="fallback">{getPokemonAvatar(pokemon.name)}</div>
            {/if}
          </div>
          <div class="pokemon-info">
            <h3>{pokemon.name}</h3>
            <div class="pokemon-level">Level {pokemon.level}</div>
          </div>
        </div>
        <div class="pokemon-types">
          {#if pokemon.types?.length > 0}
            {#each pokemon.types as type}
              <span class="type-badge {type}">{getTypeLabel(type)}</span>
            {/each}
          {:else}
            <span class="type-badge normal">Normal</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="empty-team">
    <h3>Noch keine Pokémon im Team</h3>
    <p>Füge Pokémon zu diesem Team hinzu!</p>
  </div>
{/if}

<div class="team-actions">
  <form method="POST" action="?/delete" style="display: inline;">
    <button type="submit" class="btn-danger" onclick={() => confirm('Team wirklich löschen?')}>
      🗑️ Team löschen
    </button>
  </form>
</div>