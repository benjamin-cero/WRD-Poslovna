
//ZADATAK 1

async function LoadAllMajors()
{
    const response = await fetch("https://ispit-wrd.adlakajtaz.com/majors");
    const majors = await response.json();

    LoadMajors(majors);
}


function LoadMajors(majors)
{
    const select = document.getElementById("majorId");

    select.innerHTML = '<option value="">Odaberite smjer</option>';

    majors.forEach(major => {

        const option = `
        <option value="${major.id}">${major.name}</option>`;

        select.innerHTML += option;
    });
}

window.onload = LoadAllMajors;


//ZADATAK 2


async function LoadAllStudents()
{
    const response = await fetch("https://ispit-wrd.adlakajtaz.com/students");
    const students = await response.json();

    LoadStudents(students);
}


function LoadStudents(students)
{
    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = `
        <tr>
            <td>${student.id}</td>
            <td>${student.first_name}</td>
            <td>${student.last_name}</td>
            <td>${student.average}</td>
            <td>${student.major_name}</td>
        </tr>`;

        tableBody.innerHTML += row;
    });
}


//ZADATAK 3


async function SearchStudents()
{
    const name = document.getElementById("searchName").value;

    const response = await fetch("https://ispit-wrd.adlakajtaz.com/students/search/" + encodeURIComponent(name));
    const students = await response.json();

    LoadStudents(students);
}


//ZADATAK 4



async function AddStudent()
{
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const average = parseFloat(document.getElementById("average").value);
    const major_id = document.getElementById("majorId").value;


    if(first_name.trim() == "" || last_name.trim() == "" || isNaN(average) || average < 6 || average > 10 || major_id == "")
    {
        alert("Molimo popunite sva polja ispravno");
        return;
    }


    const obj = {
        first_name,
        last_name,
        average,
        major_id: parseInt(major_id)
    };


    try
    {
        const response = await fetch("https://ispit-wrd.adlakajtaz.com/students",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(obj)
            }
        );

        if(!response.ok)
        {
            throw new Error("Dodavanje studenta nije uspjelo");
        }

        await response.json();

        ClearForm();
        LoadAllStudents();
    }
    catch(error)
    {
        console.error(
            "Doslo je do greske prilikom dodavanja studenta",
            error
        );

        alert("Doslo je do greske prilikom dodavanja studenta");
    }
}


function ClearForm()
{
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("average").value = "";
    document.getElementById("majorId").value = "";
}
