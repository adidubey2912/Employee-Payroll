let empPayrollList;

window.addEventListener('DOMContentLoaded', (event)=>
{
    empPayrollList = getEmployeePayrollDataFromStorage();
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage=()=>
{
    return localStorage.getItem('EmployeePayrollList')?
    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const createInnerHtml=()=>
{
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" + 
    "<th>Salary</th><th>Start Date</th><th>Action</th>";

    if(empPayrollList.length == 0){
        let innerHtml = `${headerHtml}`;
        document.querySelector('#display').innerHTML = innerHtml;
        return;
    }

    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
        innneHtml = `${innerHtml}
        <tr>
            <td><img class = "profile" alt="" src = ${empPayrollData._profilePic}></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td><span>${getDepthtml(empPayrollData._department)}</span></td>

            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <button name="${empPayrollData._name}" onclick = "remove(this)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                <button name="${empPayrollData._name}" onclick = "update(this)"><i class="fa fa-edit" aria-hidden="true"></i></button>
            </td>
        </tr>
        `;
    };
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDepthtml = (depList) =>
{
    let depHtml = '';
    for(const dept of depList){
        depHtml = `${depHtml}<div class = 'dept-label>${dept}</div>`;
    }
    return depHtml;
}

const remove = (node)=>{
    let empPayrollData = empPayrollList.find(empDate=>empDate._name==node.name);
    if(!empPayrollData)
        return;
        const index = empPayrollList
        .map(empDate=>empDate._name)
        .indexOf(empPayrollData._name);
        empPayrollList.splice(index, 1);
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    createInnerHtml();
}

const update = (node)=>{
    let empPayrollData = empPayrollList.find(empDate=>empDate._name==node.name);
    if(!empPayrollData)
        return;
        localStorage.setItem("EditEmp", JSON.stringify(empPayrollData))
        window.location.replace(site_properties.add_emp_payroll_page);
}