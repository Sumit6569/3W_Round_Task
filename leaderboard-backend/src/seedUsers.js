
import User from "./models/User.js";
export async function seedUsers() {
  const count = await User.estimatedDocumentCount();
  if (count) return; // already seeded
  const names = [
    "Rahul",
    "Kamal",
    "Sanak",
    "Asha",
    "Ishita",
    "Girish",
    "Meera",
    "Tina",
    "Vikram",
    "Zoya",
  ];
  await User.insertMany(names.map((name) => ({ name })));
  console.log("🌱  Ten users seeded");
}
