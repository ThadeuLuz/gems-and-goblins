import d20 from "./assets/d20white.svg";

import {
  getModifier,
  type CharacterSheetType,
  type ItemType,
} from "./utils/schemas";

const Field = ({
  label,
  value,
}: {
  label: string;
  value?: string;
  marginBottom?: boolean;
}) => {
  return (
    <div className="row border">
      <p>
        <span className="bold">{label}:</span> {value}
      </p>
    </div>
  );
};

const MainFields = ({ sheet }: { sheet: CharacterSheetType }) => {
  return (
    <div className="column">
      <Field label="Name" value={sheet.textFields?.name} />
      <Field label="Ancestry" value={sheet.textFields?.ancestry} />
      <Field label="Class" value={sheet.textFields?.class} />
      <Field label="Alignment" value={sheet.textFields?.alignment} />
    </div>
  );
};

const Attribute = ({ label, value }: { label: string; value?: number }) => {
  let textValue = "";
  if (value != undefined) {
    const modifier = Math.floor((value - 10) / 2);
    textValue = `${value} (${modifier > 0 ? "+" : ""}${modifier})`;
  }

  return <Field label={label} value={textValue} />;
};

const Attributes = ({ sheet }: { sheet: CharacterSheetType }) => {
  return (
    <div className="row">
      <div className="column">
        <Attribute label="STR" value={sheet.attributes?.strength} />
        <Attribute label="CON" value={sheet.attributes?.constitution} />
        <Attribute label="DEX" value={sheet.attributes?.dexterity} />
      </div>
      <div className="column">
        <Attribute label="INT" value={sheet.attributes?.intelligence} />
        <Attribute label="WIS" value={sheet.attributes?.wisdom} />
        <Attribute label="CHA" value={sheet.attributes?.charisma} />
      </div>
    </div>
  );
};

const Item = ({ item }: { item: ItemType }) => {
  return (
    <div className="underline">
      <p>{item.name}</p>
    </div>
  );
};

const Inventory = ({ sheet }: { sheet: CharacterSheetType }) => {
  return (
    <div className="column border gap" style={{ height: "300px" }}>
      <h2>Inventory</h2>
      <div className="column">
        {sheet.inventory?.map((item) => (
          <Item item={item} />
        ))}
      </div>
    </div>
  );
};

const RollButton = () => {
  return (
    <button>
      <img src={d20} alt="D20" style={{ width: "20px", height: "20px" }} />
      <p>Roll</p>
    </button>
  );
};

export const Sheet = ({ sheet }: { sheet: CharacterSheetType }) => {
  return (
    <main className="column gap">
      {/* Header */}
      <div className="row">
        <div className="grow" style={{ textAlign: "center" }}>
          <h1>Gems and Goblins</h1>
          <p>An OSR RPG Character Generator powered by Firebase and Genkit</p>
        </div>
        <div>
          <RollButton />
        </div>
      </div>

      {/* Section 1 */}
      <div className="row gap">
        <img className="image border" src={sheet.image} alt="Character Image" />
        <div className="column gap">
          <MainFields sheet={sheet} />
          <Attributes sheet={sheet} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="row gap">
        <div className="column border" style={{ width: "300px" }}>
          <p>
            <span className="bold">Background:</span>
          </p>
          <p>{sheet.textFields?.background}</p>
        </div>
        <div className="column gap">
          <Inventory sheet={sheet} />
          <div className="row">
            <Field
              label="HP"
              value={(
                5 +
                (sheet.attributes?.constitution
                  ? getModifier(sheet.attributes?.constitution)
                  : 0)
              ).toString()}
            />
            <Field
              label="DEF"
              value={(
                10 +
                (sheet.attributes?.dexterity
                  ? getModifier(sheet.attributes?.dexterity)
                  : 0)
              ).toString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
