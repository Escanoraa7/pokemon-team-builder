<style>
  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }

  .subtitle {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .action-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .action-card:hover {
    transform: translateY(-5px);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.4rem;
    color: #2a75bb;
    margin-bottom: 1rem;
  }

  .card-text {
    color: #666;
    margin-bottom: 1.5rem;
  }
</style>

<div class="hero">
  <h1>Willkommen zur Pokémon-Teamverwaltung</h1>
  <p class="subtitle">Erstelle deine eigenen Pokémon-Teams!</p>
</div>

<div class="action-grid">
  <div class="action-card">
    <div class="card-icon">👥</div>
    <h3 class="card-title">Teams verwalten</h3>
    <p class="card-text">Schaue dir alle deine Teams an</p>
    <a href="/teams"><button>Teams anzeigen</button></a>
  </div>

  <div class="action-card">
    <div class="card-icon">⚡</div>
    <h3 class="card-title">Neues Team erstellen</h3>
    <p class="card-text">Stelle ein neues Team zusammen</p>
    <a href="/teams/create"><button>Team erstellen</button></a>
  </div>

  <div class="action-card">
    <div class="card-icon">🔍</div>
    <h3 class="card-title">Pokémon entdecken</h3>
    <p class="card-text">Durchsuche die Pokémon-Datenbank</p>
    <a href="/pokemon"><button>Pokémon anzeigen</button></a>
  </div>
</div>