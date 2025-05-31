import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("PokemonTeamBuilderDB");

//////////////////////////////////////////
// Teams
//////////////////////////////////////////

async function getTeams() {
  const collection = db.collection("teams");
  const teams = await collection.find({}).toArray();
  teams.forEach((team) => {
    team._id = team._id.toString();
  });
  return teams;
}

async function getTeam(id) {
  const collection = db.collection("teams");
  const team = await collection.findOne({ _id: new ObjectId(id) });
  if (team) {
    team._id = team._id.toString();
  }
  return team;
}

async function createTeam(team) {
  team.createdAt = new Date();
  team.updatedAt = new Date();
  team.pokemonIds = team.pokemonIds || [];
  const collection = db.collection("teams");
  const result = await collection.insertOne(team);
  return result.insertedId.toString();
}

async function deleteTeam(id) {
  const collection = db.collection("teams");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0 ? id : null;
}

//////////////////////////////////////////
// Pokemon
//////////////////////////////////////////

async function getPokemon() {
  const collection = db.collection("pokemon");
  const pokemon = await collection.find({}).toArray();
  pokemon.forEach((poke) => {
    poke._id = poke._id.toString();
  });
  return pokemon;
}

async function getPokemonById(id) {
  const collection = db.collection("pokemon");
  const pokemon = await collection.findOne({ _id: new ObjectId(id) });
  if (pokemon) {
    pokemon._id = pokemon._id.toString();
  }
  return pokemon;
}

async function createPokemon(pokemon) {
  const collection = db.collection("pokemon");
  const result = await collection.insertOne(pokemon);
  return result.insertedId.toString();
}

async function populatePokemonFromAPI(pokemonArray) {
  const collection = db.collection("pokemon");
  const existingCount = await collection.countDocuments();
  
  if (existingCount > 0) {
    return { success: true, inserted: 0 };
  }
  
  const result = await collection.insertMany(pokemonArray);
  return { success: true, inserted: result.insertedCount };
}

async function updateAllPokemonToLevel100() {
  const collection = db.collection("pokemon");
  const allPokemon = await collection.find({}).toArray();
  
  for (const pokemon of allPokemon) {
    const bst = pokemon.bst || 
      (pokemon.hp || 0) + (pokemon.attack || 0) + (pokemon.defense || 0) + 
      (pokemon.specialAttack || 0) + (pokemon.specialDefense || 0) + (pokemon.speed || 0);
    
    await collection.updateOne(
      { _id: pokemon._id },
      { $set: { level: 100, bst: bst } }
    );
  }
  
  return allPokemon.length;
}

export default {
  getTeams,
  getTeam,
  createTeam,
  deleteTeam,
  getPokemon,
  getPokemonById,
  createPokemon,
  populatePokemonFromAPI,
  updateAllPokemonToLevel100,
};