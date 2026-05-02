import {test, expect} from '@playwright/test';
import {DragAndDropPage} from '../../pages/3-qabrains-pom/3-drag-and-drop.page';

test('Drag and drop test', async ({page}) => {
    const dragAndDrop = new DragAndDropPage(page);
    await dragAndDrop.goto();
    await dragAndDrop.dragAndDrop();
    await expect(
        page.getByRole('heading', { name: 'Dropped!' })
    ).toBeVisible();
});