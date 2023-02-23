import TableComponent from "./TableComponent.js";
export default class Application {
    emissions;
    tableComponent;
    constructor() {
        this.tableComponent = new TableComponent();
        this.emissions = null;
        this.initEventListeners();
    }
    initEventListeners() {
        document
            .getElementById("handleCompute")
            ?.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.checkFile()) {
                this.handleCompute();
            }
            else {
                alert("Please upload regulation first!");
            }
        });
    }
    handleCompute() {
        const emissions = this.getInputValue("emissions");
        this.tableComponent.update({
            emissions: emissions,
        });
    }
    getInputValue(inputId) {
        let input = document.getElementById(inputId);
        return input?.value;
    }
    checkFile() {
        const input = document.getElementById("regulation");
        const fileList = input?.files;
        if (fileList && fileList.length > 0) {
            return true;
        }
        return false;
    }
}
