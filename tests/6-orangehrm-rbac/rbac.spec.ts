import { test, expect } from '../fixtures/orangeHRM.fixture';
import { env } from '../../src/config/env';

test.describe.configure({ timeout: 200000 });

test.describe.serial('RBAC Tests', () => {
	test.beforeEach(async ({ orangeHRMLoginPage, orangeHRMAdminPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
		await orangeHRMAdminPage.adminTab.click();
		for (const testUser of env.testUsers) {
			await orangeHRMAdminPage.addUser(
				testUser.role,
				testUser.status,
				testUser.username,
				testUser.password
			);
			await expect(orangeHRMAdminPage.userCreationNotificationSuccess).toBeVisible({ timeout: 10000 });
			await orangeHRMAdminPage.adminTab.click();
		}
		await orangeHRMLoginPage.logout();
	});

	test.afterEach(async ({ orangeHRMLoginPage, orangeHRMAdminPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
		await orangeHRMAdminPage.adminTab.click();
		for (const testUser of env.testUsers) {
			await orangeHRMAdminPage.deleteUser(testUser.username);
		}
		await orangeHRMLoginPage.logout();
	});

	test('Admin user creation Successfull', async ({ orangeHRMLoginPage, orangeHRMAdminPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.testUsers[0].username, env.testUsers[0].password);
		await orangeHRMAdminPage.adminTab.click();
		await orangeHRMAdminPage.addUser(
			'Admin',
			'Enabled',
			'newAdminUser',
			'Password123!'
		);
		await expect(orangeHRMAdminPage.userCreationNotificationSuccess).toBeVisible({timeout: 10000});
		await orangeHRMLoginPage.logout();
	});

	test('Admin user deletion Successfull', async ({ orangeHRMLoginPage, orangeHRMAdminPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.testUsers[0].username, env.testUsers[0].password);
		await orangeHRMAdminPage.adminTab.click();
		await orangeHRMAdminPage.deleteUser('newAdminUser');
		await orangeHRMLoginPage.logout();
	});

	test('ESS attempts to access the administration section without success.', async ({ orangeHRMLoginPage, orangeHRMESSPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.testUsers[1].username, env.testUsers[1].password);
		await expect(orangeHRMESSPage.adminTab).toHaveCount(0);
		await orangeHRMLoginPage.logout();
	});

	test('ESS Buzz creation Successfull', async ({ orangeHRMLoginPage, orangeHRMESSPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.testUsers[1].username, env.testUsers[1].password);
		await orangeHRMESSPage.gotoBuzz();
		await orangeHRMESSPage.createBuzzPost();
		await expect(orangeHRMESSPage.notificationSuccess).toBeVisible({ timeout: 10000 });
		const currentUserName = await orangeHRMESSPage.getCurrentNameUser();
		await expect(orangeHRMESSPage.buzzPostNameAuthor(currentUserName)).toBeVisible();
		await expect(orangeHRMESSPage.buzzPostTextContent).toBeVisible();
		await expect(orangeHRMESSPage.buzzPostImageContent).toBeVisible();
		await orangeHRMLoginPage.logout();
	});

	test('ESS Buzz deletion Successfull', async ({ orangeHRMLoginPage, orangeHRMESSPage }) => {
		await orangeHRMLoginPage.goto(env.apiUrl);
		await orangeHRMLoginPage.login(env.testUsers[1].username, env.testUsers[1].password);
		await orangeHRMESSPage.gotoBuzz();
		await orangeHRMESSPage.deleteBuzzPost();
		await expect(orangeHRMESSPage.notificationBuzzDeleted).toBeVisible({ timeout: 10000 });
		await orangeHRMLoginPage.logout();
	});
});



