import * as z from "zod";

// Stats

export const AttributeValueSchema = z
  .number()
  .min(3)
  .max(18)
  .describe(
    "The number for a stats. Minimum is 3, maximum is 18. Modifiers are derived from this number."
  );

export const AttributesSchema = z
  .object({
    strength: AttributeValueSchema,
    constitution: AttributeValueSchema,
    dexterity: AttributeValueSchema,
    intelligence: AttributeValueSchema,
    wisdom: AttributeValueSchema,
    charisma: AttributeValueSchema,
  })
  .describe(
    "The classic 6 attributes of the character: Strength, Constitution, Dexterity, Intelligence, Wisdom, and Charisma."
  );

// Text Fields

export const TextFieldsSchema = z.object({
  name: z.string().describe("The name of the character."),
  ancestry: z
    .enum(["human", "elf", "dwarf", "halfling"])
    .describe("The ancestry of the character."),
  class: z
    .enum(["fighter", "wizard", "thief", "bard", "cleric"])
    .describe("The class of the character."),
  alignment: z
    .enum(["lawfull", "neutral", "chaotic"])
    .describe("The alignment of the character."),
  background: z
    .string()
    .min(200)
    .max(400)
    .describe("The background and description of the character."),
});

// Inventory

export const ItemSchema = z.object({
  name: z.string().describe("The name of the item."),
  description: z.string().describe("The description of the item."),
});
export type ItemType = z.infer<typeof ItemSchema>;

export const InventorySchema = z
  .array(ItemSchema)
  .describe("The inventory of the character.");

// Image

export const ImageSchema = z
  .string()
  .describe("The image of the character in base64 format.");

// Full Character Sheet
export const CharacterSheetSchema = z.object({
  attributes: AttributesSchema.optional(),
  textFields: TextFieldsSchema.optional(),
  inventory: InventorySchema.optional(),
  image: ImageSchema.optional(),
});
export type CharacterSheetType = z.infer<typeof CharacterSheetSchema>;

export const getModifier = (value: number) => {
  return Math.floor((value - 10) / 2);
};
