<script>
  let { data } = $props();
  
  const allPokemon = data.pokemon || [];
  let searchTerm = $state('');
  
  function getFilteredPokemon() {
    if (!searchTerm.trim()) return allPokemon;
    const term = searchTerm.toLowerCase();
    return allPokemon.filter(poke => 
      poke.name.toLowerCase().includes(term) || poke.pokedexId.toString().includes(term)
    );
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
  
  function getPokemonAvatar(name) {
    return name.substring(0, 2).toUpperCase();
  }
</script>

<style>
  .search-section {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    padding: 0.8rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #2a75bb;
    box-shadow: 0 0 15px rgba(42, 117, 187, 0.2);
  }

  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }

  .pokemon-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .pokemon-card:hover {
    transform: translateY(-5px);
  }

  .pokemon-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .pokemon-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .pokemon-image img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .pokemon-avatar {
    color: white;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .pokemon-info h3 {
    font-size: 1.3rem;
    color: #2a75bb;
    margin: 0;
  }

  .pokemon-id {
    color: #999;
    font-size: 0.9rem;
  }

  .pokemon-types {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .type-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }

  .type-badge.electric { background: #feca57; color: #333; }
  .type-badge.fire { background: #ff6b6b; }
  .type-badge.water { background: #4ecdc4; }
  .type-badge.grass { background: #26de81; }
  .type-badge.poison { background: #8e44ad; }
  .type-badge.flying { background: #3498db; }
  .type-badge.psychic { background: #a55eea; }
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

  .pokemon-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .stat-item {
    text-align: center;
    padding: 0.5rem;
    background: rgba(42, 117, 187, 0.1);
    border-radius: 10px;
  }

  .stat-value {
    font-weight: bold;
    color: #2a75bb;
    font-size: 1.1rem;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #666;
  }

  .search-results {
    margin-top: 1rem;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }
</style>

<h1>Pokémon-Datenbank</h1>

<div class="search-section">
  <input 
    type="text" 
    class="search-input" 
    placeholder="🔍 Nach Pokémon-Name oder ID suchen..."
    bind:value={searchTerm}
  >
  
  {#if searchTerm.trim()}
    <div class="search-results">
      {getFilteredPokemon().length} Pokémon gefunden
    </div>
  {/if}
</div>

{#if getFilteredPokemon().length > 0}
  <div class="pokemon-grid">
    {#each getFilteredPokemon() as poke}
      <div class="pokemon-card">
        <div class="pokemon-header">
          <div class="pokemon-image">
            {#if poke.imageUrl}
              <img src={poke.imageUrl} alt={poke.name} loading="lazy">
            {:else}
              <div class="pokemon-avatar">{getPokemonAvatar(poke.name)}</div>
            {/if}
          </div>
          <div class="pokemon-info">
            <h3>{poke.name}</h3>
            <div class="pokemon-id">#{poke.pokedexId.toString().padStart(3, '0')}</div>
          </div>
        </div>
        
        <div class="pokemon-types">
          {#if poke.types?.length > 0}
            {#each poke.types as type}
              <span class="type-badge {type}">{getTypeLabel(type)}</span>
            {/each}
          {:else}
            <span class="type-badge normal">Normal</span>
          {/if}
        </div>
        
        <div class="pokemon-stats">
          <div class="stat-item">
            <div class="stat-value">{poke.bst || 0}</div>
            <div class="stat-label">BST</div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="empty-state">
    <h3>Keine Pokémon gefunden</h3>
    <p>Versuche einen anderen Suchbegriff!</p>
  </div>
{/if}