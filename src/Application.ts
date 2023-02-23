import TableComponent from "./TableComponent.js";

export default class Application {
    emissions: number | null;
    tableComponent: TableComponent;

    constructor() {
        this.tableComponent = new TableComponent()
        this.emissions = null;
        this.initEventListeners();
    }

    private initEventListeners(): void {
        document
            .getElementById("handleCompute")
            ?.addEventListener("click", (e) => {
                e.preventDefault();
                if (this.checkFile()) {
                    this.handleCompute();
                } else {
                    alert("Please upload regulation first!");
                }
            });
    }

    private handleCompute(): any {
        const emissions = this.getInputValue("emissions");
        this.tableComponent.update({
            emissions: emissions,
        });
    }

    private getInputValue(inputId: string): any {
        let input = document.getElementById(inputId) as HTMLInputElement | null;
        return input?.value;
    }

    private checkFile(): any {
        const input = document.getElementById(
            "regulation"
        ) as HTMLInputElement | null;

        const fileList = input?.files;
        if (fileList && fileList.length > 0) {
            return true;
        }
        return false;
    }
}
