let userForm = document.getElementById("user_form");

const fetchUserEntries = () => {
    let entries = localStorage.getItem("user");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}

let userEntries = fetchUserEntries();

const showUserEntries = () => {
    const entries = userEntries;
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptedTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTerms}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsCell}</tr>`;
        return row;
    })
    .join("\n");

    const table = `<table class="table-auto w-full"><tr>
    
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
 </tr>${tableEntries} </table>`;
 let details = document.getElementById("user");
 details.innerHTML = table;
}

const saveUserFormData = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptedTerms").checked;

    const dobObject = new Date(dob);
    const age = new Date().getFullYear() - dobObject.getFullYear();
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };
    
    userEntries = fetchUserEntries();
    userEntries.push(entry);

    localStorage.setItem("user", JSON.stringify(userEntries));
    showUserEntries();
    userForm.reset();
}

userForm.addEventListener("submit", saveUserFormData);
showUserEntries();
