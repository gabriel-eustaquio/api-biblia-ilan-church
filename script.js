const botaoBuscar = document.querySelector('#buscar');
const botaoApagar = document.querySelector('#apagar');
const form = document.querySelector('form');

function requisicaoPalavra(valorPalavra, valorCapitulo) {
  const valorPalavraLimpa = valorPalavra.toLowerCase();
  const section = document.querySelector('section');
  fetch(
    `https://www.abibliadigital.com.br/api/verses/nvi/${valorPalavraLimpa}/${valorCapitulo}`,
  )
    .then((r) => r.json())
    .then((r) => {
      if (r.msg) {
        const elemento = document.createElement('div');
        elemento.innerText = 'Não foi possível fazer a busca.';
        elemento.classList.add('alert');
        elemento.classList.add('alert-danger');
        elemento.setAttribute('role', 'alert');
        form.querySelectorAll('.alert')
          ? form.querySelectorAll('.alert').forEach((div) => div.remove())
          : '';
        form.appendChild(elemento);
      } else {
        const arrayDeDivAlert = form.querySelectorAll('.alert');
        arrayDeDivAlert.forEach((div) => {
          div.remove();
        });
        const h1 = document.createElement('h1');
        h1.innerText = r.book.name + ' capítulo: ' + r.chapter.number;
        section.appendChild(h1);
        const versiculos = r.verses.map((item) => {
          section.classList.add('p-3');
          section.classList.add('shadow');
          section.classList.add('bg-body-dark');
          section.classList.add('rounded');
          const elemento = document.createElement('p');
          const span = document.createElement('span');
          span.innerText = item.number + ' ';
          const text = document.createTextNode(item.text);
          elemento.appendChild(span);
          elemento.appendChild(text);
          section.appendChild(elemento);
        });
      }
    });
}

function buscarPalavra(event) {
  event.preventDefault();
  const valorPalavra = document.querySelector('#palavra').value;
  const valorCapitulo = document.querySelector('#capitulo').value;
  requisicaoPalavra(valorPalavra, valorCapitulo);
}

function apagarPalavra(event) {
  event.preventDefault();
  const arrayDeDivAlert = form.querySelectorAll('.alert');
  const arrayDeH1 = document.querySelectorAll('h1');
  const arrayDeP = document.querySelectorAll('p');
  arrayDeH1.forEach((h1) => {
    h1.remove();
  });
  arrayDeP.forEach((p) => {
    p.remove();
  });
  arrayDeDivAlert.forEach((div) => {
    div.remove();
  });
}

botaoBuscar.addEventListener('click', buscarPalavra);
botaoApagar.addEventListener('click', apagarPalavra);
