export function elementStyle(element, additionalStyle = "") {
        cssTag.style.cssText = `
        
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 20px;
        justify-content: center;
        ${additionalStyle}

    `;
}


// example usage

/* 
const container = document.createElement("div");

// Apply default styles
elementStyle(container);

// Apply default + extra styles
elementStyle(container, "background-color: #f0f8ff; padding: 10px;");

 */