// get all the employes
const getEmployess = async()=>{
    const responce = await fetch("http://localhost:3000/employees",{
        method: "GET"
    })
    if(!responce.ok){
        throw new Error("The conection to the server failed")
    }
    const data = await responce.json()
    return data
}
// form add
const formAdd = document.querySelector("#add-employee").addEventListener("submit",(e)=>{
    e.preventDefault()
    const fname = document.querySelector("#fname").value
    const lname = document.querySelector("#lname").value
    const age = document.querySelector("#age").value
    const isMarried = document.querySelector("#isMarried").checked
    addEmployee(fname,lname,age,isMarried)
    document.querySelector("#add-employee").reset()
})

// button search fname
const btnSearchFname = document.querySelector("#search-fname").addEventListener("submit",(e)=>{
    e.preventDefault()
    const fname = document.querySelector("#query").value
    search(fname)
    document.querySelector("#search-fname").reset()
})

// search by query 
const search = async(query) =>{
    const res = await fetch(`http://localhost:3000/employees/search?name=${query}`,{
        method: "GET"
    })
    if(!res.ok){
        throw new Error(`Failed to add ${res.statusText}`)
    }
    const data = await res.json()
    const viewInfo = document.querySelector(".view-info")
    viewInfo.innerHTML = ""
    data.forEach(employee => {
        const employeeInfo = document.createElement("div")
        employeeInfo.innerHTML = `
        <p>First name: ${employee.fname}</p>
        <p>Last name: ${employee.lname}</p>
        <p>Age: ${employee.age}</p>
        <p>Married: ${employee.isMarried === true? "Yes" : "No"}</p>
        <span>-------------------------------------------</span>
    `
    viewInfo.appendChild(employeeInfo)
    })
}

// add employee 
const addEmployee = async(fname, lname, age, isMarried)=>{
    const res = await fetch("http://localhost:3000/employees",{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({fname,lname,age,isMarried})    
    })

    if(!res.ok){
        throw new Error(`Failed to add ${res.statusText}`)
    }

    const data = await res
    alert("Employee added")
    app()
    return data
}

const viewEmployee = async(id)=>{
    const res = await fetch(`http://localhost:3000/employees/${id}`,{
        method: "GET"
    })
    if(!res.ok){
        throw new Error("Failed to reach the server")
    }
    const viewInfo = document.querySelector(".view-info")
    viewInfo.innerHTML = ""
    const employeeInfo = document.createElement("div")
    const data = await res.json()
    employeeInfo.innerHTML = `
        <p>First name: ${data.fname}</p>
        <p>Last name: ${data.lname}</p>
        <p>Age: ${data.age}</p>
        <p>Married: ${data.isMarried === true? "Yes" : "No"}</p>
        <span>-------------------------------------------</span>
    `
    viewInfo.append(employeeInfo)
    
}


const getEmployee = async(id) =>{
    const res = await fetch(`http://localhost:3000/employees/${id}`,{
        method: "GET"
    })
    if(!res.ok){
        throw new Error("Failed to reach the server")
    }
    const data = await res.json()
    const idEmployee = document.querySelector("#id")
    const editFname = document.querySelector("#edit-fname")
    const editLname = document.querySelector("#edit-lname")
    const editAge = document.querySelector("#edit-age")
    const edithisMarried = document.querySelector("#edit-isMarried")
    idEmployee.value = `${data.id}`
    editFname.value = `${data.fname}`
    editLname.value = `${data.lname}`
    editAge.value = `${data.age}`
    edithisMarried.checked = data.isMarried
}

const editEmployee = async(id,fname, lname, age, isMarried)=>{
    const res = await fetch(`http://localhost:3000/employees/${id}`,{
        method: "PUT",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({fname,lname,age,isMarried})
    })
    if(!res.ok){
        throw new Error(`Failed to Uppdate ${res.statusText}`)
    }

    alert("Employee updated")
    app()
}

// delete
const deleteEmployee = async(id)=>{
    const res = await fetch(`http://localhost:3000/employees/${id}`,{
        method: "DELETE"
    })
    if(!res.ok){
        throw new Error(`Failed to Delete ${res.statusText}`)
    }

    alert("Employee deleted")
    app()
}

// edit employee
const summitFormEditEmployee = document.querySelector("#edit-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const idEmployee = document.querySelector("#id").value
    const editFname = document.querySelector("#edit-fname").value
    const editLname = document.querySelector("#edit-lname").value
    const editAge = document.querySelector("#edit-age").value
    const edithisMarried = document.querySelector("#edit-isMarried").checked
    editEmployee(idEmployee,editFname,editLname,editAge,edithisMarried)
    document.querySelector("#edit-form").reset()
})


const app = () =>{
    getEmployess().then((data) =>{
        const list = document.querySelector(".list")
        list.innerHTML = ""
        data.forEach(employee => {
            const li = document.createElement("li")
            li.innerHTML = `
            <div>
                <span>${employee.fname} ${employee.lname}</span>
                <button class="view" onclick="viewEmployee('${employee.id}')">View</button>
                <button class="edith" onclick="getEmployee('${employee.id}')">Edit</button>
                <button class="delete" onclick="deleteEmployee('${employee.id}')">Delete</button>
            </div>
            `
            list.append(li)
        });
    })
}

app()



