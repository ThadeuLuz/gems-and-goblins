import { render } from "preact";
import "./index.css";
import { Sheet } from "./components/sheet.tsx";
import { initializeApp } from "firebase/app";
import type { CharacterSheetType } from "./utils/schemas.ts";
import faelarImage from "./assets/faelar.png";

initializeApp({
  projectId: "gng-762340",
});

const defaultSheet: CharacterSheetType = {
  textFields: {
    name: "Faelar Gillynn",
    ancestry: "elf",
    class: "thief",
    alignment: "neutral",
    background:
      "Faelar Gillynn is an elf of slender build with sharp, observant eyes that miss little. His movements are precise and economical, a lifetime of skirting the edges of society honing his grace. He trusts his instincts and his nimble fingers, skills that have served him better than blind allegiance to any code. His longbow and dagger a means to an end in a world that has shown him little kindness.",
  },
  attributes: {
    strength: 10,
    constitution: 8,
    dexterity: 16,
    intelligence: 12,
    wisdom: 14,
    charisma: 11,
  },
  inventory: [
    {
      name: "Long Bow",
      description: "A long bow for long range shooting.",
    },
    {
      name: "Quiver (20)",
      description: "A quiver for holding arrows.",
    },
    {
      name: "Dagger",
      description: "A dagger for close range combat.",
    },
  ],
  image: faelarImage,
};

render(<Sheet sheet={defaultSheet} />, document.getElementById("app")!);
