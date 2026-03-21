// Nutrient indicator structure for both wizard and nutrients display

export interface NutrientGroupDef {
  key: string; // for example: "composition", "vitamins", etc.
  groupLabel: string; // translation key for group, e.g. "nutrientGroupComposition"
  showInSummary: boolean;
  fields: {
    key: string; // e.g., "calories"
    unit: string; // e.g., "kcal"
  }[];
}

// All nutrient indicators, grouped, with translation key and units
export const NUTRIENT_GROUPS: NutrientGroupDef[] = [
  {
    key: "composition",
    groupLabel: "nutrientGroupComposition",
    showInSummary: true,
    fields: [
      { key: "calories", unit: "kcal" },
      { key: "protein", unit: "g" },
      { key: "fat", unit: "g" },
      { key: "carbohydrates", unit: "g" },
      { key: "water", unit: "g" },
      { key: "nitrogen", unit: "g" }
    ]
  },
  {
    key: "vitamins",
    groupLabel: "nutrientGroupVitamins",
    showInSummary: true,
    fields: [
      { key: "vitaminA_ui", unit: "u.i." },
      { key: "vitaminB1_mcg", unit: "mcg" },
      { key: "vitaminB2_mcg", unit: "mcg" },
      { key: "vitaminC_mcg", unit: "mcg" },
      { key: "niacin_mcg", unit: "mcg" }
    ]
  },
  {
    key: "minerals",
    groupLabel: "nutrientGroupMinerals",
    showInSummary: true,
    fields: [
      { key: "sodium_mg", unit: "mg" },
      { key: "potassium_mg", unit: "mg" },
      { key: "calcium_mg", unit: "mg" },
      { key: "magnesium_mg", unit: "mg" },
      { key: "iron_mg", unit: "mg" },
      { key: "copper_mg", unit: "mg" },
      { key: "phosphorus_mg", unit: "mg" },
      { key: "sulfur_mg", unit: "mg" },
      { key: "chloride_mg", unit: "mg" }
    ]
  },
  {
    key: "aminoAcids",
    groupLabel: "nutrientGroupAminoAcids",
    showInSummary: true,
    fields: [
      { key: "phenylalanine_mg", unit: "mg" },
      { key: "isoleucine_mg", unit: "mg" },
      { key: "leucine_mg", unit: "mg" },
      { key: "lysine_mg", unit: "mg" },
      { key: "methionine_mg", unit: "mg" },
      { key: "threonine_mg", unit: "mg" },
      { key: "tryptophan_mg", unit: "mg" },
      { key: "valine_mg", unit: "mg" }
    ]
  },
  {
    key: "alkalinity",
    groupLabel: "nutrientGroupAlkalinity",
    showInSummary: false,
    fields: [
      { key: "acid", unit: " " },
      { key: "alcal", unit: " " }
    ]
  }
];

// For summary/unit display convenience, provide single lookup
export const NUTRIENT_UNITS: Record<string, string> = {};
for (const group of NUTRIENT_GROUPS) {
  for (const field of group.fields) {
    NUTRIENT_UNITS[field.key] = field.unit;
  }
}
