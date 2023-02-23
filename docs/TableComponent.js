export default class TableComponent {
    static ENERGY_FACTORS = [
        { year: 2023, value: 2 },
        { year: 2024, value: 1.9 },
        { year: 2025, value: 1.7 },
        { year: 2026, value: 1.4 },
        { year: 2027, value: 1.0 },
        { year: 2028, value: 0.8 },
        { year: 2029, value: 0.4 },
        { year: 2030, value: 0.2 },
    ];
    static CARBON_PRICES = [
        { year: 2023, value: 50 },
        { year: 2024, value: 60 },
        { year: 2025, value: 80 },
        { year: 2026, value: 110 },
        { year: 2027, value: 150 },
        { year: 2028, value: 200 },
        { year: 2029, value: 260 },
        { year: 2030, value: 330 },
    ];
    tableHTMLElement;
    constructor() {
        this.tableHTMLElement = (document.getElementById("table"));
    }
    update(data) {
        this.deleteRows();
        const emissions = data["emissions"];
        Array.from({ length: 8 }, (_, i) => 2023 + i).forEach((year) => {
            const carbonPrice = TableComponent.getCarbonPrice(year);
            const energyFactor = TableComponent.getEnergyFactor(year);
            const emissionsLimit = emissions * energyFactor;
            const position = emissionsLimit - emissions;
            this.addToTable({
                year: year,
                carbonPrice: carbonPrice,
                emissions: emissions,
                emissionsLimit: emissionsLimit,
                position: position,
                cost: position * carbonPrice,
            });
        });
    }
    deleteRows() {
        const table = document.getElementById("table");
        const rows = table?.querySelectorAll("tr:not(:first-child)");
        rows?.forEach((row) => row.remove());
    }
    addToTable(yearly_result) {
        const tableRowElement = (this.tableHTMLElement?.insertRow());
        this.addToRow(tableRowElement, yearly_result["year"]);
        this.addToRow(tableRowElement, yearly_result["carbonPrice"]);
        this.addToRow(tableRowElement, yearly_result["emissions"]);
        this.addToRow(tableRowElement, yearly_result["emissionsLimit"].toFixed(2));
        this.addToRow(tableRowElement, yearly_result["position"].toFixed(2));
        this.addToRow(tableRowElement, yearly_result["cost"].toFixed(2));
    }
    static getCarbonPrice(year) {
        const item = TableComponent.CARBON_PRICES.find((item) => item["year"] == year);
        return item["value"];
    }
    static getEnergyFactor(year) {
        const item = TableComponent.ENERGY_FACTORS.find((item) => item["year"] == year);
        return item["value"];
    }
    addToRow(tableRowElement, cellData) {
        let htmlTableCellElement = (tableRowElement.insertCell());
        htmlTableCellElement.appendChild(TableComponent.getHTMLText(cellData));
    }
    static getHTMLText(textString) {
        return document.createTextNode(textString);
    }
}
