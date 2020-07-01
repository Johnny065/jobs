const removeDiv = document.getElementById('removeDiv');
fadeIn(removeDiv);

//fetch function
function searchIn(type, location, fulltime) {
  result.innerHTML = '';
  fetch(
    `https://github-jobs-proxy.appspot.com/positions?description=${type}&location=${location}&full_time=${fulltime}`
  )
    .then(data => data.json().then(info => buildHtml(info)))
    .catch(err => buildError(err));
}

//build page
const result = document.getElementById('searchResult');
result.classList = 'hide';

function buildHtml(info) {
  console.log(info.length);

  if (info.length === 0) {
    result.classList = 'show';
    result.innerHTML = `<div class="jumbotron">
    <h1 class="display-4">Nothing found!</h1>
    <p class="lead">Please try again later or try another option.</p>
    <hr class="my-4">
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="./search.html" role="button">Try again</a>
    </p>
  </div>`;
  }

  info.forEach(element => {
    //build card
    const divMedia = document.createElement('div');
    divMedia.classList = 'media my-4 card';
    const divBody = document.createElement('div');
    divBody.classList = 'media-body card-body';
    const h4 = document.createElement('h4');
    h4.classList = 'mt-0';
    h4.innerHTML = `<a target='_blank' href='${element.company_url}'>${element.company}</a>`;
    const h5 = document.createElement('h5');
    h5.classList = 'mt-0';
    const detailsDiv = document.createElement('div');
    detailsDiv.setAttribute('id', `per${element.id}`);
    detailsDiv.classList = 'perInput mt-3';
    const btn = document.createElement('button');
    btn.classList = `btn btn-secondary btn-sm btn${element.id}`;
    btn.innerText = 'See Details';

    const applyBtn = document.createElement('div');
    applyBtn.innerHTML = `<a target='_blank' href='${element.url}'><button class='btn btn-primary btn-sm mb-1'>Apply this job</button></a>`;

    h5.innerText = element.title;
    const createdAt = document.createElement('h6');
    createdAt.classList = 'card-subtitle mb-2 text-muted';
    const date = `${new Date(element.created_at).getDate()}/${new Date(
      element.created_at
    ).getMonth()}/${new Date(element.created_at).getFullYear()}`;
    createdAt.innerText = `Created at: ${date}`;
    const location = document.createElement('h6');
    location.classList = 'card-subtitle mb-2 text-muted';
    location.innerText = `Location: ${element.location}`;

    const typeOfEmpoly = document.createElement('h6');
    typeOfEmpoly.classList = 'card-subtitle mb-2 text-muted';
    typeOfEmpoly.innerText = `Form of employment: ${element.type}`;

    divBody.appendChild(h4);
    divBody.appendChild(h5);
    divBody.appendChild(createdAt);
    divBody.appendChild(location);
    divBody.appendChild(typeOfEmpoly);
    divBody.appendChild(applyBtn);
    divBody.appendChild(btn);
    divBody.appendChild(detailsDiv);
    divMedia.appendChild(divBody);
    result.appendChild(divMedia);
    fadeIn(result);
    result.className = 'show';
    btn.addEventListener('click', () => {
      showDesc(element.id, element.description);
    });
  });
}

//catch errors
function buildError(data) {
  console.log(data);
  result.classList = 'show';
  result.innerHTML = `<div class="jumbotron">
  <h1 class="display-4">Something wrong!</h1>
  <p class="lead">Please try again later or try another option.</p>
  <hr class="my-4">
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="./search.html" role="button">Try again</a>
  </p>
</div>`;
}

//see details button
function showDesc(id, desc) {
  const per = document.querySelector(`#per${id}`);
  const btnDis = document.querySelector(`.btn${id}`);
  btnDis.innerText == 'Hide Details'
    ? ((btnDis.innerText = 'See Details'), (per.innerHTML = ''), fadeOut(per))
    : ((btnDis.innerText = 'Hide Details'),
      (per.innerHTML = desc),
      fadeIn(per));
}

//fade effects
function fadeIn(el) {
  el.classList.add('show');
  el.classList.remove('hide');
}

function fadeOut(el) {
  el.classList.add('hide');
  el.classList.remove('show');
}
