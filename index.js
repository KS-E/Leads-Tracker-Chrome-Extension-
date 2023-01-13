// chrome://extensions/
const inputEl= document.getElementById("input-el") // input field
const inputBtn= document.getElementById("input-btn") // save input  button
const tabBtn= document.getElementById("tab-btn") // tab button
const deleteBtn= document.getElementById("delete-btn") //delete button
const ulEl= document.getElementById("ul-el") //links displayed
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
let leads=[] // array to save leads


if (leadsFromLocalStorage) {
    leads =leadsFromLocalStorage // putting back the stored values
    renderLeads(leads) // render the values on page
}


inputBtn.addEventListener("click", () => {
    leads.push(inputEl.value) //pushing value entered in input field
    localStorage.setItem("leads", JSON.stringify(leads)) //storing in local storage
    inputEl.value= " " //clearing input field
    renderLeads(leads) //rendering the lead 
})


//function for rendering all the leads acquired on page
function renderLeads(acquired_leads){
    let listItems= ""  // list of leads

    // target="_blank " opens in new tab
    for (let i=0; i<acquired_leads.length ; i++){
           
        listItems += `<li> 
                            <a target='_blank' href='${acquired_leads[i]}'>${acquired_leads[i]}</a> 
                       </li>`
    }
    ulEl.innerHTML =listItems
}


//eventlistener function for deleting all the leads

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear() //clearing
    leads=[]     //array empty
    renderLeads(leads) //rendering
})


//eventlistener function for saving the tab url as leads

tabBtn.addEventListener("click", function(){
    chrome.tabs.query ({active : true, currentWindow: true}, function(tabs){  
        leads.push (tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        renderLeads(leads)
    })
    
})

