// Get references to HTML elements
const addbtn = document.getElementById("add-note");
const notebx = document.getElementById("note-bx");

// Event listener for the "Add Note" button
addbtn.addEventListener("click", () => {
    addNote();
});

// Function to save notes to local storage
const saveNotes = () => {
    // Select all notes' textareas
    const notes = document.querySelectorAll(".note textarea");
    const data = [];

    // Iterate through each note and push its value to the data array
    notes.forEach((note) => {
        data.push(note.value);
    });

    // Save the data to local storage as JSON
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

// Function to add a new note
const addNote = (text = "") => {
    // Create a new note div
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

// Event listener for the trash icon (delete note)
note.querySelector(".trash").addEventListener("click", function () {
    const textArea = note.querySelector('textarea');
    if (textArea.value.trim() === '') {
        note.remove();
        saveNotes();
        return; // Exit the function if the note is empty
    }

    var removebx = document.getElementById("remove-confirm");
    var overlay = document.getElementById("overlay");
    var bounding = notebx.getBoundingClientRect(); // Get the bounding rect of the notes container

    removebx.style.display = "flex";
    overlay.style.display = "block";

    // Position confirmation box relative to the visible screen
    removebx.style.top = `${window.scrollY + (window.innerHeight / 2) - (removebx.offsetHeight / 2)}px`;

    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Position overlay to cover the visible screen
    overlay.style.top = `${window.scrollY}px`;
    overlay.style.height = `${window.innerHeight}px`;

    // Event listener for the confirmation to delete
    document.getElementById("yes").onclick = function () {
        removebx.style.display = "none";
        overlay.style.display = "none";
        note.remove();
        saveNotes();
        // Re-enable scrolling
        document.body.style.overflow = '';
    };

    // Event listener for the cancellation of deletion
    document.getElementById("no").onclick = function () {
        removebx.style.display = "none";
        overlay.style.display = "none";
        // Re-enable scrolling
        document.body.style.overflow = '';
    };
});



    // Event listener for the save icon
    note.querySelector(".save").addEventListener("click", function () {
        var savetrue = document.getElementById("save-true");
        // Position overlay to cover the visible screen
        savetrue.style.bottom = `${-window.scrollY}px`;
        savetrue.style.visibility = "visible";
        setTimeout(() => {
            savetrue.style.visibility = "hidden";
        }, 2000);
        saveNotes();
    });

    // Autosave when focus is lost from the textarea
    note.querySelector("textarea").addEventListener("focusout", function () {
        saveNotes();
    });

    // Append the new note to the notes container
    notebx.appendChild(note);

    // Save notes after adding a new one
    saveNotes();
};

// Self-invoking function to display saved notes on page load
(function () {
    // Retrieve notes from local storage
    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    // If there are no saved notes, add an empty note
    if (lsNotes === null) {
        addNote();
    } else {
        // Add each saved note to the page
        lsNotes.forEach((lsNote) => {
            addNote(lsNote);
        });
    }
})();
