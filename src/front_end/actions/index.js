import axios from 'axios';

import { HOST_URL } from './../../back_end/config/keyConfig';
// const HOST_URL = 'https://var-ingredient.joehub.fi';
// const HOST_URL = 'http://localhost:8765';

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
export const GET_USER = 'GET_USER';
export const GET_USER_ID_FAVORITE_RECIPES = 'GET_USER_ID_FAVORITE_RECIPES';
export const GET_USER_ID_INGREDIENTS = 'GET_USER_ID_INGREDIENTS';
export const POST_USER_ID_FAVORITE_RECIPE = 'POST_USER_ID_FAVORITE_RECIPE';
export const POST_USER_ID_INGREDIENT = 'POST_USER_ID_INGREDIENT';
export const DELETE_USER_ID_FAVORITE_RECIPE = 'DELETE_USER_ID_FAVORITE_RECIPE';
export const DELETE_USER_ID_INGREDIENT = 'DELETE_USER_ID_INGREDIENT';
export const POST_USER = 'POST_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LIKE_RECIPE = 'LIKE_RECIPE';
export const UNLIKE_RECIPE = 'UNLIKE_RECIPE';
export const DISLIKE_RECIPE = 'DISLIKE_RECIPE';
export const UNDISLIKE_RECIPE = 'UNDISLIKE_RECIPE';

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
  const request = axios.get(`${HOST_URL}/api/recipes?sort=numOfLikes&limit=3`);

  return {
    type: GET_TOP_THREE_RECIPES,
    payload: request
  };
}

export function postRecipe(image, recipe) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('recipe', JSON.stringify(recipe));

  const request = axios.post(`${HOST_URL}/api/recipe`, formData);

  return {
    type: POST_RECIPE,
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

export function postIngredient(ingredientName, categoryID) {
  const request = axios.post(`${HOST_URL}/api/ingredient`, { name: ingredientName, categoryID });

  return {
    type: POST_INGREDIENT,
    payload: request
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

export function postCategory(categoryName) {
  const request = axios.post(`${HOST_URL}/api/category`, { name: categoryName });

  return {
    type: POST_CATEGORY,
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

export function getUser() {
  const request = axios.get(`${HOST_URL}/api/user`);

  return {
    type: GET_USER,
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

export function postUser({ email, password }) {
  const request = axios.post(`${HOST_URL}/api/user/v2`, { email, password });

  return {
    type: POST_USER,
    payload: request
  };
}

export function login({ email, password }) {
  const request = axios.post(`${HOST_URL}/auth/login`, { email, password });

  return {
    type: LOGIN,
    payload: request
  };
}

export function likeRecipe(userId, recipeId) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/likeRecipe`, { _id: recipeId });

  return {
    type: LIKE_RECIPE,
    payload: request
  };
}

export function unlikeRecipe(userId, recipeId) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/unlikeRecipe`, { _id: recipeId });

  return {
    type: UNLIKE_RECIPE,
    payload: request
  };
}

export function dislikeRecipe(userId, recipeId) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/dislikeRecipe`, { _id: recipeId });

  return {
    type: DISLIKE_RECIPE,
    payload: request
  };
}

export function undislikeRecipe(userId, recipeId) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/undislikeRecipe`, { _id: recipeId });

  return {
    type: UNDISLIKE_RECIPE,
    payload: request
  };
}

export function deleteUserIngredient(userId, ingredientId) {
  const request = axios.delete(`${HOST_URL}/api/user/${userId}/ingredient/${ingredientId}`);

  return {
    type: DELETE_USER_ID_INGREDIENT,
    payload: request
  };
}

export function deleteUserFavoriteRecipe(userId, recipeId) {
  const request = axios.delete(`${HOST_URL}/api/user/${userId}/favoriteRecipe/${recipeId}`);

  return {
    type: DELETE_USER_ID_FAVORITE_RECIPE,
    payload: request
  };
}

export function postUserIngredient(userId, ingredientId, ingredientName) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/ingredient`, { _id: ingredientId, name: ingredientName });

  return {
    type: POST_USER_ID_INGREDIENT,
    payload: request
  };
}

export function postUserFavoriteRecipe(userId, recipeId, recipeName) {
  const request = axios.post(`${HOST_URL}/api/user/${userId}/favoriteRecipe`, { _id: recipeId, name: recipeName });

  return {
    type: POST_USER_ID_FAVORITE_RECIPE,
    payload: request
  };
}

export function logout() {
  const request = axios.get(`${HOST_URL}/auth/logout`);

  return {
    type: LOGOUT,
    payload: request
  };
}
