// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []

        }
}

function createEmployeeRecords(arrayofArrays) {
   return arrayofArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, date) {
     let timeInObj = {
        type: 'TimeIn',
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
     }
     employee.timeInEvents.push(timeInObj)
     return employee
}
//createTimeInEvent("1999-05-09 1230")


function createTimeOutEvent(employee, date) {
   
    let timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    employee.timeOutEvents.push(timeOutObj)
    return employee
}
//createTimeOutEvent("1978-07-03 3210")

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}



function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date)
    //console.log("THIS RIGHT HERE", employee.date)
    return employee.payPerHour * hours
}

function  allWagesFor(employee) {
    const eligibleDates = employee.timeInEvents.map(event => event.date)
    //console.log(eligibleDates)
    return eligibleDates.reduce((previous, current) => previous + wagesEarnedOnDate(employee, current), 0)
}

function calculatePayroll(employeeRecords) {
  let payRoll = []
  employeeRecords.forEach(employee => {
    payRoll.push(allWagesFor(employee))
  })
  return payRoll.reduce((previous, current) => previous + current)
}












