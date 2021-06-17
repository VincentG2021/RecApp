// FRONT END FILE TO INTERACT WITH THE DOM

// const searchRecBtn = document.getElementById('btn-search');
// const lookintoRecAppDB = document.getElementById('lookinto').value;
// const addRecBtn = document.getElementById('btn-agregar');
// const inputFromTheUser = document.getElementById('recInput').value;
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
    allRec = document.querySelectorAll('#lista li')
    console.log(allRec)
    // addEventToAllRec(allRec)
    // addEventToAllDeleteBtns(allRec)
  }

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
          listContainer.insertAdjacentHTML('beforeend', `<li data-id=${rec.id}><a href="#">${rec.Title}</a></li>`)
        })
        selectAllRec()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }


  // let recCard = `<section>
  //         <div id="card" class="card" data-img=${rec.Content} style="background-image: url(${rec.Content})">
  //           <div class="inner">
  //             <div class="header">
  //               <i class="fa fa-info-circle" aria-hidden="true"></i>
  //               <h1 class="main-title">${rec.Title}</h1>
  //               <div class="stars">
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star-half" aria-hidden="true"></i>
  //               </div>
  //             </div>
  //             <div class="content">
  //               <p class="type">${rec.Type}</p>
  //               <a class="year" href="#">${rec.Year}</a>
  //             </div>
  //             <div class="btn_row">
  //               <a href="#" id=${rec.imdbID} class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
  //               </a>
  //             </div>
  //           </div>
  //           <!-- the trailer -->
  //         </div>
  //       </section>`
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
    let inputFromTheUser = document.getElementById('recInput');
    console.log(inputFromTheUser.value);
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${inputFromTheUser.value}</a></li>`)
    sendRecToServer({input: inputFromTheUser.value});
    // inputFromTheUser.value = "";    
    
})

let loadRecBtn = document.getElementById('btn-load');

loadRecBtn.addEventListener('click', (event) => {
    
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${reffromUser}</a></li>`)
    // inputFromTheUser.value = "";
    alert('enjoy !');
})



