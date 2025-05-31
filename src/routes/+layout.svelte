<script>
  let { children } = $props();
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  nav {
    background: linear-gradient(90deg, #ffcb05 0%, #ffd700 100%);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #2a75bb;
  }

  .logo-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: #2a75bb;
    text-decoration: none;
    font-weight: bold;
    padding: 0.6rem 1.2rem;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
  }

  .nav-links a:hover {
    background: #2a75bb;
    color: white;
    transform: translateY(-2px);
  }

  main {
    padding: 2rem;
    max-width: 1200px;
    margin: 2rem auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  :global(h1) {
    color: #2a75bb;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  :global(button) {
    background: linear-gradient(135deg, #2a75bb 0%, #4facfe 100%);
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  :global(button:hover) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(42, 117, 187, 0.4);
  }
</style>

<nav>
  <div class="logo">
    <img src="/pokeball.png" alt="Pokeball" class="logo-img">
    Pokémon Team Builder
  </div>
  <div class="nav-links">
    <a href="/">Start</a>
    <a href="/teams">Teams</a>
    <a href="/teams/create">Neues Team</a>
    <a href="/pokemon">Pokémon</a>
  </div>
</nav>

<main>
  {@render children()}
</main>