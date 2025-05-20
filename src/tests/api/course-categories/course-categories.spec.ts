import { test, expect } from '@playwright/test';
import { CourseCategoriesAPI } from '../../../api/course-categories/course-categories.api';
import { CourseCategory } from '../../../data-type/course-category.type';
import categoriesData from '../../../tests-data/course-categories-data.json';
import { apiFixture } from '../../../core/fixture/fixture-api';

let courseCategoriesAPI: CourseCategoriesAPI;
let token: string;
let createdCategoryId: string;

test.beforeAll(async ({ baseURL }) => {
  const fixture = await apiFixture();
  token = fixture.token;
  courseCategoriesAPI = new CourseCategoriesAPI(baseURL!);
});

test.describe('Course Categories API Tests', () => {

  test('SYP_CC001 - Get all course categories with default pagination', async () => {
    // Act
    const response = await courseCategoriesAPI.getCategories(token);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    
    // Verify structure of first category
    const firstCategory = responseBody[0];
    expect(firstCategory).toHaveProperty('id');
    expect(firstCategory).toHaveProperty('name');
    expect(firstCategory).toHaveProperty('description');
    expect(firstCategory).toHaveProperty('courseCount');
    expect(firstCategory).toHaveProperty('isActive');
  });

  test('SYP_CC002 - Get course categories with pagination and search', async () => {
    // Arrange
    const query = categoriesData.testQueries[1]; // Using Software search query

    // Act
    const response = await courseCategoriesAPI.getCategories(token, query);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBeTruthy();
    
    // If results found, verify they contain the search term
    if (responseBody.length > 0) {
      const hasMatch = responseBody.some((category: CourseCategory) => 
        category.name.includes(query.search!) || 
        category.description.includes(query.search!)
      );
      expect(hasMatch).toBeTruthy();
    }
  });

  test('SYP_CC003 - Create a new course category', async () => {
    // Arrange
    const newCategory = categoriesData.validCategory;

    // Act
    const response = await courseCategoriesAPI.createCategory(token, newCategory);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toBe(newCategory.name);
    expect(responseBody.description).toBe(newCategory.description);
    expect(responseBody.isActive).toBe(newCategory.isActive);
    
    // Save the created category ID for future tests
    createdCategoryId = responseBody.id;
  });

  test('SYP_CC004 - Get a specific course category by ID', async () => {
    // Skip if no category was created
    test.skip(!createdCategoryId, 'No category ID available to test');

    // Act
    const response = await courseCategoriesAPI.getCategoryById(token, createdCategoryId);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(createdCategoryId);
    expect(responseBody.name).toBe(categoriesData.validCategory.name);
    expect(responseBody.description).toBe(categoriesData.validCategory.description);
  });

  test('SYP_CC005 - Update a course category', async () => {
    // Skip if no category was created
    test.skip(!createdCategoryId, 'No category ID available to test');

    // Arrange
    const updatedCategory = categoriesData.updatedCategory;

    // Act
    const response = await courseCategoriesAPI.updateCategory(token, createdCategoryId, updatedCategory);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(createdCategoryId);
    expect(responseBody.name).toBe(updatedCategory.name);
    expect(responseBody.description).toBe(updatedCategory.description);
  });

  test('SYP_CC006 - Try to get a non-existent category', async () => {
    // Act
    const response = await courseCategoriesAPI.getCategoryById(token, categoriesData.categoryIds.invalid);

    // Assert
    expect(response.status()).not.toBe(200);
  });

  test('SYP_CC007 - Try to create a category with invalid data', async () => {
    // Arrange
    const invalidCategory = categoriesData.invalidCategory;

    // Act
    const response = await courseCategoriesAPI.createCategory(token, invalidCategory);

    // Assert
    expect(response.status()).not.toBe(200);
  });

  test('SYP_CC008 - Delete a course category', async () => {
    // Skip if no category was created
    test.skip(!createdCategoryId, 'No category ID available to test');

    // Act
    const response = await courseCategoriesAPI.deleteCategory(token, createdCategoryId);

    // Assert
    expect(response.status()).toBe(200);

    // Verify deletion by trying to fetch the deleted category
    const getResponse = await courseCategoriesAPI.getCategoryById(token, createdCategoryId);
    expect(getResponse.status()).not.toBe(200);
  });

  test('SYP_CC009 - Get course categories with invalid pagination parameters', async () => {
    // Arrange
    const invalidQuery = categoriesData.testQueries[3]; // Using invalid pagination parameters

    // Act
    const response = await courseCategoriesAPI.getCategories(token, invalidQuery);

    // Assert - should either return an error or default to valid pagination
    if (response.status() === 200) {
      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBeTruthy();
    } else {
      expect(response.status()).not.toBe(500); // Should not cause a server error
    }
  });
});