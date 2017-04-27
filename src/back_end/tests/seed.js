const { ObjectID } = require('mongodb');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const CATEGORY_MEATS = 0;
const CATEGORY_VEGETABLES = 1;
const CATEGORY_DAIRY = 2;
const CATEGORY_SPICES = 3;
const CATEGORY_OILS = 4;
const CATEGORY_FRUITS = 5;
const CATEGORY_FISH = 6;
const CATEGORY_BAKING_GRAINS = 7;
const CATEGORY_SEA_FOOD = 8;
const CATEGORY_ADDED_SWEETENERS = 9;
const CATEGORY_SEASONINGS = 10;
const CATEGORY_NUTS = 11;
const CATEGORY_CONDIMENTS = 12;
const CATEGORY_DESSERTS_SNACKS = 13;
const CATEGORY_BEVERAGES = 14;
const CATEGORY_SOUP = 15;
const CATEGORY_DAIRY_ALTERNATIVES = 16;
const CATEGORY_LEGUMES = 17;
const CATEGORY_SAUCES = 18;
const CATEGORY_ALCOHOL = 19;


const categories = [
  {
    _id: new ObjectID(),
    name: 'meats'
  },
  {
    _id: new ObjectID(),
    name: 'vegetables'
  },
  {
    _id: new ObjectID(),
    name: 'dairy'
  },
  {
    _id: new ObjectID(),
    name: 'spices'
  },
  {
    _id: new ObjectID(),
    name: 'oils'
  },
  {
    _id: new ObjectID(),
    name: 'fruits'
  },
  {
    _id: new ObjectID(),
    name: 'fish'
  },
  {
    _id: new ObjectID(),
    name: 'baking & grains'
  },
  {
    _id: new ObjectID(),
    name: 'seafood'
  },
  {
    _id: new ObjectID(),
    name: 'added sweeteners'
  },
  {
    _id: new ObjectID(),
    name: 'seasonings'
  },
  {
    _id: new ObjectID(),
    name: 'nuts'
  },
  {
    _id: new ObjectID(),
    name: 'condiments'
  },
  {
    _id: new ObjectID(),
    name: 'desserts & snacks'
  },
  {
    _id: new ObjectID(),
    name: 'beverages'
  },
  {
    _id: new ObjectID(),
    name: 'soup'
  },
  {
    _id: new ObjectID(),
    name: 'dairy alternatives'
  },
  {
    _id: new ObjectID(),
    name: 'legumes'
  },
  {
    _id: new ObjectID(),
    name: 'sauces'
  },
  {
    _id: new ObjectID(),
    name: 'alcohol'
  }
];

const INGREDIENT_CHICKEN_BREAST = 0;
const INGREDIENT_GROUND_BEEF = 1;
const INGREDIENT_BACON = 2;
const INGREDIENT_SAUSAGE = 3;
const INGREDIENT_COOKED_CHICKEN = 4;
const INGREDIENT_HAM = 5;
const INGREDIENT_VEAL = 6;
const INGREDIENT_BEEF_STEAK = 7;
const INGREDIENT_HOT_DOG = 8;
const INGREDIENT_PORK_CHOPS = 9;

const INGREDIENT_BUTTER = 10;
const INGREDIENT_EGGS = 11;
const INGREDIENT_MILK = 12;
const INGREDIENT_PARMESAN = 13;
const INGREDIENT_CHEDDAR = 14;
const INGREDIENT_CREAM = 15;
const INGREDIENT_SOUR_CREAM = 16;
const INGREDIENT_CREAM_CHEESE = 17;
const INGREDIENT_MOZZARELLA = 18;
const INGREDIENT_AMERICAN_CHEESE = 19;

const INGREDIENT_GARLIC = 20;
const INGREDIENT_ONION = 21;
const INGREDIENT_OLIVE = 22;
const INGREDIENT_TOMATO = 23;
const INGREDIENT_POTATO = 24;
const INGREDIENT_SALAD_GREENS = 25;
const INGREDIENT_CARROT = 26;
const INGREDIENT_BASIL = 27;
const INGREDIENT_PARSLEY = 28;
const INGREDIENT_ROSEMARY = 29;

const INGREDIENT_LEMON = 30;
const INGREDIENT_BANANA = 31;
const INGREDIENT_APPLE = 32;
const INGREDIENT_COCONUT = 33;
const INGREDIENT_MANGO = 34;
const INGREDIENT_LIME = 35;
const INGREDIENT_ORANGE = 36;
const INGREDIENT_PINEAPPLE = 37;
const INGREDIENT_STRAWBERRIES = 38;
const INGREDIENT_RAISIN = 39;

const INGREDIENT_RED_PEPPER_FLAKE = 40;
const INGREDIENT_CINNAMON = 41;
const INGREDIENT_CHIVE = 42;
const INGREDIENT_VANILLA = 43;
const INGREDIENT_GARLIC_POWDER = 44;
const INGREDIENT_OREGANO = 45;
const INGREDIENT_PAPRIKA = 46;
const INGREDIENT_CAYENNE = 47;
const INGREDIENT_CHILI_POWDER = 48;
const INGREDIENT_CUMIN = 49;

const INGREDIENT_CANNED_TUNA = 50;
const INGREDIENT_SALMON = 51;
const INGREDIENT_FISH_FILLETS = 52;
const INGREDIENT_TILAPIA = 53;
const INGREDIENT_HADDOCK = 54;
const INGREDIENT_GROUPER = 55;
const INGREDIENT_COD = 56;
const INGREDIENT_FLOUNDER = 57;
const INGREDIENT_ANCHOVIES = 58;
const INGREDIENT_TUNA_STEAK = 59;

const INGREDIENT_WHEAT_GERM = 60;
const INGREDIENT_FLOUR = 61;
const INGREDIENT_RICE = 62;
const INGREDIENT_PASTA = 63;
const INGREDIENT_BREAD = 64;
const INGREDIENT_BAKING_POWDER = 65;
const INGREDIENT_BREAD_FLOUR = 66;
const INGREDIENT_BAKING_SODA = 67;
const INGREDIENT_BREAD_CRUMBS = 68;
const INGREDIENT_CORNSTARCH = 69;

const INGREDIENT_VEGETABLE_OIL = 70;
const INGREDIENT_OLIVE_OIL = 71;
const INGREDIENT_PEANUT_OIL = 72;
const INGREDIENT_COOKING_SPRAY = 73;
const INGREDIENT_SHORTENING = 74;
const INGREDIENT_LARD = 75;
const INGREDIENT_ALMOND_OIL = 76;
const INGREDIENT_GRAPE_SEED_OIL = 77;

const INGREDIENT_SHRIMP = 78;
const INGREDIENT_COCKLE = 79;
const INGREDIENT_CRAWFISH = 80;
const INGREDIENT_CRAB = 81;
const INGREDIENT_SCALLOP = 82;
const INGREDIENT_PRAWNS = 83;
const INGREDIENT_CLAM = 84;
const INGREDIENT_LOBSTER = 85;
const INGREDIENT_OCTOPUS = 86;
const INGREDIENT_CALAMARI = 87;

const INGREDIENT_SUGAR = 88;
const INGREDIENT_HONEY = 89;
const INGREDIENT_CONFECTIONERS_SUGAR = 90;
const INGREDIENT_MAPLE_SYRUP = 91;
const INGREDIENT_SYRUP = 92;
const INGREDIENT_MOLASSES = 93;
const INGREDIENT_CORN_SYRUP = 94;

const INGREDIENT_CREAM_OF_TARTAR = 95;
const INGREDIENT_BOUILLON = 96;
const INGREDIENT_GROUND_GINGER = 97;
const INGREDIENT_SESAME_SEED = 98;
const INGREDIENT_APPLE_CIDER = 99;
const INGREDIENT_CHILI_SAUCE = 100;
const INGREDIENT_LIQUID_SMOKE = 101;
const INGREDIENT_BALSAMIC_GLAZE = 102;
const INGREDIENT_HOISIN_SAUCE = 103;
const INGREDIENT_VEGETABLE_BOUILLON = 104;

const INGREDIENT_PEANUT_BUTTER = 105;
const INGREDIENT_CHESTNUT = 106;
const INGREDIENT_ALMOND = 107;
const INGREDIENT_CASHEW = 108;
const INGREDIENT_WALNUT = 109;
const INGREDIENT_PEANUT = 110;
const INGREDIENT_PECAN = 111;
const INGREDIENT_FLAX = 112;
const INGREDIENT_PINUT = 113;
const INGREDIENT_PISTACHIO = 114;

const INGREDIENT_MAYONNAISE = 115;
const INGREDIENT_MUSTARD = 116;
const INGREDIENT_KETCHUP = 117;
const INGREDIENT_VINEGAR = 118;
const INGREDIENT_BALSAMIC_VINEGAR = 119;
const INGREDIENT_WINE_VINEGAR = 120;
const INGREDIENT_CIDER_VINEGAR = 121;
const INGREDIENT_RICE_VINEGAR = 122;
const INGREDIENT_MIRIN = 123;
const INGREDIENT_APPLE_CIDER_VINEGAR = 124;

const INGREDIENT_CHOCOLATE = 125;
const INGREDIENT_APPLE_SAUCE = 126;
const INGREDIENT_GRAHAM_CRACKER = 127;
const INGREDIENT_MARSHMALLOW = 128;
const INGREDIENT_POTATO_CHIPS = 129;
const INGREDIENT_PUDDING_MIX = 130;
const INGREDIENT_CHOCOLATE_MORSELS = 131;
const INGREDIENT_BITTERSWEET_CHOCOLATE = 132;
const INGREDIENT_COOKIE_DOUGH = 133;
const INGREDIENT_CHOCOLATE_SYRUP = 134;

const INGREDIENT_APPLE_JUICE = 135;
const INGREDIENT_COFFEE = 136;
const INGREDIENT_ORANGE_JUICE = 137;
const INGREDIENT_TEA = 138;
const INGREDIENT_ESPRESSO = 139;
const INGREDIENT_TOMATO_JUICE = 140;
const INGREDIENT_GREEN_TEA = 141;
const INGREDIENT_CRANBERRY_JUICE = 142;
const INGREDIENT_COKE = 143;
const INGREDIENT_LEMONADE = 144;

const INGREDIENT_CHICKEN_BROTH = 145;
const INGREDIENT_MUSHROOM_SOUP = 146;
const INGREDIENT_BEEF_BROTH = 147;
const INGREDIENT_TOMATO_SOUP = 148;
const INGREDIENT_VEGETABLE_STOCK = 149;
const INGREDIENT_CHICKEN_SOUP = 150;
const INGREDIENT_CELERY_SOUP = 151;
const INGREDIENT_ONION_SOUP = 152;
const INGREDIENT_VEGETABLE_SOUP = 153;
const INGREDIENT_DASHI = 154;

const INGREDIENT_SOY_MILK = 155;
const INGREDIENT_ALMOND_MILK = 156;
const INGREDIENT_COCONUT_MILK = 157;
const INGREDIENT_HEMP_MILK = 158;

const INGREDIENT_PEAS = 159;
const INGREDIENT_BLACK_BEANS = 160;
const INGREDIENT_CHICKPEA = 161;
const INGREDIENT_LENTIL = 162;
const INGREDIENT_HUMMUS = 163;
const INGREDIENT_SOYBEANS = 164;
const INGREDIENT_PINTO_BEANS = 165;
const INGREDIENT_CANNELLINI_BEANS = 166;
const INGREDIENT_NAVY_BEANS = 167;
const INGREDIENT_KIDNEY_BEANS = 168;

const INGREDIENT_TOMATO_SAUCE = 169;
const INGREDIENT_TOMATO_PASTE = 170;
const INGREDIENT_CHICKEN_GRAVY = 171;
const INGREDIENT_PESTO = 172;
const INGREDIENT_BEEF_GRAVY = 173;
const INGREDIENT_ALFREDO_SAUCE = 174;
const INGREDIENT_CURRY_PASTE = 175;

const INGREDIENT_LIQUEUR = 176;
const INGREDIENT_WHISKEY = 177;
const INGREDIENT_BEER = 178;
const INGREDIENT_WHITE_WINE = 179;
const INGREDIENT_RED_WINE = 180;
const INGREDIENT_CHAMPAGNE = 181;
const INGREDIENT_RUM = 182;
const INGREDIENT_FRANGELICO = 183;
const INGREDIENT_BRANDY = 184;
const INGREDIENT_VODKA = 185;

const ingredients = [
  {
    _id: new ObjectID(),
    name: 'chicken breast',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'ground beef',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'bacon',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },

  {
    _id: new ObjectID(),
    name: 'sausage',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'cooked chicken',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'ham',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'veal',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'beef steak',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'hot dog',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'pork chops',
    categoryID: categories[CATEGORY_MEATS]._id,
    categoryName: categories[CATEGORY_MEATS].name
  },
  {
    _id: new ObjectID(),
    name: 'butter',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'eggs',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'milk',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'parmesan',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'cheddar',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'cream',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'sour cream',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'cream cheese',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'mozzarella',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'american cheese',
    categoryID: categories[CATEGORY_DAIRY]._id,
    categoryName: categories[CATEGORY_DAIRY].name
  },
  {
    _id: new ObjectID(),
    name: 'garlic',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'onion',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'olive',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'tomato',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'potato',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'salad greens',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'carrot',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'basil',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'parsley',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'rosemary',
    categoryID: categories[CATEGORY_VEGETABLES]._id,
    categoryName: categories[CATEGORY_VEGETABLES].name
  },
  {
    _id: new ObjectID(),
    name: 'lemon',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'banana',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'apple',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'coconut',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'mango',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'lime',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'orange',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'pineapple',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'strawberries',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'raisin',
    categoryID: categories[CATEGORY_FRUITS]._id,
    categoryName: categories[CATEGORY_FRUITS].name
  },
  {
    _id: new ObjectID(),
    name: 'red pepper flake',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'cinnamon',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'chive',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'vanilla',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'garlic powder',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'oregano',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'paprika',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'cayenne',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'chili powder',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'cumin',
    categoryID: categories[CATEGORY_SPICES]._id,
    categoryName: categories[CATEGORY_SPICES].name
  },
  {
    _id: new ObjectID(),
    name: 'canned tuna',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'salmon',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'fish fillets',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'tilapia',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'haddock',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'grouper',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'cod',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'flounder',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'anchovies',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'tuna steak',
    categoryID: categories[CATEGORY_FISH]._id,
    categoryName: categories[CATEGORY_FISH].name
  },
  {
    _id: new ObjectID(),
    name: 'wheat germ',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'flour',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'rice',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'pasta',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'bread',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'baking powder',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'bread flour',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'baking soda',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'bread crumbs',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'cornstarch',
    categoryID: categories[CATEGORY_BAKING_GRAINS]._id,
    categoryName: categories[CATEGORY_BAKING_GRAINS].name
  },
  {
    _id: new ObjectID(),
    name: 'vegetable oil',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'olive oil',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'peanut oil',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'cooking spray',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'shortening',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'lard',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'almond oil',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
   {
    _id: new ObjectID(),
    name: 'grape seed oil',
    categoryID: categories[CATEGORY_OILS]._id,
    categoryName: categories[CATEGORY_OILS].name
  },
  {
    _id: new ObjectID(),
    name: 'shrimp',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'cockle',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'crawfish',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'crab',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'scallop',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'prawns',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'clam',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'lobster',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'octopus',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'calamari',
    categoryID: categories[CATEGORY_SEA_FOOD]._id,
    categoryName: categories[CATEGORY_SEA_FOOD].name
  },
  {
    _id: new ObjectID(),
    name: 'sugar',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'honey',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'confectioners sugar',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'maple syrup',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'syrup',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'molasses',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'corn syrup',
    categoryID: categories[CATEGORY_ADDED_SWEETENERS]._id,
    categoryName: categories[CATEGORY_ADDED_SWEETENERS].name
  },
  {
    _id: new ObjectID(),
    name: 'cream of tartar',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'bouillon',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'ground ginger',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'sesame seed',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'apple cider',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'chili sauce',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'liquid smoke',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'balsamic glaze',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'hoisin sauce',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'vegetable bouillon',
    categoryID: categories[CATEGORY_SEASONINGS]._id,
    categoryName: categories[CATEGORY_SEASONINGS].name
  },
  {
    _id: new ObjectID(),
    name: 'peanut butter',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'chestnut',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'almond',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'cashew',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'walnut',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'peanut',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'pecan',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'flax',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'pine nut',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'pistachio',
    categoryID: categories[CATEGORY_NUTS]._id,
    categoryName: categories[CATEGORY_NUTS].name
  },
  {
    _id: new ObjectID(),
    name: 'mayonnaise',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'mustard',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'ketchup',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'balsamic vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'wine vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'cider vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'rice vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'mirin',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'apple cider vinegar',
    categoryID: categories[CATEGORY_CONDIMENTS]._id,
    categoryName: categories[CATEGORY_CONDIMENTS].name
  },
  {
    _id: new ObjectID(),
    name: 'chocolate',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'apple sauce',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'graham cracker',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'marshmallow',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'potato chips',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'pudding mix',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'chocolate morsels',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'bittersweet chocolate',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'cookie dough',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'chocolate syrup',
    categoryID: categories[CATEGORY_DESSERTS_SNACKS]._id,
    categoryName: categories[CATEGORY_DESSERTS_SNACKS].name
  },
  {
    _id: new ObjectID(),
    name: 'apple juice',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'coffee',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'orange juice',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'tea',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'espresso',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'tomato juice',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'green tea',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'cranberry juice',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'coke',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'lemonade',
    categoryID: categories[CATEGORY_BEVERAGES]._id,
    categoryName: categories[CATEGORY_BEVERAGES].name
  },
  {
    _id: new ObjectID(),
    name: 'chicken broth',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'mushroom soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'beef broth',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'tomato soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'vegetable stock',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'chicken soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'celery soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'onion soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'vegetable soup',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'dashi',
    categoryID: categories[CATEGORY_SOUP]._id,
    categoryName: categories[CATEGORY_SOUP].name
  },
  {
    _id: new ObjectID(),
    name: 'soy milk',
    categoryID: categories[CATEGORY_DAIRY_ALTERNATIVES]._id,
    categoryName: categories[CATEGORY_DAIRY_ALTERNATIVES].name
  },
  {
    _id: new ObjectID(),
    name: 'almond milk',
    categoryID: categories[CATEGORY_DAIRY_ALTERNATIVES]._id,
    categoryName: categories[CATEGORY_DAIRY_ALTERNATIVES].name
  },
  {
    _id: new ObjectID(),
    name: 'coconut milk',
    categoryID: categories[CATEGORY_DAIRY_ALTERNATIVES]._id,
    categoryName: categories[CATEGORY_DAIRY_ALTERNATIVES].name
  },
  {
    _id: new ObjectID(),
    name: 'hemp milk',
    categoryID: categories[CATEGORY_DAIRY_ALTERNATIVES]._id,
    categoryName: categories[CATEGORY_DAIRY_ALTERNATIVES].name
  },
  {
    _id: new ObjectID(),
    name: 'peas',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'black beans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'chickpea',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'lentil',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'hummus',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'soybeans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'pinto beans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'cannellini beans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'navy beans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'kidney beans',
    categoryID: categories[CATEGORY_LEGUMES]._id,
    categoryName: categories[CATEGORY_LEGUMES].name
  },
  {
    _id: new ObjectID(),
    name: 'tomato sauce',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'tomato paste',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'chicken gravy',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'pesto',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'beef gravy',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'alfredo sauce',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'curry paste',
    categoryID: categories[CATEGORY_SAUCES]._id,
    categoryName: categories[CATEGORY_SAUCES].name
  },
  {
    _id: new ObjectID(),
    name: 'liquer',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'whiskey',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'beer',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'white wine',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'red wine',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'champagne',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'rum',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'frangelico',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'brandy',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  },
  {
    _id: new ObjectID(),
    name: 'vodka',
    categoryID: categories[CATEGORY_ALCOHOL]._id,
    categoryName: categories[CATEGORY_ALCOHOL].name
  }
];

const recipes = [
  {
    _id: new ObjectID(),
    name: "Barefoot Contessa's Oven Roasted Bacon",
    description: "This is the best way to cook bacon. It cooks more evenly this way and more importantly, it requires little attention. The most wonderful part is you don't have grease spatters on your stove!",
    image: {
      _id: 'd2syxoq3xatkj516r3wb',
      versionId: 'v1491336195',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[INGREDIENT_BACON]._id,
        quantity: "300g",
        name: ingredients[INGREDIENT_BACON].name
      }
    ],
    cookingTime: 22,
    numOfMeals: 4,
    instructions: [
      'Preheat oven to 400 degrees Fahrenheit',
      'Place a sheet of parchment paper on a sheet pan',
      'Lay the bacon on top of the parchment paper',
      'Bake for 15 to 20 mins until the bacon is really crispy',
      'Drain on paper towels and server'
    ],
    numOfLikes: 2000,
    numOfDislikes: 50
  },
  {
    _id: new ObjectID(),
    name: "Captain Blue's Grill-Roasted Onions",
    description: "The onion, steamed in its own juices, comes out very mild and sweet. Prep time refers to the slicing time after they're done cooking. And, careful, they're slippery...",
    image: {
      _id: 'yktrqrqsmlrf2ct5eca2',
      versionId: 'v1491336210',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[INGREDIENT_ONION]._id,
        quantity: "1",
        name: ingredients[INGREDIENT_ONION].name
      }
    ],
    cookingTime: 35,
    numOfMeals: 2,
    instructions: [
      'Place the onions on BBQ grill',
      'Roast 30 minutes- gas grill, middle shelf; charcoal, indirect heat.',
      'Remove from grill onto disposable surface (there will be lots of carbon), cut the bottom off the onion and the soft, steamed interior should come out easily, leaving behind the charred skin layers.',
      'Remove to clean plate.',
      'Slice/ chop the onions and toss with seasonings.',
      '(We serve them over buttered baked potatoes and top with grated cheddar cheese, fresh ground pepper and Tabasco. We stick a clean, food-use-only non-anodized aluminum nail or tent stake through the stem / tail ends of the onion before it goes on the grill. We find that it helps with even heat distribution - it works great for potatoes too.)'
    ],
    numOfLikes: 765,
    numOfDislikes: 30
  },
  {
    _id: new ObjectID(),
    name: 'Boiled Eggs',
    description: 'These Hard boiled eggs taste great and are a good accompaniment to salads and appetizers',
    image: {
      _id: 'c23rhh7jdphrv9srea8a',
      versionId: 'v1491336203',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[INGREDIENT_EGGS]._id,
        quantity: "6",
        name: ingredients[INGREDIENT_EGGS].name
      }
    ],
    cookingTime: 15,
    numOfMeals: 3,
    instructions: [
      'Place the eggs in a medium saucepan and cover with room temperature water',
      'Bring the eggs to a boil, remove from the heat and let sit for 8 minutes',
      'Shock the eggs in cold water to stop the cooking and shrink the egg from the shell'
    ],
    numOfLikes: 527,
    numOfDislikes: 10
  },
  {
    _id: new ObjectID(),
    name: 'Chive Oil',
    description: 'Flavored oils are a great way to add extra punch to all sorts of dishes, but store-bought bottles tend to be pretty pricey and, when bought for specific recipes, can often end up gathering dust',
    image: {
      _id: 'swe1h5phbi1g2bljbthc',
      versionId: 'v1491336217',
      imageType: 'png'
    },
    ingredients: [
      {
        _id: ingredients[INGREDIENT_CHIVE]._id,
        quantity: "120g",
        name: ingredients[INGREDIENT_CHIVE].name
      },
      {
        _id: ingredients[INGREDIENT_OLIVE_OIL]._id,
        quantity: "300g",
        name: ingredients[INGREDIENT_OLIVE_OIL].name
      }
    ],
    cookingTime: 20,
    numOfMeals: 2,
    instructions: [
      'Set a coffee filter in a sieve set over a heatproof measuring cup or bowl',
      'Purée chives and oil in a blender until well blended. Transfer to a small saucepan and cook over medium-high heat, stirring occasionally, until mixture is sizzling, about 3 minutes',
      'Remove chive oil from heat and strain though prepared sieve (do not press on solids or oil will be cloudy); let cool'
    ],
    numOfLikes: 800,
    numOfDislikes: 79
  }
];

const users = [
  {
    _id: new ObjectID(),
    email: 'var-ingredient@mail.joehub.fi',
    password: bcrypt.hashSync('var-ingredient', salt),
    favoriteRecipes: [
      {
        _id: recipes[0]._id,
        name: recipes[0].name
      },
      {
        _id: recipes[1]._id,
        name: recipes[1].name
      }
    ],
    ingredients: [
      {
        _id: ingredients[0]._id,
        name: ingredients[0].name
      },
      {
        _id: ingredients[1]._id,
        name: ingredients[1].name
      }
    ],
    isAdmin: true
  },
  {
    _id: new ObjectID(),
    email: 'tdungnguyenaa@gmail.com',
    password: bcrypt.hashSync('test2', salt),
    favoriteRecipes: [
      {
        _id: recipes[2]._id,
        name: recipes[2].name
      },
      {
        _id: recipes[3]._id,
        name: recipes[3].name
      }
    ],
    ingredients: [
      {
        _id: ingredients[2]._id,
        name: ingredients[2].name
      },
      {
        _id: ingredients[3]._id,
        name: ingredients[3].name
      }
    ]
  }
];

const populateRecipes = (done) => {
  Recipe.remove({}).then(() => {
    return Recipe.insertMany(recipes);
  }).then(() => done());
};

const populateIngredients = (done) => {
  Ingredient.remove({}).then(() => {
    return Ingredient.insertMany(ingredients);
  }).then(() => done());
};

const populateCategories = (done) => {
  Category.remove({}).then(() => {
    return Category.insertMany(categories);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
};

module.exports = {
  recipes,
  ingredients,
  users,
  categories,
  populateCategories,
  populateIngredients,
  populateRecipes,
  populateUsers
};
