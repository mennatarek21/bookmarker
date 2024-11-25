let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function displayBookmarks() {
  const bookmarkList = document.getElementById("bookmarkList");
  bookmarkList.innerHTML = ""; 

  bookmarks.forEach((bookmark, index) => {
    bookmarkList.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td>
          <a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm">Visit</a>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function addBookmark() {
  const siteName = document.getElementById("siteName").value.trim();
  const siteUrl = document.getElementById("siteUrl").value.trim();

  if (!siteName || !siteUrl) {
    alert("Please fill in both fields.");
    return;
  }
  if (bookmarks.some((bookmark) => bookmark.name.toLowerCase() === siteName.toLowerCase())) {
    alert("A bookmark with this name already exists.");
    return;
  }

  bookmarks.push({ name: siteName, url: siteUrl });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  document.getElementById("siteName").value = "";
  document.getElementById("siteUrl").value = "";
  displayBookmarks();
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1); 
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks(); 
}

document.addEventListener("DOMContentLoaded", displayBookmarks);
