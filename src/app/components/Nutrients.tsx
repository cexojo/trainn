import { useEffect, useState } from "react";
import { useTranslations } from "@/app/contexts/LangContext";
import { Box, TextField, Typography, Paper, CircularProgress, Tabs, Tab } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import SearchIcon from "@mui/icons-material/Search";

interface FoodState {
  state: string;
  nutrientValues: { [nutrient: string]: number | string };
}

interface FoodNode {
  id: string;
  name: string;
  states?: FoodState[];
  children?: FoodNode[];
}

export default function Nutrients() {
  const t = useTranslations();
  const [foodTree, setFoodTree] = useState<FoodNode[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStateTab, setSelectedStateTab] = useState(0);

  // Fetch food tree from API
  useEffect(() => {
    setLoading(true);
    fetch("/api/nutrition/nutrients")
      .then((r) => r.json())
      .then((data) => {
        // Transform API response to tree compatible with FoodNode type
        // New: Food as leaf node, states in states[]
        function transform() {
          if (!Array.isArray(data.groups)) return [];
          return data.groups.map((group: any) => ({
            id: group.id || group.name,
            name: group.name,
            children: Array.isArray(group.components)
              ? group.components
                  .filter((comp: any) => comp && comp.name)
                  .map((comp: any) => ({
                    id:
                      (group.id || group.name ? `${group.id || group.name}-${comp.name}` : comp.name) ||
                      `food-idx-${Math.random().toString(36).slice(2)}`,
                    name: comp.name,
                    states: Array.isArray(comp.states)
                      ? comp.states.map((state: any) => ({
                          state: state.state,
                          nutrientValues: Object.fromEntries(
                            Object.entries(state).filter(
                              ([k]) => !["id", "state", "name"].includes(k)
                            )
                          ),
                        }))
                      : [],
                  }))
              : [],
          }));
        }
        setFoodTree(transform());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Helper: filter tree by search
  function filterTree(nodes: FoodNode[], searchText: string): FoodNode[] {
    // Accent-insensitive compare
    function stripAccents(str: string) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const termRaw = searchText.toLowerCase();
    const termStripped = stripAccents(termRaw);

    return nodes
      .map((n) => {
        // Compare original and accent-insensitive for group/food name
        function matches(name: string) {
          const nameLow = name.toLowerCase();
          const nameStripped = stripAccents(nameLow);
          return (
            nameLow.includes(termRaw) ||
            nameStripped.includes(termStripped)
          );
        }
        if (n.children) {
          const filteredChildren = filterTree(n.children, searchText);
          if (filteredChildren.length > 0 || matches(n.name)) {
            return { ...n, children: filteredChildren };
          }
          return null;
        } else if (n && typeof n.name === 'string' && matches(n.name)) {
          return n;
        }
        return null;
      })
      .filter(Boolean) as FoodNode[];
  }

  // Helper: recursive render
  function renderTree(nodes: FoodNode[]) {
    return nodes.map(n => {
      // Only two levels: group (expandable), food (leaf)
      if (n.children && n.children.length > 0) {
        return (
          <TreeItem key={n.id} itemId={n.id} label={n.name}>
            {n.children
              .map((f) =>
                f && f.id && f.name ? (
                  <TreeItem
                    key={f.id}
                    itemId={f.id}
                    label={f.name}
                    onClick={() => {
                      setSelectedId(f.id);
                      setSelectedFood(f);
                    }}
                  />
                ) : null
              )
              .filter(Boolean)}
          </TreeItem>
        );
      } else if (n && n.id && n.name && !n.children) {
        // Render only true leaf nodes (foods)
        return (
          <TreeItem
            key={n.id}
            itemId={n.id}
            label={n.name}
            onClick={() => {
              setSelectedId(n.id);
              setSelectedFood(n);
            }}
          />
        );
      }
      // Skip group nodes with empty children and malformed or empty nodes
      return null;
    });
  }

  // Select food node by ID when selectedId changes
  useEffect(() => {
    if (!foodTree.length || !selectedId) {
      setSelectedFood(null);
      setSelectedStateTab(0);
      return;
    }
    // Two-level scan (group->food): find food node for selectedId
    function searchFoodNode(nodes: FoodNode[]): FoodNode | null {
      for (const group of nodes) {
        if (group.children) {
          for (const food of group.children) {
            if (food.id === selectedId) return food;
          }
        }
      }
      return null;
    }
    const found = searchFoodNode(foodTree);
    setSelectedFood(found);
    setSelectedStateTab(0);
  }, [selectedId, foodTree]);

  // Clamp selectedStateTab to valid range when selectedFood/states changes
  useEffect(() => {
    if (selectedFood && Array.isArray(selectedFood.states)) {
      if (selectedStateTab < 0 || selectedStateTab >= selectedFood.states.length) {
        setSelectedStateTab(0);
      }
    }
  }, [selectedFood, selectedStateTab]);

  // When searching, expand all group nodes; otherwise keep all collapsed
  const getAllGroupIds = (nodes: FoodNode[]) => {
    let ids: string[] = [];
    for (const n of nodes) {
      if (n.children && n.children.length > 0) {
        ids.push(n.id);
      }
    }
    return ids;
  };
  const filteredTree = search ? filterTree(foodTree, search) : foodTree;

  // Helper: recursively expand all matching nodes when searching
  function getAllExpandedIds(nodes: FoodNode[]): string[] {
    let ids: string[] = [];
    for (const n of nodes) {
      if (n.children && n.children.length > 0) {
        ids.push(n.id);
        ids = ids.concat(getAllExpandedIds(n.children));
      }
    }
    return ids;
  }
  const expandedGroupIds = search ? getAllExpandedIds(filteredTree) : [];

  return (
    <Box sx={{ display: "flex", height: "100%", minHeight: 500, gap: 3 }}>
      <Paper sx={{ minWidth: 280, width: 320, p: 2, pr: 1, overflowY: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SearchIcon sx={{ mr: 1, color: "action.active" }} />
          <TextField
            size="small"
            fullWidth
            placeholder="Buscar alimento o grupo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <SimpleTreeView
            selectedItems={selectedId ?? ''}
            sx={{ flexGrow: 1, overflowY: "auto" }}
            defaultExpandedItems={expandedGroupIds}
          >
            {renderTree(filteredTree)}
          </SimpleTreeView>
        )}
      </Paper>
      {/* Right panel */}
      <Paper sx={{ flex: 1, p: 3, minWidth: 320, minHeight: 320 }}>
        {!selectedFood ? (
          <Typography variant="h6" sx={{ color: "text.secondary", mt: 4, textAlign: "center" }}>
            Selecciona un alimento para ver valores nutricionales.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>{selectedFood.name}</Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary", mt: 4, fontSize: 11 }}>
              Valores por 100 gramos de alimento
            </Typography>
            {selectedFood.states && selectedFood.states.length > 0 ? (
              <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs
                    value={selectedStateTab}
                    onChange={(_, idx) => setSelectedStateTab(idx)}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="food states tabs"
                  >
                    {selectedFood.states.map((state, idx) => (
                      <Tab key={state.state} label={state.state} />
                    ))}
                  </Tabs>
                </Box>
                {selectedFood.states[selectedStateTab] && (
                  <Box
                    key={`${selectedFood.states[selectedStateTab].state}-${selectedStateTab}`}
                  >
                    {/* Grouped nutrient panels */}
                    {(() => {
                      const nutrientValues = selectedFood.states[selectedStateTab].nutrientValues;
                      
                      const GROUPS = [
                        {
                          key: "composition",
                          keys: [
                            "calories",
                            "protein",
                            "fat",
                            "carbohydrates",
                            "water",
                            "nitrogen",
                          ],
                        },
                        {
                          key: "vitamins",
                          keys: [
                            "vitaminA_ui",
                            "vitaminB1_mcg",
                            "vitaminB2_mcg",
                            "vitaminC_mcg",
                            "niacin_mcg"
                          ],
                        },
                        {
                          key: "minerals",
                          keys: [
                            "sodium_mg",
                            "potassium_mg",
                            "calcium_mg",
                            "magnesium_mg",
                            "iron_mg",
                            "copper_mg",
                            "phosphorus_mg",
                            "sulfur_mg",
                            "chloride_mg"
                          ],
                        },
                        {
                          key: "aminoAcids",
                          keys: [
                            "phenylalanine_mg",
                            "isoleucine_mg",
                            "leucine_mg",
                            "lysine_mg",
                            "methionine_mg",
                            "threonine_mg",
                            "tryptophan_mg",
                            "valine_mg"
                          ],
                        },
                        {
                          key: "alkalinity",
                          keys: [
                            "acid",
                            "alcal"
                          ],
                        },
                      ];

                      return GROUPS.map(group => {
                        const rows = group.keys
                          .filter((k) => nutrientValues[k] !== undefined && nutrientValues[k] !== null && nutrientValues[k] !== "")
                          .map((k) => ({
                            key: k,
                            value: nutrientValues[k],
                          }));

                        if (rows.length === 0) return null;

                        return (
                          <Box key={group.key} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1, mb: 0.5, fontSize: "14px" }}>
                              {t["nutrientGroup" + (group.key.charAt(0).toUpperCase() + group.key.slice(1)) as keyof typeof t]}
                            </Typography>
                            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                              <tbody>
                                {rows.map(({ key, value }) => (
                                  <tr key={key}>
                                    <td style={{ textAlign: "left", padding: "4px 6px", fontSize: "12px", borderBottom: "1px solid #f3f3f3" }}>
                                      {t["nutrient" + key.charAt(0).toUpperCase() + key.slice(1) as keyof typeof t]}
                                    </td>
                                    <td style={{ textAlign: "right", padding: "4px 6px", fontSize: "12px", borderBottom: "1px solid #f3f3f3" }}>
                                      {(() => {
                                        const UNITS: Record<string, string> = {
                                          calories: "kcal",
                                          protein: "g",
                                          fat: "g",
                                          carbohydrates: "g",
                                          water: "g",
                                          nitrogen: "g",
                                          vitaminA_ui: "UI",
                                          vitaminB1_mcg: "µg",
                                          vitaminB2_mcg: "µg",
                                          vitaminC_mcg: "µg",
                                          niacin_mcg: "µg",
                                          sodium_mg: "mg",
                                          potassium_mg: "mg",
                                          calcium_mg: "mg",
                                          magnesium_mg: "mg",
                                          iron_mg: "mg",
                                          copper_mg: "mg",
                                          phosphorus_mg: "mg",
                                          sulfur_mg: "mg",
                                          chloride_mg: "mg",
                                          phenylalanine_mg: "mg",
                                          isoleucine_mg: "mg",
                                          leucine_mg: "mg",
                                          lysine_mg: "mg",
                                          methionine_mg: "mg",
                                          threonine_mg: "mg",
                                          tryptophan_mg: "mg",
                                          valine_mg: "mg",
                                          acid: "mEq",
                                          alcal: "mEq",
                                        };
                                        const unit = UNITS[key] || "";
                                        const prettyVal =
                                          typeof value === "number"
                                            ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                            : value;
                                        return unit ? `${prettyVal} ${unit}` : prettyVal;
                                      })()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Box>
                          </Box>
                        );
                      });
                    })()}
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay datos nutricionales para este alimento.
              </Typography>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}
