
// FRONT END FILE TO INTERACT WITH THE DOM

// const searchRecBtn = document.getElementById('btn-search');
// const lookintoRecAppDB = document.getElementById('lookinto').value;
// const addRecBtn = document.getElementById('btn-agregar');
// const nameinputFromTheUser = document.getElementById('nameInput').value;
// const loadRecBtn = document.getElementById('btn-load');
// const reffromUser = document.getElementById('ref').value;
const listContainer = document.getElementById('lista');


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
        
    //     `<li data-id=${rec.id}><a href="#">${rec.Title}</a></li>`
    //     )
    //   })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // FUNCTION TO SELECT RECS URL & LAUNCH ONE AS A TRACK IN PLAYER

  const selectAllRec = () => {
    allRec = document.querySelectorAll('.rec-url')
    console.log(allRec)

    allRec.forEach((sendtoplayerbtn)=>{
      sendtoplayerbtn.addEventListener("click", (event) =>{
        console.log("audio url ready to play")
        let selectvinyl = document.querySelector('.vinyl-wrapper')
        selectvinyl.insertAdjacentHTML("beforeend", `
        <audio controls class="audiolauncher" id="launcher">
        <source id="play-source" src=${sendtoplayerbtn.dataset.url} type="audio/mpeg"/>
      </audio>
        `)
      })
    })
    selectRecToDel = document.querySelectorAll('.recCards')
    console.log(selectRecToDel)

    selectRecToDel.forEach((deleteBtn)=>{
      deleteBtn.addEventListener("click", (event) =>{
        alert('Delete this rec from RecApp database ?' + deleteBtn.dataset.id);
        sendRecToDeleteToMyServer({ID: deleteBtn.dataset.id})
        deleteBtn.remove()

        console.log("Rec deleted")
      })
    })

    // addEventToAllRec(allRec)
    // addEventToAllDeleteBtns(allRec)
  }



{/* <li data-id=${rec.ID}>
<a href="#">${rec.ID} ${rec.Name} ${rec.url}</a></li> */}


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
            let recCard = `<section class="recCards" data-id=${rec.ID}>
          <div class="scrollable">
          <div id="card" class="card">
            <div class="inner">
              <div class="header">
                <h1 class="rec-infos"> 
                <i><small>Name :</i></small> <br/> ${rec.Name}
                <div class="rec-url" data-url=${rec.url}><a class="playword" href="#launcher">Send to player</a></div>
                </h1> 
              </div>
              <div class="btn_row">
                <a href="#" class="card-action" data-id=${rec.ID}>Delete this file in RecApp database</a>
              </div>
            </div>
          </div>
          </div>
          </section>`
          listContainer.insertAdjacentHTML('beforeend', recCard)
        })
        selectAllRec()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  // FUNCTION TO SELECT RECS URL & DELETE ONE TRACK FROM THE WEB PAGE

  // const selectAllRec = () => {
  //   allRec = document.querySelectorAll('.rec-url')
  //   console.log(allRec)

  //   allRec.forEach((sendtoplayerbtn)=>{
  //     sendtoplayerbtn.addEventListener("click", (event) =>{
  //       console.log("audio url ready to play")
  //       let selectvinyl = document.querySelector('.vinyl-wrapper')
  //       selectvinyl.insertAdjacentHTML("beforeend", `
  //       <audio controls class="audiolauncher" id="launcher">
  //       <source id="play-source" src=${sendtoplayerbtn.dataset.url} type="audio/mpeg"/>
  //     </audio>
  //       `)
  //     })
  //   })

    // addEventToAllRec(allRec)
  //   addEventToAllDeleteBtns(allRec)
  // }



  // FUNCTION TO DELETE FILE(S) IN RECAPP DB

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
  
  
  // const addEventToAllDeleteBtns = (recs) => {
  //   recs.forEach((rec) => {
  //     rec.children[1].addEventListener('click', (event) => {
        // sendRecToDeleteToMyServer({ID: rec.dataset.ID})
        // rec.remove()
  //     })
  //   })
  // }


// ADD A NEW FILE BUTTON and ACTIONS

let addRecBtn = document.getElementById('btn-agregar');

addRecBtn.addEventListener('click', (event) => {
    alert('thanks for this rec');
    let nameinputFromTheUser = document.getElementById('nameInput');
    let urlinputFromTheUser = document.getElementById('urlInput');
    console.log(nameinputFromTheUser.value);
    console.log(urlinputFromTheUser.value);
    // listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${nameinputFromTheUser.value}</a></li>`)
    sendRecToServer({inputname: nameinputFromTheUser.value, inputurl: urlinputFromTheUser.value});
    // nameinputFromTheUser.value = "";    
    
})

 
// LOAD FILE(S) (FROM A REFERENCE) BUTTON and ACTIONS

let loadRecBtn = document.getElementById('btn-load');

loadRecBtn.addEventListener('click', (event) => {
    
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    
    // nameinputFromTheUser.value = "";
    alert('enjoy !');
})

// DELETE FILE(S) BUTTON and ACTIONS
// const selectRectoDel = () => {
//   RecToDel = document.querySelectorAll('#deleterec')
//   console.log(RectoDel)

  // RecToDel.forEach((deleteBtn)=>{
  //   deleteBtn.addEventListener("click", (event) =>{
  //     alert('Delete this rec from RecApp database ?');
  //     console.log("Rec deleted")
  //   })
  // })
// }
// selectRecToDel();








// let searchRecBtn = document.getElementById('btn-search');

// searchRecBtn.addEventListener('click', (event) => {
//   let lookintoRecAppDB = document.getElementById('lookinto');
//   console.log(lookintoRecAppDB.value);
//   alert('get inspired');
//   searchRec(lookintoRecAppDB.value);
// })
