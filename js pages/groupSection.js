const searchGroupBtn = document.querySelector('.searchGroupBtn');
const searchGroup = document.querySelector('#searchGroup');
var loadingDiv = document.querySelector('.loading-div')
const GroupCount = document.querySelector('#GroupCount')
const GroupTime = document.querySelector('#GroupTime')
const GroupModuleName = document.querySelector('#GroupModuleName')
const GroupStartDate = document.querySelector('#GroupStartDate')


async function getInfoOfGroups(groupId) {
    const baseUrl = `https://script.google.com/macros/s/AKfycbzq0888ifBcsd1JIc6so3lRIOIOvTJv9aayX4T-xNqHRSrCChxL6DeVWajnmPKzQoLuFQ/exec`;

    // Modify the URL to include the group ID in the request
    const url = `${baseUrl}?groupId=${groupId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
    loadingDiv.style.display = "block";
    overlay.style.display = "block";
}

function hide() {
    overlay.style.display = "none";
    loadingDiv.style.display = "none";
}



async function diplayGroups(groupId) {
    change();
    const groups = await getInfoOfGroups(groupId);
    const tableBody = document.querySelector('.tbody1');
    tableBody.innerHTML = '';

    for (let i = 0; i < groups.length; i++) {
        if (groupId == groups[i]['Code Group']) {
            var group = {
                StudentNo: groups[i]['Student No'],
                Name: groups[i].Name,
                Count: groups[i]['Count of GR Students'],
                Email: groups[i].Email,
                phone: groups[i]['Phone '],
                Grade: groups[i].Grade,
                StudyType: groups[i]['Student Type'],
                startDate: groups[i]['GR Start Date'],
                GroupTime: groups[i]['Group Time'],
                ModuleName: groups[i]['GR Module Name'],
            };

            const formatteddate = new Date(group.startDate).toLocaleDateString('en-GB');
            // Use trim() to handle empty or whitespace-only StudyType
            

            // pushObj.push(students[i].Amount)
            // deadlineStatus.push(students[i].Status)
            // console.log(pushObj);
            const newRow = document.createElement('tr');
            // console.log(student.DueDate);
            newRow.innerHTML = `
            <td class="text-center">${group.StudentNo}</td>
            <td>${group.Name}</td>
            <td>${group.phone}</td>
            <td>${group.StudyType}</td>
            <td>${group.Grade}</td>
        `;


            tableBody.appendChild(newRow);
            GroupCount.innerHTML = group.Count;
            GroupTime.innerHTML = group.GroupTime;
            GroupModuleName.innerHTML = group.ModuleName;
            GroupStartDate.innerHTML = formatteddate;
        }
    };


    // Send the request to the server
    hide(); // hide the loading overlay once the requests are shown
}

searchGroupBtn.addEventListener('click', function (e) {
    e.preventDefault()
    const groupId = searchGroup.value


    diplayGroups(groupId)
})