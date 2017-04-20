const axios = require('axios');

// const HOST_URL = 'https://var-ingredient.joehub.fi';
const HOST_URL = 'http://localhost:8765';

// RECIPE ACTION TYPES
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const GET_RECIPE_QUERY_INGREDIENT = 'GET_RECIPE_QUERY_INGREDIENT';
export const GET_TOP_THREE_RECIPES = 'GET_TOP_THREE_RECIPES';
export const POST_RECIPE = 'POST_RECIPE';
export const POST_RECIPE_ID_INCREASE_LIKE = 'POST_RECIPE_ID_INCREASE_LIKE';
export const POST_RECIPE_ID_DECREASE_LIKE = 'POST_RECIPE_ID_DECREASE_LIKE';
export const POST_RECIPE_ID_INCREASE_DISLIKE = 'POST_RECIPE_ID_INCREASE_DISLIKE';
export const POST_RECIPE_ID_DECREASE_DISLIKE = 'POST_RECIPE_ID_DECREASE_DISLIKE';

// INGREDIENT ACTION TYPES
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENT_ID = 'GET_INGREDIENT_ID';
export const POST_INGREDIENT = 'POST_INGREDIENT';
export const ADD_QUERY_INGREDIENTS = 'ADD_QUERY_INGREDIENTS';
export const REMOVE_QUERY_INGREDIENT = 'REMOVE_QUERY_INGREDIENT';
export const CLEAR_QUERY_INGREDIENTS = 'CLEAR_QUERY_INGREDIENTS';
export const SET_SORT_KEY = 'SET_SORT_KEY';

// CATEGORY ACTION TYPES
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_ID = 'GET_CATEGORY_ID';
export const GET_CATEGORY_ID_INGREDIENTS = 'GET_CATEGORY_ID_INGREDIENTS';
export const POST_CATEGORY = 'POST_CATEGORY';

// USER ACTION TYPES
export const GET_USERS = 'GET_USERS';
export const GET_USER_ID_FAVORITE_RECIPES = 'GET_USER_ID_FAVORITE_RECIPES';
export const GET_USER_ID_INGREDIENTS = 'GET_USER_ID_INGREDIENTS';
export const POST_USER_ID_FAVORITE_RECIPE = 'POST_USER_ID_FAVORITE_RECIPE';
export const POST_USER_ID_INGREDIENT = 'POST_USER_ID_INGREDIENT';
export const POST_USER = 'POST_USER';

// RECIPE ACTIONS
export function getRecipes() {
  const request = axios.get(`${HOST_URL}/api/recipes`);

  return {
    type: GET_RECIPES,
    payload: request
  };
}

export function getRecipeWithId(id) {
  const request = axios.get(`${HOST_URL}/api/recipe/${id}`);

  return {
    type: GET_RECIPE_ID,
    payload: request
  };
}

export function getSortedRecipesWithIngredients(ingredients, sortKey, skip, limit) {
  const request = axios.get(`${HOST_URL}/api/recipe?ingredients=${ingredients.toString()}&sort=${sortKey}&skip=${skip}&limit=${limit}`);

  return {
    type: GET_RECIPE_QUERY_INGREDIENT,
    payload: request
  };
}

export function getTopThreeRecipes() {
  const request = axios.get(`${HOST_URL}/api/recipes?sort=numOfLikes`);

  return {
    type: GET_TOP_THREE_RECIPES,
    payload: request
  };
}

// INGREDIENT ACTIONS
export function getIngredients() {
  const request = axios.get(`${HOST_URL}/api/ingredients`);

  return {
    type: GET_INGREDIENTS,
    payload: request
  };
}

export function getIngredientWithId(id) {
  const request = axios.get(`${HOST_URL}/api/ingredient/${id}`);

  return {
    type: GET_INGREDIENT_ID,
    payload: request
  };
}

export function addQueryIngredients(...ingredients) {
  return {
    type: ADD_QUERY_INGREDIENTS,
    payload: ingredients
  };
}

export function removeQueryIngredient(ingredient) {
  return {
    type: REMOVE_QUERY_INGREDIENT,
    payload: ingredient
  };
}

export function clearQueryIngredients() {
  return {
    type: CLEAR_QUERY_INGREDIENTS
  };
}

export function setSortKey(sortKey) {
  return {
    type: SET_SORT_KEY,
    payload: sortKey
  };
}

// CATEGORY ACTIONS
export function getCategories() {
  const request = axios.get(`${HOST_URL}/api/categories`);

  return {
    type: GET_CATEGORIES,
    payload: request
  };
}

export function getCategoryWithId(id) {
  const request = axios.get(`${HOST_URL}/api/category/${id}`);

  return {
    type: GET_CATEGORY_ID,
    payload: request
  };
}

export function getIngredientsInCategoryWithId(categoryId) {
  const request = axios.get(`${HOST_URL}/api/category/${categoryId}/ingredients`);

  return {
    type: GET_CATEGORY_ID_INGREDIENTS,
    payload: request
  };
}

// USER ACTIONS
export function getUsers() {
  const request = axios.get(`${HOST_URL}/api/users`);

  return {
    type: GET_USERS,
    payload: request
  };
}

export function getUserFavoriteRecipesWithId(userId) {
  const request = axios.get(`${HOST_URL}/api/user/${userId}/favoriteRecipes`);

  return {
    type: GET_USER_ID_FAVORITE_RECIPES,
    payload: request
  };
}

export function getUserIngredientsWithId(userId) {
  const request = axios.get(`${HOST_URL}/api/user/${userId}/ingredients`);

  return {
    type: GET_USER_ID_INGREDIENTS,
    payload: request
  };
}

