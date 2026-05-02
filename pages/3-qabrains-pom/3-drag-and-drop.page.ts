export class DragAndDropPage {
    constructor(private page:Page) {}

    readonly dragAndDropListPage = this.page.getByText('Drag and Drop List');
    readonly dragElement = this.page.getByText('Drag Me');
    readonly dropElement = this.page.getByText('Drop Here');

    async goto() {
        await this.page.goto('https://practice.qabrains.com/');
        await this.dragAndDropListPage.click();
    }

    async dragAndDrop() {
        await this.dragElement.hover();
        await this.page.mouse.down();
        await this.dropElement.hover();
        await this.page.mouse.up();
    }
}