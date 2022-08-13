// chrome://extensions/

let myLeads = []                                                // Saved Leads
let oldLeads = []                                                // Old Leads
const txtInput = document.getElementById("txt-input")           // Input field for saving leads
const btnSave = document.getElementById("btn-save")             // Button to save current lead
const btnTab = document.getElementById("btn-tab")             // Button to save current lead
const btnDelete = document.getElementById("btn-delete")         // Button to delete all leads
const ulLeads = document.getElementById("ul-leads")             // Unordered List displaying leads

loadLeads()

function loadLeads() {

    let leadsInLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

    if (leadsInLocalStorage) {
        myLeads = leadsInLocalStorage
        render(myLeads)
    }

}

function render(leads) {

    let listItems = ""
    

    leads.forEach(lead => {

        listItems += `<li><a target="_blank" href="${lead}"> ${lead} </a></li>`

    });

    ulLeads.innerHTML = listItems

}

// SAVE LEAD
btnSave.addEventListener("click", function() {

    // Save lead to leads array
    myLeads.push(txtInput.value)

    // Save leads to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    // Clear the input txt field
    txtInput.value = ""

    // Render Leads
    render(myLeads)
})

// SAVE TAB URL
btnTab.addEventListener("click", function() {
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

        // Push current tab href to array
        myLeads.push(tabs[0].url)

        // Save leads to local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
        render(myLeads)
        
    })

})

// DELETE ALL LEADS
btnDelete.addEventListener("click", function() {

    // Clear local storage
    localStorage.clear()

    // Clear my leads
    myLeads = []

    // Render leads
    render(myLeads)

})

