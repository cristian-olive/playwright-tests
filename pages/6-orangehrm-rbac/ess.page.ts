import { Page, expect } from '@playwright/test';
import * as path from 'path';

export class OrangeHRMESSPage {
    constructor(private page: Page) {}

    readonly adminTab = this.page.getByRole('link', { name: 'Admin' });
    readonly buzzTab = this.page.getByRole('link', { name: 'Buzz' });
    readonly sharePhotosButton = this.page.getByRole('button', { name: 'Share Photos' });
    readonly inputBuzzPost = this.page.getByRole('dialog').getByRole('textbox', { name: 'What\'s on your mind?' });
    readonly inputBuzzImage = this.page.locator('.oxd-file-input');
    readonly shareBuzzButton = this.page.getByRole('button', { name: 'Share', exact: true });
    readonly notificationSuccess = this.page.getByText('SuccessSuccessfully Saved×');
    readonly buzzPostTextContent = this.page.getByText('QA Message test').first();
    readonly buzzPostImageContent = this.page.locator('.orangehrm-buzz-post-body-picture').first();
    readonly buzzPostOptions = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
    readonly buzzPostOptionDelete = this.page.getByRole('menu').getByRole('listitem').filter({ hasText: 'Delete Post' }); 
    readonly confirmDeleteButton = this.page.getByRole('button', { name: ' Yes, Delete' });
    readonly notificationBuzzDeleted = this.page.getByText('SuccessSuccessfully Deleted×');

    async getCurrentNameUser(): Promise<string> {
        return (await this.page.locator('.oxd-userdropdown-name').textContent()) ?? '';
    }

    buzzPostNameAuthor(name: string) {
        return this.page.getByText(name).first();
    }


    async gotoBuzz() {
        await this.buzzTab.click();
    }

    async createBuzzPost() {
        await this.sharePhotosButton.click();
        await this.inputBuzzPost.fill('QA Message test');
        await this.inputBuzzImage.setInputFiles(path.resolve(__dirname, '../../src/images/PW.png'));
        await this.shareBuzzButton.click();
    }

    async deleteBuzzPost() {
        await this.buzzPostOptions.click();
        await this.buzzPostOptionDelete.click();
        await this.confirmDeleteButton.click();
    }
}