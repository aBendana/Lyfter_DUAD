export function pageData(dataArray, page) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  const startElementsIndex = (page - 1) * itemsPerPage;
  const endElementsIndex = startElementsIndex + itemsPerPage;
  const elementsToDisplay = dataArray.slice(
    startElementsIndex,
    endElementsIndex,
  );

  return { elementsToDisplay, totalPages };
}

export function createPaginationControls(
  containerId,
  currentPage,
  totalPages,
  onPageChange,
) {
  const container = document.getElementById(containerId);
  const paginationControls = document.createElement("nav");
  paginationControls.classList.add("pagination-nav");
  container.appendChild(paginationControls);

  const previousButton = document.createElement("button");
  previousButton.id = "previous-button";
  previousButton.classList.add("pagination-button");
  previousButton.textContent = "<";
  previousButton.disabled = currentPage === 1;
  paginationControls.appendChild(previousButton);

  const pageIndicator = document.createElement("span");
  pageIndicator.classList.add("page-indicator");
  pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  paginationControls.appendChild(pageIndicator);

  const nextButton = document.createElement("button");
  nextButton.id = "next-button";
  nextButton.classList.add("pagination-button");
  nextButton.textContent = ">";
  nextButton.disabled = currentPage === totalPages;
  paginationControls.appendChild(nextButton);

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });
}
