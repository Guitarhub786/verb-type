
const endpoint = './verbs.json';

const verbs = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => verbs.push(...data))

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data))



function findMatches(wordToMatch, verbs) {
  return verbs.filter(word => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return word.key_words.match(regex) || word.root_e.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, verbs);
  // console.log(matchArray)
  const html = matchArray.map(word => {
    const regex = new RegExp(this.value, 'gi');

    // const keyWord = word.key_words.replace(regex, `<span class="h1">${this.value}</span>`);
    // const rootWord = word.root_e.replace(regex, `<span class="h1">${this.value}</span>`);

    const keyWord = word.key_words.replace(regex, (match) => `<span class="hl">${match}</span>`);
    const rootWord = word.root_e.replace(regex, (match) => `<span class="hl">${match}</span>`);

    return `
  <li>

    <table class="verb-table">
      <thead>
        <tr>
          <th class="form">${word.pp_f1}</th>
          <th class="form">${word.pp_m1}</th>
          <th class="form">${word.ap_def_f1}</th>
          <th class="form">${word.ap_def_m1}</th>
          <th class="form">${word.ap_indef_f1}</th>
          <th class="form">${word.ap_indef_m1}</th>
          <th class="form">${word.im1$f1}</th>
          <th class="form">${word.iif1}</th>
          <th class="form">${word.iim1}</th>
          <th class="form">${word.iiif1}</th>
          <th class="form">${word.iiim1}</th>
          <th class="form">${word.type}</th>
          <td class="form">Key Words</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="english">${word.pp_f1_e}</td>
          <td class="english">${word.pp_m1_e}</td>
          <td class="english">${word.ap_def_f1_e}</td>
          <td class="english">${word.ap_def_m1_e}</td>
          <td class="english">${word.ap_indef_f1_e}</td>
          <td class="english">${word.ap_indef_m1_e}</td>
          <td class="english">${word.im1$f1_e}</td>
          <td class="english">${word.iif1_e}</td>
          <td class="english">${word.iim1_e}</td>
          <td class="english">${word.iiif1_e}</td>
          <td class="english">${word.iiim1_e}</td>
          <td class="english">Root: (${rootWord})</td>
          <td class="english">${keyWord}</td>
        </tr>
        <tr>
          <td class="arabic">${word.pp_f1_a}</td>
          <td class="arabic">${word.pp_m1_a}</td>
          <td class="arabic">${word.ap_def_f1_a}</td>
          <td class="arabic">${word.ap_def_m1_a}</td>
          <td class="arabic">${word.ap_indef_f1_a}</td>
          <td class="arabic">${word.ap_indef_m1_a}</td>
          <td class="arabic">${word.im1$f1_a}</td>
          <td class="arabic">${word.iif1_a}</td>
          <td class="arabic">${word.iim1_a}</td>
          <td class="arabic">${word.iiif1_a}</td>
          <td class="arabic">${word.iiim1_a}</td>
          <td class="arabic" id="root">${word.root_a}</td>
          <td class="arabic"></td>
        </tr>



      </tbody>
    </table>
  </li>
        `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

