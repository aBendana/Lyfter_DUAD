import { getAllUsers } from "../requests/get-user-admin.js";
import { pageData, createPaginationControls } from "./page-data.js";
import { handleViewUser } from "./user-info.js";

export async function showUsers() {
  try {
    const showUsersButton = document.getElementById("dashboard-manage-users");
    showUsersButton.addEventListener("click", async () => {
      const users = await getAllUsers();
      users.sort((a, b) => a.id - b.id);
      constructUsersTable(users, 1, users);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    const usersContainer = document.getElementById("dashboard-content");
    usersContainer.innerHTML = `<p class="error-message-generic">Failed to load users: ${error}. Please try again later.</p>`;
  }
}

function constructUsersTable(users, page = 1, allUsers = users) {
  // get the users to display on the current page
  const { elementsToDisplay, totalPages } = pageData(users, page);

  const usersContainer = document.getElementById("dashboard-content");
  usersContainer.innerHTML = "";
  usersContainer.className = "";
  usersContainer.classList.add("users-container");

  // create title
  const usersTitle = document.createElement("h3");
  usersTitle.classList.add("container-title");
  usersTitle.textContent = "All Users";
  usersContainer.appendChild(usersTitle);

  // create container for search and total of clients
  const searchTotalContainer = document.createElement("div");
  searchTotalContainer.classList.add("search-total-container");
  usersContainer.appendChild(searchTotalContainer);

  // create search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by User ID";
  searchInput.classList.add("search-input");
  searchTotalContainer.appendChild(searchInput);

  // add event listener for search input (trigger on Enter key)
  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const searchTerm = parseInt(searchInput.value.trim());
    if (isNaN(searchTerm)) {
      constructUsersTable(allUsers, 1, allUsers);
    } else {
      const filteredUsers = allUsers.filter(
        (user) =>
          user.id === searchTerm || user.id.toString().includes(searchTerm),
      );
      constructUsersTable(filteredUsers, 1, allUsers);
    }
  });

  // total clients summary (always count from the full original list)
  let totalClients = 0;
  totalClients = allUsers.reduce((totalClients, user) => {
    if (user.role === "client") {
      return totalClients + 1;
    }
    return totalClients;
  }, 0);
  // create total clients title
  const totalTitle = document.createElement("h3");
  totalTitle.classList.add("total-clients-title");
  totalTitle.textContent = `Total Clients: ${totalClients}`;
  searchTotalContainer.appendChild(totalTitle);

  // create table for users
  const usersTable = document.createElement("table");
  usersTable.classList.add("users-table");
  usersContainer.appendChild(usersTable);

  // create the content of the table
  // create table header
  const tableThead = document.createElement("thead");
  const tableHeader = document.createElement("tr");
  const headers = ["ID", "Full Name", "Email", "Phone Number", "Role"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tableHeader.appendChild(th);
  });
  tableThead.appendChild(tableHeader);
  usersTable.appendChild(tableThead);

  // create table rows
  const tableTbody = document.createElement("tbody");
  elementsToDisplay.forEach((user) => {
    const tableRow = document.createElement("tr");
    const userData = [
      user.id,
      user.name,
      user.email,
      user.phone_number,
      user.role,
    ];

    // create row data for each user
    userData.forEach((data) => {
      const td = document.createElement("td");
      td.textContent = data;
      tableRow.appendChild(td);
    });

    // create view button for each user
    const viewUserButton = document.createElement("button");
    viewUserButton.dataset.userId = user.id; // set the user id in the button
    viewUserButton.textContent = "View";
    viewUserButton.classList.add("view-user-button");

    // add event listener to every view button
    viewUserButton.addEventListener("click", () => {
      const userId = parseInt(viewUserButton.dataset.userId); // parse the user id
      handleViewUser(userId);
    });
    // add the button to the row
    tableRow.appendChild(viewUserButton);

    tableTbody.appendChild(tableRow);
  });
  usersTable.appendChild(tableTbody);

  // create pagination controls
  createPaginationControls("dashboard-content", page, totalPages, (newPage) => {
    constructUsersTable(users, newPage, allUsers);
  });
}
