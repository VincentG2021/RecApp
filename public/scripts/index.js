
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

  const selectAllRec = () => {
    allRec = document.querySelectorAll('.rec-url')
    console.log(allRec)
    allRec.forEach((recbtn)=>{
      recbtn.addEventListener("click", (event) =>{
        console.log("audio url ready to play")
        let selectvinyl = document.querySelector('.vinyl-wrapper')
        selectvinyl.insertAdjacentHTML("beforeend", `
        <audio controls class="launcher" id="launcher">
        <source id="play-source" src=${recbtn.dataset.url} type="audio/mpeg"/>
      </audio>
        `)
      })
    })
    // addEventToAllRec(allRec)
    // addEventToAllDeleteBtns(allRec)
  }



{/* <li data-id=${rec.ID}>
<a href="#">${rec.ID} ${rec.Name} ${rec.url}</a></li> */}


  const loadreffromDB = () => {
    fetch('api/rec/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
        // list.innerHTML="";
        console.log('Success loadreffromDB client js :', data);
        data.recKey.forEach((rec) => {
            let recCard = `<section class="recCards">
            <div id="card" data-id=${rec.ID} class="card">
            <div class="inner">
              <div class="header">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                
                <h1 class="rec-infos">
                <div class="rec-url" data-url=${rec.url}><a class="playword" href="#launcher">Send to player</a></div>
                ${rec.Name}
                </h1> 
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

let searchRecBtn = document.getElementById('btn-search');

searchRecBtn.addEventListener('click', (event) => {
  let lookintoRecAppDB = document.getElementById('lookinto');
  console.log(lookintoRecAppDB.value);
  alert('get inspired');
  searchRec(lookintoRecAppDB.value);
})




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





let loadRecBtn = document.getElementById('btn-load');

loadRecBtn.addEventListener('click', (event) => {
    
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    
    // nameinputFromTheUser.value = "";
    alert('enjoy !');
})
