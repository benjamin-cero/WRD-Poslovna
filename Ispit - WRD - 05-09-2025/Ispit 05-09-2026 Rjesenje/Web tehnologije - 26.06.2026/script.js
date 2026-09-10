async function LoadAllBooks()
{
    const response = await fetch("https://ispit-wrd.adlakajtaz.com/books");
    const books = await response.json();

    LoadBooks(books);
}


function LoadBooks(books)
{
    const tableBody = document.getElementById("bookTableBody");

    tableBody.innerHTML = "";

    books.forEach(book => {

        let description = "";

        if(book.publication_year == 2026)
        {
            description = "Nova knjiga";
        }
        else
        {
            description = "Stara knjiga";
        }

        const row = `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publication_year}</td>
            <td>${description}</td>
        </tr>`;

        tableBody.innerHTML += row;
    });
}


// ZADATAK 2
// Klikom na dugme "Dodaj knjigu":
// - preuzeti podatke iz forme
// - provjeriti jesu li sva polja unesena
// - provjeriti da li je godina broj
// - u slučaju greške prikazati alert
// - poslati POST zahtjev
// - nakon uspješnog dodavanja očistiti formu
// - osvježiti tabelu

async function AddBook()
{
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const publication_year = parseInt(document.getElementById("year").value);


    if(title == "" || author == "" || genre == "" || isNaN(publication_year))
    {
        alert("Molimo popunite sva polja ispravno");
        return;
    }


    const obj = {
        title,
        author,
        genre,
        publication_year
    };


    try
    {
        const response = await fetch("https://ispit-wrd.adlakajtaz.com/books",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(obj)
            }
        );


        await response.json();

        ClearForm();
        LoadAllBooks();
    }
    catch(error)
    {
        console.error(
            "Doslo je do greske prilikom dodavanja knjige",
            error
        );

        alert("Doslo je do greske prilikom dodavanja knjige");
    }
}

function ClearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("year").value = "";
}