
// FRONT END FILE TO INTERACT WITH THE DOM

// const searchRecBtn = document.getElementById('btn-search');
// const lookintoRecAppDB = document.getElementById('lookinto').value;
// const addRecBtn = document.getElementById('btn-agregar');
// const nameinputFromTheUser = document.getElementById('nameInput').value;
// const loadRecBtn = document.getElementById('btn-load');
// const reffromUser = document.getElementById('ref').value;
const listContainer = document.getElementById('lista');
const uploadBtn = document.getElementById('btn-upload');
const coverimginsert = document.querySelector('.coverimg-place');


// const searchRec = (rec) => {
//   // recContainer.innerHTML = ""
//   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${rec}`)
//     // .then (res => console.log(res))
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data.meals);
//       listContainer.insertAdjacentHTML('beforeend', `<li><img src=${data.meals.strMealThumb} style="background-image: url(${rec.strMealThumb})"></img></li>`)
//     })
// }

// FUNCTION TO ADD A FILE IN RECAPP DB

const sendRecToServer = (rec) => {
    fetch('api/rec/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rec),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success sendRecToServer client js :', data);
    //   data.forEach((rec) => {
    //     listContainer.insertAdjacentHTML('beforeend', 
    //     `<li data-id=${rec.ID}><a href="#">${rec.Name}</a></li>`
    //     )
    //   })

    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  // FUNCTION TO SELECT RECS to PLAY or DELETE

  const selectAllRec = () => {
    allRec = document.querySelectorAll('.rec-url')
    console.log(allRec)
// THEN to LAUNCH AUDIO URL AS A TRACK IN PLAYER and DISPLAY IMG URL UNDER IT
    allRec.forEach((sendtoplayerbtn)=>{
      sendtoplayerbtn.addEventListener("click", (event) =>{
        console.log("audio url ready to play")
        let selectvinyl = document.querySelector('.vinyl-wrapper')
        selectvinyl.innerHTML=(`<img class="vinyl-player" src="static/images/vectorplayer.svg" alt="vinyl player image not found">`)
        selectvinyl.insertAdjacentHTML("beforeend", `
        <audio controls class="audiolauncher" id="launcher">
        <source id="play-source" src=${sendtoplayerbtn.dataset.audiourl} type="audio/mpeg"/>
      </audio>
        `)
        coverimginsert.innerHTML=""
        coverimginsert.insertAdjacentHTML("beforeend", `
        <img class="coverimg" src=${sendtoplayerbtn.dataset.imgurl} alt="Image not found">
        `)
      })
    })

    // THEN to SELECT & DELETE ONE REC CARD
    selectRecToDel = document.querySelectorAll('.card-action')
    console.log(selectRecToDel)

    selectRecToDel.forEach((cardtodel)=>{
        cardtodel.addEventListener("click", (event) =>{
        
        alert('Delete this rec from RecApp database ?' + cardtodel.dataset.id);
        sendRecToDeleteToMyServer({ID: cardtodel.dataset.id})
        cardtodel.remove()
        console.log("Rec deleted in RecApp database")
        alert("Rec deleted in RecApp database")
      })
    })
}
  
// FUNCTION TO UPDATE A REC AS FAV and IN RECAPP DB

const sendRecFavToMyServer = (rec) => {
  fetch('api/rec/updatefav', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rec),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  // FUNCTION TO SELECT A REC AS FAVORITE

  const selectAllStars = () => {
    allStars = document.querySelectorAll('.fa-star')
    console.log(allStars);
    allStars.forEach((staricon)=>{
     staricon.addEventListener('click', (event) => {
          alert("ID = " + staricon.dataset.id + " fav = " + staricon.dataset.fav);
          sendRecFavToMyServer({ID: staricon.dataset.id, isFav: staricon.dataset.fav})
          staricon.classList.toggle('fav-1')
        if(staricon.dataset.fav === "0"){
          staricon.dataset.fav = "1"
        }else{
          staricon.dataset.fav = "0"
        }
      })
      });
  };

  // FUNCTION TO DISPLAY REC INFOS
  const showAllInfos = () => {
    allInfos = document.querySelectorAll('.fa-info-circle')
        console.log(allInfos);
        allInfos.forEach((infoicon)=>{
          infoicon.addEventListener('click', (event) => {
               alert("ID = " + infoicon.dataset.id + " audiourl = " + infoicon.dataset.audiourl + " imgourl = " + infoicon.dataset.imgurl);
               infoicon.classList.add('fa-info-box');
              //  infoicon.innerHTML=("beforeend", 
              //  `
              //  <h3>Rec infos :</h3>
              //  <p>ID : ${infoicon.dataset.id}<p/>
              //  <p>${infoicon.dataset.audiourl}<p/>
              //  <p>${infoicon.dataset.imgurl}<p/>
              //  `)
          })
        })
    {/* <div class="info box">
      Info Message Box
    </div> */}
    // ("<ul><li>Element n°1</li><li>Element n°2</li></ul>").appendTo(".conteneur");
  }

    // FUNCTION TO DELETE A REC ROW IN RECAPP DB

    const sendRecToDeleteToMyServer = (rec) => {
      fetch('api/rec/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rec),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }


  // FUNCTION TO LOAD FILE(S) FROM RECAPP DB

  const loadreffromDB = () => {
    fetch('api/rec/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
        lista.innerHTML="";
        console.log('Success loadreffromDB client js :', data);
        data.recKey.forEach((rec) => {
            let recCard = 
      `<section class="recCards">
        <div class="scrollable">
          <div id="card" class="card">
            <div class="inner">
              <div class="header">
                <div class="stars ">
                  <i class="fa fa-star fa-spin ${"fav-" + rec.rec_fav}" data-id=${rec.ID} data-fav=${rec.rec_fav} style="font-size:30px" aria-hidden="true"></i>
                 </div>
                <h1 class="rec-infos">
                  <div class="moreinfodiv">
                    <i class="fa fa-info-circle" data-id=${rec.ID} data-audiourl=${rec.audio_url} data-imgurl=${rec.img_url} style="font-size:20px" aria-hidden="true">
                    </i>
                  </div>
                <i><small>Name :</i></small> <br/> ${rec.Name}
                  <div class="rec-url" data-audiourl=${rec.audio_url} data-imgurl=${rec.img_url}>
                    <a class="playword" href="#launcher">Send to player</a>
                  </div>
                </h1>   
              </div>
              <div class="btn_row">
                <a href="#" class="card-action" data-id=${rec.ID}>Delete this file in RecApp database</a>
              </div>
            </div>
          </div>
        </div>
      </section>`
          listContainer.insertAdjacentHTML('beforeend', recCard);
        })
        
        selectAllRec();
        selectAllStars();
        showAllInfos();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

// ADD A NEW FILE BUTTON and ACTIONS

let addRecBtn = document.getElementById('btn-agregar');

addRecBtn.addEventListener('click', (event) => {
    alert('thanks for this rec');
    let nameinputFromTheUser = document.getElementById('nameInput');
    let audiourlinputFromTheUser = document.getElementById('audiourlInput');
    let imgurlinputFromTheUser = document.getElementById('imgurlInput');
    console.log(nameinputFromTheUser.value);
    console.log(audiourlinputFromTheUser.value);
    console.log(imgurlinputFromTheUser.value);
    // listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${nameinputFromTheUser.value}</a></li>`)
    sendRecToServer({inputname: nameinputFromTheUser.value, inputaudiourl: audiourlinputFromTheUser.value, inputimgurl: imgurlinputFromTheUser.value});
    // nameinputFromTheUser.value = "";    
    
})


 
// LOAD FILE(S) (FROM A REFERENCE) BUTTON and ACTIONS

let loadRecBtn = document.getElementById('btn-load');

loadRecBtn.addEventListener('click', (event) => {
    
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    
    // reffromUser.value = "";
    // alert('enjoy !');
})

// UPLOAD A FILE (FROM LOCAL TO CLOUDINARY) BUTTON and ACTIONS

let myWidget = cloudinary.createUploadWidget({
  cloudName: 'dlqnpg3s2', 
  uploadPreset: 'ocdjf8ap'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
    }
  }
)

uploadBtn.addEventListener('click', (event) => {
  let lookintoRecAppDB = document.getElementById('lookinto');
  console.log(lookintoRecAppDB.value);
  // alert('get inspired');
  myWidget.open();
  
  // searchRec(lookintoRecAppDB.value);
}, false);











// let searchRecBtn = document.getElementById('btn-search');

// searchRecBtn.addEventListener('click', (event) => {
//   let lookintoRecAppDB = document.getElementById('lookinto');
//   console.log(lookintoRecAppDB.value);
//   alert('get inspired');
//   searchRec(lookintoRecAppDB.value);
// })


