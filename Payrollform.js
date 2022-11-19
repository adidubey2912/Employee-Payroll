window.addEventListener('DOMContentLoaded',()=>{
    const name = document.querySelector('#name');

    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function()
    {
        if(name.ariaValueMax.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayRoll()).name=name.ariaValueMax;
            textError.textContent="";
        }catch(e){
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    })
    // checkForUpdate();
});

function createAndUpdateStorage(EmployeePayRollData){
    let employeePayRollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayRollList != undefined){
        employeePayRollList.push(EmployeePayRollData);
    }else{
        employeePayRollList = [EmployeePayRollData]
    }
    alert(employeePayRollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayRollList));
}
const save=()=>{
    try{
        let EmployeePayRollData = createEmployeePayRoll();
        createAndUpdateStorage(EmployeePayRollData);
        window.location.replace("index.html");
    }catch(e){
        console.log(e);
        return;
    }
}
const createEmployeePayRoll = ()=>
{
    let employeePayrollData = new EmployeePayRoll();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }catch(e){
        setTextvalue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.note = getInputValueById('#notes');
    employeePayrollData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
    employeePayrollData.startDate = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getInputValueById = ()=>{
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = querySelectorAll(propertyValue);
    let selItem = [];
    allItems.forEach(item =>
        {
            if(item.checked)
            selItem.push(item.value);
        });
        return selItem;
}

const resetForm = ()=>
{
    setvalue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#day', '3');
    setValue('#month', 'January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue)=>
{
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item=>
        {
            item.checked = false;
        });
}

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}