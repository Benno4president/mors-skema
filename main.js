/* Mors Schema Builder
    Creator and Copyright: Kristian Juel Bengtson
    Date: 14. January 2025
*/


const test_members = ['Kristian', 'Emilie', 'Ida R', 'Anton', 'Lucca', 'Jakob'];

const totalSlots = 65; //65 # (3*5) + (4*5) + (3*4) + (3*4) + 3 + 3 


function makeWeekSchemaButton() {
    let l = document.getElementById('name_list')
    let members = l.value.split(',')
    if (members === undefined) {
        alert('oh shiiit we fucked up. List of names cannot be parsed for some reason.. did you comma seperate them?');
        return;
    }
    else if (members.length < 5) {
        alert("must contain atleast 5 members");
        return;
    }
    else {
        localStorage.setItem('members_list', members);
        createTable(createSchema(members, totalSlots));
    }
}

function fillNameList() {
    let mlx = localStorage.getItem('members_list')
    let l = document.getElementById('name_list')
    if (mlx != null)
        l.value = mlx.toString()
    else if (mlx.length >= 5)
        l.value = mlx.toString()
    else
        l.value = test_members
}

// too many slots
function createSchema(members, slots) {
    let mem = members.slice()
    let pickedList = []
    let i = 0
    while (i < (Math.floor(slots / members.length)) + 1) {
        shuffle(mem);
        let s = pickedList.slice(-3);
        if (s.includes(mem[0]) || s.includes(mem[1]))
            continue;
        pickedList = pickedList.concat(mem)
        i++
    }
    return pickedList;
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function createTable(arr) {
    const table = document.getElementById("tableBody");
    table.innerHTML = ""
    let getThree = () => arr.pop() + '<br>' + arr.pop() + '<br>' + arr.pop()
    let getFour = () => arr.pop() + '<br>' + arr.pop() + '<br>' + arr.pop() + '<br>' + arr.pop()
    const dead_cell = "<br>   ---   <br>"

    let morning_row = table.insertRow();
    let time_morning = morning_row.insertCell(0)
    time_morning.innerHTML = "Morgenmad<br>Kl. 08:15-08:30<br>(3 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = morning_row.insertCell(index)
        cell.innerHTML = getThree()
    }

    let lunch_row = table.insertRow();
    let time_lunch = lunch_row.insertCell(0)
    time_lunch.innerHTML = "Frokost<br>Kl. 12:30-13:30<br>(4 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = lunch_row.insertCell(index)
        cell.innerHTML = getFour()
    }

    let dinner_row = table.insertRow();
    let time_dinner = dinner_row.insertCell(0)
    time_dinner.innerHTML = "Aftensmad<br>Kl. 17:00-18:00<br>(3 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = dinner_row.insertCell(index)
        if (index === 5)
            cell.innerHTML = dead_cell
        else
            cell.innerHTML = getThree()
    }

    let after_dinner_row = table.insertRow();
    let time_after_dinner = after_dinner_row.insertCell(0)
    time_after_dinner.innerHTML = "Efter aftensmad<br>Kl. 18:30-19:30<br>(3 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = after_dinner_row.insertCell(index)
        if (index == 5)
            cell.innerHTML = dead_cell
        else
            cell.innerHTML = getThree()
    }


    let HSArow = table.insertRow();
    let timeHSA = HSArow.insertCell(0)
    timeHSA.innerHTML = "HSA Kaffe og kage<br>(3 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = HSArow.insertCell(index)
        if (index === 3)
            cell.innerHTML = getThree()
        else
            cell.innerHTML = dead_cell
    }


    let OpvaskRow = table.insertRow();
    let timeOpvask = OpvaskRow.insertCell(0)
    timeOpvask.innerHTML = "HSA Opvask<br>(3 personer)"
    for (let index = 1; index < 6; index++) {
        let cell = OpvaskRow.insertCell(index)
        if (index === 3)
            cell.innerHTML = getThree()
        else
            cell.innerHTML = dead_cell
    }

}


window.addEventListener('load', function () {
    fillNameList()
    makeWeekSchemaButton()
})