<script>
  let { data } = $props();
  
  const availablePokemon = data.availablePokemon || [];
  let selectedPokemon = $state([]);
  
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
  
  function togglePokemon(pokemon) {
    const index = selectedPokemon.findIndex(p => p._id === pokemon._id);
    if (index > -1) {
      selectedPokemon = selectedPokemon.filter(p => p._id !== pokemon._id);
    } else if (selectedPokemon.length < 6) {
      selectedPokemon = [...selectedPokemon, pokemon];
    }
  }
  
  function isPokemonSelected(pokemon) {
    return selectedPokemon.some(p => p._id === pokemon._id);
  }
  
  function generateRandomTeam() {
    const shuffled = [...availablePokemon].sort(() => 0.5 - Math.random());
    selectedPokemon = shuffled.slice(0, 6);
  }
</script>

<style>
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    padding: 2rem;
  }

  .form-group { margin-bottom: 1.5rem; }
  .form-label { display: block; font-weight: bold; margin-bottom: 0.5rem; }
  .form-input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
  
  .pokemon-selector { background: #f9f9f9; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .section-title { font-size: 1.3rem; color: #2a75bb; font-weight: bold; margin-bottom: 1rem; }
  .team-counter { background: #2a75bb; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 1rem; }
  
  .team-actions { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
  .btn-random { background: #feca57; color: #333; padding: 0.5rem 1rem; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; }
  .btn-clear { background: #ff6b6b; color: white; padding: 0.5rem 1rem; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; }

  .selected-pokemon { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
  .pokemon-slot { background: white; border: 2px dashed #ccc; border-radius: 10px; padding: 1rem; text-align: center; min-height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
  .pokemon-slot.filled { border-color: #4caf50; background: #f0f8f0; border-style: solid; }

  .pokemon-avatar { width: 60px; height: 60px; border-radius: 50%; background: #667eea; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; overflow: hidden; }
  .pokemon-avatar img { width: 55px; height: 55px; object-fit: contain; }
  .pokemon-avatar .fallback { color: white; font-weight: bold; font-size: 1.2rem; }

  .pokemon-name { font-weight: bold; color: #2a75bb; font-size: 0.9rem; }
  .empty-slot-text { color: #999; font-size: 0.9rem; }

  .available-pokemon { max-height: 300px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem; }
  .pokemon-option { background: white; border: 1px solid #ddd; border-radius: 10px; padding: 1rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; }
  .pokemon-option.selected { border-color: #4caf50; background: #f0f8f0; }
  .pokemon-option.disabled { opacity: 0.5; cursor: not-allowed; }

  .pokemon-option-avatar { width: 50px; height: 50px; border-radius: 50%; background: #667eea; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .pokemon-option-avatar img { width: 45px; height: 45px; object-fit: contain; }
  .pokemon-option-avatar .fallback { color: white; font-weight: bold; font-size: 1rem; }

  .pokemon-option-info h4 { margin: 0 0 0.3rem 0; color: #2a75bb; font-size: 1rem; }
  .pokemon-types { display: flex; gap: 0.3rem; }

  .type-badge { padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; font-weight: bold; color: white; }
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

  .form-actions { display: flex; gap: 1rem; justify-content: center; margin-top: 3rem; }
  .btn-primary { background: #2a75bb; color: white; padding: 1rem 2.5rem; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; font-size: 1.1rem; }
  .btn-secondary { background: #ccc; color: #666; padding: 1rem 2.5rem; border: 1px solid #999; border-radius: 25px; text-decoration: none; display: inline-block; text-align: center; font-weight: bold; }
  .required { color: #ff4444; }
</style>

<h1>Neues Team erstellen</h1>

<form class="form-container" method="POST">
  <div class="form-group">
    <label class="form-label" for="teamName">Team-Name <span class="required">*</span></label>
    <input type="text" id="teamName" name="teamName" class="form-input" placeholder="z.B. Elite-Vier Challenge Team" required />
  </div>

  <div class="form-group">
    <label class="form-label" for="trainerName">Trainer-Name <span class="required">*</span></label>
    <input type="text" id="trainerName" name="trainerName" class="form-input" placeholder="Dein Trainer-Name" required />
  </div>

  <div class="pokemon-selector">
    <h3 class="section-title">⚡ Pokémon-Auswahl</h3>
    
    <div class="team-counter">Pokémon im Team: {selectedPokemon.length}/6</div>
    
    <div class="team-actions">
      <button type="button" class="btn-random" onclick={generateRandomTeam}>🎲 Zufälliges Team</button>
      {#if selectedPokemon.length > 0}
        <button type="button" class="btn-clear" onclick={() => selectedPokemon = []}>🗑️ Team leeren</button>
      {/if}
    </div>
    
    <div class="selected-pokemon">
      {#each Array(6) as _, index}
        <div class="pokemon-slot {selectedPokemon[index] ? 'filled' : ''}">
          {#if selectedPokemon[index]}
            <div class="pokemon-avatar">
              {#if selectedPokemon[index].imageUrl}
                <img src={selectedPokemon[index].imageUrl} alt={selectedPokemon[index].name} loading="lazy">
              {:else}
                <div class="fallback">{getPokemonAvatar(selectedPokemon[index].name)}</div>
              {/if}
            </div>
            <div class="pokemon-name">{selectedPokemon[index].name}</div>
          {:else}
            <div class="empty-slot-text">Pokémon hinzufügen</div>
          {/if}
        </div>
      {/each}
    </div>

    <h4>Verfügbare Pokémon:</h4>
    <div class="available-pokemon">
      {#each availablePokemon as pokemon}
        <button 
          type="button"
          class="pokemon-option {isPokemonSelected(pokemon) ? 'selected' : ''} {selectedPokemon.length >= 6 && !isPokemonSelected(pokemon) ? 'disabled' : ''}"
          onclick={() => togglePokemon(pokemon)}
          disabled={selectedPokemon.length >= 6 && !isPokemonSelected(pokemon)}
        >
          <div class="pokemon-option-avatar">
            {#if pokemon.imageUrl}
              <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy">
            {:else}
              <div class="fallback">{getPokemonAvatar(pokemon.name)}</div>
            {/if}
          </div>
          <div class="pokemon-option-info">
            <h4>{pokemon.name}</h4>
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
        </button>
      {/each}
    </div>
  </div>

  {#each selectedPokemon as pokemon, index}
    <input type="hidden" name="pokemon_{index}" value="{pokemon._id}" />
  {/each}

  <div class="form-actions">
    <button type="submit" class="btn-primary">🎯 Team erstellen</button>
    <a href="/teams" class="btn-secondary">Abbrechen</a>
  </div>
</form>