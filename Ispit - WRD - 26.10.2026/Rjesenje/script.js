
async function LoadAllMovies()
{
    const response = await fetch("https://ispit-wrd.adlakajtaz.com/movies");
    const movies = await response.json();

    LoadMovies(movies);
}


function LoadMovies(movies)
{
    const tableBody = document.getElementById("movieTableBody");

    tableBody.innerHTML = "";

    movies.forEach(movie => {

        let status = "";

        if(movie.budget > 100000000)
        {
            status = "Visokobudžetni film";
        }
        else
        {
            status = "Standardni film";
        }

        const row = `
        <tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
            <td>${movie.release_year}</td>
            <td>${movie.budget}</td>
            <td>${status}</td>
        </tr>`;

        tableBody.innerHTML += row;
    });
}


// ZADATAK 2
// Klikom na dugme "Dodaj film":
// - preuzeti podatke iz forme
// - provjeriti jesu li sva polja unesena
// - provjeriti jesu li godina i budžet brojevi
// - provjeriti da li je budžet veći od nule
// - u slučaju greške prikazati alert
// - poslati POST zahtjev
// - nakon uspješnog dodavanja očistiti formu
// - osvježiti tabelu

async function AddMovie()
{
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const director = document.getElementById("director").value;
    const release_year = parseInt(document.getElementById("year").value);
    const budget = parseFloat(document.getElementById("budget").value);


    if(title == "" || genre == "" || director == "" || isNaN(release_year) || isNaN(budget) || budget <= 0)
    {
        alert("Molimo popunite sva polja ispravno");
        return;
    }


    const obj = {
        title,
        genre,
        director,
        release_year,
        budget
    };


    try
    {
        const response = await fetch("https://ispit-wrd.adlakajtaz.com/movies",
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
            throw new Error("Greska prilikom dodavanja filma");
        }

        await response.json();

        ClearForm();
        LoadAllMovies();
    }
    catch(error)
    {
        console.error(
            "Doslo je do greske prilikom dodavanja filma",
            error
        );

        alert("Doslo je do greske prilikom dodavanja filma");
    }
}


function ClearForm()
{
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("director").value = "";
    document.getElementById("year").value = "";
    document.getElementById("budget").value = "";
}
