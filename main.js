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
          ["Zdjecia/page2/zdj8.png", 'Kot szykujący się do snu'],
          ["Zdjecia/page2/zdj9.png", '3 kocięta, potrójne kłopoty'],
          ["Zdjecia/page2/zdj10.png", 'Kot stojący na 2 łapach'],
          ["Zdjecia/page2/zdj11.png", 'Drapieżnik na polowaniu'],
          ["Zdjecia/page2/zdj12.png", 'Śniący kot'],
          ["Zdjecia/page2/zdj13.png", 'Kot patrzący zza doniczki'],
          ["Zdjecia/page2/zdj14.png", 'Szaro biały i ciekawy kot'],
          ["Zdjecia/page2/zdj15.png", 'Duży, za duży kot']
      ],
      ["Samochody",
          ["Zdjecia/page3/zdj1.png", 'Czerwony samochód w lesie'],
          ["Zdjecia/page3/zdj2.png", 'Czarny samochód w deszczową pogodę'],
          ["Zdjecia/page3/zdj3.png", 'Stare auto'],
          ["Zdjecia/page3/zdj4.png", 'Pojazd wakacyjny'],
          ["Zdjecia/page3/zdj5.png", 'Drogie auto'],
          ["Zdjecia/page3/zdj6.png", 'Czarne auto na pustyni'],
          ["Zdjecia/page3/zdj7.png", 'Mysz w aucie'],
          ["Zdjecia/page3/zdj8.png", 'Auto w zmierzch'],
          ["Zdjecia/page3/zdj9.png", 'Zniszczone Auto'],
          ["Zdjecia/page3/zdj10.png", 'Mech na samochodzie'],
          ["Zdjecia/page3/zdj11.png", 'Rysunek samochodu']
      ],
      ["Natura",
        ["Zdjecia/page4/zdj1.png", 'Las w jasny poranek'],
        ["Zdjecia/page4/zdj2.png", 'Jezioro z kamieniami'],
        ["Zdjecia/page4/zdj3.png", 'Wyspa nad jeziorem'],
        ["Zdjecia/page4/zdj4.png", 'Kwiat wiśni'],
        ["Zdjecia/page4/zdj5.png", 'Jesienna droga'],
        ["Zdjecia/page4/zdj6.png", 'Burzowa łąka']
  ]
  ];

  const btLeft = document.getElementById("goLeft");
  const btRight = document.getElementById("goRight");
  const pageNumShow = document.getElementById("showPageNum");
  const gallery = document.getElementById("gallery");
  const title = document.getElementById("title");
  const btInfo = document.getElementById("btInfo");
  const btSlide = document.getElementById("btSlide");
  const optionList = document.getElementById("listSlide")

//Dodanie opcji do listy, wywołane odrazu po załadowaniu strony
  for (let i = 0; i < pageContent.length; i++) {
          const text = pageContent[i][0];
          const option = document.createElement('option');
          option.textContent = text;
          listSlide.appendChild(option);
  }
  
  //Funkcje 
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
      let imageIndex = parseInt(imageTitle.match(/\d+/)[0]) - 1;
  
      let Container = document.createElement('div');
      Container.className = 'temp-container';
  
      let Image = document.createElement('img');
      Image.src = imageUrl;
      Image.className = 'temp-image';
  
      let Title = document.createElement('h3');
      Title.textContent = imageTitle;
      Title.className = 'temp-title';
  
      let PrevButton = document.createElement('button');
      PrevButton.textContent = '<';
      PrevButton.className = 'temp-button';
      PrevButton.addEventListener('click', () => {
        imageIndex = (imageIndex - 1 + pageContent[page].length - 1) % (pageContent[page].length - 1);
        Image.src = pageContent[page][imageIndex + 1][0];
        Title.textContent = `${pageContent[page][imageIndex + 1][1]}, zdjęcie numer: ${imageIndex + 1}`;
      });
  
      let NextButton = document.createElement('button');
      NextButton.textContent = '>';
      NextButton.className = 'temp-button';
      NextButton.addEventListener('click', () => {
        imageIndex = (imageIndex + 1) % (pageContent[page].length - 1);
        Image.src = pageContent[page][imageIndex + 1][0];
        Title.textContent = `${pageContent[page][imageIndex + 1][1]}, zdjęcie numer: ${imageIndex + 1}`;
      });
  
      let CloseButton = document.createElement('button');
      CloseButton.textContent = 'x';
      CloseButton.className = 'temp-close-button';
      CloseButton.addEventListener('click', () => {
        document.body.removeChild(Container);
        ImageOpened = false;
      });
  
      Container.appendChild(PrevButton);
      Container.appendChild(Image);
      Container.appendChild(NextButton);
      Container.appendChild(Title);
      Container.appendChild(CloseButton);
  
      document.body.appendChild(Container);
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

  function ShowInfo() {
      btInfo.disabled = true;

      const InfoContainer = document.createElement('div');
      InfoContainer.id = 'InfoContainer';
      InfoContainer.textContent = 'Galeria zawiera strony:';

      const list = document.createElement('ol');
      InfoContainer.appendChild(list);

      for (let i = 0; i < pageContent.length; i++) {
          const text = pageContent[i][0];
          const li = document.createElement('li');
		  li.className = 'liInfo'
          li.textContent = text;
          list.appendChild(li);
      }

      const p = document.createElement("p");
      p.innerHTML = 'Możesz użyć listy i przycisku </br> po lewej stronie aby </br> wyświetlić pokaz slajdów. </br> Możesz też kliknąc w </br> zdjęcie by je powiększyć.';
      InfoContainer.appendChild(p);

      document.body.appendChild(InfoContainer);

      setTimeout(() => {
          document.body.removeChild(InfoContainer);
          btInfo.disabled = false;
      }, 5000);
  }

function FindPage(inputPage) {
    for (let i = 0; i < pageContent.length; i++) {
        const currentPageName = pageContent[i][0];
        if (currentPageName === inputPage) {
            return i;
        }
    }
   
    return -1; 
}

async function StartSlideShow() {
    const userInput = optionList.value;
    const pageIndex = FindPage(userInput);

    if (pageIndex !== -1) {
        const slideShowContainer = document.createElement('div');
        slideShowContainer.id = 'slideShowContainer';
        document.body.appendChild(slideShowContainer);

        const slideShowContent = document.createElement('div');
        slideShowContent.id = 'slideShowContent';
        slideShowContainer.appendChild(slideShowContent);

        const slideShowImage = document.createElement('img');
        slideShowImage.id = 'slideShowImg';
        slideShowContent.appendChild(slideShowImage);

        const slideShowInfo = document.createElement('p');
        slideShowInfo.id = 'slideImgInfo';
        slideShowContent.appendChild(slideShowInfo);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.className = 'temp-close-button';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(slideShowContainer);
        });
        slideShowContainer.appendChild(closeButton);

        for (let i = 1; i < pageContent[pageIndex].length; i++) {
            slideShowImage.src = pageContent[pageIndex][i][0];
            slideShowInfo.textContent = `${pageContent[pageIndex][i][1]}, zdjęcie numer ${i}`;

            await new Promise(resolve => setTimeout(resolve, 2000));

            if (!document.contains(slideShowContainer)) {
                break;
            }

            if (i === pageContent[pageIndex].length - 1) {
                document.body.removeChild(slideShowContainer);
            }
        }
    }
}


//Sprawdzenie czy istnieją przyciski i nadanie im wydarzeń.
  if (btLeft) {
      btLeft.addEventListener('click', ButtonLeftClick);
  }

  if (btRight) {
      btRight.addEventListener('click', ButtonRightClick);
  }

  if (btInfo) {
      btInfo.addEventListener('click', ShowInfo);
  }

  if (btSlide) {
      btSlide.addEventListener('click', StartSlideShow);
  }

  ChangePage(page);
});
