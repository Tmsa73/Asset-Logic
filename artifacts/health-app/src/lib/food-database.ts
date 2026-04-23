export type FoodItem = {
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  tags: string[];
};

export const FOOD_DATABASE: FoodItem[] = [
  // ── Arabian / Gulf Foods ──────────────────────────────────────────
  { name: "Kabsa with Chicken", emoji: "🍗", calories: 520, protein: 38, carbs: 58, fat: 12, fiber: 2, sugar: 3, mealType: "lunch", tags: ["arabian", "gulf", "rice", "chicken"] },
  { name: "Kabsa with Lamb", emoji: "🍖", calories: 620, protein: 42, carbs: 58, fat: 20, fiber: 2, sugar: 3, mealType: "lunch", tags: ["arabian", "gulf", "rice", "lamb"] },
  { name: "Mandi Chicken", emoji: "🍗", calories: 480, protein: 40, carbs: 50, fat: 10, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabian", "yemen", "rice", "chicken"] },
  { name: "Mandi Lamb", emoji: "🍖", calories: 590, protein: 44, carbs: 50, fat: 18, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabian", "yemen", "rice", "lamb"] },
  { name: "Machboos", emoji: "🍛", calories: 560, protein: 35, carbs: 62, fat: 15, fiber: 2, sugar: 4, mealType: "lunch", tags: ["bahrain", "gulf", "rice", "spiced"] },
  { name: "Harees", emoji: "🥣", calories: 310, protein: 20, carbs: 42, fat: 6, fiber: 2, sugar: 1, mealType: "breakfast", tags: ["arabian", "wheat", "meat", "ramadan"] },
  { name: "Jareesh", emoji: "🥣", calories: 280, protein: 14, carbs: 48, fat: 5, fiber: 3, sugar: 2, mealType: "breakfast", tags: ["saudi", "wheat", "traditional"] },
  { name: "Saleeg", emoji: "🍚", calories: 420, protein: 22, carbs: 55, fat: 12, fiber: 1, sugar: 2, mealType: "dinner", tags: ["saudi", "rice", "milk"] },
  { name: "Margoog", emoji: "🍲", calories: 390, protein: 28, carbs: 45, fat: 10, fiber: 3, sugar: 3, mealType: "dinner", tags: ["gulf", "meat", "vegetables", "stew"] },
  { name: "Maqluba", emoji: "🍛", calories: 500, protein: 30, carbs: 58, fat: 14, fiber: 3, sugar: 4, mealType: "lunch", tags: ["levantine", "palestine", "jordan", "rice"] },
  { name: "Mansaf", emoji: "🍖", calories: 680, protein: 48, carbs: 52, fat: 26, fiber: 1, sugar: 2, mealType: "dinner", tags: ["jordan", "lamb", "jameed", "rice"] },
  { name: "Biryani", emoji: "🍛", calories: 490, protein: 28, carbs: 62, fat: 12, fiber: 2, sugar: 3, mealType: "lunch", tags: ["south-asian", "rice", "spiced", "arabic"] },
  { name: "Shawarma Wrap (Chicken)", emoji: "🌯", calories: 420, protein: 30, carbs: 38, fat: 14, fiber: 2, sugar: 4, mealType: "lunch", tags: ["arabian", "street-food", "wrap"] },
  { name: "Shawarma Wrap (Meat)", emoji: "🌯", calories: 480, protein: 32, carbs: 38, fat: 18, fiber: 2, sugar: 4, mealType: "lunch", tags: ["arabian", "street-food", "wrap"] },
  { name: "Falafel Wrap", emoji: "🌯", calories: 380, protein: 14, carbs: 48, fat: 14, fiber: 6, sugar: 3, mealType: "lunch", tags: ["levantine", "vegetarian", "street-food"] },
  { name: "Falafel Plate", emoji: "🧆", calories: 320, protein: 12, carbs: 38, fat: 14, fiber: 6, sugar: 2, mealType: "lunch", tags: ["levantine", "vegetarian"] },
  { name: "Hummus with Bread", emoji: "🫘", calories: 280, protein: 10, carbs: 32, fat: 12, fiber: 6, sugar: 2, mealType: "snack", tags: ["levantine", "chickpea", "dip", "arabic"] },
  { name: "Hummus with Olive Oil", emoji: "🫘", calories: 240, protein: 9, carbs: 24, fat: 13, fiber: 5, sugar: 2, mealType: "snack", tags: ["levantine", "chickpea", "dip"] },
  { name: "Baba Ganoush", emoji: "🍆", calories: 130, protein: 4, carbs: 12, fat: 8, fiber: 4, sugar: 5, mealType: "snack", tags: ["levantine", "eggplant", "dip", "arabic"] },
  { name: "Fattoush Salad", emoji: "🥗", calories: 190, protein: 5, carbs: 26, fat: 8, fiber: 4, sugar: 6, mealType: "lunch", tags: ["levantine", "salad", "arabic"] },
  { name: "Tabbouleh", emoji: "🥗", calories: 150, protein: 4, carbs: 20, fat: 6, fiber: 4, sugar: 3, mealType: "lunch", tags: ["levantine", "parsley", "salad", "arabic"] },
  { name: "Fatteh (Chickpea)", emoji: "🥣", calories: 380, protein: 16, carbs: 48, fat: 14, fiber: 5, sugar: 4, mealType: "breakfast", tags: ["levantine", "arabic", "yogurt"] },
  { name: "Shakshuka", emoji: "🍳", calories: 280, protein: 16, carbs: 18, fat: 16, fiber: 4, sugar: 8, mealType: "breakfast", tags: ["north-african", "arabic", "eggs", "tomato"] },
  { name: "Ful Medames", emoji: "🫘", calories: 260, protein: 14, carbs: 38, fat: 5, fiber: 10, sugar: 2, mealType: "breakfast", tags: ["arabic", "north-african", "beans"] },
  { name: "Labneh with Za'atar", emoji: "🧀", calories: 220, protein: 12, carbs: 8, fat: 16, fiber: 1, sugar: 4, mealType: "breakfast", tags: ["levantine", "yogurt", "cheese", "arabic"] },
  { name: "Mutabbaq (Meat)", emoji: "🥙", calories: 480, protein: 24, carbs: 44, fat: 22, fiber: 2, sugar: 3, mealType: "lunch", tags: ["arabic", "pastry", "stuffed"] },
  { name: "Samboosa (3 pieces)", emoji: "🥟", calories: 320, protein: 12, carbs: 30, fat: 18, fiber: 2, sugar: 2, mealType: "snack", tags: ["gulf", "fried", "pastry", "snack"] },
  { name: "Kibbeh (3 pieces)", emoji: "🥩", calories: 390, protein: 22, carbs: 28, fat: 20, fiber: 2, sugar: 1, mealType: "lunch", tags: ["levantine", "lamb", "bulgur"] },
  { name: "Warak Dawali (Stuffed Vine Leaves)", emoji: "🌿", calories: 260, protein: 10, carbs: 32, fat: 10, fiber: 3, sugar: 2, mealType: "lunch", tags: ["levantine", "stuffed", "rice"] },
  { name: "Molokhia with Chicken", emoji: "🍲", calories: 340, protein: 28, carbs: 20, fat: 12, fiber: 5, sugar: 2, mealType: "lunch", tags: ["arabic", "egyptian", "leafy-green"] },
  { name: "Koshari", emoji: "🍝", calories: 420, protein: 14, carbs: 72, fat: 8, fiber: 8, sugar: 5, mealType: "lunch", tags: ["egyptian", "vegetarian", "rice", "lentil"] },
  { name: "Dolma (Rice-stuffed)", emoji: "🌿", calories: 220, protein: 5, carbs: 34, fat: 8, fiber: 3, sugar: 2, mealType: "lunch", tags: ["middle-eastern", "stuffed", "rice"] },
  { name: "Saloona (Chicken Stew)", emoji: "🍲", calories: 310, protein: 30, carbs: 22, fat: 10, fiber: 4, sugar: 4, mealType: "dinner", tags: ["gulf", "stew", "chicken"] },
  { name: "Arabic Bread (Khubz)", emoji: "🫓", calories: 260, protein: 8, carbs: 52, fat: 2, fiber: 2, sugar: 1, mealType: "lunch", tags: ["arabic", "bread", "flatbread"] },
  { name: "Whole Wheat Khubz", emoji: "🫓", calories: 240, protein: 9, carbs: 46, fat: 2, fiber: 5, sugar: 1, mealType: "breakfast", tags: ["arabic", "bread", "whole-grain"] },
  { name: "Dates (5 pieces)", emoji: "🌴", calories: 140, protein: 1, carbs: 37, fat: 0, fiber: 4, sugar: 32, mealType: "snack", tags: ["arabic", "fruit", "natural-sugar", "ramadan"] },
  { name: "Luqaimat (6 pieces)", emoji: "🍩", calories: 360, protein: 5, carbs: 52, fat: 16, fiber: 1, sugar: 20, mealType: "snack", tags: ["gulf", "fried", "sweet", "dessert"] },
  { name: "Knafeh", emoji: "🧁", calories: 480, protein: 12, carbs: 60, fat: 22, fiber: 1, sugar: 30, mealType: "snack", tags: ["levantine", "dessert", "cheese", "sweet"] },
  { name: "Baklava (3 pieces)", emoji: "🍯", calories: 380, protein: 6, carbs: 44, fat: 20, fiber: 2, sugar: 28, mealType: "snack", tags: ["arabic", "dessert", "nuts", "pastry"] },
  { name: "Umm Ali", emoji: "🥮", calories: 520, protein: 12, carbs: 58, fat: 28, fiber: 2, sugar: 30, mealType: "snack", tags: ["egyptian", "dessert", "bread-pudding"] },
  { name: "Muhallabia", emoji: "🍮", calories: 220, protein: 6, carbs: 38, fat: 6, fiber: 0, sugar: 28, mealType: "snack", tags: ["arabic", "dessert", "milk-pudding"] },
  { name: "Arabic Coffee with Dates", emoji: "☕", calories: 80, protein: 1, carbs: 20, fat: 0, fiber: 2, sugar: 18, mealType: "snack", tags: ["arabic", "coffee", "dates", "traditional"] },
  { name: "Karak Tea with Milk", emoji: "🧋", calories: 130, protein: 4, carbs: 18, fat: 4, fiber: 0, sugar: 14, mealType: "snack", tags: ["gulf", "tea", "drink", "milk"] },
  { name: "Lentil Soup", emoji: "🍵", calories: 180, protein: 10, carbs: 28, fat: 3, fiber: 8, sugar: 3, mealType: "lunch", tags: ["arabic", "soup", "lentil", "vegetarian"] },
  { name: "Harira Soup", emoji: "🍵", calories: 220, protein: 12, carbs: 32, fat: 5, fiber: 6, sugar: 4, mealType: "dinner", tags: ["moroccan", "soup", "ramadan"] },
  { name: "Grilled Hammour Fish", emoji: "🐟", calories: 280, protein: 38, carbs: 0, fat: 12, fiber: 0, sugar: 0, mealType: "dinner", tags: ["gulf", "fish", "grilled", "protein"] },
  { name: "Safi Fish (Grilled)", emoji: "🐟", calories: 250, protein: 34, carbs: 0, fat: 11, fiber: 0, sugar: 0, mealType: "dinner", tags: ["gulf", "fish", "grilled"] },
  { name: "Chicken Machboos", emoji: "🍗", calories: 540, protein: 36, carbs: 60, fat: 14, fiber: 2, sugar: 4, mealType: "dinner", tags: ["bahrain", "gulf", "rice"] },
  { name: "Maamoul (Date Cookie)", emoji: "🍪", calories: 180, protein: 3, carbs: 28, fat: 7, fiber: 2, sugar: 16, mealType: "snack", tags: ["levantine", "cookie", "dates", "eid"] },
  { name: "Gahwa (Arabic Coffee)", emoji: "☕", calories: 10, protein: 0, carbs: 2, fat: 0, fiber: 0, sugar: 0, mealType: "snack", tags: ["arabic", "coffee", "drink"] },
  { name: "Za'atar Bread", emoji: "🫓", calories: 290, protein: 9, carbs: 44, fat: 10, fiber: 3, sugar: 1, mealType: "breakfast", tags: ["levantine", "bread", "thyme", "arabic"] },
  { name: "Cheese Sambousek", emoji: "🥟", calories: 280, protein: 10, carbs: 26, fat: 15, fiber: 1, sugar: 2, mealType: "snack", tags: ["levantine", "pastry", "cheese"] },
  { name: "Grilled Kofta", emoji: "🍢", calories: 330, protein: 28, carbs: 8, fat: 20, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabic", "grilled", "minced-meat"] },
  { name: "Rice with Vermicelli", emoji: "🍚", calories: 280, protein: 6, carbs: 56, fat: 5, fiber: 1, sugar: 1, mealType: "lunch", tags: ["arabic", "rice", "side-dish"] },
  { name: "Spinach Fatayer (3 pieces)", emoji: "🥙", calories: 240, protein: 8, carbs: 32, fat: 10, fiber: 4, sugar: 2, mealType: "snack", tags: ["levantine", "pastry", "spinach", "baked"] },
  { name: "Meat Fatayer (3 pieces)", emoji: "🥙", calories: 290, protein: 14, carbs: 30, fat: 13, fiber: 2, sugar: 2, mealType: "snack", tags: ["levantine", "pastry", "meat", "baked"] },
  { name: "Chicken Kabab", emoji: "🍢", calories: 290, protein: 32, carbs: 6, fat: 14, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabic", "grilled", "chicken", "skewer"] },
  { name: "Lamb Chops (Grilled)", emoji: "🍖", calories: 380, protein: 36, carbs: 0, fat: 24, fiber: 0, sugar: 0, mealType: "dinner", tags: ["arabic", "grilled", "lamb"] },
  { name: "Mufattah Lamb", emoji: "🍖", calories: 640, protein: 46, carbs: 52, fat: 24, fiber: 2, sugar: 2, mealType: "dinner", tags: ["saudi", "lamb", "traditional"] },
  { name: "Chicken with Vegetables Saloona", emoji: "🍲", calories: 320, protein: 28, carbs: 24, fat: 12, fiber: 5, sugar: 5, mealType: "dinner", tags: ["gulf", "stew", "vegetables"] },
  { name: "Grilled Shrimp", emoji: "🍤", calories: 200, protein: 28, carbs: 2, fat: 8, fiber: 0, sugar: 0, mealType: "dinner", tags: ["gulf", "seafood", "grilled"] },
  { name: "Avocado Hummus", emoji: "🥑", calories: 210, protein: 7, carbs: 18, fat: 14, fiber: 7, sugar: 2, mealType: "snack", tags: ["arabic-fusion", "dip", "healthy"] },

  // ── Salads & Light ─────────────────────────────────────────────
  { name: "Caesar Salad", emoji: "🥗", calories: 340, protein: 18, carbs: 20, fat: 22, fiber: 3, sugar: 4, mealType: "lunch", tags: ["western", "salad"] },
  { name: "Greek Salad", emoji: "🥗", calories: 220, protein: 8, carbs: 14, fat: 16, fiber: 4, sugar: 8, mealType: "lunch", tags: ["mediterranean", "salad"] },
  { name: "Garden Salad", emoji: "🥗", calories: 80, protein: 3, carbs: 10, fat: 3, fiber: 3, sugar: 5, mealType: "lunch", tags: ["salad", "light", "vegetables"] },
  { name: "Chicken Salad", emoji: "🥗", calories: 280, protein: 30, carbs: 8, fat: 14, fiber: 3, sugar: 4, mealType: "lunch", tags: ["protein", "salad", "chicken"] },
  { name: "Tuna Salad", emoji: "🥗", calories: 220, protein: 26, carbs: 6, fat: 10, fiber: 2, sugar: 3, mealType: "lunch", tags: ["protein", "salad", "tuna"] },
  { name: "Quinoa Salad", emoji: "🥗", calories: 320, protein: 12, carbs: 42, fat: 12, fiber: 5, sugar: 4, mealType: "lunch", tags: ["healthy", "salad", "quinoa"] },

  // ── Breakfast Foods ────────────────────────────────────────────
  { name: "Oatmeal with Honey", emoji: "🥣", calories: 280, protein: 8, carbs: 52, fat: 5, fiber: 6, sugar: 14, mealType: "breakfast", tags: ["healthy", "breakfast", "oats"] },
  { name: "Oatmeal with Berries", emoji: "🥣", calories: 300, protein: 9, carbs: 54, fat: 5, fiber: 7, sugar: 16, mealType: "breakfast", tags: ["healthy", "breakfast", "oats"] },
  { name: "Scrambled Eggs (3)", emoji: "🍳", calories: 260, protein: 18, carbs: 2, fat: 20, fiber: 0, sugar: 1, mealType: "breakfast", tags: ["protein", "eggs", "breakfast"] },
  { name: "Boiled Eggs (2)", emoji: "🥚", calories: 160, protein: 12, carbs: 1, fat: 10, fiber: 0, sugar: 1, mealType: "breakfast", tags: ["protein", "eggs", "breakfast"] },
  { name: "Avocado Toast", emoji: "🥑", calories: 320, protein: 8, carbs: 34, fat: 18, fiber: 7, sugar: 3, mealType: "breakfast", tags: ["healthy", "breakfast", "avocado"] },
  { name: "Greek Yogurt with Fruit", emoji: "🍓", calories: 180, protein: 14, carbs: 24, fat: 2, fiber: 2, sugar: 18, mealType: "breakfast", tags: ["protein", "yogurt", "breakfast"] },
  { name: "Banana Smoothie", emoji: "🍌", calories: 220, protein: 6, carbs: 44, fat: 3, fiber: 3, sugar: 28, mealType: "breakfast", tags: ["smoothie", "breakfast", "fruit"] },
  { name: "Protein Smoothie", emoji: "🥛", calories: 280, protein: 30, carbs: 24, fat: 6, fiber: 3, sugar: 12, mealType: "breakfast", tags: ["protein", "smoothie", "workout"] },
  { name: "Whole Wheat Toast with Peanut Butter", emoji: "🍞", calories: 320, protein: 12, carbs: 36, fat: 16, fiber: 4, sugar: 6, mealType: "breakfast", tags: ["breakfast", "bread", "peanut-butter"] },
  { name: "Pancakes (3 medium)", emoji: "🥞", calories: 380, protein: 10, carbs: 58, fat: 12, fiber: 2, sugar: 14, mealType: "breakfast", tags: ["breakfast", "sweet"] },
  { name: "Cheese Omelette", emoji: "🍳", calories: 310, protein: 22, carbs: 4, fat: 22, fiber: 0, sugar: 2, mealType: "breakfast", tags: ["protein", "eggs", "breakfast", "cheese"] },
  { name: "Fruit Bowl", emoji: "🍎", calories: 160, protein: 2, carbs: 40, fat: 1, fiber: 5, sugar: 30, mealType: "breakfast", tags: ["fruit", "healthy", "light"] },
  { name: "Full English Breakfast", emoji: "🍳", calories: 680, protein: 36, carbs: 42, fat: 38, fiber: 4, sugar: 6, mealType: "breakfast", tags: ["western", "breakfast", "heavy"] },

  // ── Proteins / Mains ───────────────────────────────────────────
  { name: "Grilled Chicken Breast", emoji: "🍗", calories: 220, protein: 42, carbs: 0, fat: 5, fiber: 0, sugar: 0, mealType: "lunch", tags: ["protein", "chicken", "grilled", "healthy"] },
  { name: "Salmon Fillet (Grilled)", emoji: "🐟", calories: 300, protein: 38, carbs: 0, fat: 16, fiber: 0, sugar: 0, mealType: "dinner", tags: ["protein", "fish", "omega3", "healthy"] },
  { name: "Tuna Steak (Grilled)", emoji: "🐟", calories: 250, protein: 40, carbs: 0, fat: 8, fiber: 0, sugar: 0, mealType: "dinner", tags: ["protein", "fish", "healthy"] },
  { name: "Beef Steak (200g)", emoji: "🥩", calories: 440, protein: 48, carbs: 0, fat: 26, fiber: 0, sugar: 0, mealType: "dinner", tags: ["protein", "beef", "steak"] },
  { name: "Chicken Burger", emoji: "🍔", calories: 480, protein: 30, carbs: 40, fat: 20, fiber: 2, sugar: 8, mealType: "lunch", tags: ["burger", "chicken", "fast-food"] },
  { name: "Beef Burger", emoji: "🍔", calories: 560, protein: 32, carbs: 40, fat: 28, fiber: 2, sugar: 8, mealType: "lunch", tags: ["burger", "beef", "fast-food"] },
  { name: "Grilled Salmon with Vegetables", emoji: "🐟", calories: 380, protein: 40, carbs: 18, fat: 16, fiber: 5, sugar: 8, mealType: "dinner", tags: ["healthy", "fish", "vegetables"] },
  { name: "Chicken & Rice Bowl", emoji: "🍱", calories: 460, protein: 38, carbs: 52, fat: 8, fiber: 2, sugar: 2, mealType: "lunch", tags: ["meal-prep", "chicken", "rice", "healthy"] },
  { name: "Beef & Vegetable Stir-fry", emoji: "🥘", calories: 380, protein: 32, carbs: 24, fat: 18, fiber: 4, sugar: 6, mealType: "dinner", tags: ["asian", "beef", "vegetables"] },
  { name: "Lemon Garlic Shrimp", emoji: "🍤", calories: 240, protein: 30, carbs: 8, fat: 10, fiber: 1, sugar: 2, mealType: "dinner", tags: ["seafood", "shrimp", "healthy"] },

  // ── Pasta & Noodles ────────────────────────────────────────────
  { name: "Spaghetti Bolognese", emoji: "🍝", calories: 560, protein: 30, carbs: 68, fat: 18, fiber: 4, sugar: 8, mealType: "dinner", tags: ["italian", "pasta", "beef"] },
  { name: "Pasta with Chicken", emoji: "🍝", calories: 480, protein: 34, carbs: 58, fat: 12, fiber: 3, sugar: 6, mealType: "lunch", tags: ["pasta", "chicken"] },
  { name: "Penne Arrabbiata", emoji: "🍝", calories: 380, protein: 14, carbs: 68, fat: 8, fiber: 4, sugar: 10, mealType: "dinner", tags: ["italian", "pasta", "vegetarian"] },
  { name: "Mac and Cheese", emoji: "🧀", calories: 520, protein: 18, carbs: 62, fat: 22, fiber: 2, sugar: 8, mealType: "dinner", tags: ["comfort", "pasta", "cheese"] },
  { name: "Ramen Noodles", emoji: "🍜", calories: 440, protein: 20, carbs: 60, fat: 14, fiber: 2, sugar: 4, mealType: "dinner", tags: ["japanese", "noodles", "soup"] },

  // ── Rice Dishes ────────────────────────────────────────────────
  { name: "Plain White Rice (cup)", emoji: "🍚", calories: 210, protein: 4, carbs: 46, fat: 0, fiber: 0, sugar: 0, mealType: "lunch", tags: ["rice", "side-dish", "carbs"] },
  { name: "Brown Rice (cup)", emoji: "🍚", calories: 220, protein: 5, carbs: 46, fat: 2, fiber: 4, sugar: 0, mealType: "lunch", tags: ["rice", "whole-grain", "healthy"] },
  { name: "Fried Rice with Egg", emoji: "🍳", calories: 360, protein: 12, carbs: 52, fat: 12, fiber: 2, sugar: 3, mealType: "lunch", tags: ["asian", "rice", "fried"] },
  { name: "Vegetable Fried Rice", emoji: "🍚", calories: 300, protein: 8, carbs: 54, fat: 8, fiber: 4, sugar: 4, mealType: "lunch", tags: ["asian", "rice", "vegetarian"] },

  // ── Pizza ──────────────────────────────────────────────────────
  { name: "Margherita Pizza (2 slices)", emoji: "🍕", calories: 480, protein: 18, carbs: 56, fat: 20, fiber: 3, sugar: 8, mealType: "dinner", tags: ["italian", "pizza", "cheese"] },
  { name: "Pepperoni Pizza (2 slices)", emoji: "🍕", calories: 560, protein: 22, carbs: 56, fat: 28, fiber: 3, sugar: 8, mealType: "dinner", tags: ["pizza", "meat"] },
  { name: "Chicken Pizza (2 slices)", emoji: "🍕", calories: 500, protein: 26, carbs: 54, fat: 20, fiber: 3, sugar: 6, mealType: "dinner", tags: ["pizza", "chicken"] },

  // ── Snacks & Light ─────────────────────────────────────────────
  { name: "Mixed Nuts (30g)", emoji: "🥜", calories: 180, protein: 5, carbs: 8, fat: 16, fiber: 2, sugar: 2, mealType: "snack", tags: ["healthy", "nuts", "fat", "snack"] },
  { name: "Almonds (30g)", emoji: "🌰", calories: 170, protein: 6, carbs: 6, fat: 15, fiber: 4, sugar: 1, mealType: "snack", tags: ["healthy", "nuts", "snack"] },
  { name: "Apple", emoji: "🍎", calories: 95, protein: 0, carbs: 25, fat: 0, fiber: 4, sugar: 19, mealType: "snack", tags: ["fruit", "snack", "healthy"] },
  { name: "Banana", emoji: "🍌", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, sugar: 14, mealType: "snack", tags: ["fruit", "snack", "energy"] },
  { name: "Orange", emoji: "🍊", calories: 62, protein: 1, carbs: 15, fat: 0, fiber: 3, sugar: 12, mealType: "snack", tags: ["fruit", "snack", "vitamin-c"] },
  { name: "Watermelon Slice", emoji: "🍉", calories: 85, protein: 2, carbs: 21, fat: 0, fiber: 1, sugar: 17, mealType: "snack", tags: ["fruit", "snack", "hydrating"] },
  { name: "Greek Yogurt (plain)", emoji: "🥛", calories: 130, protein: 17, carbs: 9, fat: 0, fiber: 0, sugar: 7, mealType: "snack", tags: ["protein", "dairy", "healthy"] },
  { name: "Protein Bar", emoji: "🍫", calories: 200, protein: 20, carbs: 22, fat: 6, fiber: 3, sugar: 8, mealType: "snack", tags: ["protein", "workout", "snack"] },
  { name: "Rice Cakes (2)", emoji: "🍘", calories: 70, protein: 2, carbs: 14, fat: 0, fiber: 0, sugar: 0, mealType: "snack", tags: ["light", "snack", "low-calorie"] },
  { name: "Dark Chocolate (30g)", emoji: "🍫", calories: 170, protein: 2, carbs: 14, fat: 12, fiber: 3, sugar: 8, mealType: "snack", tags: ["sweet", "snack", "chocolate"] },
  { name: "Cheese Crackers", emoji: "🧀", calories: 160, protein: 4, carbs: 18, fat: 8, fiber: 1, sugar: 2, mealType: "snack", tags: ["snack", "cheese", "crackers"] },
  { name: "Edamame (cup)", emoji: "🫛", calories: 190, protein: 17, carbs: 14, fat: 8, fiber: 8, sugar: 3, mealType: "snack", tags: ["protein", "healthy", "plant-based"] },

  // ── Drinks ─────────────────────────────────────────────────────
  { name: "Orange Juice (cup)", emoji: "🍊", calories: 110, protein: 2, carbs: 26, fat: 0, fiber: 0, sugar: 22, mealType: "breakfast", tags: ["drink", "juice", "vitamin-c"] },
  { name: "Whole Milk (cup)", emoji: "🥛", calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 0, sugar: 12, mealType: "breakfast", tags: ["drink", "dairy", "calcium"] },
  { name: "Latte (medium)", emoji: "☕", calories: 190, protein: 10, carbs: 20, fat: 7, fiber: 0, sugar: 16, mealType: "breakfast", tags: ["drink", "coffee", "dairy"] },
  { name: "Black Coffee", emoji: "☕", calories: 5, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, mealType: "breakfast", tags: ["drink", "coffee", "zero-calorie"] },
  { name: "Green Tea", emoji: "🍵", calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, mealType: "snack", tags: ["drink", "tea", "antioxidant"] },
  { name: "Mango Juice (cup)", emoji: "🥭", calories: 130, protein: 1, carbs: 32, fat: 0, fiber: 1, sugar: 28, mealType: "snack", tags: ["drink", "juice", "arabic"] },
  { name: "Laban (Buttermilk)", emoji: "🥛", calories: 90, protein: 6, carbs: 10, fat: 2, fiber: 0, sugar: 10, mealType: "breakfast", tags: ["arabic", "dairy", "drink", "probiotic"] },
  { name: "Ayran (Yogurt Drink)", emoji: "🥛", calories: 80, protein: 5, carbs: 8, fat: 2, fiber: 0, sugar: 8, mealType: "snack", tags: ["turkish", "yogurt", "drink"] },

  // ── South & East Asian ─────────────────────────────────────────
  { name: "Dhal Curry", emoji: "🍛", calories: 260, protein: 14, carbs: 38, fat: 6, fiber: 10, sugar: 4, mealType: "dinner", tags: ["south-asian", "lentil", "vegetarian"] },
  { name: "Chicken Tikka Masala", emoji: "🍛", calories: 430, protein: 36, carbs: 22, fat: 22, fiber: 3, sugar: 8, mealType: "dinner", tags: ["south-asian", "curry", "chicken"] },
  { name: "Butter Chicken", emoji: "🍛", calories: 490, protein: 34, carbs: 26, fat: 28, fiber: 3, sugar: 10, mealType: "dinner", tags: ["south-asian", "curry", "chicken"] },
  { name: "Chapati (2 pieces)", emoji: "🫓", calories: 210, protein: 6, carbs: 38, fat: 4, fiber: 4, sugar: 1, mealType: "lunch", tags: ["south-asian", "bread", "whole-wheat"] },
  { name: "Pad Thai", emoji: "🍜", calories: 480, protein: 20, carbs: 62, fat: 16, fiber: 3, sugar: 8, mealType: "dinner", tags: ["thai", "noodles"] },
  { name: "Sushi Roll (8 pieces)", emoji: "🍱", calories: 360, protein: 16, carbs: 58, fat: 8, fiber: 2, sugar: 6, mealType: "lunch", tags: ["japanese", "sushi", "rice"] },
  { name: "Fried Dumplings (6)", emoji: "🥟", calories: 320, protein: 14, carbs: 38, fat: 12, fiber: 2, sugar: 4, mealType: "lunch", tags: ["asian", "dumplings", "fried"] },

  // ── Mediterranean ──────────────────────────────────────────────
  { name: "Grilled Halloumi", emoji: "🧀", calories: 260, protein: 18, carbs: 2, fat: 20, fiber: 0, sugar: 1, mealType: "lunch", tags: ["mediterranean", "cheese", "protein"] },
  { name: "Pita with Dips", emoji: "🫓", calories: 320, protein: 10, carbs: 44, fat: 12, fiber: 5, sugar: 4, mealType: "snack", tags: ["mediterranean", "bread", "dip"] },
  { name: "Spanakopita", emoji: "🥙", calories: 320, protein: 10, carbs: 28, fat: 20, fiber: 3, sugar: 2, mealType: "lunch", tags: ["greek", "pastry", "spinach"] },
  { name: "Moussaka", emoji: "🍲", calories: 420, protein: 24, carbs: 32, fat: 22, fiber: 5, sugar: 8, mealType: "dinner", tags: ["greek", "eggplant", "beef"] },
  { name: "Chicken Souvlaki", emoji: "🍢", calories: 320, protein: 36, carbs: 12, fat: 14, fiber: 2, sugar: 4, mealType: "lunch", tags: ["greek", "grilled", "chicken"] },

  // ── More Local Arabian / Gulf Foods ───────────────────────────
  { name: "Madhbi Chicken (Grilled on Stone)", emoji: "🔥", calories: 510, protein: 42, carbs: 50, fat: 14, fiber: 1, sugar: 2, mealType: "dinner", tags: ["yemen", "arabian", "grilled", "chicken"] },
  { name: "Madhbi Lamb", emoji: "🔥", calories: 620, protein: 44, carbs: 50, fat: 22, fiber: 1, sugar: 2, mealType: "dinner", tags: ["yemen", "arabian", "grilled", "lamb"] },
  { name: "Mutabbaq Samak (Stuffed Fish)", emoji: "🐟", calories: 480, protein: 38, carbs: 38, fat: 16, fiber: 2, sugar: 2, mealType: "dinner", tags: ["gulf", "saudi", "fish"] },
  { name: "Aseeda", emoji: "🥣", calories: 320, protein: 6, carbs: 60, fat: 6, fiber: 2, sugar: 16, mealType: "breakfast", tags: ["gulf", "wheat", "honey", "traditional"] },
  { name: "Balaleet (Sweet Vermicelli with Egg)", emoji: "🍳", calories: 380, protein: 12, carbs: 56, fat: 12, fiber: 1, sugar: 22, mealType: "breakfast", tags: ["emirati", "gulf", "sweet", "eggs"] },
  { name: "Khabees", emoji: "🥣", calories: 340, protein: 5, carbs: 58, fat: 10, fiber: 2, sugar: 30, mealType: "breakfast", tags: ["gulf", "dates", "flour", "traditional"] },
  { name: "Chebab (Emirati Pancakes)", emoji: "🥞", calories: 290, protein: 7, carbs: 48, fat: 8, fiber: 1, sugar: 16, mealType: "breakfast", tags: ["emirati", "gulf", "pancake"] },
  { name: "Khanfaroosh", emoji: "🍩", calories: 340, protein: 5, carbs: 48, fat: 14, fiber: 1, sugar: 20, mealType: "snack", tags: ["emirati", "gulf", "fried", "saffron"] },
  { name: "Lugaimat with Date Syrup", emoji: "🍯", calories: 380, protein: 5, carbs: 56, fat: 16, fiber: 1, sugar: 28, mealType: "snack", tags: ["gulf", "fried", "sweet", "ramadan"] },
  { name: "Qatayef (Stuffed Pancakes)", emoji: "🥮", calories: 320, protein: 6, carbs: 48, fat: 12, fiber: 2, sugar: 22, mealType: "snack", tags: ["levantine", "ramadan", "dessert"] },
  { name: "Basbousa", emoji: "🍰", calories: 320, protein: 4, carbs: 52, fat: 12, fiber: 1, sugar: 30, mealType: "snack", tags: ["egyptian", "arabic", "dessert", "semolina"] },
  { name: "Halawet El Jibn", emoji: "🧁", calories: 290, protein: 8, carbs: 42, fat: 10, fiber: 0, sugar: 28, mealType: "snack", tags: ["levantine", "dessert", "cheese"] },
  { name: "Atayef Asafiri", emoji: "🥮", calories: 280, protein: 6, carbs: 40, fat: 11, fiber: 1, sugar: 22, mealType: "snack", tags: ["levantine", "ramadan", "cream"] },
  { name: "Ouzi (Lamb & Rice in Pastry)", emoji: "🥧", calories: 660, protein: 38, carbs: 62, fat: 28, fiber: 3, sugar: 4, mealType: "dinner", tags: ["levantine", "lamb", "rice", "celebration"] },
  { name: "Freekeh with Chicken", emoji: "🍚", calories: 440, protein: 34, carbs: 56, fat: 8, fiber: 7, sugar: 2, mealType: "dinner", tags: ["levantine", "freekeh", "smoky", "whole-grain"] },
  { name: "Mujadara (Lentils & Rice)", emoji: "🍚", calories: 360, protein: 14, carbs: 60, fat: 8, fiber: 9, sugar: 3, mealType: "lunch", tags: ["levantine", "lentil", "vegetarian", "arabic"] },
  { name: "Foul with Tahini", emoji: "🫘", calories: 280, protein: 14, carbs: 30, fat: 12, fiber: 10, sugar: 2, mealType: "breakfast", tags: ["egyptian", "arabic", "beans", "vegetarian"] },
  { name: "Manakish Za'atar", emoji: "🫓", calories: 310, protein: 9, carbs: 42, fat: 12, fiber: 3, sugar: 2, mealType: "breakfast", tags: ["levantine", "bread", "thyme", "arabic"] },
  { name: "Manakish Cheese", emoji: "🧀", calories: 380, protein: 14, carbs: 40, fat: 18, fiber: 2, sugar: 2, mealType: "breakfast", tags: ["levantine", "bread", "cheese"] },
  { name: "Manakish Meat (Lahm bi Ajeen)", emoji: "🥙", calories: 420, protein: 18, carbs: 42, fat: 20, fiber: 2, sugar: 3, mealType: "lunch", tags: ["levantine", "bread", "meat", "arabic"] },
  { name: "Musakhan (Sumac Chicken)", emoji: "🍗", calories: 540, protein: 36, carbs: 52, fat: 22, fiber: 4, sugar: 4, mealType: "dinner", tags: ["palestinian", "chicken", "sumac"] },
  { name: "Knafeh Nabulsia", emoji: "🧁", calories: 510, protein: 14, carbs: 62, fat: 24, fiber: 1, sugar: 32, mealType: "snack", tags: ["palestinian", "dessert", "cheese", "sweet"] },
  { name: "Shish Tawook", emoji: "🍢", calories: 310, protein: 36, carbs: 6, fat: 16, fiber: 1, sugar: 2, mealType: "dinner", tags: ["levantine", "grilled", "chicken", "skewer"] },
  { name: "Mixed Grill Platter", emoji: "🍖", calories: 720, protein: 56, carbs: 12, fat: 48, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabic", "grilled", "meat-mix"] },
  { name: "Chicken Liver (Sautéed)", emoji: "🥘", calories: 280, protein: 26, carbs: 6, fat: 16, fiber: 1, sugar: 2, mealType: "dinner", tags: ["arabic", "liver", "iron-rich"] },
  { name: "Maghmour (Eggplant & Chickpea Stew)", emoji: "🍆", calories: 260, protein: 9, carbs: 32, fat: 12, fiber: 7, sugar: 6, mealType: "lunch", tags: ["levantine", "eggplant", "vegetarian"] },
  { name: "Yakhnet Bamia (Okra Stew)", emoji: "🍲", calories: 280, protein: 20, carbs: 22, fat: 12, fiber: 5, sugar: 6, mealType: "dinner", tags: ["arabic", "okra", "stew", "lamb"] },
  { name: "Yakhnet Loubieh (Green Bean Stew)", emoji: "🍲", calories: 260, protein: 16, carbs: 24, fat: 12, fiber: 6, sugar: 6, mealType: "dinner", tags: ["levantine", "green-bean", "stew"] },
  { name: "Sayadieh (Spiced Fish & Rice)", emoji: "🐟", calories: 480, protein: 32, carbs: 56, fat: 14, fiber: 2, sugar: 3, mealType: "dinner", tags: ["levantine", "fish", "rice", "arabic"] },
  { name: "Mlukhiya with Rice", emoji: "🍲", calories: 360, protein: 22, carbs: 44, fat: 10, fiber: 6, sugar: 3, mealType: "lunch", tags: ["arabic", "egyptian", "leafy-green", "rice"] },
  { name: "Lentil Maklouba", emoji: "🍛", calories: 420, protein: 16, carbs: 64, fat: 12, fiber: 8, sugar: 4, mealType: "lunch", tags: ["levantine", "lentil", "vegetarian", "rice"] },
  { name: "Sambousek with Spinach", emoji: "🥟", calories: 250, protein: 8, carbs: 30, fat: 12, fiber: 3, sugar: 2, mealType: "snack", tags: ["arabic", "pastry", "spinach"] },
  { name: "Date Smoothie with Milk", emoji: "🥤", calories: 240, protein: 8, carbs: 46, fat: 4, fiber: 4, sugar: 38, mealType: "breakfast", tags: ["arabic", "dates", "smoothie"] },
  { name: "Sahlab (Hot Milk Drink)", emoji: "🍶", calories: 220, protein: 7, carbs: 36, fat: 6, fiber: 0, sugar: 26, mealType: "snack", tags: ["arabic", "winter", "drink", "milk"] },
  { name: "Jallab Drink", emoji: "🥤", calories: 180, protein: 1, carbs: 44, fat: 1, fiber: 1, sugar: 40, mealType: "snack", tags: ["levantine", "drink", "ramadan", "dates"] },
  { name: "Tamarind Juice", emoji: "🥤", calories: 130, protein: 0, carbs: 32, fat: 0, fiber: 1, sugar: 28, mealType: "snack", tags: ["arabic", "drink", "ramadan", "tangy"] },

  // ── More Global / Vision-Recognized Foods ──────────────────────
  { name: "Hamburger", emoji: "🍔", calories: 540, protein: 28, carbs: 42, fat: 28, fiber: 2, sugar: 8, mealType: "lunch", tags: ["western", "fast-food", "beef"] },
  { name: "Cheeseburger", emoji: "🍔", calories: 620, protein: 32, carbs: 44, fat: 34, fiber: 2, sugar: 9, mealType: "lunch", tags: ["western", "fast-food", "beef", "cheese"] },
  { name: "Double Cheeseburger", emoji: "🍔", calories: 820, protein: 48, carbs: 46, fat: 50, fiber: 2, sugar: 10, mealType: "lunch", tags: ["western", "fast-food"] },
  { name: "Chicken Burger", emoji: "🍔", calories: 480, protein: 28, carbs: 44, fat: 22, fiber: 2, sugar: 6, mealType: "lunch", tags: ["western", "fast-food", "chicken"] },
  { name: "French Fries (Medium)", emoji: "🍟", calories: 380, protein: 4, carbs: 50, fat: 18, fiber: 4, sugar: 0, mealType: "snack", tags: ["western", "fried", "side"] },
  { name: "Sweet Potato Fries", emoji: "🍟", calories: 320, protein: 3, carbs: 48, fat: 14, fiber: 5, sugar: 8, mealType: "snack", tags: ["western", "side"] },
  { name: "Onion Rings", emoji: "🧅", calories: 410, protein: 5, carbs: 48, fat: 22, fiber: 3, sugar: 6, mealType: "snack", tags: ["fried", "side"] },
  { name: "Hot Dog", emoji: "🌭", calories: 350, protein: 12, carbs: 28, fat: 22, fiber: 1, sugar: 5, mealType: "snack", tags: ["western", "street-food"] },
  { name: "Chicken Nuggets (6 pcs)", emoji: "🍗", calories: 280, protein: 14, carbs: 16, fat: 18, fiber: 1, sugar: 0, mealType: "snack", tags: ["fast-food", "chicken", "fried"] },
  { name: "Fried Chicken (2 pieces)", emoji: "🍗", calories: 480, protein: 32, carbs: 18, fat: 30, fiber: 1, sugar: 0, mealType: "lunch", tags: ["fast-food", "fried", "chicken"] },
  { name: "Buffalo Wings (6)", emoji: "🍗", calories: 540, protein: 36, carbs: 8, fat: 38, fiber: 1, sugar: 4, mealType: "snack", tags: ["western", "spicy", "chicken"] },
  { name: "BBQ Ribs", emoji: "🍖", calories: 720, protein: 52, carbs: 22, fat: 46, fiber: 1, sugar: 18, mealType: "dinner", tags: ["bbq", "pork", "western"] },
  { name: "Pulled Pork Sandwich", emoji: "🥪", calories: 560, protein: 32, carbs: 48, fat: 26, fiber: 2, sugar: 14, mealType: "lunch", tags: ["western", "bbq"] },
  { name: "Club Sandwich", emoji: "🥪", calories: 520, protein: 28, carbs: 42, fat: 26, fiber: 3, sugar: 5, mealType: "lunch", tags: ["western", "sandwich"] },
  { name: "Tuna Sandwich", emoji: "🥪", calories: 380, protein: 24, carbs: 36, fat: 14, fiber: 3, sugar: 4, mealType: "lunch", tags: ["sandwich", "fish"] },
  { name: "Egg Salad Sandwich", emoji: "🥪", calories: 360, protein: 14, carbs: 32, fat: 18, fiber: 2, sugar: 4, mealType: "lunch", tags: ["sandwich"] },
  { name: "BLT Sandwich", emoji: "🥓", calories: 480, protein: 18, carbs: 38, fat: 28, fiber: 3, sugar: 5, mealType: "lunch", tags: ["western", "bacon"] },
  { name: "Avocado Toast", emoji: "🥑", calories: 320, protein: 10, carbs: 32, fat: 18, fiber: 8, sugar: 3, mealType: "breakfast", tags: ["healthy", "avocado"] },
  { name: "Bagel with Cream Cheese", emoji: "🥯", calories: 420, protein: 14, carbs: 56, fat: 14, fiber: 3, sugar: 6, mealType: "breakfast", tags: ["western"] },
  { name: "English Muffin", emoji: "🥯", calories: 220, protein: 8, carbs: 38, fat: 5, fiber: 2, sugar: 3, mealType: "breakfast", tags: ["western"] },
  { name: "Pancakes (Stack of 3)", emoji: "🥞", calories: 540, protein: 12, carbs: 78, fat: 18, fiber: 2, sugar: 22, mealType: "breakfast", tags: ["western", "sweet"] },
  { name: "Waffles with Syrup", emoji: "🧇", calories: 480, protein: 10, carbs: 70, fat: 16, fiber: 2, sugar: 28, mealType: "breakfast", tags: ["western", "sweet"] },
  { name: "French Toast", emoji: "🍞", calories: 380, protein: 14, carbs: 48, fat: 14, fiber: 2, sugar: 14, mealType: "breakfast", tags: ["western", "sweet"] },
  { name: "Crepes (Sweet)", emoji: "🥞", calories: 340, protein: 8, carbs: 48, fat: 12, fiber: 1, sugar: 18, mealType: "breakfast", tags: ["french", "sweet"] },
  { name: "Croissant Plain", emoji: "🥐", calories: 270, protein: 5, carbs: 28, fat: 14, fiber: 2, sugar: 6, mealType: "breakfast", tags: ["french", "pastry"] },
  { name: "Chocolate Croissant", emoji: "🥐", calories: 360, protein: 6, carbs: 36, fat: 22, fiber: 2, sugar: 14, mealType: "breakfast", tags: ["french", "pastry", "chocolate"] },
  { name: "Donut Glazed", emoji: "🍩", calories: 260, protein: 3, carbs: 32, fat: 14, fiber: 1, sugar: 16, mealType: "snack", tags: ["sweet", "fried"] },
  { name: "Donut Chocolate", emoji: "🍩", calories: 320, protein: 4, carbs: 38, fat: 18, fiber: 1, sugar: 22, mealType: "snack", tags: ["sweet", "fried"] },
  { name: "Cinnamon Roll", emoji: "🥯", calories: 420, protein: 6, carbs: 60, fat: 18, fiber: 2, sugar: 30, mealType: "breakfast", tags: ["sweet", "pastry"] },
  { name: "Blueberry Muffin", emoji: "🧁", calories: 380, protein: 5, carbs: 54, fat: 16, fiber: 2, sugar: 28, mealType: "breakfast", tags: ["sweet"] },
  { name: "Chocolate Chip Cookie", emoji: "🍪", calories: 160, protein: 2, carbs: 22, fat: 8, fiber: 1, sugar: 14, mealType: "snack", tags: ["sweet"] },
  { name: "Brownie", emoji: "🍫", calories: 280, protein: 4, carbs: 36, fat: 16, fiber: 2, sugar: 24, mealType: "snack", tags: ["sweet", "chocolate"] },
  { name: "Chocolate Cake Slice", emoji: "🍰", calories: 380, protein: 5, carbs: 50, fat: 20, fiber: 2, sugar: 36, mealType: "snack", tags: ["sweet", "dessert"] },
  { name: "Cheesecake Slice", emoji: "🍰", calories: 340, protein: 7, carbs: 32, fat: 22, fiber: 1, sugar: 24, mealType: "snack", tags: ["sweet", "dessert"] },
  { name: "Tiramisu", emoji: "🍰", calories: 420, protein: 7, carbs: 38, fat: 28, fiber: 1, sugar: 26, mealType: "snack", tags: ["italian", "dessert"] },
  { name: "Ice Cream (2 scoops)", emoji: "🍨", calories: 300, protein: 5, carbs: 36, fat: 16, fiber: 1, sugar: 28, mealType: "snack", tags: ["sweet", "cold"] },
  { name: "Frozen Yogurt", emoji: "🍦", calories: 180, protein: 6, carbs: 32, fat: 4, fiber: 0, sugar: 24, mealType: "snack", tags: ["cold", "yogurt"] },
  { name: "Apple Pie Slice", emoji: "🥧", calories: 320, protein: 3, carbs: 48, fat: 14, fiber: 2, sugar: 22, mealType: "snack", tags: ["dessert", "fruit"] },
  { name: "Pizza Margherita Slice", emoji: "🍕", calories: 270, protein: 11, carbs: 34, fat: 10, fiber: 2, sugar: 4, mealType: "lunch", tags: ["italian", "pizza"] },
  { name: "Pizza Pepperoni Slice", emoji: "🍕", calories: 320, protein: 13, carbs: 34, fat: 14, fiber: 2, sugar: 4, mealType: "lunch", tags: ["italian", "pizza"] },
  { name: "Pizza Hawaiian Slice", emoji: "🍕", calories: 290, protein: 12, carbs: 36, fat: 11, fiber: 2, sugar: 8, mealType: "lunch", tags: ["pizza", "pineapple"] },
  { name: "Calzone", emoji: "🥟", calories: 580, protein: 24, carbs: 62, fat: 26, fiber: 3, sugar: 6, mealType: "lunch", tags: ["italian"] },
  { name: "Garlic Bread", emoji: "🍞", calories: 220, protein: 5, carbs: 28, fat: 10, fiber: 1, sugar: 2, mealType: "snack", tags: ["italian", "bread"] },
  { name: "Bruschetta (3 pieces)", emoji: "🥖", calories: 240, protein: 6, carbs: 32, fat: 9, fiber: 3, sugar: 4, mealType: "snack", tags: ["italian"] },
  { name: "Pasta Carbonara", emoji: "🍝", calories: 580, protein: 22, carbs: 64, fat: 26, fiber: 3, sugar: 4, mealType: "dinner", tags: ["italian", "pasta"] },
  { name: "Pasta Bolognese", emoji: "🍝", calories: 540, protein: 24, carbs: 68, fat: 18, fiber: 4, sugar: 8, mealType: "dinner", tags: ["italian", "pasta"] },
  { name: "Pasta Alfredo", emoji: "🍝", calories: 620, protein: 18, carbs: 64, fat: 32, fiber: 3, sugar: 5, mealType: "dinner", tags: ["italian", "creamy"] },
  { name: "Spaghetti Marinara", emoji: "🍝", calories: 420, protein: 14, carbs: 70, fat: 10, fiber: 5, sugar: 10, mealType: "dinner", tags: ["italian", "pasta"] },
  { name: "Lasagna", emoji: "🍝", calories: 560, protein: 28, carbs: 48, fat: 28, fiber: 4, sugar: 8, mealType: "dinner", tags: ["italian", "baked"] },
  { name: "Mac and Cheese", emoji: "🧀", calories: 480, protein: 18, carbs: 52, fat: 22, fiber: 2, sugar: 6, mealType: "dinner", tags: ["western", "cheese"] },
  { name: "Risotto Mushroom", emoji: "🍚", calories: 480, protein: 12, carbs: 64, fat: 18, fiber: 3, sugar: 4, mealType: "dinner", tags: ["italian"] },
  { name: "Sushi Roll California (8 pcs)", emoji: "🍣", calories: 380, protein: 12, carbs: 56, fat: 10, fiber: 4, sugar: 6, mealType: "lunch", tags: ["japanese", "sushi"] },
  { name: "Sushi Roll Salmon (8 pcs)", emoji: "🍣", calories: 340, protein: 18, carbs: 48, fat: 8, fiber: 2, sugar: 4, mealType: "lunch", tags: ["japanese", "sushi", "fish"] },
  { name: "Sushi Roll Tuna (8 pcs)", emoji: "🍣", calories: 320, protein: 22, carbs: 44, fat: 6, fiber: 2, sugar: 4, mealType: "lunch", tags: ["japanese", "sushi", "fish"] },
  { name: "Sashimi (Mixed)", emoji: "🍣", calories: 260, protein: 38, carbs: 2, fat: 12, fiber: 0, sugar: 0, mealType: "lunch", tags: ["japanese", "fish"] },
  { name: "Ramen Bowl", emoji: "🍜", calories: 540, protein: 22, carbs: 68, fat: 18, fiber: 3, sugar: 6, mealType: "dinner", tags: ["japanese", "noodle", "soup"] },
  { name: "Udon Noodles", emoji: "🍜", calories: 420, protein: 14, carbs: 78, fat: 6, fiber: 4, sugar: 5, mealType: "lunch", tags: ["japanese", "noodle"] },
  { name: "Pho Bowl", emoji: "🍜", calories: 480, protein: 30, carbs: 62, fat: 10, fiber: 3, sugar: 6, mealType: "lunch", tags: ["vietnamese", "noodle", "soup"] },
  { name: "Pad Thai", emoji: "🍜", calories: 540, protein: 22, carbs: 68, fat: 20, fiber: 4, sugar: 14, mealType: "dinner", tags: ["thai", "noodle"] },
  { name: "Pad See Ew", emoji: "🍜", calories: 580, protein: 24, carbs: 70, fat: 22, fiber: 3, sugar: 8, mealType: "dinner", tags: ["thai", "noodle"] },
  { name: "Green Curry Chicken", emoji: "🍛", calories: 480, protein: 28, carbs: 38, fat: 24, fiber: 4, sugar: 10, mealType: "dinner", tags: ["thai", "curry"] },
  { name: "Red Curry", emoji: "🍛", calories: 460, protein: 24, carbs: 40, fat: 22, fiber: 4, sugar: 12, mealType: "dinner", tags: ["thai", "curry"] },
  { name: "Tom Yum Soup", emoji: "🍲", calories: 220, protein: 18, carbs: 16, fat: 10, fiber: 2, sugar: 6, mealType: "lunch", tags: ["thai", "soup"] },
  { name: "Chicken Tikka Masala", emoji: "🍛", calories: 540, protein: 32, carbs: 32, fat: 28, fiber: 3, sugar: 12, mealType: "dinner", tags: ["indian", "curry"] },
  { name: "Butter Chicken", emoji: "🍛", calories: 580, protein: 30, carbs: 28, fat: 36, fiber: 2, sugar: 12, mealType: "dinner", tags: ["indian", "curry"] },
  { name: "Chicken Biryani", emoji: "🍛", calories: 580, protein: 32, carbs: 70, fat: 18, fiber: 3, sugar: 4, mealType: "dinner", tags: ["indian", "rice"] },
  { name: "Lamb Vindaloo", emoji: "🍛", calories: 520, protein: 32, carbs: 24, fat: 32, fiber: 3, sugar: 6, mealType: "dinner", tags: ["indian", "spicy"] },
  { name: "Naan Bread", emoji: "🫓", calories: 260, protein: 8, carbs: 48, fat: 5, fiber: 2, sugar: 3, mealType: "lunch", tags: ["indian", "bread"] },
  { name: "Garlic Naan", emoji: "🫓", calories: 280, protein: 8, carbs: 48, fat: 7, fiber: 2, sugar: 3, mealType: "lunch", tags: ["indian", "bread"] },
  { name: "Samosa (2 pieces)", emoji: "🥟", calories: 280, protein: 6, carbs: 32, fat: 14, fiber: 3, sugar: 3, mealType: "snack", tags: ["indian", "fried"] },
  { name: "Tacos (2 pieces)", emoji: "🌮", calories: 380, protein: 18, carbs: 38, fat: 18, fiber: 4, sugar: 4, mealType: "lunch", tags: ["mexican"] },
  { name: "Burrito", emoji: "🌯", calories: 620, protein: 28, carbs: 70, fat: 24, fiber: 8, sugar: 5, mealType: "lunch", tags: ["mexican"] },
  { name: "Quesadilla", emoji: "🫓", calories: 480, protein: 20, carbs: 38, fat: 26, fiber: 3, sugar: 4, mealType: "lunch", tags: ["mexican", "cheese"] },
  { name: "Nachos with Cheese", emoji: "🧀", calories: 580, protein: 16, carbs: 52, fat: 32, fiber: 6, sugar: 4, mealType: "snack", tags: ["mexican", "cheese"] },
  { name: "Guacamole with Chips", emoji: "🥑", calories: 320, protein: 4, carbs: 32, fat: 22, fiber: 8, sugar: 2, mealType: "snack", tags: ["mexican", "avocado"] },
  { name: "Salmon Fillet Grilled", emoji: "🐟", calories: 320, protein: 36, carbs: 0, fat: 18, fiber: 0, sugar: 0, mealType: "dinner", tags: ["fish", "healthy", "protein"] },
  { name: "Tuna Steak", emoji: "🐟", calories: 280, protein: 42, carbs: 0, fat: 12, fiber: 0, sugar: 0, mealType: "dinner", tags: ["fish", "protein"] },
  { name: "Shrimp Grilled", emoji: "🦐", calories: 220, protein: 32, carbs: 4, fat: 8, fiber: 0, sugar: 1, mealType: "dinner", tags: ["seafood", "protein"] },
  { name: "Lobster Tail", emoji: "🦞", calories: 240, protein: 36, carbs: 2, fat: 10, fiber: 0, sugar: 0, mealType: "dinner", tags: ["seafood"] },
  { name: "Calamari Fried", emoji: "🦑", calories: 380, protein: 22, carbs: 30, fat: 20, fiber: 1, sugar: 1, mealType: "snack", tags: ["seafood", "fried"] },
  { name: "Steak Ribeye", emoji: "🥩", calories: 580, protein: 48, carbs: 0, fat: 42, fiber: 0, sugar: 0, mealType: "dinner", tags: ["beef", "protein"] },
  { name: "Steak Sirloin", emoji: "🥩", calories: 420, protein: 46, carbs: 0, fat: 26, fiber: 0, sugar: 0, mealType: "dinner", tags: ["beef", "protein"] },
  { name: "Filet Mignon", emoji: "🥩", calories: 360, protein: 44, carbs: 0, fat: 20, fiber: 0, sugar: 0, mealType: "dinner", tags: ["beef", "premium"] },
  { name: "Lamb Chops", emoji: "🥩", calories: 480, protein: 42, carbs: 0, fat: 34, fiber: 0, sugar: 0, mealType: "dinner", tags: ["lamb", "protein"] },
  { name: "Pork Chop", emoji: "🥩", calories: 380, protein: 38, carbs: 0, fat: 24, fiber: 0, sugar: 0, mealType: "dinner", tags: ["pork"] },
  { name: "Roast Chicken (Quarter)", emoji: "🍗", calories: 380, protein: 42, carbs: 0, fat: 22, fiber: 0, sugar: 0, mealType: "dinner", tags: ["chicken", "protein"] },
  { name: "Turkey Slice (4 oz)", emoji: "🦃", calories: 180, protein: 32, carbs: 0, fat: 6, fiber: 0, sugar: 0, mealType: "lunch", tags: ["poultry", "lean"] },
  { name: "Caesar Salad with Chicken", emoji: "🥗", calories: 380, protein: 28, carbs: 14, fat: 24, fiber: 4, sugar: 4, mealType: "lunch", tags: ["salad", "healthy"] },
  { name: "Greek Salad", emoji: "🥗", calories: 280, protein: 8, carbs: 16, fat: 22, fiber: 5, sugar: 8, mealType: "lunch", tags: ["mediterranean", "salad"] },
  { name: "Cobb Salad", emoji: "🥗", calories: 480, protein: 32, carbs: 14, fat: 32, fiber: 5, sugar: 4, mealType: "lunch", tags: ["salad", "western"] },
  { name: "Quinoa Bowl", emoji: "🥗", calories: 380, protein: 14, carbs: 56, fat: 12, fiber: 8, sugar: 4, mealType: "lunch", tags: ["healthy", "vegetarian"] },
  { name: "Buddha Bowl", emoji: "🥗", calories: 420, protein: 16, carbs: 58, fat: 14, fiber: 10, sugar: 6, mealType: "lunch", tags: ["healthy", "vegetarian"] },
  { name: "Acai Bowl", emoji: "🥣", calories: 380, protein: 8, carbs: 68, fat: 10, fiber: 8, sugar: 38, mealType: "breakfast", tags: ["healthy", "fruit"] },
  { name: "Smoothie Bowl", emoji: "🥣", calories: 340, protein: 10, carbs: 62, fat: 8, fiber: 7, sugar: 32, mealType: "breakfast", tags: ["fruit", "healthy"] },
  { name: "Greek Yogurt with Honey", emoji: "🥣", calories: 220, protein: 18, carbs: 28, fat: 4, fiber: 0, sugar: 24, mealType: "breakfast", tags: ["yogurt", "healthy"] },
  { name: "Granola with Milk", emoji: "🥣", calories: 380, protein: 12, carbs: 58, fat: 12, fiber: 6, sugar: 22, mealType: "breakfast", tags: ["healthy"] },
  { name: "Oatmeal with Fruit", emoji: "🥣", calories: 320, protein: 10, carbs: 58, fat: 6, fiber: 8, sugar: 18, mealType: "breakfast", tags: ["healthy", "oats"] },
  { name: "Overnight Oats", emoji: "🥣", calories: 380, protein: 14, carbs: 56, fat: 10, fiber: 8, sugar: 16, mealType: "breakfast", tags: ["healthy", "oats"] },
  { name: "Protein Pancakes", emoji: "🥞", calories: 380, protein: 28, carbs: 38, fat: 12, fiber: 4, sugar: 8, mealType: "breakfast", tags: ["protein", "fitness"] },
  { name: "Egg White Omelet", emoji: "🍳", calories: 180, protein: 24, carbs: 6, fat: 6, fiber: 1, sugar: 3, mealType: "breakfast", tags: ["protein", "low-fat"] },
  { name: "Scrambled Eggs (3)", emoji: "🍳", calories: 280, protein: 18, carbs: 2, fat: 22, fiber: 0, sugar: 1, mealType: "breakfast", tags: ["eggs"] },
  { name: "Boiled Eggs (2)", emoji: "🥚", calories: 140, protein: 12, carbs: 1, fat: 10, fiber: 0, sugar: 1, mealType: "breakfast", tags: ["eggs", "protein"] },
  { name: "Eggs Benedict", emoji: "🍳", calories: 540, protein: 22, carbs: 28, fat: 38, fiber: 1, sugar: 4, mealType: "breakfast", tags: ["western", "brunch"] },
  { name: "Bacon (3 strips)", emoji: "🥓", calories: 130, protein: 9, carbs: 0, fat: 10, fiber: 0, sugar: 0, mealType: "breakfast", tags: ["pork"] },
  { name: "Sausage Links (2)", emoji: "🌭", calories: 180, protein: 10, carbs: 2, fat: 14, fiber: 0, sugar: 1, mealType: "breakfast", tags: ["pork"] },
  { name: "Hash Browns", emoji: "🥔", calories: 320, protein: 4, carbs: 38, fat: 18, fiber: 4, sugar: 2, mealType: "breakfast", tags: ["western", "potato"] },
  { name: "Banana", emoji: "🍌", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, sugar: 14, mealType: "snack", tags: ["fruit"] },
  { name: "Apple", emoji: "🍎", calories: 95, protein: 1, carbs: 25, fat: 0, fiber: 4, sugar: 19, mealType: "snack", tags: ["fruit"] },
  { name: "Orange", emoji: "🍊", calories: 80, protein: 2, carbs: 20, fat: 0, fiber: 4, sugar: 16, mealType: "snack", tags: ["fruit", "vitamin-c"] },
  { name: "Strawberries (1 cup)", emoji: "🍓", calories: 50, protein: 1, carbs: 12, fat: 0, fiber: 3, sugar: 7, mealType: "snack", tags: ["fruit"] },
  { name: "Blueberries (1 cup)", emoji: "🫐", calories: 85, protein: 1, carbs: 21, fat: 0, fiber: 4, sugar: 15, mealType: "snack", tags: ["fruit", "antioxidant"] },
  { name: "Watermelon Slice", emoji: "🍉", calories: 90, protein: 2, carbs: 22, fat: 0, fiber: 1, sugar: 18, mealType: "snack", tags: ["fruit"] },
  { name: "Grapes (1 cup)", emoji: "🍇", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 1, sugar: 23, mealType: "snack", tags: ["fruit"] },
  { name: "Mango", emoji: "🥭", calories: 200, protein: 3, carbs: 50, fat: 1, fiber: 5, sugar: 46, mealType: "snack", tags: ["fruit"] },
  { name: "Pineapple Slice", emoji: "🍍", calories: 80, protein: 1, carbs: 22, fat: 0, fiber: 2, sugar: 16, mealType: "snack", tags: ["fruit"] },
  { name: "Avocado (Half)", emoji: "🥑", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 1, mealType: "snack", tags: ["healthy", "fat"] },
  { name: "Almonds (1 oz)", emoji: "🥜", calories: 165, protein: 6, carbs: 6, fat: 14, fiber: 4, sugar: 1, mealType: "snack", tags: ["nuts", "healthy"] },
  { name: "Walnuts (1 oz)", emoji: "🥜", calories: 185, protein: 4, carbs: 4, fat: 18, fiber: 2, sugar: 1, mealType: "snack", tags: ["nuts"] },
  { name: "Peanut Butter (2 tbsp)", emoji: "🥜", calories: 190, protein: 7, carbs: 6, fat: 16, fiber: 2, sugar: 3, mealType: "snack", tags: ["spread"] },
  { name: "Protein Bar", emoji: "🍫", calories: 220, protein: 20, carbs: 24, fat: 7, fiber: 5, sugar: 10, mealType: "snack", tags: ["fitness", "protein"] },
  { name: "Energy Bar", emoji: "🍫", calories: 240, protein: 8, carbs: 36, fat: 8, fiber: 4, sugar: 18, mealType: "snack", tags: ["fitness"] },
];

export function searchFoods(query: string, limit = 8): FoodItem[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const scored = FOOD_DATABASE.map(food => {
    const nameLower = food.name.toLowerCase();
    let score = 0;
    if (nameLower === q) score = 100;
    else if (nameLower.startsWith(q)) score = 80;
    else if (nameLower.includes(q)) score = 60;
    else if (food.tags.some(t => t.includes(q))) score = 40;
    else {
      const words = q.split(/\s+/);
      const matchedWords = words.filter(w => nameLower.includes(w) || food.tags.some(t => t.includes(w)));
      if (matchedWords.length > 0) score = (matchedWords.length / words.length) * 30;
    }
    return { food, score };
  });
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.food);
}

// ── Personal Food History (localStorage) ──────────────────────────────
export type FoodHistoryItem = FoodItem & { loggedAt: number };

const FOOD_HISTORY_KEY = "bodylogic:food_history";
const MAX_FOOD_HISTORY = 30;

export function getFoodHistory(): FoodHistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(FOOD_HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveFoodToHistory(item: FoodItem) {
  try {
    const history = getFoodHistory().filter(h => h.name.toLowerCase() !== item.name.toLowerCase());
    history.unshift({ ...item, loggedAt: Date.now() });
    localStorage.setItem(FOOD_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_FOOD_HISTORY)));
  } catch {}
}

export function searchFoodHistory(query: string, limit = 3): FoodHistoryItem[] {
  const history = getFoodHistory();
  if (!query.trim()) return history.slice(0, limit);
  const q = query.toLowerCase();
  return history.filter(h => h.name.toLowerCase().includes(q)).slice(0, limit);
}
