document.addEventListener("DOMContentLoaded", () => {
  let page = 0;
  const pageContent = [
      ["Psy",
          ['Zdjecia/page1/zdj1.png', 'Biało-czarny pies'],
          ["Zdjecia/page1/zdj2.png", 'Pies z szarym filtrem'],
          ["Zdjecia/page1/zdj3.png", 'Smutny pies'],
          ["Zdjecia/page1/zdj4.png", 'Biały szczeniak na stole'],
          ["Zdjecia/page1/zdj5.png", 'Leżący pies'],
          ["Zdjecia/page1/zdj6.png", 'Czarny pies na czarnym tle']
      ],
      ["Koty",
          ["Zdjecia/page2/zdj1.png", 'Biały kiciuś na sofie'],
          ["Zdjecia/page2/zdj2.png", 'Szary kot w lesie'],
          ["Zdjecia/page2/zdj3.png", 'Niebieskooki biało-szary kot'],
          ["Zdjecia/page2/zdj4.png", 'Czarny kot w złej pogodzie'],
          ["Zdjecia/page2/zdj5.png", 'Kot o ciekawym umaszczeniu'],
          ["Zdjecia/page2/zdj6.png", 'Kot obserwujący cię'],
          ["Zdjecia/page2/zdj7.png", 'Mały kot zagubiony w trawie'],
          ["Zdjecia/page2/zdj8.png", 'Kot szykujący się do snu']
      ],
      ["Samochody",
          ["Zdjecia/page3/zdj1.png", 'Czerwony samochód w lesie'],
          ["Zdjecia/page3/zdj2.png", 'Czarny samochód w deszczową pogodę'],
          ["Zdjecia/page3/zdj3.png", 'Stare auto'],
          ["Zdjecia/page3/zdj4.png", 'Pojazd wakacyjny'],
          ["Zdjecia/page3/zdj5.png", 'Drogie auto'],
          ["Zdjecia/page3/zdj6.png", 'Czarne auto na pustyni']
      ]
  ];

  const btLeft = document.getElementById("goLeft");
  const btRight = document.getElementById("goRight");
  const pageNumShow = document.getElementById("showPageNum");
  const gallery = document.getElementById("gallery");
  const title = document.getElementById("title");
  const btInfo = document.getElementById("btInfo");
  const ap = document.getElementById("appender");
  const btSlide = document.getElementById("btSlide");
  const inputSlide = document.getElementById("inputSlide");

  function ButtonLeftClick() {
      if (page > 0) {
          page--;
          ChangePage(page);
      }
  }

  function ButtonRightClick() {
      if (page < pageContent.length - 1) {
          page++;
          ChangePage(page);
      }
  }
let ImageOpened = false;
  function ImageClicked(event) {
    if (!ImageOpened) {
      ImageOpened = true;
  
      let clickedImage = event.target;
      let imageUrl = clickedImage.src;
      let imageTitle = clickedImage.alt;
  
      let Container = document.createElement('div');
      Container.className = 'temp-container';
  
      let Image = document.createElement('img');
      Image.src = imageUrl;
      Image.className = 'temp-image';
  
      let Title = document.createElement('h3');
      Title.textContent = imageTitle;
      Title.className = 'temp-title';
  
      Container.appendChild(Image);
      Container.appendChild(Title);
  
      document.body.appendChild(Container);
  
      Container.addEventListener('click', () => {
        document.body.removeChild(Container);
        ImageOpened = false;
      });
    }
  }

  function ChangePage(page) {
      pageNumShow.textContent = page + 1;
      gallery.innerHTML = "";
      title.textContent = pageContent[page][0];

      for (let i = 1; i < pageContent[page].length; i++) {
          const zdjecie = document.createElement('img');
          zdjecie.className = 'galleryImg';
          zdjecie.src = pageContent[page][i][0];
          zdjecie.alt = `${pageContent[page][i][1]}, zdjęcie numer: ${i}`;
          zdjecie.addEventListener('click', ImageClicked);
          gallery.appendChild(zdjecie);
      }
  }

  function ShowAvailablePages() {
      btInfo.disabled = true;

      const InfoContainer = document.createElement('div');
      InfoContainer.id = 'InfoContainer';
      InfoContainer.textContent = 'Galeria zawiera strony:';

      const list = document.createElement('ol');
      InfoContainer.appendChild(list);

      for (let i = 0; i < pageContent.length; i++) {
          const text = pageContent[i][0];
          const li = document.createElement('li');
          li.textContent = text;
          list.appendChild(li);
      }

      const p = document.createElement("p");
      p.innerHTML = 'Możesz wpisać te nazwy<br> aby wyświetlić pokaz slajdów.';
      InfoContainer.appendChild(p);

      ap.appendChild(InfoContainer);

      setTimeout(() => {
          ap.removeChild(InfoContainer);
          btInfo.disabled = false;
      }, 5000);
  }

  function FindPage(inputPage) {
      for (let i = 0; i < pageContent.length; i++) {
          if (pageContent[i][0] === inputPage) {
              return i;
          }
      }
      return -1;
  }

  async function StartSlideShow() {
    const userInput = inputSlide.value.trim();
    if (userInput === "") {
        alert("Wprowadź nazwę strony.");
        return;
    }

    const pageIndex = FindPage(userInput);

    if (pageIndex !== -1) {
        const slideContainer = document.createElement('div');
        slideContainer.id = 'slideShowContainer';
        document.body.appendChild(slideContainer);

        const slideContent = document.createElement('div');
        slideContent.id = 'slideShowContent';
        slideContainer.appendChild(slideContent);

        const image = document.createElement('img');
        image.id = 'slideShowImg';
        slideContent.appendChild(image);

        const p = document.createElement('p');
        p.id = 'slideImgInfo';
        slideContent.appendChild(p);

        for (let i = 1; i < pageContent[pageIndex].length; i++) {
            image.src = pageContent[pageIndex][i][0];
            p.textContent = `${pageContent[pageIndex][i][1]}, zdjęcie numer: ${i}`;

            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        document.body.removeChild(slideContainer);
    } else {
        alert('Podaj prawidłową nazwę strony.');
    }
}

  if (btLeft) {
      btLeft.addEventListener('click', ButtonLeftClick);
  }

  if (btRight) {
      btRight.addEventListener('click', ButtonRightClick);
  }

  if (btInfo) {
      btInfo.addEventListener('click', ShowAvailablePages);
  }

  if (btSlide) {
      btSlide.addEventListener('click', StartSlideShow);
  }

  ChangePage(page);
});