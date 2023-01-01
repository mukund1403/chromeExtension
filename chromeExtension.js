const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEL = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
let myLeads = []


const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads")) 

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })  
})

//logging out elements in myLeads
function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i += 1){
        listItems += 
        `<li>
            <a href= ${leads[i]} target='_blank'>
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEL.value)
    render(myLeads)
    inputEL.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    ulEl.textContent=""
    myLeads=[]
})






